import { Aptos, InputViewFunctionData, MoveValue } from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN_TYPE_MAINNET,
  COMPOSABLE_TOKEN_TYPE_TESTNET,
  TOWNESPACE_MAINNET,
  TRAIT_TOKEN_TYPE_MAINNET,
  TRAIT_TOKEN_TYPE_TESTNET,
} from '../constants';
import { TRAIT_NAME } from '../type/nft_type';

/**
 *
 * Get the token type
 * @param aptos
 * @param tokenObject
 *
 */
export const getTokenType = async (
  aptos: Aptos,
  tokenObject: string | undefined
): Promise<TRAIT_NAME> => {
  if (!tokenObject) return TRAIT_NAME.NO_TRAIT;
  try {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::studio::token_type`,
      functionArguments: [tokenObject],
    };
    const response = (await aptos.view({
      payload,
    })) as Array<{
      vec: Array<TRAIT_NAME>;
    }>;
    return response[0].vec[0];
  } catch (e) {
    console.error(e);
    return TRAIT_NAME.NO_TRAIT;
  }
};

/**
 *
 * Get the token types for multiple token objects
 * @param aptos
 * @param tokenObjects
 *
 */
export const getTokenTypes = async (aptos: Aptos, tokenObjects: string[]) => {
  if (!tokenObjects) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::studio::token_types`,
      functionArguments: [tokenObjects],
    };
    const response = await aptos.view({
      payload,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

// DEPRECATED
// REMOVE BEFORE MERGING
/**
 *
 * Get the trait type
 * @param aptos
 * @param tokenObject
 *
 */
export const getTraitType = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::studio::token_type`,
      typeArguments: [TRAIT_TOKEN_TYPE_MAINNET],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

// DEPRECATED
// REMOVE BEFORE MERGING
/**
 *
 * Get the composable type
 * @param aptos
 * @param tokenObject
 *
 */
export const getComposableType = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::studio::token_type`,
      typeArguments: [COMPOSABLE_TOKEN_TYPE_MAINNET],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

// DEPRECATED
// REMOVE BEFORE MERGING
/**
 *
 * Get the trait types; Useful for getting multiple trait types
 * @param aptos
 * @param tokenObjects
 *
 */
export const getTraitTypes = async (aptos: Aptos, tokenObjects: string[]) => {
  let results = [];
  for (const tokenObject of tokenObjects) {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::studio::token_type`,
      typeArguments: [TRAIT_TOKEN_TYPE_MAINNET],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    results.push(response);
  }
  return results;
};

// DEPRECATED
// REMOVE BEFORE MERGING
/**
 *
 * Get the composable types; Useful for getting multiple composable types
 * @param aptos
 * @param tokenObjects
 *
 */
export const getComposableTypes = async (
  aptos: Aptos,
  tokenObjects: string[]
) => {
  let results = [];
  for (const tokenObject of tokenObjects) {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::studio::token_type`,
      typeArguments: [COMPOSABLE_TOKEN_TYPE_MAINNET],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    results.push(response);
  }
  return results;
};
