import { Aptos } from '@aptos-labs/ts-sdk';
import { getIdentifyObjects } from './getIdentifyObject';
import { getOwnedTokens } from './getOwnedTokens';
import { getParentTokens } from './getParentToken';
import { compareAddress } from '../util';

import { APTOS } from '../state/constants';

/**
 *
 * Types
 *
 */

export type ComposedNft = {
  token_data_id: string;
};

export type TokenResponse = {
  collection_name: string;
  collection_id: string;
  token_name: string;
  token_data_id: string;
  description: string;
  token_uri: string;
  owner_address: string;
};

export type TokenFields = {
  collection_id: string;
  collection_name: string;
  token_name: string;
  token_data_id: string;
  description: string;
  token_uri?: string;
  composed_nfts?: ComposedNft[];
  type?: string;
  composed_to?: boolean;
};

export type CollectionV1Fields = {
  collection_id: string;
  collection_name: string;
  current_supply: number;
  description: string;
  collection_uri: string;
};

export type CollectionV2Fields = {
  collection_id: string;
  collection_name: string;
  current_supply: number;
  description: string;
  collection_uri: string;
};

type CollectionV1FieldsIndexerResponse = {
  collection_datas: Array<CollectionV1Fields>;
};

export type TokenFieldsIndexer = {
  token_ownerships: Array<TokenFields>;
};

export type OwnedTokenIndexer = {
  current_token_data: TokenFields;
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

export const OWNED_OBJECTS_QUERY = `
  query MyQuery($account_address: String, $offset: Int, $limit: Int) {
      current_objects(
        where: {owner_address: {_eq: $account_address}}
        offset: $offset
        limit: $limit
      ) {
        object_address
      }
    }
  `;

export const OWNED_V1_TOKENS_QUERY = `
  query Query($offset: Int!, $limit: Int, $account_address: String, $collection_id: String) {
    current_token_ownerships_v2(
      limit: $limit
      where: {owner_address: {_eq: $account_address}, current_token_data: {current_collection: {collection_id: {_eq: $collection_id}, token_standard: {_eq: "v1"}}}}
      offset: $offset
      order_by: {last_transaction_timestamp: desc}
    ) {
      current_token_data {
        current_collection {
          collection_name
          collection_id
        }
        token_name
        token_data_id
        description
        token_uri
        current_token_ownerships(limit: 1) {
          owner_address
        }
      }
    }
  }
  `;
export const OWNED_V2_TOKENS_QUERY = `
  query Query($offset: Int!, $limit: Int, $account_address: String, $collection_id: String) {
    current_token_ownerships_v2(
      limit: $limit
      where: {owner_address: {_eq: $account_address}, current_token_data: {current_collection: {collection_id: {_eq: $collection_id}}, token_standard: {_eq: "v2"}}}
      offset: $offset
      order_by: {last_transaction_timestamp: desc}
    ) {
      current_token_data {
        current_collection {
          collection_name
          collection_id
        }
        token_name
        token_data_id
        description
        token_uri
        current_token_ownerships(limit: 1) {
          owner_address
        }
      }
    }
  }
  `;

export const OWNED_V1_COLLECTIONS_QUERY = `
  query MyQuery($offset: Int!, $limit: Int, $account_address: String) {
    current_collection_ownership_v2_view(
      limit: $limit
      offset: $offset
      order_by: {collection_name: asc}
      where: {owner_address: {_eq: $account_address}}
    ) {
      current_collection {
        collection_id
        collection_name
        current_supply
        description
        uri
      }
    }
  }`;

export const OWNED_V2_COLLECTIONS_QUERY = `
  query MyQuery($offset: Int!, $limit: Int, $account_address: String) {
    current_collection_ownership_v2_view(
      limit: $limit
      offset: $offset
      order_by: {collection_name: asc}
      where: {owner_address: {_eq: $account_address}}
    ) {
      current_collection {
        collection_id
        collection_name
        current_supply
        description
        uri
      }
    }
  }`;

export const OWNED_V2_TOKENS_IN_A_COLLECTION_QUERY = `
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
   * Get owned objects
   * @param offset
   * @param limit
   * @param account_address
   * @returns list of addresses
   */
  async getOwnedObjects(
    offset: number,
    limit: number,
    account_address: string
  ): Promise<Array<string>> {
    const variables = {
      offset,
      limit,
      account_address,
    };

    const response: any = await this.queryIndexer(
      OWNED_OBJECTS_QUERY,
      variables
    );

    const objects = [];

    for (const object of response.current_objects) {
      objects.push(object.object_address);
    }
    return objects;
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
    collection_data_id: string
  ): Promise<Array<TokenFields>> {
    const variables = {
      offset,
      limit,
      account_address,
      collection_data_id,
    };

    const res: any = await this.queryIndexer(OWNED_V1_TOKENS_QUERY, variables);

    const tokens: TokenFields[] = [];

    for (const token of res.current_token_ownerships_v1) {
      // if the latest owner address is the same as the account address, add the token to the list
      if (
        compareAddress(
          token.current_token_data.current_token_ownerships[0].owner_address,
          account_address
        )
      ) {
        tokens.push({
          collection_id: token.current_token_data.collection_id,
          collection_name:
            token.current_token_data.current_collection.collection_name,
          token_name: token.current_token_data.token_name,
          token_data_id: token.current_token_data.token_data_id,
          description: token.current_token_data.description,
          token_uri: token.current_token_data.token_uri,
          composed_nfts: token.composed_nfts,
          composed_to: false,
        });
      }
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
  ): Promise<Array<TokenFields>> {
    const variables = {
      offset,
      limit,
      account_address,
      collection_id,
    };
    const res: any = await this.queryIndexer(OWNED_V2_TOKENS_QUERY, variables);
    const tokens: TokenFields[] = [];

    const tokenObjects = [];
console.log(account_address, collection_id, res)
    for (const token of res.current_token_ownerships_v2) {
      // if the latest owner address is the same as the account address,
      if (
        compareAddress(
          token.current_token_data.current_token_ownerships[0].owner_address,
          account_address
        )
      ) {
        tokens.push({
          collection_id: token.current_token_data.collection_id,
          collection_name:
            token.current_token_data.current_collection.collection_name,
          token_name: token.current_token_data.token_name,
          token_data_id: token.current_token_data.token_data_id,
          description: token.current_token_data.description,
          token_uri: token.current_token_data.token_uri,
          composed_nfts: token.composed_nfts,
          composed_to: false,
        });

        tokenObjects.push(token.current_token_data.token_data_id);
      }
    }

    // filter out the tokens that are not owned by the account address
    const ownedTokens: any = await getOwnedTokens(APTOS, account_address, tokenObjects);
    console.log(ownedTokens[0])


    let identifyObject: any = await getIdentifyObjects(APTOS, ownedTokens[0]);
    const types = identifyObject[0].data;
    const traitObjects = [];

    // object = await getParentTokens(APTOS, ["0x709e7a0245d955f2fe405a21057fd23938d04fcd633b3b035cbc330b75b45b13"]);
    // console.log(object);

    if (types && tokens.length == types.length) {
      for (let i = 0; i < tokens.length; i++) {
        tokens[i].type = types[i].value.toLowerCase();

        if (tokens[i].type === 'trait')
          traitObjects.push(tokens[i].token_data_id);
      }
    }

    const parentObject: any = await getParentTokens(APTOS, traitObjects);
    const parents = parentObject[0].data;

    if (parents) {
      for (let i = 0; i < parents.length; i++) {
        const parentVec = parents[i].value.vec;
        if (parentVec && parentVec.length > 0) {
          const index = tokens.findIndex((token) =>
            compareAddress(token.token_data_id, parents[i].key)
          );
          if (index >= 0) tokens[index].composed_to = true;
        }
      }
    }
console.log(tokens)
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

    const response: any = await this.queryIndexer(
      OWNED_V2_COLLECTIONS_QUERY,
      variables
    );

    const collections: CollectionV2Fields[] = [];

    for (const collection of response.current_collection_ownership_v2_view) {
      collections.push({
        collection_id: collection.current_collection.collection_id,
        collection_name: collection.current_collection.collection_name,
        description: collection.current_collection.description,
        collection_uri: collection.current_collection.uri,
        current_supply: collection.current_collection.current_supply,
      });
    }

    return collections;
  }

  /**
   *
   * Get owned v2 tokens in a collection
   * @param offset
   * @param limit
   * @param account_address
   * @param collection_id
   * @returns
   */
  async getOwnedV2TokensInACollection(
    offset: number,
    limit: number,
    account_address: string,
    collection_id: string
  ): Promise<Array<TokenFields>> {
    const variables = {
      offset,
      limit,
      account_address,
      collection_id,
    };

    const response: any = await this.queryIndexer(
      OWNED_V2_TOKENS_IN_A_COLLECTION_QUERY,
      variables
    );

    const tokens = [];

    for (const token of response.current_token_ownerships_v2) {
      tokens.push({
        ...token.current_token_data,
        collection_name:
          token.current_token_data.current_collection.collection_name,
      });
    }
    
    return tokens;
  }
}
