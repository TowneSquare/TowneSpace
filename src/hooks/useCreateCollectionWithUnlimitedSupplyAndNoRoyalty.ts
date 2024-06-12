import {
  COMPOSABLE_TOKEN_TESTNET,
  CREATE_COLLECTION_WITH_UNLIMITED_SUPPLY_AND_NO_ROYALTY,
  COMPOSABLE_TOKEN_ENTRY,
} from '../constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const useCreateCollectionWithUnlimitedSupplyAndNoRoyalty = (
  accountAddress: string,
  description: string,
  name: string,
  symbol: string,
  uri: string,
  mutable_description: boolean,
  mutable_uri: boolean,
  mutable_token_description: boolean,
  mutable_token_name: boolean,
  mutable_token_properties: boolean,
  mutable_token_uri: boolean,
  tokens_burnable_by_creator: boolean,
  tokens_freezable_by_creator: boolean
) => {
  const { signAndSubmitTransaction } = useWallet();
  const payload = async () => {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `${COMPOSABLE_TOKEN_TESTNET}::${COMPOSABLE_TOKEN_ENTRY}::${CREATE_COLLECTION_WITH_UNLIMITED_SUPPLY_AND_NO_ROYALTY}`,
        typeArguments: [],
        functionArguments: [
          description,
          name,
          symbol,
          uri,
          mutable_description,
          mutable_uri,
          mutable_token_description,
          mutable_token_name,
          mutable_token_properties,
          mutable_token_uri,
          tokens_burnable_by_creator,
          tokens_freezable_by_creator,
        ],
      },
    });
    console.log(response);
  };
  return payload;
};
export default useCreateCollectionWithUnlimitedSupplyAndNoRoyalty;
