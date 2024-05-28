import { Aptos } from "@aptos-labs/ts-sdk";

/**
 * 
 * Types
 * 
 */

export type TokenV1Fields = {
    collection_name: string;
    name: string;
    token_data_id_hash: string;
  };

export type TokenV2Fields = {
    collection_id: string;
    token_name: string;
    token_data_id: string;
    description: string;
    token_uri: string;
  };

export type CollectionV1Fields = {
    collection_data_id_hash: string;
    collection_name: string;
    description: string;
    metadata_uri: string;
  };

export type CollectionV2Fields = {
    collection_id: string;
    collection_name: string;
    collection_uri: string;
  };

type TokenV1FieldsIndexerResponse = {
    token_ownerships: Array<TokenV1Fields>;
};

type TokenV2FieldsIndexerResponse = {
    current_token_ownerships_v2: Array<OwnedTokenV2Indexer>;
  };

type CollectionV1FieldsIndexerResponse = {
    collection_datas: Array<CollectionV1Fields>;
};

type CollectionV2FieldsIndexerResponse = {
current_collection_ownership_v2_view: Array<CollectionV2Fields>;
};

export type TokenV1FieldsIndexer = {
    token_ownerships: Array<TokenV1Fields>;
  };

export type OwnedTokenV2Indexer = {
    current_token_data: TokenV2Fields;
  };

export type CollectionV1FieldsIndexer = {
    collection_datas: Array<CollectionV1Fields>;
  };

export type OwnedCollectionV2Indexer = {
current_collection_data: CollectionV2Fields;
};

/**
 * 
 * Queries
 * 
 */

export const OWNED_V1_TOKENS_QUERY = `
    query MyQuery($offset: Int, $limit: Int, $account_address: String) {
        token_ownerships(
        offset: $offset
        limit: $limit
        order_by: {name: asc}
        where: {owner_address: {_eq: $account_address}}
        ) {
        collection_name
        name
        token_data_id_hash
        }
    }
    `;
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

export const OWNED_V1_COLLECTIONS_QUERY = `
    query MyQuery($limit: Int, $offset: Int, $account_address: String) {
        collection_datas(
        limit: $limit
        offset: $offset
        order_by: {collection_name: asc}
        where: {creator_address: {_eq: $account_address}}
        ) {
        collection_data_id_hash
        collection_name
        description
        metadata_uri
        }
    }
    `;

export const OWNED_V2_COLLECTIONS_QUERY = `
    query MyQuery($offset: Int!, $limit: Int, $account_address: String) {
    current_collection_ownership_v2_view(
        where: {creator_address: {_eq: $account_address}}
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
     * Get owned v1 tokens
     * @param offset
     * @param limit
     * @param account_address
     * @returns
     */
    async getOwnedV1Tokens(
        offset: number,
        limit: number,
        account_address: string
    ): Promise<Array<TokenV1Fields>> {
        const variables = {
            offset,
            limit,
            account_address,
        };

        const response: TokenV1FieldsIndexerResponse = await this.queryIndexer(
            OWNED_V1_TOKENS_QUERY,
            variables
        );

        const tokens = [];

        for (const token of response.token_ownerships) {
            tokens.push(token);
        }
        return tokens;
    }
    
    /**
     * 
     * Get owned v2 tokens
     * @param offset 
     * @param limit 
     * @param account_address 
     * @returns 
     */
    async getOwnedV2Tokens(
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
     * Get owned v1 collections
     * @param offset
     * @param limit
     * @param account_address
     * @returns
     */
    async getOwnedV1Collections(
        offset: number,
        limit: number,
        account_address: string
    ): Promise<Array<CollectionV1Fields>> {
        const variables = {
            offset,
            limit,
            account_address,
        };

        const response: CollectionV1FieldsIndexerResponse = await this.queryIndexer(
            OWNED_V1_COLLECTIONS_QUERY,
            variables
        );

        const collections = [];

        for (const collection of response.collection_datas) {
            collections.push(collection);
        }
        return collections;
    }
    
    /**
     * 
     * Get owned v2 collections
     * @param offset 
     * @param limit 
     * @param account_address 
     * @returns 
     */
    async getOwnedV2Collections(
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