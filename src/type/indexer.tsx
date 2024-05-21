// query

export type CollectionIndexer = {
  creator_address: string;
  address: string;
  name: string;
  description: string;
  uri: string;
  total_supply: number;
};

export type TokenIndexer = {
  owner_address: string;
  address: string;
  name: string;
  description: string;
  uri: string;
};

export const COLLECTIONS_QUERY = `
    query getCollectionData(
        $where_condition: current_collections_v2_bool_exp!
        $offset: Int
        $limit: Int
        $order_by: [current_collections_v2_order_by!]
      ) {
        current_collections_v2(where: $where_condition, offset: $offset, limit: $limit, order_by: $order_by) {
          collection_id
          collection_name
          creator_address
          current_supply
          description
          last_transaction_timestamp
          last_transaction_version
          max_supply
          mutable_description
          mutable_uri
          table_handle_v1
          token_standard
          total_minted_v2
          uri
        }
      }
    `;

export const TOKENS_QUERY = `
      #import "./CurrentTokenOwnershipFieldsFragment";
      query getOwnedTokens(
        $where_condition: current_token_ownerships_v2_bool_exp!
        $offset: Int
        $limit: Int
        $order_by: [current_token_ownerships_v2_order_by!]
        ) {
          current_token_ownerships_v2(where: $where_condition, offset: $offset, limit: $limit, order_by: $order_by) {
            ...CurrentTokenOwnershipFields
          }
        }
      `;

// response

export type CollectionsQueryResponse = {
  studio_collections: Array<CollectionIndexer>;
};

export type TokensQueryResponse = {
  studio_tokens: Array<TokenIndexer>;
};

export type CollectionsResponse = Array<Collection>;

export type TokensResponse = Array<Token>;

export type Collection = {
  creator_address: string;
  address: string;
  name: string;
  description: string;
  uri: string;
  total_supply: number;
};

export type Token = {
  owner_address: string;
  address: string;
  name: string;
  description: string;
  uri: string;
};
