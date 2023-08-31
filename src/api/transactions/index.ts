/* used aptos-tontine as a reference*/
import { AptosClient } from "aptos";
import { U64 } from "aptos/src/generated";
import { STUDIO_MODULE_ADDRESS } from "../../constants";
import { Object, ComposableToken, ObjectToken } from "../../types";

async function submitTransaction(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    payload: any,
  ) {
    console.log("Submitting transaction", JSON.stringify(payload));
    const pendingTransaction = await signAndSubmitTransaction(payload);
    const client = new AptosClient(fullnodeUrl);
    await client.waitForTransactionWithResult(pendingTransaction.hash, {
      checkSuccess: true,
    });
  }

export async function createCollection(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    description: String,
    max_supply: U64,
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
    royalty_numerator: U64,
    royalty_denominator: U64,
    seed: U64[] // vector<u8>; used when auid is disabled.
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_MODULE_ADDRESS}::studio::create_token_collection`,
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
    await submitTransaction(signAndSubmitTransaction, fullnodeUrl, payload);
}

export async function mintComposableNFT(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    collection: String,
    description: String,
    name: String,
    uri: String,
    total_supply: U64,  // objects supply must be less or equal than token supply
    object_tokens: Object<ObjectToken>[],
    property_keys: String[],
    property_types: String[],
    property_values: U64[][],
    seed: U64[] // used when auid is disabled.
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_MODULE_ADDRESS}::studio::mint_composable_token`,
        type_arguments: [
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
    await submitTransaction(signAndSubmitTransaction, fullnodeUrl, payload);
}

export async function mintObjectNFT(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    collection: String,
    description: String,
    name: String,
    uri: String,
    property_keys: String[],  // e.g: store categories
    property_types: String[],
    property_values: U64[][],
    composable_token_object: Object<ComposableToken>, // needed for token supply
    seed: U64[] // used when auid is disabled.
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_MODULE_ADDRESS}::studio::mint_object_token`,
        type_arguments: [
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
    await submitTransaction(signAndSubmitTransaction, fullnodeUrl, payload);
}

export async function composeObject(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    composable_token_object: Object<ComposableToken>,
    object_token_object: Object<ObjectToken>
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_MODULE_ADDRESS}::studio::compose_object`,
        type_arguments: [
            composable_token_object,
            object_token_object
        ],
    }
    await submitTransaction(signAndSubmitTransaction, fullnodeUrl, payload);
}

export async function decomposeObject(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    composable_token_object: Object<ComposableToken>,
    object_token_object: Object<ObjectToken>,
    new_uri: String
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_MODULE_ADDRESS}::studio::decompose_object`,
        type_arguments: [
            composable_token_object,
            object_token_object,
            new_uri
        ],
    }
    await submitTransaction(signAndSubmitTransaction, fullnodeUrl, payload);
}

export async function transferNFT(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    fullnodeUrl: string,
    token_address: string,
    new_owner_address: string,
) {
    const payload = {
        type: "entry_function_payload",
        function: `${STUDIO_MODULE_ADDRESS}::studio::raw_transfer`,
        type_arguments: [
            token_address,
            new_owner_address
        ],
    }
    await submitTransaction(signAndSubmitTransaction, fullnodeUrl, payload);
}