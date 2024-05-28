import { COMPOSABLE_TOKEN_TESTNET, DECOMPOSE_ENTIRE_COMPOSABLE_TOKEN, STUDIO } from "../constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const useDecomposeEntireComposableToken = (
    accountAddress: string,
    composableObject: string,
    new_uri: string,
) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: accountAddress,
            data: { 
                function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${DECOMPOSE_ENTIRE_COMPOSABLE_TOKEN}`,
                typeArguments: [],
                functionArguments: [ 
                    composableObject,
                    new_uri,
                ],
            }
        });
        console.log(response);
    };
    return payload;
};
export default useDecomposeEntireComposableToken;