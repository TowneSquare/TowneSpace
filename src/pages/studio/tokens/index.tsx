import { useState } from 'react';
import Filter from './filter';
import FilterType from '../../../type/filter_type';
import Board from './board';
import CollectionPanel from './collection_panel';
import { useAppSelector } from '../../../state/hooks';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';

const Tokens = () => {
  const collections = useAppSelector((state) => state.tokensState.collections);
  const isEmpty = collections.length == 0;

  return (
    <div className="px-2 md:px-8 pt-[40px] pb-4">
      <Filter />
      <div className="flex flex-col md:flex-row gap-10 mt-8">
        {isEmpty ? (
          <div className="relative w-full flex justify-center gap-6">
            {Array(5)
              .fill(null)
              .map(() => (
                <div className="w-[200px] h-[306px] bg-gradient-gray-1">
                  <div className="h-[200px] bg-gray-dark-1/30 rounded-lg" />
                  <div className="mt-2 ml-2 w-3/5 h-5 bg-gray-dark-1/30 rounded-sm" />
                  <div className="mt-2 ml-2 w-3/5 h-5 bg-gray-dark-1/30 rounded-sm" />
                </div>
              ))}
            <div className="absolute w-full h-full flex flex-col justify-end items-center gap-14">
              <h1 className="text-2xl font-semibold">
                You don't have any Composable NFTs
              </h1>
              <h3 className="text-center">When you buy or create cNFTs,<br/> they will show up here</h3>
              <PrimaryButton type={ButtonStatus.active}>
                Create cNFTs
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <>
            <CollectionPanel />
            <Board />{' '}
          </>
        )}
      </div>
    </div>
  );
};

export default Tokens;
