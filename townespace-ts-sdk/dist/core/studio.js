"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Studio = void 0;
const index_mjs_1 = require("aptos/dist/index.mjs");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const consts_mjs_1 = require("@aptos-labs/ts-sdk/dist/esm/bcs/consts.mjs");
const utils_1 = require("../utils");
// Setup the client
const APTOS_NETWORK = process.env.APTOS_NETWORK
    ? ts_sdk_1.NetworkToNetworkName[process.env.APTOS_NETWORK] || ts_sdk_1.Network.TESTNET
    : ts_sdk_1.Network.TESTNET;
const config = new ts_sdk_1.AptosConfig({ network: APTOS_NETWORK });
const aptos = new ts_sdk_1.Aptos(config);
/**
 * Class for managing aptos_token
 */
class Studio {
    async submitTransaction(account, funcName, typeArgs, args) {
        const transaction = await aptos.transaction.build.simple({
            sender: account.accountAddress,
            data: {
                function: `${utils_1.STUDIO_MODULE}::${funcName}`,
                typeArguments: typeArgs,
                functionArguments: args,
            },
        });
        const senderAuthenticator = aptos.transaction.sign({
            signer: account,
            transaction,
        });
        const pendingTxn = await aptos.transaction.submit.simple({
            transaction,
            senderAuthenticator,
        });
        return pendingTxn.hash;
    }
    /**
     * Creates a new collection with fixed supply and royalty on within the specified account
     *
     * @param creator Account where collection will be created
     * TODO: add description
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>createCollectionWithFixedSupplyAndRoyalty
    async createCollectionWithFixedSupplyAndRoyalty(creator, description, maxSupply = consts_mjs_1.MAX_U64_BIG_INT, name, symbol, uri, mutable_description, mutable_royalty, mutable_uri, mutable_token_description, mutable_token_name, mutable_token_properties, mutable_token_uri, tokens_burnable_by_creator, tokens_freezable_by_creator, royalty_numerator = consts_mjs_1.MAX_U64_BIG_INT, royalty_denominator = consts_mjs_1.MAX_U64_BIG_INT) {
        // <:!:createCollectionWithFixedSupplyAndRoyalty
        return this.submitTransaction(creator, "create_collection_with_fixed_supply_and_royalty", [], [
            description,
            maxSupply,
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
        ]);
    }
    /**
     * Creates a new collection with fixed supply and royalty off within the specified account
     *
     * @param creator Account where collection will be created
     * TODO: add description
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>createCollectionWithFixedSupplyAndNoRoyalty
    async createCollectionWithFixedSupplyAndNoRoyalty(creator, description, maxSupply = consts_mjs_1.MAX_U64_BIG_INT, name, symbol, uri, mutable_description, mutable_royalty, mutable_uri, mutable_token_description, mutable_token_name, mutable_token_properties, mutable_token_uri, tokens_burnable_by_creator, tokens_freezable_by_creator) {
        // <:!:createCollectionWithFixedSupplyAndNoRoyalty
        return this.submitTransaction(creator, "create_collection_with_fixed_supply_and_no_royalty", [], [
            description,
            maxSupply,
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
        ]);
    }
    /**
     * Creates a new collection with unlimited supply and royalty on within the specified account
     *
     * @param creator Account where collection will be created
     * TODO: add description
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>createCollectionWithUnlimitedSupplyAndRoyalty
    async createCollectionWithUnlimitedSupplyAndRoyalty(creator, description, name, symbol, uri, mutable_description, mutable_royalty, mutable_uri, mutable_token_description, mutable_token_name, mutable_token_properties, mutable_token_uri, tokens_burnable_by_creator, tokens_freezable_by_creator, royalty_numerator = consts_mjs_1.MAX_U64_BIG_INT, royalty_denominator = consts_mjs_1.MAX_U64_BIG_INT) {
        // <:!:createCollectionWithUnlimitedSupplyAndRoyalty
        return this.submitTransaction(creator, "create_collection_with_unlimited_supply_and_royalty", [], [
            description,
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
        ]);
    }
    /**
     * Creates a new collection with unlimited supply and royalty off within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createCollectionWithUnlimitedSupplyAndNoRoyalty
    async createCollectionWithUnlimitedSupplyAndNoRoyalty(creator, description, name, symbol, uri, mutable_description, mutable_royalty, mutable_uri, mutable_token_description, mutable_token_name, mutable_token_properties, mutable_token_uri, tokens_burnable_by_creator, tokens_freezable_by_creator) {
        // <:!:createCollectionWithUnlimitedSupplyAndNoRoyalty
        return this.submitTransaction(creator, "create_collection_with_unlimited_supply_and_no_royalty", [], [
            description,
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
        ]);
    }
    /**
     * Creates a named composable token with no royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createNamedComposableTokenWithNoRoyalty
    async createNamedComposableTokenWithNoRoyalty(creator, collectionName, description, name, uri, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createNamedComposableWithNoRoyalty
        return this.submitTransaction(creator, "create_named_composable_token_with_no_royalty", [], [
            collectionName,
            description,
            name,
            uri,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates a named composable token with royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createNamedComposableTokenWithRoyalty
    async createNamedComposableTokenWithRoyalty(creator, collectionName, description, name, uri, royaltyNumerator = consts_mjs_1.MAX_U64_BIG_INT, royaltyDenominator = consts_mjs_1.MAX_U64_BIG_INT, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createNamedComposableWithRoyalty
        return this.submitTransaction(creator, "create_named_composable_token_with_royalty", [], [
            collectionName,
            description,
            name,
            uri,
            royaltyNumerator,
            royaltyDenominator,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates an indexed composable token with royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createIndexedComposableTokenWithRoyalty
    async createIndexedComposableTokenWithRoyalty(creator, collectionName, description, uri, royaltyNumerator = consts_mjs_1.MAX_U64_BIG_INT, royaltyDenominator = consts_mjs_1.MAX_U64_BIG_INT, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createIndexedComposableWithRoyalty
        return this.submitTransaction(creator, "create_indexed_composable_token_with_royalty", [], [
            collectionName,
            description,
            uri,
            royaltyNumerator,
            royaltyDenominator,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates an indexed composable token with no royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createIndexedComposableTokenWithNoRoyalty
    async createIndexedComposableTokenWithNoRoyalty(creator, collectionName, description, uri, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createIndexedComposableWithNoRoyalty
        return this.submitTransaction(creator, "create_indexed_composable_token_with_no_royalty", [], [
            collectionName,
            description,
            uri,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates a named trait token with no royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createNamedTraitTokenWithNoRoyalty
    async createNamedTraitTokenWithNoRoyalty(creator, collectionName, description, name, uri, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createNamedTraitWithNoRoyalty
        return this.submitTransaction(creator, "create_named_trait_token_with_no_royalty", [], [
            collectionName,
            description,
            name,
            uri,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates a named trait token with royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createNamedTraitTokenWithRoyalty
    async createNamedTraitTokenWithRoyalty(creator, collectionName, description, name, uri, royaltyNumerator = consts_mjs_1.MAX_U64_BIG_INT, royaltyDenominator = consts_mjs_1.MAX_U64_BIG_INT, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createNamedTraitWithRoyalty
        return this.submitTransaction(creator, "create_named_trait_token_with_royalty", [], [
            collectionName,
            description,
            name,
            uri,
            royaltyNumerator,
            royaltyDenominator,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates an indexed trait token with royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>createIndexedTraitTokenWithRoyalty
    async createIndexedTraitTokenWithRoyalty(creator, collectionName, description, uri, royaltyNumerator = consts_mjs_1.MAX_U64_BIG_INT, royaltyDenominator = consts_mjs_1.MAX_U64_BIG_INT, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createIndexedTraitWithRoyalty
        return this.submitTransaction(creator, "create_indexed_trait_token_with_royalty", [], [
            collectionName,
            description,
            uri,
            royaltyNumerator,
            royaltyDenominator,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Creates an indexed trait token with no royalty within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>createIndexedTraitTokenWithNoRoyalty
    async createIndexedTraitTokenWithNoRoyalty(creator, collectionName, description, uri, propertyKeys = [], propertyTypes = [], propertyValues = []) {
        // <:!:createIndexedTraitWithNoRoyalty
        return this.submitTransaction(creator, "create_indexed_trait_token_with_no_royalty", [], [
            collectionName,
            description,
            uri,
            propertyKeys,
            propertyTypes,
            (0, index_mjs_1.getPropertyValueRaw)(propertyValues, propertyTypes),
        ]);
    }
    /**
     * Burn a token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>burnToken
    async burnToken(creator, tokenObject, tokenType) {
        // <:!:burnToken
        return this.submitTransaction(creator, "burn_token", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenObject]);
    }
    /**
     * Freeze transfer of a token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>freezeTransfer
    async freezeTransfer(creator, tokenObject, tokenType) {
        // <:!:freezeToken
        return this.submitTransaction(creator, "freeze_transfer", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenObject]);
    }
    /**
     * Unfreeze transfer of a token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>unfreezeTransfer
    async unfreezeTransfer(creator, tokenObject, tokenType) {
        // <:!:unfreezeToken
        return this.submitTransaction(creator, "unfreeze_transfer", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenObject]);
    }
    /**
     * Equip trait to a composable within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>equipTrait
    async equipTrait(creator, composableObject, traitObject, new_uri) {
        // <:!:equipTrait
        return this.submitTransaction(creator, "equip_trait", [], [composableObject, traitObject, new_uri]);
    }
    /**
     * Unequip trait to a composable within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>unequipTrait
    async unequipTrait(creator, composableObject, traitObject, new_uri) {
        // <:!:unequipTrait
        return this.submitTransaction(creator, "unequip_trait", [], [composableObject, traitObject, new_uri]);
    }
    /**
     * Equip fungible asset to a trait or composable within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>equipFungibleAsset
    async equipFungibleAsset(creator, fungibleAssetType, fungibleAsset, tokenObject, tokenType, amount = consts_mjs_1.MAX_U64_BIG_INT) {
        // <:!:equipFungibleAsset
        return this.submitTransaction(creator, "equip_fungible_asset", [fungibleAssetType, tokenType || utils_1.ComposableType || utils_1.TraitType], [fungibleAsset, tokenObject, amount]);
    }
    /**
     * Unequip fungible asset to a trait or composable within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>unequipFungibleAsset
    async unequipFungibleAsset(creator, fungibleAssetType, fungibleAsset, tokenObject, tokenType, amount = consts_mjs_1.MAX_U64_BIG_INT) {
        // <:!:unequipFungibleAsset
        return this.submitTransaction(creator, "unequip_fungible_asset", [fungibleAssetType, tokenType || utils_1.ComposableType || utils_1.TraitType], [fungibleAsset, tokenObject, amount]);
    }
    /**
     * Decompose an entire composable token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>decomposeEntireComposableToken
    async decomposeEntireComposableToken(creator, composableObject, new_uri, tokenType) {
        // <:!:decomposeEntireComposableToken
        return this.submitTransaction(creator, "decompose_entire_composable_token", [tokenType || utils_1.ComposableType], [composableObject, new_uri]);
    }
    /**
     * Transfer a digital asset within the specified account to another account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>transferDigitalAsset
    async transferDigitalAsset(creator, tokenAddress, recipient, tokenType) {
        // <:!:transferDigitalAsset
        return this.submitTransaction(creator, "transfer_digital_asset", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenAddress, recipient]);
    }
    /**
     * Transfer a fungible asset within the specified account to another account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>transferFungibleAsset
    async transferFungibleAsset(creator, fungibleAssetType, fungibleAssetObject, recipient, amount = consts_mjs_1.MAX_U64_BIG_INT) {
        // <:!:transferFungibleAsset
        return this.submitTransaction(creator, "transfer_fungible_asset", [fungibleAssetType], [fungibleAssetObject, recipient, amount]);
    }
    /**
     * set token name of the given token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>setTokenName
    async setTokenName(creator, tokenObject, newTokenName, tokenType) {
        // <:!:setTokenName
        return this.submitTransaction(creator, "set_token_name", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenObject, newTokenName]);
    }
    /**
     * set token description of the given token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     * TODO: add description
     */
    // :!:>setTokenDescription
    async setTokenDescription(creator, tokenObject, newTokenDescription, tokenType) {
        // <:!:setTokenDescription
        return this.submitTransaction(creator, "set_token_description", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenObject, newTokenDescription]);
    }
    /**
     * set trait token uri of the given trait token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>setTraitTokenUri
    async setTraitTokenUri(creator, traitObject, newTraitTokenUri) {
        // <:!:setTraitTokenUri
        return this.submitTransaction(creator, "set_trait_token_uri", [], [traitObject, newTraitTokenUri]);
    }
    /**
     * add a property to the given token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>addPropertyToToken
    async addPropertyToToken(creator, tokenObject, propertyKey, propertyType, propertyValue, tokenType) {
        // <:!:addPropertyToToken
        return this.submitTransaction(creator, "add_property_to_token", [tokenType || utils_1.ComposableType || utils_1.TraitType], [
            tokenObject,
            propertyKey,
            utils_1.PropertyTypeMap[propertyType],
            (0, index_mjs_1.getSinglePropertyValueRaw)(propertyValue, utils_1.PropertyTypeMap[propertyType]),
        ]);
    }
    /**
     * add a typed property to the given token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>addTypedPropertyToToken
    async addTypedPropertyToToken(creator, tokenObject, propertyKey, propertyType, propertyValue, tokenType) {
        // <:!:addTypedPropertyToToken
        return this.submitTransaction(creator, "add_typed_property_to_token", [tokenType || utils_1.ComposableType || utils_1.TraitType, utils_1.PropertyTypeMap[propertyType]], [tokenObject, propertyKey, utils_1.PropertyTypeMap[propertyType], propertyValue]);
    }
    /**
     * update a property from the given token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>updatePropertyFromToken
    async updatePropertyFromToken(creator, tokenObject, propertyKey, propertyType, propertyValue, tokenType) {
        // <:!:updatePropertyFromToken
        return this.submitTransaction(creator, "update_property_from_token", [tokenType || utils_1.ComposableType || utils_1.TraitType], [
            tokenObject,
            propertyKey,
            utils_1.PropertyTypeMap[propertyType],
            (0, index_mjs_1.getSinglePropertyValueRaw)(propertyValue, utils_1.PropertyTypeMap[propertyType]),
        ]);
    }
    /**
     * remove a typed property from the given token within the specified account
     *
     * @param creator Account where collection will be created
     *
     * @returns The hash of the transaction submitted to the API
     */
    // :!:>removePropertyFromToken
    async removePropertyFromToken(creator, tokenObject, propertyKey, tokenType) {
        // <:!:removePropertyFromToken
        return this.submitTransaction(creator, "remove_property_from_token", [tokenType || utils_1.ComposableType || utils_1.TraitType], [tokenObject, propertyKey]);
    }
}
exports.Studio = Studio;
