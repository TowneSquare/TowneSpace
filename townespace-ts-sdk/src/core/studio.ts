/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

import {
  getPropertyValueRaw,
  getSinglePropertyValueRaw,
} from "aptos/dist/index.mjs";
import {
  Account,
  AnyNumber,
  InputGenerateTransactionOptions,
  MoveObjectType,
  MoveAddressType,
  Network,
  NetworkToNetworkName,
  AptosConfig,
  Aptos,
} from "@aptos-labs/ts-sdk";
import { MAX_U64_BIG_INT } from "@aptos-labs/ts-sdk/dist/esm/bcs/consts.mjs";
import {
  STUDIO_MODULE,
  PropertyType,
  PropertyTypeMap,
  ComposableType,
  TraitType,
} from "../utils";

export type FungibleTokenParameters = {
  owner: Account;
  tokenAddress: MoveAddressType;
  recipient: MoveAddressType;
  amount: number | bigint;
  extraArgs?: InputGenerateTransactionOptions;
};

export type NonFungibleTokenParameters = {
  owner: Account;
  tokenAddress: MoveAddressType;
  recipient: MoveAddressType;
  tokenType?: string;
  extraArgs?: InputGenerateTransactionOptions;
};

// Setup the client
const APTOS_NETWORK: Network = process.env.APTOS_NETWORK
  ? NetworkToNetworkName[process.env.APTOS_NETWORK] || Network.TESTNET
  : Network.TESTNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

/**
 * Class for managing aptos_token
 */
export class Studio {
  private async submitTransaction(
    account: Account,
    funcName: string,
    typeArgs: string[],
    args: any[],
  ) {
    const transaction = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${STUDIO_MODULE}::${funcName}`,
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
  async createCollectionWithFixedSupplyAndRoyalty(
    creator: Account,
    description: string,
    maxSupply: AnyNumber = MAX_U64_BIG_INT,
    name: string,
    symbol: string,
    uri: string,
    mutable_description: boolean,
    mutable_royalty: boolean,
    mutable_uri: boolean,
    mutable_token_description: boolean,
    mutable_token_name: boolean,
    mutable_token_properties: boolean,
    mutable_token_uri: boolean,
    tokens_burnable_by_creator: boolean,
    tokens_freezable_by_creator: boolean,
    royalty_numerator: AnyNumber = MAX_U64_BIG_INT,
    royalty_denominator: AnyNumber = MAX_U64_BIG_INT,
  ): Promise<string> {
    // <:!:createCollectionWithFixedSupplyAndRoyalty
    return this.submitTransaction(
      creator,
      "create_collection_with_fixed_supply_and_royalty",
      [],
      [
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
      ],
    );
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
  async createCollectionWithFixedSupplyAndNoRoyalty(
    creator: Account,
    description: string,
    maxSupply: AnyNumber = MAX_U64_BIG_INT,
    name: string,
    symbol: string,
    uri: string,
    mutable_description: boolean,
    mutable_royalty: boolean,
    mutable_uri: boolean,
    mutable_token_description: boolean,
    mutable_token_name: boolean,
    mutable_token_properties: boolean,
    mutable_token_uri: boolean,
    tokens_burnable_by_creator: boolean,
    tokens_freezable_by_creator: boolean,
  ): Promise<string> {
    // <:!:createCollectionWithFixedSupplyAndNoRoyalty
    return this.submitTransaction(
      creator,
      "create_collection_with_fixed_supply_and_no_royalty",
      [],
      [
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
      ],
    );
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
  async createCollectionWithUnlimitedSupplyAndRoyalty(
    creator: Account,
    description: string,
    name: string,
    symbol: string,
    uri: string,
    mutable_description: boolean,
    mutable_royalty: boolean,
    mutable_uri: boolean,
    mutable_token_description: boolean,
    mutable_token_name: boolean,
    mutable_token_properties: boolean,
    mutable_token_uri: boolean,
    tokens_burnable_by_creator: boolean,
    tokens_freezable_by_creator: boolean,
    royalty_numerator: AnyNumber = MAX_U64_BIG_INT,
    royalty_denominator: AnyNumber = MAX_U64_BIG_INT,
  ): Promise<string> {
    // <:!:createCollectionWithUnlimitedSupplyAndRoyalty
    return this.submitTransaction(
      creator,
      "create_collection_with_unlimited_supply_and_royalty",
      [],
      [
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
      ],
    );
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
  async createCollectionWithUnlimitedSupplyAndNoRoyalty(
    creator: Account,
    description: string,
    name: string,
    symbol: string,
    uri: string,
    mutable_description: boolean,
    mutable_royalty: boolean,
    mutable_uri: boolean,
    mutable_token_description: boolean,
    mutable_token_name: boolean,
    mutable_token_properties: boolean,
    mutable_token_uri: boolean,
    tokens_burnable_by_creator: boolean,
    tokens_freezable_by_creator: boolean,
  ): Promise<string> {
    // <:!:createCollectionWithUnlimitedSupplyAndNoRoyalty
    return this.submitTransaction(
      creator,
      "create_collection_with_unlimited_supply_and_no_royalty",
      [],
      [
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
      ],
    );
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
  async createNamedComposableTokenWithNoRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    name: string,
    uri: string,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createNamedComposableWithNoRoyalty
    return this.submitTransaction(
      creator,
      "create_named_composable_token_with_no_royalty",
      [],
      [
        collectionName,
        description,
        name,
        uri,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createNamedComposableTokenWithRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    name: string,
    uri: string,
    royaltyNumerator: AnyNumber = MAX_U64_BIG_INT,
    royaltyDenominator: AnyNumber = MAX_U64_BIG_INT,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createNamedComposableWithRoyalty
    return this.submitTransaction(
      creator,
      "create_named_composable_token_with_royalty",
      [],
      [
        collectionName,
        description,
        name,
        uri,
        royaltyNumerator,
        royaltyDenominator,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createIndexedComposableTokenWithRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    uri: string,
    royaltyNumerator: AnyNumber = MAX_U64_BIG_INT,
    royaltyDenominator: AnyNumber = MAX_U64_BIG_INT,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createIndexedComposableWithRoyalty
    return this.submitTransaction(
      creator,
      "create_indexed_composable_token_with_royalty",
      [],
      [
        collectionName,
        description,
        uri,
        royaltyNumerator,
        royaltyDenominator,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createIndexedComposableTokenWithNoRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    uri: string,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createIndexedComposableWithNoRoyalty
    return this.submitTransaction(
      creator,
      "create_indexed_composable_token_with_no_royalty",
      [],
      [
        collectionName,
        description,
        uri,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createNamedTraitTokenWithNoRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    name: string,
    uri: string,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createNamedTraitWithNoRoyalty
    return this.submitTransaction(
      creator,
      "create_named_trait_token_with_no_royalty",
      [],
      [
        collectionName,
        description,
        name,
        uri,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createNamedTraitTokenWithRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    name: string,
    uri: string,
    royaltyNumerator: AnyNumber = MAX_U64_BIG_INT,
    royaltyDenominator: AnyNumber = MAX_U64_BIG_INT,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createNamedTraitWithRoyalty
    return this.submitTransaction(
      creator,
      "create_named_trait_token_with_royalty",
      [],
      [
        collectionName,
        description,
        name,
        uri,
        royaltyNumerator,
        royaltyDenominator,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createIndexedTraitTokenWithRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    uri: string,
    royaltyNumerator: AnyNumber = MAX_U64_BIG_INT,
    royaltyDenominator: AnyNumber = MAX_U64_BIG_INT,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createIndexedTraitWithRoyalty
    return this.submitTransaction(
      creator,
      "create_indexed_trait_token_with_royalty",
      [],
      [
        collectionName,
        description,
        uri,
        royaltyNumerator,
        royaltyDenominator,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async createIndexedTraitTokenWithNoRoyalty(
    creator: Account,
    collectionName: string,
    description: string,
    uri: string,
    propertyKeys: Array<string> = [],
    propertyTypes: Array<string> = [],
    propertyValues: Array<string> = [],
  ): Promise<string> {
    // <:!:createIndexedTraitWithNoRoyalty
    return this.submitTransaction(
      creator,
      "create_indexed_trait_token_with_no_royalty",
      [],
      [
        collectionName,
        description,
        uri,
        propertyKeys,
        propertyTypes,
        getPropertyValueRaw(propertyValues, propertyTypes),
      ],
    );
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
  async burnToken(
    creator: Account,
    tokenObject: MoveObjectType,
    tokenType?: string,
  ): Promise<string> {
    // <:!:burnToken
    return this.submitTransaction(
      creator,
      "burn_token",
      [tokenType || ComposableType || TraitType],
      [tokenObject],
    );
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
  async freezeTransfer(
    creator: Account,
    tokenObject: MoveObjectType,
    tokenType?: string,
  ): Promise<string> {
    // <:!:freezeToken
    return this.submitTransaction(
      creator,
      "freeze_transfer",
      [tokenType || ComposableType || TraitType],
      [tokenObject],
    );
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
  async unfreezeTransfer(
    creator: Account,
    tokenObject: MoveObjectType,
    tokenType?: string,
  ): Promise<string> {
    // <:!:unfreezeToken
    return this.submitTransaction(
      creator,
      "unfreeze_transfer",
      [tokenType || ComposableType || TraitType],
      [tokenObject],
    );
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
  async equipTrait(
    creator: Account,
    composableObject: MoveObjectType,
    traitObject: MoveObjectType,
    new_uri: string,
  ): Promise<string> {
    // <:!:equipTrait
    return this.submitTransaction(
      creator,
      "equip_trait",
      [],
      [composableObject, traitObject, new_uri],
    );
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
  async unequipTrait(
    creator: Account,
    composableObject: MoveObjectType,
    traitObject: MoveObjectType,
    new_uri: string,
  ): Promise<string> {
    // <:!:unequipTrait
    return this.submitTransaction(
      creator,
      "unequip_trait",
      [],
      [composableObject, traitObject, new_uri],
    );
  }

  /**
   * Equip fungible asset to a trait or composable within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>equipFungibleAsset
  async equipFungibleAsset(
    creator: Account,
    fungibleAssetType: string,
    fungibleAsset: MoveObjectType,
    tokenObject: MoveObjectType,
    tokenType?: string,
    amount: AnyNumber = MAX_U64_BIG_INT,
  ): Promise<string> {
    // <:!:equipFungibleAsset
    return this.submitTransaction(
      creator,
      "equip_fungible_asset",
      [fungibleAssetType, tokenType || ComposableType || TraitType],
      [fungibleAsset, tokenObject, amount],
    );
  }

  /**
   * Unequip fungible asset to a trait or composable within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>unequipFungibleAsset
  async unequipFungibleAsset(
    creator: Account,
    fungibleAssetType: string,
    fungibleAsset: MoveObjectType,
    tokenObject: MoveObjectType,
    tokenType?: string,
    amount: AnyNumber = MAX_U64_BIG_INT,
  ): Promise<string> {
    // <:!:unequipFungibleAsset
    return this.submitTransaction(
      creator,
      "unequip_fungible_asset",
      [fungibleAssetType, tokenType || ComposableType || TraitType],
      [fungibleAsset, tokenObject, amount],
    );
  }

  /**
   * Decompose an entire composable token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>decomposeEntireComposableToken
  async decomposeEntireComposableToken(
    creator: Account,
    composableObject: MoveObjectType,
    new_uri: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:decomposeEntireComposableToken
    return this.submitTransaction(
      creator,
      "decompose_entire_composable_token",
      [tokenType || ComposableType],
      [composableObject, new_uri],
    );
  }

  /**
   * Transfer a digital asset within the specified account to another account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>transferDigitalAsset
  async transferDigitalAsset(
    creator: Account,
    tokenAddress: MoveAddressType,
    recipient: MoveAddressType,
    tokenType?: string,
  ): Promise<string> {
    // <:!:transferDigitalAsset
    return this.submitTransaction(
      creator,
      "transfer_digital_asset",
      [tokenType || ComposableType || TraitType],
      [tokenAddress, recipient],
    );
  }

  /**
   * Transfer a fungible asset within the specified account to another account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>transferFungibleAsset
  async transferFungibleAsset(
    creator: Account,
    fungibleAssetType: string,
    fungibleAssetObject: MoveObjectType,
    recipient: MoveAddressType,
    amount: AnyNumber = MAX_U64_BIG_INT,
  ): Promise<string> {
    // <:!:transferFungibleAsset
    return this.submitTransaction(
      creator,
      "transfer_fungible_asset",
      [fungibleAssetType],
      [fungibleAssetObject, recipient, amount],
    );
  }

  /**
   * set token name of the given token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>setTokenName
  async setTokenName(
    creator: Account,
    tokenObject: MoveObjectType,
    newTokenName: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:setTokenName
    return this.submitTransaction(
      creator,
      "set_token_name",
      [tokenType || ComposableType || TraitType],
      [tokenObject, newTokenName],
    );
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
  async setTokenDescription(
    creator: Account,
    tokenObject: MoveObjectType,
    newTokenDescription: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:setTokenDescription
    return this.submitTransaction(
      creator,
      "set_token_description",
      [tokenType || ComposableType || TraitType],
      [tokenObject, newTokenDescription],
    );
  }

  /**
   * set trait token uri of the given trait token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>setTraitTokenUri
  async setTraitTokenUri(
    creator: Account,
    traitObject: MoveObjectType,
    newTraitTokenUri: string,
  ): Promise<string> {
    // <:!:setTraitTokenUri
    return this.submitTransaction(
      creator,
      "set_trait_token_uri",
      [],
      [traitObject, newTraitTokenUri],
    );
  }

  /**
   * add a property to the given token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>addPropertyToToken
  async addPropertyToToken(
    creator: Account,
    tokenObject: MoveObjectType,
    propertyKey: string,
    propertyType: PropertyType,
    propertyValue: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:addPropertyToToken
    return this.submitTransaction(
      creator,
      "add_property_to_token",
      [tokenType || ComposableType || TraitType],
      [
        tokenObject,
        propertyKey,
        PropertyTypeMap[propertyType],
        getSinglePropertyValueRaw(propertyValue, PropertyTypeMap[propertyType]),
      ],
    );
  }

  /**
   * add a typed property to the given token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>addTypedPropertyToToken
  async addTypedPropertyToToken(
    creator: Account,
    tokenObject: MoveObjectType,
    propertyKey: string,
    propertyType: PropertyType,
    propertyValue: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:addTypedPropertyToToken
    return this.submitTransaction(
      creator,
      "add_typed_property_to_token",
      [tokenType || ComposableType || TraitType, PropertyTypeMap[propertyType]],
      [tokenObject, propertyKey, PropertyTypeMap[propertyType], propertyValue],
    );
  }

  /**
   * update a property from the given token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>updatePropertyFromToken
  async updatePropertyFromToken(
    creator: Account,
    tokenObject: MoveObjectType,
    propertyKey: string,
    propertyType: PropertyType,
    propertyValue: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:updatePropertyFromToken
    return this.submitTransaction(
      creator,
      "update_property_from_token",
      [tokenType || ComposableType || TraitType],
      [
        tokenObject,
        propertyKey,
        PropertyTypeMap[propertyType],
        getSinglePropertyValueRaw(propertyValue, PropertyTypeMap[propertyType]),
      ],
    );
  }

  /**
   * remove a typed property from the given token within the specified account
   *
   * @param creator Account where collection will be created
   *
   * @returns The hash of the transaction submitted to the API
   */
  // :!:>removePropertyFromToken
  async removePropertyFromToken(
    creator: Account,
    tokenObject: MoveObjectType,
    propertyKey: string,
    tokenType?: string,
  ): Promise<string> {
    // <:!:removePropertyFromToken
    return this.submitTransaction(
      creator,
      "remove_property_from_token",
      [tokenType || ComposableType || TraitType],
      [tokenObject, propertyKey],
    );
  }
}
