import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import { COMPOSABLE_TOKEN_TYPE, TRAIT_TOKEN_TYPE } from '../constants';

/**
 *
 * Get the trait type
 * @param aptos
 * @param tokenObject
 *
 */
export const useTraitType = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `0x4::token::description`,
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
 * Get the composable type
 * @param aptos
 * @param tokenObject
 *
 */
export const useComposableType = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `0x4::token::description`,
      typeArguments: [COMPOSABLE_TOKEN_TYPE],
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
 * Get the trait types; Useful for getting multiple trait types
 * @param aptos
 * @param tokenObjects
 *
 */
export const useTraitTypes = async (aptos: Aptos, tokenObjects: string[]) => {
  let results = [];
  for (const tokenObject of tokenObjects) {
    const payload: InputViewFunctionData = {
      function: `0x4::token::description`,
      typeArguments: [TRAIT_TOKEN_TYPE],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    results.push(response);
  }
  console.log(results);
};

/**
 *
 * Get the composable types; Useful for getting multiple composable types
 * @param aptos
 * @param tokenObjects
 *
 */
export const useComposableTypes = async (
  aptos: Aptos,
  tokenObjects: string[]
) => {
  let results = [];
  for (const tokenObject of tokenObjects) {
    const payload: InputViewFunctionData = {
      function: `0x4::token::description`,
      typeArguments: [COMPOSABLE_TOKEN_TYPE],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    results.push(response);
  }
  console.log(results);
};
