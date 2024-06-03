import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import { COMPOSABLE_TOKEN, COMPOSABLE_TOKEN_TESTNET, PARENT_TOKEN_OBJECT, PARENTS_TOKENS_OBJECTS, TRAIT_TOKEN_TYPE } from '../constants';

/**
 *
 * Get the parent of the inputed trait token
 * @param aptos
 * @param tokenObject
 *
 */
export const useParentToken = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${PARENT_TOKEN_OBJECT}`,
      typeArguments: [TRAIT_TOKEN_TYPE],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 
 * Get the parents of the inputed trait tokens
 * @param aptos
 * @param tokenObjects
 * 
 */
export const useParentTokens = async (
  aptos: Aptos,
  tokenObjects: string[] | undefined
) => {
    if (!tokenObjects) return;
    try {
        const payload: InputViewFunctionData = {
            function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${PARENTS_TOKENS_OBJECTS}`,
            typeArguments: [TRAIT_TOKEN_TYPE],
            functionArguments: tokenObjects,
        };
        const response = await aptos.view({payload});
        return response;
    } catch (e) {
        console.log(e);
    }
}