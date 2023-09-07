// query 
export type CollectionsQueryResponse = {
    studio_collections: Array<CollectionIndexer>
}

export type CollectionIndexer = {
    creator_address: string,
    address: string,
    name: string,
    description: string,
    uri: string,
    total_supply: number,   
}

export const COLLECTIONS_QUERY = 
    `
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
    `

// response
export type CollectionsResponse = Array<Collection>

export type Collection = {
    creator_address: string,
    address: string,
    name: string,
    description: string,
    uri: string,
    total_supply: number,
}
