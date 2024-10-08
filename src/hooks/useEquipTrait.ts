import { CommittedTransactionResponse } from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN_TESTNET,
  EQUIP_TRAIT,
  EQUIP_TRAITS,
  COMPOSABLE_TOKEN_ENTRY,
  APTOS,
  COMPOSABLE_TOKEN_MAINNET,
} from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

/**
 *
 * Equip a list of traits to a composable nft
 * @param composableObject
 * @param traitObjects
 * @param new_uri
 * @returns equipTraits
 *
 */
export const useEquipTraits = () => {
  const { signAndSubmitTransaction, account } = useWallet();

  const equipTraits = async (
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
          function: `${COMPOSABLE_TOKEN_MAINNET}::${COMPOSABLE_TOKEN_ENTRY}::${EQUIP_TRAITS}`,
          typeArguments: [],
          functionArguments: [composableObject, traitObject, new_uri],
        },
      });
    } else {
      response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${COMPOSABLE_TOKEN_MAINNET}::${COMPOSABLE_TOKEN_ENTRY}::${EQUIP_TRAIT}`,
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
  return equipTraits;
};
