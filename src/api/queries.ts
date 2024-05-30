import { Aptos } from '@aptos-labs/ts-sdk';

/**
 *
 * Types
 *
 */

export type ComposedNfts = {
  token_data_id: string;
};

export type TokenV1Fields = {
  collection_id: string;
  collection_name: string;
  token_name: string;
  token_data_id: string;
  description?: string;
  token_uri?: string;
  token_standard: 'v1';
  composed_nfts?: ComposedNfts[];
};

export type TokenV2Fields = {
  collection_id: string;
  collection_name: string;
  token_name: string;
  token_data_id: string;
  description: string;
  token_uri: string;
  token_standard: 'v2';
  composed_nfts: ComposedNfts[];
};

export type CollectionV1Fields = {
  collection_id: string;
  collection_name: string;
  description: string;
  uri: string;
};

export type CollectionV2Fields = {
  collection_id: string;
  collection_name: string;
  collection_uri: string;
  description: string;
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
  current_collections_v2: Array<CollectionV2Fields>;
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
    query MyQuery($offset: Int, $limit: Int, $account_address: String, $collection_data_id_hash: String) {
      token_ownerships(
        where: {
          owner_address: {_eq: $account_address},
          collection_data_id_hash: {_eq: $collection_data_id_hash}
        }
        offset: $offset
        limit: $limit
        order_by: {name: asc}
      ) {
          collection_data_id_hash: collection_id
          name: token_name
          token_data_id_hash: token_data_id
      }
    }
    `;
export const OWNED_V2_TOKENS_QUERY = `
    query MyQuery($offset: Int!, $limit: Int, $account_address: String, $collection_id: String) {
      current_token_ownerships_v2(
        limit: $limit
        where: {owner_address: {_eq: $account_address}, current_token_data: {current_collection: {collection_id: {_eq: $collection_id}}}}
        offset: $offset
      ) {
        current_token_data {
          collection_id
          token_name
          token_data_id
          description
          token_uri
          current_collection {
            collection_name
          }
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
        collection_id: collection_data_id_hash
        collection_name
        description
        uri: metadata_uri
        }
    }
    `;

export const OWNED_V2_COLLECTIONS_QUERY = `
query MyQuery($offset: Int!, $limit: Int, $account_address: String) {
    current_collections_v2(
      limit: $limit
      offset: $offset
      order_by: {collection_name: asc}
      where: {creator_address: {_eq: $account_address}}
    ) {
      collection_id
      collection_name
      description
      uri
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
    account_address: string,
    collection_data_id_hash: string
  ): Promise<Array<TokenV1Fields>> {
    const variables = {
      offset,
      limit,
      account_address,
      collection_data_id_hash,
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
    account_address: string,
    collection_id: string
  ): Promise<Array<TokenV2Fields>> {
    const variables = {
      offset,
      limit,
      account_address,
      collection_id,
    };
    const res: any = await this.queryIndexer(OWNED_V2_TOKENS_QUERY, variables);
    // const tokens: TokenV2Fields[] = res.current_token_ownerships_v2.map(
    //   (token: any) =>
    //     (token.collection_name = token.current_collection.collection_name)
    // );
    // console.log(tokens);
    // const response: TokenV2FieldsIndexerResponse = await this.queryIndexer(
    //   OWNED_V2_TOKENS_QUERY,
    //   variables
    // );
    // console.log(response)
    const tokens: TokenV2Fields[] = [];

    for (const token of res.current_token_ownerships_v2) {
      tokens.push({
        ...token.current_token_data,
        colletion_name:
          token.current_token_data.current_collection.collection_name,
      });
    }
    console.log(tokens);
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

    for (const collection of response.current_collections_v2) {
      collections.push(collection);
    }
    return collections;
  }
}
