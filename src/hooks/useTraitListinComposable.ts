import { Aptos, InputViewFunctionData } from "@aptos-labs/ts-sdk"
import { COMPOSABLE_TOKEN, COMPOSABLE_TOKEN_TESTNET, TRAITS_FROM_COMPOSABLE } from "../constants";


const useTraitListinComposable = (aptos: Aptos) => {

    const updateTraitList = async (composableTokenAddress: string) => {
        const payload: InputViewFunctionData = {
            function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${TRAITS_FROM_COMPOSABLE}`,
            typeArguments: [],
            functionArguments: [composableTokenAddress],
        };
        const response = await aptos.view({
            payload,
        });
        console.log(response);
    };
    return updateTraitList;
};
export default useTraitListinComposable;