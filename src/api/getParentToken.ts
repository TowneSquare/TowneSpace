import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN,
  COMPOSABLE_TOKEN_TESTNET,
  PARENTS_OBJECTS,
  TRAIT_TOKEN_TYPE,
} from '../constants';

export const getParentTokens = async (
  aptos: Aptos,
  tokenObjects: string[] | undefined
) => {
  if (!tokenObjects) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${PARENTS_OBJECTS}`,
      typeArguments: [TRAIT_TOKEN_TYPE],
      functionArguments: [tokenObjects],
    };
    const response = await aptos.view({ payload });
    return response;
  } catch (e) {
    console.log(e);
  }
};
