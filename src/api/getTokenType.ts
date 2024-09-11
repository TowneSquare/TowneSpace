import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import { COMPOSABLE_TOKEN_TYPE, TRAIT_TOKEN_TYPE } from '../constants';

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
      function: `0x7e0b68ab33fe8446cd0036f7aab93cb469e2d5405c812f5e18326529052dd3c0::studio::token_type`,
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
export const getComposableType = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `0x7e0b68ab33fe8446cd0036f7aab93cb469e2d5405c812f5e18326529052dd3c0::studio::token_type`,
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
export const getTraitTypes = async (aptos: Aptos, tokenObjects: string[]) => {
  let results = [];
  for (const tokenObject of tokenObjects) {
    console.log("tokenObject", tokenObject)
    const payload: InputViewFunctionData = {
      function: `0x7e0b68ab33fe8446cd0036f7aab93cb469e2d5405c812f5e18326529052dd3c0::studio::token_type`,
      typeArguments: [TRAIT_TOKEN_TYPE],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    console.log("response", response)
    results.push(response);
  }
  return results;
};

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
      function: `0x7e0b68ab33fe8446cd0036f7aab93cb469e2d5405c812f5e18326529052dd3c0::studio::token_type`,
      typeArguments: [COMPOSABLE_TOKEN_TYPE],
      functionArguments: [tokenObject],
    };
    const response = await aptos.view({
      payload,
    });
    console.log(response)
    results.push(response);
  }
  return results;
};
