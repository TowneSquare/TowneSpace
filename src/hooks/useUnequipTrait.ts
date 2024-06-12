import {
  COMPOSABLE_TOKEN_TESTNET,
  UNEQUIP_TRAIT,
  COMPOSABLE_TOKEN_ENTRY,
  UNEQUIP_TRAITS,
} from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

/**
 *
 * Unequip a trait from a composable nft
 * @param accountAddress
 * @param composableObject
 * @param traitObject
 * @param new_uri
 * @returns payload
 *
 */
export const useUnequipTrait = () => {
  const unequipTrait = async (
    accountAddress: string,
    composableObject: string,
    traitObject: string,
    new_uri: string
  ) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
      const response = await signAndSubmitTransaction({
        sender: accountAddress,
        data: {
          function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN_ENTRY}::${UNEQUIP_TRAIT}`,
          typeArguments: [],
          functionArguments: [composableObject, traitObject, new_uri],
        },
      });
      console.log(response);
    };
    return payload;
  };
  return unequipTrait;
};

/**
 *
 * Unequip a list of traits from a composable nft
 * @param accountAddress
 * @param composableObject
 * @param traitObjects
 * @param new_uri
 * @returns payload
 *
 */
export const useUnequipTraits = () => {
  const unequipTraits = async (
    accountAddress: string,
    composableObject: string,
    traitObjects: string[],
    new_uri: string
  ) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
      const response = await signAndSubmitTransaction({
        sender: accountAddress,
        data: {
          function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN_ENTRY}::${UNEQUIP_TRAITS}`,
          typeArguments: [],
          functionArguments: [composableObject, traitObjects, new_uri],
        },
      });
      console.log(response);
    };
    return payload;
  };
  return unequipTraits;
};
