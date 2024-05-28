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

export type CollectionV2Fields = {
    collection_id: string;
    collection_name: string;
    collection_uri: string;
  };
  
type TokenV2FieldsIndexerResponse = {
    current_token_ownerships_v2: Array<OwnedTokenV2Indexer>;
  };

type CollectionV2FieldsIndexerResponse = {
current_collection_ownership_v2_view: Array<CollectionV2Fields>;
};

export type OwnedTokenV2Indexer = {
    current_token_data: TokenV2Fields;
  };

export type OwnedCollectionV2Indexer = {
current_collection_data: CollectionV2Fields;
};

/**
 * 
 * Queries
 * 
 */
export const OWNED_V2_TOKENS_QUERY = `
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

export const OWNED_V2_COLLECTIONS_QUERY = `
    query MyQuery($offset: Int!, $limit: Int, $account_address: String) {
        current_collection_ownership_v2_view(
        where: {owner_address: {_eq: $account_address}}
        limit: $limit
        offset: $offset
        order_by: {collection_name: asc}
        ) {
        collection_id
        collection_name
        collection_uri
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
    
      /**
       * 
       * Get owned v2 tokens
       * @param offset 
       * @param limit 
       * @param account_address 
       * @returns 
       */
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
            OWNED_V2_TOKENS_QUERY,
            variables
        );

        const tokens = [];

        for (const token of response.current_token_ownerships_v2) {
            tokens.push(token.current_token_data);
        }
        return tokens;
    }
    
    /**
     * 
     * Get owned v2 collections
     * @param offset 
     * @param limit 
     * @param account_address 
     * @returns 
     */
    async getOwnedCollectionsV2(
        offset: number,
        limit: number,
        account_address: string
    ): Promise<Array<CollectionV2Fields>> {
        const variables = {
            offset,
            limit,
            account_address,
        };

        const response: CollectionV2FieldsIndexerResponse = await this.queryIndexer(
            OWNED_V2_COLLECTIONS_QUERY,
            variables
        );

        const collections = [];

        for (const collection of response.current_collection_ownership_v2_view) {
            collections.push(collection);
        }
        return collections;
    }
}