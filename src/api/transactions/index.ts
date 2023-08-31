/* used aptos-tontine as a reference*/
import { AptosClient, MaybeHexString } from "aptos";
import { NODE_URL, STUDIO_ADDRESS } from "../../constants";

async function submitTransaction(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    payload: any,
  ) {
    console.log("Submitting transaction", JSON.stringify(payload));
    const pendingTransaction = await signAndSubmitTransaction(payload);
    const client = new AptosClient(NODE_URL);    // hardcoded to devnet for now
    await client.waitForTransactionWithResult(pendingTransaction.hash, {
      checkSuccess: true,
    });
  }

export async function createCollection(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    description: String,
    max_supply: bigint,
    name: String,
    symbol: String,
    uri: String,
    mutable_description: boolean,
    mutable_royalty: boolean,
    mutable_uri: boolean,
    mutable_token_description: boolean,
    mutable_token_name: boolean,
    mutable_token_properties: boolean,
    mutable_token_uri: boolean,    // this have to be enforced to `True`
    tokens_burnable_by_creator: boolean,
    tokens_freezable_by_creator: boolean,  // sets whether a creator can freeze transfer for a token
    royalty_numerator: bigint,
    royalty_denominator: bigint,
    seed: bigint[] // vector<u8>; used when auid is disabled.
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_ADDRESS}::studio::create_token_collection`,
        type_arguments: [],
        arguments: [
            description,
            max_supply,
            name,
            symbol,
            uri,
            mutable_description,
            mutable_royalty,
            mutable_uri,
            mutable_token_description,
            mutable_token_name,
            mutable_token_properties,
            mutable_token_uri,
            tokens_burnable_by_creator,
            tokens_freezable_by_creator,
            royalty_numerator,
            royalty_denominator,
            seed
        ],
    };
    await submitTransaction(signAndSubmitTransaction, payload);
}

export async function mintComposableNFT(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    collection: String,
    description: String,
    name: String,
    uri: String,
    total_supply: bigint,  // objects supply must be less or equal than token supply
    object_tokens: MaybeHexString[],
    property_keys: String[],
    property_types: String[],
    property_values: bigint[][],
    seed: bigint[] // used when auid is disabled.
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_ADDRESS}::studio::mint_composable_token`,
        type_arguments: [],
        arguments: [
            collection,
            description,
            name,
            uri,
            total_supply,
            object_tokens,
            property_keys,
            property_types,
            property_values,
            seed
        ],
    };
    await submitTransaction(signAndSubmitTransaction, payload);
}

export async function mintObjectNFT(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    collection: String,
    description: String,
    name: String,
    uri: String,
    property_keys: String[],  // e.g: store categories
    property_types: String[],
    property_values: bigint[][],
    composable_token_object: MaybeHexString, // needed for token supply
    seed: bigint[] // used when auid is disabled.
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_ADDRESS}::studio::mint_object_token`,
        type_arguments: [],
        arguments: [
            collection,
            description,
            name,
            uri,
            property_keys,
            property_types,
            property_values,
            composable_token_object,
            seed
        ],
    }
    await submitTransaction(signAndSubmitTransaction, payload);
}

export async function composeObject(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    composable_token_object: MaybeHexString,
    object_token_object: MaybeHexString
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_ADDRESS}::studio::compose_object`,
        type_arguments: [],
        arguments: [
            composable_token_object,
            object_token_object
        ],
    }
    await submitTransaction(signAndSubmitTransaction, payload);
}

export async function decomposeObject(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    composable_token_object: MaybeHexString,
    object_token_object: MaybeHexString,
    new_uri: String
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_ADDRESS}::studio::decompose_object`,
        type_arguments: [],
        arguments: [
            composable_token_object,
            object_token_object,
            new_uri
        ],
    }
    await submitTransaction(signAndSubmitTransaction, payload);
}

export async function transferNFT(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    T: string,
    token_address: string,
    new_owner_address: string,
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_ADDRESS}::studio::raw_transfer`,
        type_arguments: [T],
        arguments: [
            token_address,
            new_owner_address
        ],
    }
    await submitTransaction(signAndSubmitTransaction, payload);
}