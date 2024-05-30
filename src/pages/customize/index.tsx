import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import Header from './header';
import Preview from './preview';
import Tokens from './tokens';
import ButtonStatus from '../../type/button_status';
import SecondaryButton from '../../components/secondary_button';
import Trait from './trait';
import ReplacePanel from './replace_panel';
import { useEffect, useState } from 'react';
import { chooseNft } from '../../state/tokens';
import RemovePanel from './remove_panel';

const Customize = () => {
  const { address } = useParams();
  const nfts = useAppSelector((state) => state.tokensState.nfts);
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(nfts, currentNft, address);

    if (
      (!currentNft || currentNft.token_data_id != address) &&
      address &&
      nfts.length > 0
    ) {
      let res = nfts.filter((nft) => nft.token_data_id == address);
      if (res.length > 0) {
        dispatch(chooseNft(res[0]));
      }
    }
  }, [address, nfts]);

  return (
    <div className="relative">
      <Header />
      <div className="my-10 flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
        <Preview />
        {currentNft?.composed_nfts && currentNft.composed_nfts.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 items-center">
              <Tokens />
              <SecondaryButton type={ButtonStatus.active} className="w-40">
                + Add Trait
              </SecondaryButton>
            </div>
            <Trait />
          </>
        ) : (
          <>
            <div className="md:w-[30vw] py-[100px] flex flex-col gap-10 justify-center items-center border border-gray-light-2 rounded-md">
              <img src="/customize/haveno-trait.svg" alt="haveno-trait" />
              <p className="text-xl font-semibold text-gray-light-2 text-center">
                {currentNft?.token_name} doesn't have
                <br /> any Trait NFTs
              </p>
              <p className="text-lg font-semibold text-gray-light-2 text-center -mt-4">
                When you add Trait NFTs,
                <br /> they will appear here
              </p>
              <SecondaryButton type={ButtonStatus.active} className="w-40">
                + Add Trait
              </SecondaryButton>
            </div>
          </>
        )}
      </div>
      <ReplacePanel />
      <RemovePanel />
    </div>
  );
};

export default Customize;
