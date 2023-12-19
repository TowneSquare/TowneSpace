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
import { STUDIO_MODULE } from "../utils/module-endpoints";

export class Compose {
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
