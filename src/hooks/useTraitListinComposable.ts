import { Aptos, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import {
  COMPOSABLE_TOKEN,
  COMPOSABLE_TOKEN_TESTNET,
  TRAITS_FROM_COMPOSABLE,
} from '../constants';

const useTraitListinComposable = (
  aptos: Aptos,
  composableTokenAddress: string
) => {
  const updateTraitList = async () => {
    const payload: InputViewFunctionData = {
      function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${TRAITS_FROM_COMPOSABLE}`,
      typeArguments: [],
      functionArguments: [composableTokenAddress],
    };
    const response = await aptos.view({
      payload,
    });
    console.log(response);
  };
  return updateTraitList;
};

export const getTraitListinComposable = async (
  aptos: Aptos,
  composableTokenAddress: string | undefined
) => {
  if (!composableTokenAddress) return [];
  const payload: InputViewFunctionData = {
    function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN}::${TRAITS_FROM_COMPOSABLE}`,
    typeArguments: [],
    functionArguments: [composableTokenAddress],
  };
  const response = await aptos.view({
    payload,
  });
  return response as any[];
};
export default useTraitListinComposable;
