/**
 */

import {
  AptosAccount,
  AptosClient,
  HexString,
  MaybeHexString,
  OptionalTransactionArgs,
  Provider,
  TransactionBuilderRemoteABI
} from "aptos";
import { EntryFunctionPayload } from "aptos/src/generated";
import { STUDIO_MODULE } from "../utils/module-endpoints";
import { MoveAddressType } from "@aptos-labs/ts-sdk";

export class Studio {
  readonly provider: Provider;
  readonly code_location: HexString;

  constructor(provider: Provider, code_location: MaybeHexString) {
    this.provider = provider;
    this.code_location = HexString.ensure(code_location);
  }

  buildTransactionPayload(
    module: string,
    func: string,
    type: string[],
    args: any[],
  ): EntryFunctionPayload {
    return {
      function: `${this.code_location}::${module}::${func}`,
      type_arguments: type,
      arguments: args,
    };
  }

  burnComposableToken(token_object: MaybeHexString): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "burn_composable_token",
      [],
      [token_object],
    );
  }

  burnTraitToken(token_object: MaybeHexString): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "burn_trait_token",
      [],
      [token_object],
    );
  }

  equipTrait(
    composable_object: MaybeHexString,
    trait_object: MaybeHexString,
    trait_type: string,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "equip_trait",
      [],
      [composable_object, trait_object, trait_type],
    );
  }

  unequipTrait(
    composable_object: MaybeHexString,
    trait_object: MaybeHexString,
    trait_type: string,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "unequip_trait",
      [],
      [composable_object, trait_object, trait_type],
    );
  }

  decomposeEntireToken(
    composable_object: MaybeHexString,
    new_uri: string,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "decompose_entire_token",
      [],
      [composable_object, new_uri],
    );
  }

  

  // tokens are created but not ready to be minted
  CreateComposableToken(
    collection_name: string,
    description: string,
    uri: string,
    base_mint_price: bigint,
    traits: MaybeHexString[],
    royalty_numerator: number,
    royalty_denominator: number,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "create_composable_token",
      [],
      [
        collection_name,
        description,
        uri,
        base_mint_price,
        traits,
        royalty_numerator,
        royalty_denominator,
      ],
    );
  }

  

  // tokens are created but not ready to be minted
  createTraitToken(
    collection_name: string,
    description: string,
    type: string,
    uri: string,
    base_mint_price: bigint,
    royalty_numerator: number,
    royalty_denominator: number,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "create_trait_token",
      [],
      [
        collection_name,
        description,
        type,
        uri,
        base_mint_price,
        royalty_numerator,
        royalty_denominator,
      ],
    );
  }

  transferDigitalAsset(
    type: string, // type of the digital asset
    token_address: MoveAddressType,
    recipient_address: MoveAddressType,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "transfer_digital_asset",
      [type],
      [token_address, recipient_address],
    );
  }

  // works with digital asset being the recipient as well
  transferFungibleAsset(
    fa_type: string, // type of the fungible asset
    recipient_address: MoveAddressType,
    fa: MaybeHexString,
    amount: bigint,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "transfer_fungible_asset",
      [fa_type],
      [recipient_address, fa, amount],
    );
  }

  setTokenName(
    token_object_addr: MoveAddressType,
    new_name: string,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      STUDIO_MODULE,
      "set_token_name",
      [],
      [token_object_addr, new_name],
    );
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
    const rawTxn = await builder.build(
      payload.function,
      payload.type_arguments,
      payload.arguments,
    );

    const bcsTxn = AptosClient.generateBCSTransaction(sender, rawTxn);
    const pendingTransaction =
      await this.provider.submitSignedBCSTransaction(bcsTxn);
    return pendingTransaction.hash;
  }
}
