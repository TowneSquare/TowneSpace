import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import { COMPOSABLE_TOKEN, COMPOSABLE_TOKEN_TESTNET, IDENTIFY_OBJECT, IDENTIFY_OBJECTS } from '../constants';

/**
 *
 * Know if the object inputed is a composable_collection, composable_token, trait_token or digital_asset
 * @param aptos
 * @param tokenObject
 *
 */
export const useIdentifyObject = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${IDENTIFY_OBJECT}`,
      typeArguments: [],
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

export const getIdentifyObject = async (
  aptos: Aptos,
  tokenObject: string | undefined
) => {
  if (!tokenObject) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${IDENTIFY_OBJECT}`,
      typeArguments: [],
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
 * Get a list of objects, itereate through the list and get the object type: can be composable_collection, composable_token, trait_token or digital_asset
 * @param aptos
 * @param tokenObjects
 * @returns
 * 
 */
export const useIdentifyObjects = async (
  aptos: Aptos,
  tokenObjects: string[] | undefined
) => {
    if (!tokenObjects) return;
    try {
        const payload: InputViewFunctionData = {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${IDENTIFY_OBJECTS}`,
        typeArguments: [],
        functionArguments: tokenObjects,
        };
        const response = await aptos.view({
        payload,
        });
        return response;
    } catch (e) {
        console.log(e);
    }
};