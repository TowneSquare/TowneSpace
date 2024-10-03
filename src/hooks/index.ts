import { useQuery } from '@tanstack/react-query';
import { APTOS } from '../constants';

export const useCollectionTokenData = ({
  accountAddress,
  collectionAddress,
}: {
  accountAddress?: string;
  collectionAddress?: string;
}) => {
  const getCollectionTokenData = async () => {
    if (!accountAddress) {
      return [];
    }
    if(!collectionAddress){
        return []
    }
    const res = await APTOS.getAccountOwnedTokensFromCollectionAddress({
      accountAddress: accountAddress,
      collectionAddress: collectionAddress,
    });

    return res;
  };

  return useQuery({
    queryKey: ['getCollectionToken', accountAddress, collectionAddress],
    queryFn: () => getCollectionTokenData(),
  });
};
