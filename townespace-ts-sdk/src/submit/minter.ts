/**
 */

import {
  AptosAccount,
  AptosClient,
  HexString,
  MaybeHexString,
  OptionalTransactionArgs,
  Provider,
  TransactionBuilderRemoteABI,
} from "aptos";
import { EntryFunctionPayload } from "aptos/src/generated";
import { STUDIO_MODULE, MINT_MODULE } from "../utils/module-endpoints";
import { MoveAddressType } from "@aptos-labs/ts-sdk";

export class Minter {
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

  createFixedSupplyCollection(
    description: string,
    max_supply: bigint,
    name: string,
    symbol: string,
    uri: string,
    royalty_numerator: number,
    royalty_denominator: number,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      MINT_MODULE,
      "create_fixed_supply_collection",
      [],
      [
        description,
        max_supply,
        name,
        symbol,
        uri,
        royalty_numerator,
        royalty_denominator,
        false,
        false,
      ],
    );
  }

  createUnlimitedSupplyCollection(
    description: string,
    name: string,
    symbol: string,
    uri: string,
    royalty_numerator: number,
    royalty_denominator: number,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      MINT_MODULE,
      "create_unlimited_supply_collection",
      [],
      [
        description,
        name,
        symbol,
        uri,
        royalty_numerator,
        royalty_denominator,
        false,
        false,
      ],
    );
  }

  // tokens are created and ready to be minted
  CreateBatchOfReadyToMintComposableToken(
    collection_name: string,
    number_of_tokens_to_mint: bigint,
    description: string,
    uri: string,
    base_mint_price: bigint,
    royalty_numerator: number,
    royalty_denominator: number,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      MINT_MODULE,
      "create_composable_tokens",
      [],
      [
        collection_name,
        number_of_tokens_to_mint,
        description,
        uri,
        base_mint_price,
        royalty_numerator,
        royalty_denominator,
      ],
    );
  }

  // tokens are created and ready to be minted
  createBatchOfReadyToMintTraitToken(
    collection_name: string,
    number_of_tokens_to_mint: bigint,
    description: string,
    type: string,
    uri: string,
    base_mint_price: bigint,
    royalty_numerator: number,
    royalty_denominator: number,
  ): EntryFunctionPayload {
    return this.buildTransactionPayload(
      MINT_MODULE,
      "create_trait_tokens",
      [],
      [
        collection_name,
        number_of_tokens_to_mint,
        description,
        type,
        uri,
        base_mint_price,
        royalty_numerator,
        royalty_denominator,
      ],
    );
  }

  mintToken(token_type: string, token_addr: MoveAddressType): EntryFunctionPayload {
    return this.buildTransactionPayload(
      MINT_MODULE,
      "mint_token",
      [token_type],
      [token_addr],
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
