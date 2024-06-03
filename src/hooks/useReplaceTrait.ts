import { COMPOSABLE_TOKEN_TESTNET, REPLACE_TRAITS, STUDIO } from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

/**
 * 
 * Remove a list of traits and equip a list of traits to a composable nft
 * @param accountAddress
 * @param composableObject
 * @param traitObjectsToRemove
 * @param traitObjectsToAdd
 * @param new_uri
 * @returns equipTraits
 * 
 */
export const useReplaceTraits = () => {
    const { signAndSubmitTransaction, account } = useWallet();
    const replaceTraits = async (
        composableObject: string,
        traitObjectsToRemove: string[],
        traitObjectsToAdd: string[],
        new_uri: string
    ) => {
        if(!account) return;

        const response = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${REPLACE_TRAITS}`,
                typeArguments: [],
                functionArguments: [composableObject, traitObjectsToRemove, traitObjectsToAdd, new_uri],
            },
        });
        console.log(response);
        return response;
    };
    return replaceTraits;
}