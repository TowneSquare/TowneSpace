import { AptosClient, HexString, MaybeHexString, Types } from "aptos";
import { NODE_URL, STUDIO_ADDRESS } from "../../../constants";
import { EnsureHexStringarray } from "../helpers";

export async function get_collection(
    collection_object: MaybeHexString
): Promise<any> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `${STUDIO_ADDRESS}::core::get_collection`,
        type_arguments: [],
        arguments: [HexString.ensure(collection_object).hex()]
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
        arguments: [HexString.ensure(collection_object).hex()]
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
        arguments: [HexString.ensure(token_object).hex()]
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
        arguments: [HexString.ensure(token_object).hex()]
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
        arguments: [EnsureHexStringarray(token_object)]
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
        arguments: [HexString.ensure(composable_token_object).hex()]
    };
    const response = await client.view(payload);
    return response[0] as bigint;
}

export async function get_uri(
    token_object: MaybeHexString,
    type: string
): Promise<string> {
    const client = new AptosClient(NODE_URL);
    const payload: Types.ViewRequest = {
        function: `aptos_token_objects::token::uri`,
        type_arguments: [type],
        arguments: [HexString.ensure(token_object).hex()]
    };
    const response = await client.view(payload);
    return response[0] as string;
}

// TODO: add aptos_token view functions