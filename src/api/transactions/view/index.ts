import { AptosClient, MaybeHexString, Types } from "aptos";
import { NODE_URL, STUDIO_ADDRESS } from "../../../constants";

export async function get_collection(
    collection_object: MaybeHexString
): Promise<any> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_collection`,
        type_arguments: [],
        arguments: [collection_object]
    };
    const response = await client.view(payload);
    return response[0] as any; 
}

export async function get_collection_symbol(
    collection_object: MaybeHexString
): Promise<string> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_collection_symbol`,
        type_arguments: [],
        arguments: [collection_object]
    };
    const response = await client.view(payload);
    return response[0] as string;
}

export async function get_composable_token(
    token_object: MaybeHexString
): Promise<any> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_composable_token`,
        type_arguments: [],
        arguments: [token_object]
    };
    const response = await client.view(payload);
    return response[0] as any;
}

export async function get_object_token(
    token_object: MaybeHexString
): Promise<any> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_object_token`,
        type_arguments: [],
        arguments: [token_object]
    };
    const response = await client.view(payload);
    return response[0] as any;
}

// returns the list of object tokens (traits) within a composable token
export async function get_object_token_vector(
    token_object: MaybeHexString[]
): Promise<any> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_object_token_vector`,
        type_arguments: [],
        arguments: [token_object]
    };
    const response = await client.view(payload);
    return response[0] as any;
}

export async function get_supply(
    composable_token_object: MaybeHexString
): Promise<bigint> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_supply`,
        type_arguments: [],
        arguments: [composable_token_object]
    };
    const response = await client.view(payload);
    return response[0] as bigint;
}

// TODO: add aptos_token view functions