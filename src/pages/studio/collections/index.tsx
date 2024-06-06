import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import Filter from './filter';
import FilterType from '../../../type/filter_type';
import Panel from './panel';
import EmptyCard from '../../../components/empty_card';
import { useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { fetchMyCollections } from '../../../state/tokens';

const Collections = () => {
  const { account } = useWallet();
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.tokensState.collectionFilter);
  const collections = useAppSelector((state) => state.tokensState.myCollections);

  const isEmpty = collections.length == 0;

  useEffect(() => {
    if (account) dispatch(fetchMyCollections(account?.address));
  }, [account, filter]);

  return (
    <div className="px-2 md:px-8 pt-[40px] pb-4">
      <Filter />
      <div className="flex flex-col md:flex-row gap-10 mt-8">
        {isEmpty ? (
          <div className="relative w-full flex justify-center gap-6">
            {Array(5)
              .fill(null)
              .map(() => (
                <EmptyCard />
              ))}
            <div className="absolute w-full h-full flex flex-col justify-end items-center gap-14">
              <h1 className="text-2xl font-semibold">
                You did't have any{' '}
                {filter == FilterType.composable ? 'Composable NFT' : 'NFT'}{' '}
                collections
              </h1>
              <h3 className="text-center">
                When you create an{' '}
                {filter == FilterType.composable ? 'cNFT' : 'NFT'} collection ,
                <br /> they will show up here
              </h3>
              {filter == FilterType.composable ? (
                <PrimaryButton type={ButtonStatus.active} className="h-12">
                  Create a cNFT collection
                </PrimaryButton>
              ) : (
                <div className="h-10"></div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Panel />
          </>
        )}
      </div>
    </div>
  );
};

export default Collections;
