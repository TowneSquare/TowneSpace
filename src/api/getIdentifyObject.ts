import { Aptos, InputViewFunctionData} from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN,
  COMPOSABLE_TOKEN_TESTNET,
  IDENTIFY_OBJECT,
  IDENTIFY_OBJECTS,
} from '../constants';

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

export const getIdentifyObjects = async (
  aptos: Aptos,
  tokenObjects: string[]
) => {
  try {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${IDENTIFY_OBJECTS}`,
      typeArguments: [],
      functionArguments: [tokenObjects],
    };
    const response = await aptos.view({
      payload,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
  return [];
};