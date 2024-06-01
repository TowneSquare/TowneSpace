import { COMPOSABLE_TOKEN_TESTNET, EQUIP_TRAIT, EQUIP_TRAITS, STUDIO } from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

/**
 * 
 * Equip one trait to a composable nft
 * @param accountAddress
 * @param composableObject
 * @param traitObject
 * @param new_uri
 * @returns equipTrait
 * 
 */
export const useEquipTrait = () => {
  const { signAndSubmitTransaction } = useWallet();
  const equipTrait = async (
    accountAddress: string,
    composableObject: string,
    traitObject: string,
    new_uri: string
  ) => {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${EQUIP_TRAIT}`,
        typeArguments: [],
        functionArguments: [composableObject, traitObject, new_uri],
      },
    });
    console.log(response);
  };
  return equipTrait;
};

/**
 * 
 * Equip a list of traits to a composable nft
 * @param accountAddress
 * @param composableObject
 * @param traitObjects
 * @param new_uri
 * @returns equipTraits
 * 
 */
export const useEquipTraits = () => {
  const { signAndSubmitTransaction } = useWallet();
  const equipTraits = async (
    accountAddress: string,
    composableObject: string,
    traitObjects: string[],
    new_uri: string
  ) => {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${EQUIP_TRAITS}`,
        typeArguments: [],
        functionArguments: [composableObject, traitObjects, new_uri],
      },
    });
    console.log(response);
  };
  return equipTraits;
};