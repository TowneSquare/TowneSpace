import { useNavigate } from 'react-router-dom';
import { NftMetadataType } from '../../type/nft_type';
import { compareAddress, isUriEmpty } from '../../util';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  chooseCurrentTraitFolder,
  chooseNft,
  setCurrentTraitFolders,
} from '../../state/tokens';
import { toggleViewNFTModal } from '../../state/dialog';
import LazyImage from '../lazyImage';
import CustomFolderType from '../../type/custom_folder_type';
import { getTraitListinComposable } from '../../api/getTraitListinComposable';
import { APTOS } from '../../state/constants';
import { useEffect, useState } from 'react';
import { CollectionV1Fields, ComposedNft } from '../../api';

interface Props {
  index: number;
  data: CollectionV1Fields;
}
const CollectionCard: React.FC<Props> = ({ data, index }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onCustomize = async () => {};

  return (
    <div className="group relative w-[200px] md:w-[288px] flex gap-3 bg-gray-dark-2 rounded-lg cursor-pointer p-3">
      <div className="min-w-max h-[132px] md:h-[176px] rounded-t-lg">
        <LazyImage
          src={data.collection_uri}
          className="h-20 rounded-sm"
          alt="Primary image"
        />
      </div>
      <div className="">
        <div className="flex items-center gap-2 text-xs md:text-[13px] font-semibold">
          <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
          cNFT Collection
        </div>
        <p className="text-sm md:text-base font-semibold">
          Amazing Slothians from Space & Univers...
        </p>
        <p className="text-sm text-gray-light-1">{data.collection_name}</p>
        <p className="text-sm text-gray-light-1">
          Total cNFTs: {data.current_supply}
        </p>
        <div className="flex justify-between items-center mt-4 gap-2">
          <p className="text-sm whitespace-nowrap"> Deployed to</p>
          <button
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-semibold  border-[green] border-2 bg-[green]/10 whitespace-nowrap`}
          >
            MAINNET
          </button>
        </div>
      </div>
      <div className="group/3dots hidden group-hover:flex flex-col absolute w-6 h-6 justify-center items-center top-2 right-2 hover:bg-black/50 rounded-full z-10">
        <img src="/nft-card/3dots.svg" alt="3dots" />
        <div className="hidden group-hover/3dots:block absolute top-6 right-0 ">
          <div className="w-full h-2" />
          <div className="py-2 rounded-lg bg-white">
            <p
              className="px-2 text-[10px] md:text-[13px] text-gray-dark-2 hover:bg-gray-light-2 whitespace-nowrap"
              onClick={() => navigate('/archived')}
            >
              Archive
            </p>
          </div>
        </div>
      </div>
      <div className="hidden group-hover:block absolute inset-0 bg-black/50 opacity-50" />
    </div>
  );
};

export default CollectionCard;
