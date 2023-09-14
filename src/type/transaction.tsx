import { AccountInfo, TransactionOptions } from "@aptos-labs/wallet-adapter-core";
import { Network, Types } from "aptos";

export type SubmitTransaction = <T extends Types.TransactionPayload>(transaction: T, options?: TransactionOptions) => Promise<any>;

export type TransactionContext = {
    network: Network,
    account: AccountInfo | null,
    submitTransaction: SubmitTransaction
};