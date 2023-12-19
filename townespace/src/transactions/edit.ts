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
import { Address, EntryFunctionPayload } from "aptos/src/generated";
import { STUDIO_MODULE } from "../utils/module-endpoints";

export class Edit {
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

  setTokenName(
    token_object_addr: Address,
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
