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
  const { signAndSubmitTransaction, account } = useWallet();
  const equipTrait = async (
    composableObject: string,
    traitObject: string,
    new_uri: string
  ) => {
    if(!account) return;

    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${EQUIP_TRAIT}`,
        typeArguments: [],
        functionArguments: [composableObject, traitObject, new_uri],
      },
    });
    console.log(response);
    return response;
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
  const { signAndSubmitTransaction, account } = useWallet();
  
  const equipTraits = async (
    composableObject: string,
    traitObjects: string[],
    new_uri: string
  ) => {
    if(!account) return;

    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${EQUIP_TRAITS}`,
        typeArguments: [],
        functionArguments: [composableObject, traitObjects, new_uri],
      },
    });
    console.log(response);
    return response;
  };
  return equipTraits;
};