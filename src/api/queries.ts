import { Aptos } from "@aptos-labs/ts-sdk";

/**
 * 
 * Types
 * 
 */
export type TokenV2Fields = {
    collection_id: string;
    token_name: string;
    token_data_id: string;
    description: string;
    token_uri: string;
  };
  
type TokenV2FieldsIndexerResponse = {
    current_token_ownerships_v2: Array<OwnedTokenV2Indexer>;
  };
export type OwnedTokenV2Indexer = {
    current_token_data: TokenV2Fields;
  };

/**
 * 
 * Queries
 * 
 */
export const OWNED_TOKENS_V2_QUERY = `
    query MyQuery($offset: Int!, $limit: Int, $account_address: String) {
      current_token_ownerships_v2(
        where: {owner_address: {_eq: $account_address}}
        order_by: {current_token_data: {token_name: asc}}
        limit: $limit
        offset: $offset
      ) {
        current_token_data {
            collection_id
            token_name
            token_data_id
            description
            token_uri
          }
      }
    }
  `;
export class Queries { 
    readonly provider: Aptos;

    constructor(provider: Aptos) {
        this.provider = provider;
      }
    
    async queryIndexer<T extends {}>(query: string, variables?: {}): Promise<T> {
        const graphqlQuery = {
          query,
          variables,
        };
        return this.provider.queryIndexer<T>({
          query: graphqlQuery,
        });
      }

    async getOwnedTokensV2(
        offset: number,
        limit: number,
        account_address: string
    ): Promise<Array<TokenV2Fields>> {
        const variables = {
            offset,
            limit,
            account_address,
        };

        const response: TokenV2FieldsIndexerResponse = await this.queryIndexer(
            OWNED_TOKENS_V2_QUERY,
            variables
        );

        const tokens = [];

        for (const token of response.current_token_ownerships_v2) {
            tokens.push(token.current_token_data);
        }
        return tokens;
    }
    
}