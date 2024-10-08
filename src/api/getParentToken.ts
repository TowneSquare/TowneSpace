import { COMPOSABLE_TOKEN_MAINNET, TRAIT_TOKEN_TYPE_MAINNET } from './../constants';
import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN,
  COMPOSABLE_TOKEN_TESTNET,
  PARENTS_OBJECTS,
  TRAIT_TOKEN_TYPE_TESTNET,
} from '../constants';

export const getParentTokens = async (
  aptos: Aptos,
  tokenObjects: string[] | undefined
) => {
  if (!tokenObjects) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_MAINNET}::${COMPOSABLE_TOKEN}::${PARENTS_OBJECTS}`,
      typeArguments: [TRAIT_TOKEN_TYPE_MAINNET],
      functionArguments: [tokenObjects],
    };
    const response = await aptos.view({ payload });
    return response;
  } catch (e) {
    console.error(e);
  }
};
