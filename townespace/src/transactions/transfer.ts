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

export class Transfer {
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

  transferDigitalAsset(
    type: string, // type of the digital asset
    token_address: Address,
    recipient_address: Address,
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
    recipient_address: Address,
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
