import { useNavigate } from 'react-router-dom';
import { NftMetadataType, TRAIT_NAME } from '../../type/nft_type';
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
import { ComposedNft } from '../../api';
import { getComposableType } from '../../api/getTokenType';
import { current } from '@reduxjs/toolkit';
import {
  getTokenType as getType,
  getTokenTypes as getTypes,
} from '../../api/getTokenType';

interface Props {
  index: number;
  data: NftMetadataType;
}
const NftCard: React.FC<Props> = ({ data, index }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const folders = useAppSelector((state) => state.tokensState.folders);
  const allNfts = useAppSelector((state) => state.tokensState.allNfts);
  const nfts = useAppSelector((state) => state.tokensState.nfts);
  const [composedNfts, setComposedNfts] = useState<ComposedNft[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (data.type != 'composable') return;
      const res = await getTraitListinComposable(APTOS, data?.token_data_id);
      if (res.length > 0) {
        const composedNfts: ComposedNft[] = [];
        for (const nft of res[0]) {
          composedNfts.push({
            token_data_id: nft.inner,
          });
        }
        setComposedNfts(composedNfts);
      }
      
    };
    fetch();
  }, [data.token_data_id]);

  const makeFolders = async () => {
    const temp = JSON.parse(JSON.stringify(data));
    temp.composed_nfts = composedNfts;
    dispatch(chooseNft(temp));
    //const currentTraitFolders: CustomFolderType[] = [];
    const currentTraitFolders = await Promise.all(
      composedNfts.map(async (composedNFT): Promise<CustomFolderType> => {
        const traitType = await getType(APTOS, composedNFT.token_data_id);
        const traitDetails = await APTOS.getDigitalAssetData({
          digitalAssetAddress: composedNFT.token_data_id,
        });
      
        return {
          name: traitType,
          trait: {
            collection_id: traitDetails.collection_id,
            collection_name: traitDetails.current_collection?.collection_name,
            token_name: traitDetails.token_name,
            token_data_id: traitDetails.token_data_id,
            token_uri: traitDetails.token_uri,
            description: traitType,
          },
        };
      })
    );

    

    for (const folder of folders) {
      const traitFolder = currentTraitFolders.find(
        (traitFolder) => traitFolder.name == folder
      );
      if (!traitFolder) {
        currentTraitFolders.push({ name: folder, trait: undefined });
      }
    }

   
    dispatch(setCurrentTraitFolders(currentTraitFolders));
    dispatch(chooseCurrentTraitFolder(currentTraitFolders[0]));
  };
  const onCustomize = async () => {
    makeFolders();

    navigate(`/customize/${data.token_data_id}`);
  };
  const onSeeTowneSpace = () => {
    makeFolders();
    dispatch(toggleViewNFTModal(true));
  };

  const onCardClick = (index: number) => {
    console.log(index, data, composedNfts, nfts);
  };



  return (
    <div
      className="group w-[140px] md:w-[200px] bg-gray-dark-2 rounded-lg cursor-pointer"
      onClick={() => onCardClick(index)}
    >
      <div
        onClick={() => onSeeTowneSpace()}
        className="relative h-[132px] md:h-[200px] bg-gray-light-2 rounded-t-lg"
      >
        <LazyImage
          src={data.token_uri}
          className="w-full h-full rounded-t-[8px]"
          alt="Primary image"
        />
        {/* {data.type === 'composable' && (
          <div className="absolute z-10 flex-col items-center justify-center hidden w-6 h-6 rounded-full top-2 right-2 group/3dots group-hover:flex hover:bg-black">
            <img src="/nft-card/3dots.svg" alt="3dots" />
            <div className="absolute right-0 hidden top-6 group-hover/3dots:block">
              <div className="w-full h-4 -mt-2" />
              <div className="py-2 bg-white rounded-lg">
                <p
                  className="px-2 text-[10px] md:text-[13px] text-gray-dark-2 hover:bg-gray-light-2 whitespace-nowrap "
                >
                  See on TowneSpace
                </p>
                <div className="h-px mt-2 bg-gray-dark-2" />
                <p
                  className="px-2 mt-2 text-[10px] md:text-[13px] text-gray-dark-2  hover:bg-gray-light-2"
                  onClick={() => onCustomize()}
                >
                  Customize
                </p>
              </div>
            </div>
          </div>
        )} */}
        <div className="absolute flex bottom-1 left-1">
          {data.type == 'composable' && (
            <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
          )}
          {data.type == 'composable' && composedNfts.length > 0 && (
            <img src="/nft-card/composed.svg" alt="composed" />
          )}
        </div>
        <div className="absolute inset-0 hidden bg-black opacity-50 group-hover:block" />
      </div>
      <div className="mx-2 my-2 mb-12">
        <div className="flex items-center gap-2 text-xs md:text-[14px] font-semibold text-gray-light-1">
          {data.collection_name}
        </div>
        <p className="text-base font-semibold md:text-lg">{data.token_name}</p>
      </div>
    </div>
  );
};

export default NftCard;
