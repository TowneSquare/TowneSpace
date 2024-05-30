import {
  COMPOSABLE_TOKEN_TESTNET,
  CREATE_COLLECTION_WITH_FIXED_SUPPLY_AND_ROYALTY,
  STUDIO,
} from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const useCreateCollectionWithFixedSupplyAndRoyalty = (
  accountAddress: string,
  description: string,
  max_supply: number,
  name: string,
  symbol: string,
  uri: string,
  mutable_description: boolean,
  mutable_royalty: boolean,
  mutable_uri: boolean,
  mutable_token_description: boolean,
  mutable_token_name: boolean,
  mutable_token_properties: boolean,
  mutable_token_uri: boolean,
  tokens_burnable_by_creator: boolean,
  tokens_freezable_by_creator: boolean,
  royalty_numerator: number,
  royalty_denominator: number
) => {
  const { signAndSubmitTransaction } = useWallet();
  const payload = async () => {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${STUDIO}::${CREATE_COLLECTION_WITH_FIXED_SUPPLY_AND_ROYALTY}`,
        typeArguments: [],
        functionArguments: [
          description,
          max_supply,
          name,
          symbol,
          uri,
          mutable_description,
          mutable_royalty,
          mutable_uri,
          mutable_token_description,
          mutable_token_name,
          mutable_token_properties,
          mutable_token_uri,
          tokens_burnable_by_creator,
          tokens_freezable_by_creator,
          royalty_numerator,
          royalty_denominator,
        ],
      },
    });
    console.log(response);
  };
  return payload;
};
export default useCreateCollectionWithFixedSupplyAndRoyalty;
