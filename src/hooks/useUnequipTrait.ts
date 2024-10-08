import {
  COMPOSABLE_TOKEN_TESTNET,
  UNEQUIP_TRAIT,
  COMPOSABLE_TOKEN_ENTRY,
  UNEQUIP_TRAITS,
  COMPOSABLE_TOKEN_MAINNET,
  APTOS,
} from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { CommittedTransactionResponse } from '@aptos-labs/ts-sdk';

/**
 *
 * Unequip a list of traits from a composable nft
 * @param composableObject
 * @param traitObjects
 * @param new_uri
 * @returns transactionResponse
 *
 */
export const useUnequipTraits = () => {
  const { signAndSubmitTransaction, account } = useWallet();

  const unequipTraits = async (
    composableObject: string,
    traitObjects: string[],
    new_uri: string
  ): Promise<CommittedTransactionResponse | undefined> => {
    if (!account) return;
    if (traitObjects.length < 1) return;
    let response;
    const traitObject = traitObjects.filter((trait) => trait != undefined);
    if (traitObject.length > 1) {
      response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${COMPOSABLE_TOKEN_MAINNET}::${COMPOSABLE_TOKEN_ENTRY}::${UNEQUIP_TRAITS}`,
          typeArguments: [],
          functionArguments: [composableObject, traitObject, new_uri],
        },
      });
    } else {
      response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${COMPOSABLE_TOKEN_MAINNET}::${COMPOSABLE_TOKEN_ENTRY}::${UNEQUIP_TRAIT}`,
          typeArguments: [],
          functionArguments: [composableObject, traitObject[0], new_uri],
        },
      });
    }

    const txnResponse = await APTOS.waitForTransaction({
      transactionHash: response?.hash,
    });
    return txnResponse;
  };
  return unequipTraits;
};
