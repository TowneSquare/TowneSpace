import { AptosClient, HexString, MaybeHexString, Network, Types } from "aptos";
import { NODE_URL } from "../constants";
import { DEVNET_PROVIDER, MAINNET_PROVIDER, TESTNET_PROVIDER } from "../type/network";
import { TransactionContext } from "../type/transaction";
import { ViewRequest } from "aptos/src/generated";

// networks
export const getProvider = (network: Network) => {
  if (network === Network.MAINNET) {
    return MAINNET_PROVIDER;
  } else if (network === Network.TESTNET) {
      return TESTNET_PROVIDER;
  } else if (network === Network.DEVNET) {
      return DEVNET_PROVIDER
  }
  throw new Error("Network not supported.")
}

// transactions: entry/view functions
export async function submitTransaction(
  signAndSubmitTransaction: (txn: any) => Promise<any>,
  payload: any
) {
  console.log("Submitting transaction", JSON.stringify(payload));
  const pendingTransaction = await signAndSubmitTransaction(payload);
  const client = new AptosClient(NODE_URL);    // hardcoded to devnet for now
  await client.waitForTransactionWithResult(pendingTransaction.hash, {
    checkSuccess: true,
  });
}

export const runTransaction = async <T extends Types.TransactionPayload>(txnContext: TransactionContext, payload: T) => {
  try {
      const provider = getProvider(txnContext.network);
      const response = await txnContext.submitTransaction(payload);
      await provider.aptosClient.waitForTransaction(response.hash);
      let txn = await provider.aptosClient.getTransactionByHash(response.hash) as any;
      return txn;
  } catch (error: any) {
      console.log("Failed to wait for txn" + error)
  }

  return undefined;
}

export const runViewFunction = async (txnContext: TransactionContext, payload: ViewRequest) => {
  try {
      const provider = getProvider(txnContext.network);
      return await provider.aptosClient.view(payload);
  } catch (error: any) {
      console.log("Failed to wait for txn" + error)
  }

  return undefined;
}

// setters
export const onStringChange = async (event: React.ChangeEvent<HTMLInputElement>, setter: (value: (((prevState: string) => string) | string)) => void): Promise<string> => {
  const val = event.target.value;
  setter(val);
  return val;
}

export const onNumberChange = async (event: React.ChangeEvent<HTMLInputElement>, setter: (value: (((prevState: number) => number) | number)) => void) => {
  const val = event.target.value;
  setter(Number(val));
}

export const onBigIntChange = async (event: React.ChangeEvent<HTMLInputElement>, setter: (value: (((prevState: bigint) => bigint) | bigint)) => void) => {
  const val = event.target.value;
  setter(BigInt(val));
}

// assertions
export const ensureImageUri = async (uri: string) => {
  // Empty means something's wrong anyways
  if (!uri) {
      return uri
  }
  try {
      if (!uri.endsWith(".jpg") && !uri.endsWith(".jpeg") && !uri.endsWith(".png") && !uri.endsWith(".svg")) {
          uri = ensureHttps(uri);
          let response = await fetch(uri);
          const data = await response.json()
          if (data.image) {
              uri = ensureHttps(data.image);
          }
      }
  } catch (error: any) {
      // Let the URI stay as the old one for now
  }
  return uri
}

export const ensureHttps = (uri: string): string => {
  if (uri.startsWith("ipfs://")) {
      uri = uri.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
  }
  return uri
}

export function EnsureHexStringarray(
  hexStrings: MaybeHexString[]
) {
  for (let i = 0; i < hexStrings.length; i++) {
      hexStrings[i] = HexString.ensure(hexStrings[i]).hex();
  }
}