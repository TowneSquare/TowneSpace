import { ApolloClient, gql } from '@apollo/client';
export * from './ipfs';

export function isUriEmpty(uri: string | undefined) {
  return uri == undefined || uri == '';
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isSupportFile(extension: string) {
  let ext = extension.toLowerCase();
  if (ext == 'jpg' || ext == 'png' || ext == 'svg' || ext == 'webp')
    return true;
  return false;
}
export function compareAddress(a: string | undefined, b: string | undefined) {
  if (!a || !b || a.length < 60 || b.length < 60) return false;
  if (a.length == b.length) {
    return a === b;
  } else {
    const len = Math.min(a.length, b.length) - 3;
    return a.slice(-len) == b.slice(-len);
  }
}

export function sanitizeAddress(address: string): string {
  const sanitizedAddress = address.replace(/^0x0+/g, '0x');
  return sanitizedAddress;
}

export const NFT_COLLECTION_OWNED_QUERY = gql`
  query getCollectionsWithOwnedTokens($wallet: String!, $offset: Int!) {
    current_collection_ownership_v2_view(
      order_by: { collection_name: asc }
      where: { owner_address: { _eq: $wallet } }
      offset: $offset
      limit: 100
    ) {
      current_collection {
        collection_id
        collection_name
        creator_address
        current_supply
        description
        last_transaction_timestamp
        last_transaction_version
        mutable_description
        max_supply
        mutable_uri
        table_handle_v1
        token_standard
        total_minted_v2
        uri
      }
      collection_id
      collection_name
      collection_uri
      creator_address
      distinct_tokens
      last_transaction_version
      owner_address
      single_token_uri
    }
  }
`;

export const NFT_COLLECTION_OWNED_ID_QUERY = gql`
  query getCollectionsWithOwnedTokens(
    $wallet: String!
    $offset: Int!
    $collectionId: String!
  ) {
    current_token_ownerships_v2(
      where: {
        owner_address: { _eq: $wallet }
        current_token_data: { collection_id: { _eq: $collectionId } }
      }
      offset: $offset
      limit: 100
    ) {
      amount
      current_token_data {
        token_name
        token_uri
        current_collection {
          collection_name
        }
      }
      is_fungible_v2
      owner_address
      token_standard
    }
  }
`;
