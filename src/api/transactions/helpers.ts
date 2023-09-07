import { AptosClient, HexString, MaybeHexString } from "aptos";
import { NODE_URL } from "../../constants";

export async function submitTransaction(
    signAndSubmitTransaction: (txn: any) => Promise<any>,
    
    payload: any,
  ) {
    console.log("Submitting transaction", JSON.stringify(payload));
    const pendingTransaction = await signAndSubmitTransaction(payload);
    const client = new AptosClient(NODE_URL);    // hardcoded to devnet for now
    await client.waitForTransactionWithResult(pendingTransaction.hash, {
      checkSuccess: true,
    });
  }

export function EnsureHexStringarray(
    hexStrings: MaybeHexString[]
) {
    for (let i = 0; i < hexStrings.length; i++) {
        hexStrings[i] = HexString.ensure(hexStrings[i]).hex();
    }
}