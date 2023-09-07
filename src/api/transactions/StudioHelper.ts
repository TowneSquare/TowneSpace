import { AptosAccount, AptosClient, HexString, MaybeHexString, OptionalTransactionArgs, Provider, TransactionBuilderRemoteABI } from "aptos";
import { EntryFunctionPayload, TransactionPayload } from "aptos/src/generated";
import { EnsureHexStringarray } from "../Helper";

export class Studio {
    readonly provider: Provider;
    readonly code_location: MaybeHexString;

    constructor(provider: Provider, code_location: MaybeHexString) {
        this.provider = provider;
        this.code_location = code_location;
    }

    // entry functions
    createCollection(
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
        mutable_token_uri: boolean,    // this has to be enforced to `True`
        tokens_burnable_by_creator: boolean,
        tokens_freezable_by_creator: boolean,  // sets whether a creator can freeze transfer for a token
        royalty_numerator: bigint,
        royalty_denominator: bigint,
        seed: bigint[] // vector<u8>; used when auid is disabled.
    ): TransactionPayload {
        return this.buildTransactionPayload(
            "studio", 
            "create_token_collection", 
            [], 
            [
                description,
                max_supply.toString(10),
                name,
                symbol,
                uri,
                mutable_description,
                mutable_royalty,
                mutable_uri,
                mutable_token_description,
                mutable_token_name,
                mutable_token_properties,
                mutable_token_uri,    // this has to be enforced to `True`
                tokens_burnable_by_creator,
                tokens_freezable_by_creator,  // sets whether a creator can freeze transfer for a token
                royalty_numerator.toString(10),
                royalty_denominator.toString(10),
                seed.toString // vector<u8>; used when auid is disabled.
            ],
        );
    }

    mintComposableNFT(
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
    ): TransactionPayload {
        return this.buildTransactionPayload(
            "studio",
            "mint_composable_token",
            [],
            [
                collection,
                description,
                name,
                uri,
                total_supply.toString(10),  // objects supply must be less or equal than token supply
                EnsureHexStringarray(object_tokens),
                property_keys,
                property_types,
                property_values,
                seed.toString // used when auid is disabled.
            ],
        );
    }

    mintObjectNFT(
        collection: String,
        description: String,
        name: String,
        uri: String,
        property_keys: String[],  // e.g: store categories
        property_types: String[],
        property_values: bigint[][],
        composable_token_object: MaybeHexString, // needed for token supply
        seed: bigint[] // used when auid is disabled.
    ): TransactionPayload {
        return this.buildTransactionPayload(
            "studio",
            "mint_object_token",
            [],
            [
                collection,
                description,
                name,
                uri,
                property_keys,
                property_types,
                property_values,
                HexString.ensure(composable_token_object).hex(), // needed for token supply
                seed.toString // used when auid is disabled.
            ],
        );
    }

    composeObject(
        composable_token_object: MaybeHexString,
        object_token_object: MaybeHexString
    ): TransactionPayload {
        return this.buildTransactionPayload(
            "studio",
            "compose_object",
            [],
            [
                HexString.ensure(composable_token_object).hex(),
                HexString.ensure(object_token_object).hex()
            ],
        );
    }

    decomposeObject(
        composable_token_object: MaybeHexString,
        object_token_object: MaybeHexString
    ): TransactionPayload {
        return this.buildTransactionPayload(
            "studio",
            "decompose_object",
            [],
            [
                HexString.ensure(composable_token_object).hex(),
                HexString.ensure(object_token_object).hex()
            ],
        );
    }

    // TODO: add transfer functions

    // view functions
    async getCollection(
        collection_object: MaybeHexString,
        ledgerVersion?: bigint
    ): Promise<any> {
        let response = await this.view(
            "core",
            "get_collection",
            [],
            [HexString.ensure(collection_object).hex()],
            ledgerVersion
        );

        return HexString.ensure(response[0].toString());
    }
    
    async getCollectionSymbol(
        collection_object: MaybeHexString,
        ledgerVersion?: bigint
    ): Promise<string> {
        let response = await this.view(
            "core",
            "get_collection_symbol",
            [],
            [HexString.ensure(collection_object).hex()],
            ledgerVersion
        );

        return response[0] as string;
    }
    
    async get_composable_token(
        token_object: MaybeHexString,
        ledgerVersion?: bigint
    ): Promise<any> {
        let response = await this.view(
            "core",
            "get_composable_token",
            [],
            [HexString.ensure(token_object).hex()],
            ledgerVersion
        );

        return HexString.ensure(response[0].toString());
    }
    
    async get_object_token(
        token_object: MaybeHexString,
        ledgerVersion?: bigint
    ): Promise<any> {
        let response = await this.view(
            "core",
            "get_object_token",
            [],
            [HexString.ensure(token_object).hex()],
            ledgerVersion
        );

        return HexString.ensure(response[0].toString());
    }
    
    // returns the list of object tokens (traits) within a composable token
    async get_object_token_vector(
        token_object: MaybeHexString[], 
        ledgerVersion?: bigint
    ): Promise<any> {
        let response = await this.view(
            "core",
            "get_object_token_vector",
            [],
            [EnsureHexStringarray(token_object)],
            ledgerVersion
        );

        return HexString.ensure(response[0].toString());
    }

    async get_supply(
        composable_token_object: MaybeHexString,
        ledgerVersion?: bigint
    ): Promise<bigint> {
        let response = await this.view(
            "core",
            "get_supply",
            [],
            [HexString.ensure(composable_token_object).hex()],
            ledgerVersion
        );

        return BigInt(response[0].toString());
    }
    
    async get_uri(
        token_object: MaybeHexString,
        type: string,
        ledgerVersion?: bigint
    ): Promise<string> {
        let response = await this.view(
            "core",
            "get_uri",
            [type],
            [HexString.ensure(token_object).hex()],
            ledgerVersion
        );

        return response[0] as string;
    }
    
    // TODO: add aptos_token view functions

    // Indexer queries
    /**
     * Gets all collections created by a given account
     * @param accountAddress
     */

    async getAllCreatedCollections(
        accountAddress: MaybeHexString
    ): Promise<CreatedCollectionsResponse> {



    async view(module: string, func: string, typeArguments: string[], args: any[], ledgerVersion?: bigint) {
        return await this.provider.view(
            {
                function: `${this.code_location}::${module}::${func}`,
                type_arguments: typeArguments,
                arguments: args,
            },
            ledgerVersion?.toString(10),
        );
    }
    
    buildTransactionPayload(module: string, func: string, type: string[], args: any[]): TransactionPayload {
        return {
            type: "entry_function_payload",
            function: `${this.code_location}::${module}::${func}`,
            type_arguments: type,
            arguments: args,
        };
    }
    
    /**
     * Submits a transaction generated from one of the above functions
     *
     * @param sender
     * @param payload
     * @param extraArgs
     */
    async submitTransaction(
        sender: AptosAccount,
        payload: EntryFunctionPayload,
        extraArgs?: OptionalTransactionArgs,
    ): Promise<string> {
        const builder = new TransactionBuilderRemoteABI(this.provider, {
            sender: sender.address(),
            ...extraArgs,
        });
        const rawTxn = await builder.build(payload.function, payload.type_arguments, payload.arguments);

        const bcsTxn = AptosClient.generateBCSTransaction(sender, rawTxn);
        const pendingTransaction = await this.provider.submitSignedBCSTransaction(bcsTxn);
        return pendingTransaction.hash;
    }
}