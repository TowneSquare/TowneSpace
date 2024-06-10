import { useState } from 'react';
import Filter from './filter';
import FilterType from '../../../type/filter_type';
import Board from './board';
import CollectionPanel from './collection_panel';
import { useAppSelector } from '../../../state/hooks';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import EmptyCard from '../../../components/empty_card';

const Tokens = () => {
  const collections = useAppSelector((state) => state.tokensState.collections);
  const filter = useAppSelector((state) => state.tokensState.nftFilter);
  const isEmpty = collections.length == 0;

  return (
    <div className="px-2 md:px-8 pt-[40px] pb-4">
      <Filter />
      <div className="flex flex-col gap-10 mt-8 md:flex-row">
        {isEmpty ? (
          <div className="relative flex justify-center w-full gap-6">
            {Array(5)
              .fill(null)
              .map(() => (
                <EmptyCard />
              ))}
            <div className="absolute flex flex-col items-center justify-end w-full h-full gap-14">
              <h1 className="text-2xl font-semibold">
                You don't have any{' '}
                {filter == FilterType.composable ? 'Composable NFTs' : 'NFTs'}
              </h1>
              <h3 className="text-center">
                When you buy or create{' '}
                {filter == FilterType.composable ? 'cNFTs' : 'NFTs'},
                <br /> they will show up here
              </h3>
              {filter == FilterType.composable ? (
                <PrimaryButton type={ButtonStatus.active} className="h-12">
                  Create cNFTs
                </PrimaryButton>
              ) : (
                <div className="h-10"></div>
              )}
            </div>
          </div>
        ) : (
          <>
            <CollectionPanel />
            <Board />
          </>
        )}
      </div>
    </div>
  );
};

export default Tokens;
