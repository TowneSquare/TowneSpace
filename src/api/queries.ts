import { Aptos, MoveValue } from '@aptos-labs/ts-sdk';
import { getIdentifyObjects } from './getIdentifyObject';
import { getOwnedTokens } from './getOwnedTokens';
import { getParentTokens } from './getParentToken';
import { compareAddress, sanitizeAddress } from '../util';

import { APTOS, APTOS_CONFIG } from '../state/constants';
import { Events } from './events';
import {
  getTokenType as getType,
  getTokenTypes as getTypes
} from './getTokenType';
import { TRAIT_NAME } from '../type/nft_type';

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
  collection_id?: string;
  collection_name?: string;
  token_name?: string;
  token_data_id: string;
  description: TRAIT_NAME;
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
  query Query($offset: Int, $limit: Int, $account_address: String, $collection_id: String) {
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
        current_token_ownerships {
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

export const ALL_TOKENS_IN_A_COLLECTION_QUERY = `
  query MyQuery($offset: Int, $limit: Int, $collection_id: String) {
    current_token_ownerships_v2(
      limit: $limit
      where: {current_token_data: {current_collection: {collection_id: {_eq: $collection_id}}}}
      offset: $offset
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

  async getOwnedV1Tokens(
    offset: number,
    limit: number,
    account_address: string,
    collection_data_id: string
  ): Promise<{ allNfts: Array<TokenFields>; ownedNfts: Array<TokenFields> }> {
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
          collection_id:
            token.current_token_data.current_collection.collection_id,
          collection_name:
            token.current_token_data.current_collection.collection_name,
          token_name: token.current_token_data.token_name,
          token_data_id: sanitizeAddress(
            token.current_token_data.token_data_id
          ),
          description: token.current_token_data.description,
          token_uri: token.current_token_data.token_uri,
          composed_nfts: token.composed_nfts,
          composed_to: false,
        });
      }
    }
    return { allNfts: [], ownedNfts: tokens };
  }

  async getOwnedV2Tokens(
    offset: number,
    limit: number,
    account_address: string,
    collection_id: string
  ): Promise<{ allNfts: Array<TokenFields>; ownedNfts: Array<TokenFields> }> {
    // const all = await this.getAllTokensInACollection(
    //   offset,
    //   limit,
    //   collection_id
    // );

    const variables = {
      offset,
      limit,
      account_address,
      collection_id,
    };
    const res: any = await this.queryIndexer(OWNED_V2_TOKENS_QUERY, variables);
    console.log(res, "OWNED_V2_TOKENS_QUERY")
    const tokens: TokenFields[] = [];

    const tokenObjects = [];

    for (const token of res.current_token_ownerships_v2) {
      if (token.current_token_data.current_token_ownerships.find((obj: any) => obj.owner_address === account_address)) {
        tokens.push({
          collection_id:
            token.current_token_data.current_collection.collection_id,
          collection_name:
            token.current_token_data.current_collection.collection_name,
          token_name: token.current_token_data.token_name,
          token_data_id: sanitizeAddress(
            token.current_token_data.token_data_id
          ),
          description: token.current_token_data.description,
          token_uri: token.current_token_data.token_uri,
          composed_nfts: token.composed_nfts,
          composed_to: false,
        });
        tokenObjects.push(
          sanitizeAddress(token.current_token_data.token_data_id)
        );
      }
    }

    const ownedTokens: any = await getOwnedTokens(
      APTOS,
      account_address,
      tokenObjects
    );

    const tokens_filtered: TokenFields[] = [];
    for (const token of tokens) {
      if (ownedTokens[0].includes(token.token_data_id)) {
        tokens_filtered.push(token);
      } else {
      }
    }

    let identifyObject: any = await getIdentifyObjects(APTOS, ownedTokens[0]);
    const types = identifyObject[0].data;
    const traitObjects: string[] = [];

    if (types && tokens_filtered.length == types.length) {
      for (let i = 0; i < tokens_filtered.length; i++) {
        tokens_filtered[i].type = types[i].value.toLowerCase();

        if (tokens_filtered[i].type === 'trait')
          traitObjects.push(tokens_filtered[i].token_data_id);
      }
    }

    const parentObject: any = await getParentTokens(APTOS, traitObjects);
    const parents = parentObject[0].data;

    const descriptionResult: any = await getTypes(APTOS, traitObjects);

    parents.map((item: any, index: number) => {
      item.value.vec = descriptionResult[0][index].vec;
    })


    if (parents) {
      for (let i = 0; i < parents.length; i++) {
        const parentVec = parents[i].value.vec;
        if (parentVec && parentVec.length > 0) {
          const index = tokens_filtered.findIndex((token) =>
            compareAddress(token.token_data_id, parents[i].key)
          );
          if (index >= 0) tokens_filtered[index].composed_to = true;
          if (parents[i].key == tokens_filtered[index].token_data_id) {
            tokens_filtered[index].description = parents[i].value.vec[0];
          }
        }
      }
    }
    return { allNfts: [], ownedNfts: tokens_filtered };
  }

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

    const collections: CollectionV1Fields[] = [];

    // for (const collection of response.collection_datas) {
    //   collections.push(collection);
    // }

    return collections;
  }

  async getOwnedV2Collections(
    offset: number,
    limit: number,
    account_address: string
  ): Promise<Array<CollectionV2Fields>> {
    const events = new Events(APTOS_CONFIG);
    const createdEvents = await events.getCollectionCreatedEvents();

    const whitelists: string[] = [];
    for (const event of createdEvents) {
      whitelists.push(event.data.metadata.collection_addr);
    }

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
      const found = whitelists.find((whitelist) =>
        compareAddress(whitelist, collection.current_collection.collection_id)
      );
      if (found)
        collections.push({
          collection_id: collection.current_collection.collection_id,
          collection_name: collection.current_collection.collection_name,
          description: collection.current_collection.description,
          collection_uri: collection.current_collection.uri,
          current_supply: collection.current_collection.current_supply,
        });
    }
    console.log(collections);
    return collections;
  }

  async getAllTokensInACollection(
    offset: number,
    limit: number,
    collection_id: string
  ): Promise<Array<TokenFields>> {
    const variables = {
      offset,
      limit,
      collection_id,
    };
    const tokens = [];
    let response: any;
    do {
      response = await this.queryIndexer(
        ALL_TOKENS_IN_A_COLLECTION_QUERY,
        variables
      );

      console.log(response, "getAllTokensInACollection")
      for (const token of response.current_token_ownerships_v2) {
        tokens.push({
          collection_id:
            token.current_token_data.current_collection.collection_id,
          collection_name:
            token.current_token_data.current_collection.collection_name,
          token_name: token.current_token_data.token_name,
          token_data_id: sanitizeAddress(token.current_token_data.token_data_id),
          description: token.current_token_data.description,
          token_uri: token.current_token_data.token_uri,
          composed_nfts: token.composed_nfts,
          composed_to: false,
        });
      }
      variables.offset += 100;
    } while (response.current_token_ownerships_v2.length > 0);
    return tokens;
  }
}
