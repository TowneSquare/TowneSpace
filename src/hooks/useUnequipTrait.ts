import { COMPOSABLE_TOKEN_TESTNET, UNEQUIP_TRAIT, STUDIO } from "../constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const useUnequipTrait = (
    accountAddress: string,
    composableObject: string,
    traitObject: string,
    new_uri: string,
) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: accountAddress,
            data: { 
                function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${UNEQUIP_TRAIT}`,
                typeArguments: [],
                functionArguments: [ 
                    composableObject,
                    traitObject,
                    new_uri,
                ],
            }
        });
        console.log(response);
    };
    return payload;
};
export default useUnequipTrait;