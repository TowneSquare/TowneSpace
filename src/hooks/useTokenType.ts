import { Aptos, InputViewFunctionData } from "@aptos-labs/ts-sdk"
import { COMPOSABLE_TOKEN_TYPE , TRAIT_TOKEN_TYPE} from "../constants";


export const useTraitType = async (aptos: Aptos, tokenObject: string) => {
    const payload: InputViewFunctionData = {
        function: `0x4::token::description`,
        typeArguments: [TRAIT_TOKEN_TYPE],
        functionArguments: [tokenObject],
    };
    const response = await aptos.view({
        payload,
    });
    console.log(response);
};

export const useComposableType = async (aptos: Aptos, tokenObject: string) => {
    const payload: InputViewFunctionData = {
        function: `0x4::token::description`,
        typeArguments: [COMPOSABLE_TOKEN_TYPE],
        functionArguments: [tokenObject],
    };
    const response = await aptos.view({
        payload,
    });
    console.log(response);
};