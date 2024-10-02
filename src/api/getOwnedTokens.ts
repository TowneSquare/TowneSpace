import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import {
  OWNED_TOKENS,
  TOWNESPACE_MAINNET,
  TOWNESPACE_STUDIO,
  TOWNESPACE_TESTNET
} from '../constants';

export const getOwnedTokens = async (
  aptos: Aptos,
  account_address: string,
  tokenObjects: string[]
) => {
  if (!tokenObjects) return;
  try {
    const payload: InputViewFunctionData = {
      function: `${TOWNESPACE_MAINNET}::${TOWNESPACE_STUDIO}::${OWNED_TOKENS}`,
      typeArguments: [],
      functionArguments: [account_address, tokenObjects],
    };
    const response = await aptos.view({ payload });
    return response;
  } catch (e) {
    console.log(e);
  }
};
