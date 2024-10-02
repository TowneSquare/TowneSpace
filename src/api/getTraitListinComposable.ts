import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN,
  COMPOSABLE_TOKEN_MAINNET,
  COMPOSABLE_TOKEN_TESTNET,
  TRAITS_FROM_COMPOSABLE,
} from '../constants';

export const getTraitListinComposable = async (
  aptos: Aptos,
  composableTokenAddress: string | undefined
) => {
  if (!composableTokenAddress) return [];
  const payload: InputViewFunctionData = {
    function: `${COMPOSABLE_TOKEN_MAINNET}::${COMPOSABLE_TOKEN}::${TRAITS_FROM_COMPOSABLE}`,
    typeArguments: [],
    functionArguments: [composableTokenAddress],
  };
  const response = await aptos.view({
    payload,
  });
  return response as any[];
};
