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
import { getTraitListinComposable } from '../../hooks/useTraitListinComposable';
import { APTOS } from '../../state/constants';
import { useEffect, useState } from 'react';
import { ComposedNft } from '../../api';

interface Props {
  index: number;
  data: NftMetadataType;
}
const NftCard: React.FC<Props> = ({ data, index }) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const folders = useAppSelector((state) => state.tokensState.folders);
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
  }, []);

  const makeFolders = () => {
    const temp = JSON.parse(JSON.stringify(data));
    temp.composed_nfts = composedNfts;
    dispatch(chooseNft(temp));

    const currentTraitFolders: CustomFolderType[] = [];

    for (const composed of composedNfts) {
      const trait = nfts.find(
        (nft) => compareAddress(nft.token_data_id, composed.token_data_id)
      );
      if (trait && trait.description) {
        currentTraitFolders.push({ name: trait.description, trait });
      }
    }

    for (const folder of folders) {
      const traitFolder = currentTraitFolders.find(
        (traitFolder) => traitFolder.name == folder
      );
      if (!traitFolder) {
        currentTraitFolders.push({ name: folder, trait: undefined });
      }
    }

    dispatch(setCurrentTraitFolders(currentTraitFolders));
    dispatch(chooseCurrentTraitFolder(undefined));
  };
  const onCustomize = async () => {
    makeFolders();

    navigation(`/nftcustomize/${data.token_data_id}`);
  };
  const onSeeTowneSpace = () => {
    makeFolders();

    dispatch(toggleViewNFTModal(true));
  };

  const onCardClick = (index: number) => {
    // console.log(index, data, composedNfts, nfts);
  };

  return (
    <div
      className="group w-[140px] md:w-[167px] bg-gray-dark-2 rounded-lg cursor-pointer"
      onClick={() => onCardClick(index)}
    >
      <div className="relative h-[132px] md:h-[156px] bg-gray-light-2 rounded-t-lg">
        <LazyImage
          src={data.token_uri}
          className="w-full h-full rounded-t-[8px]"
          alt="Primary image"
        />
        {data.type === 'composable' && (
          <div className="group/3dots hidden group-hover:flex flex-col absolute w-6 h-6 justify-center items-center top-2 right-2 hover:bg-black rounded-full z-10">
            <img src="/nft-card/3dots.svg" alt="3dots" />
            <div className="hidden group-hover/3dots:block absolute top-6 right-0 ">
              <div className="w-full h-2" />
              <div className="py-2 rounded-lg bg-white">
                <p
                  className="px-2 text-[10px] md:text-[13px] text-gray-dark-2 hover:bg-gray-light-2 whitespace-nowrap "
                  onClick={() => onSeeTowneSpace()}
                >
                  See on TowneSpace
                </p>
                <div className="mt-2 h-px bg-gray-dark-2" />
                <p
                  className="px-2 mt-2 text-[10px] md:text-[13px] text-gray-dark-2  hover:bg-gray-light-2"
                  onClick={() => onCustomize()}
                >
                  Customize
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="absolute flex left-1 bottom-1">
          {data.type == 'composable' && (
            <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
          )}
          {composedNfts.length > 0 && (
            <img src="/nft-card/composed.svg" alt="composed" />
          )}
        </div>
        <div className="hidden group-hover:block absolute inset-0 bg-black opacity-50" />
      </div>
      <div className="mx-2 my-2">
        <div className="flex items-center gap-2 text-xs md:text-[14px] font-semibold text-gray-light-1">
          {data.collection_name}
          <img src="/nft-card/polygon-check.svg" alt="check" />
        </div>
        <p className="text-base md:text-lg font-semibold">{data.token_name}</p>
        <div className="mt-3 flex gap-2">
          <img src="/nft-card/aptos-logo.svg" alt="logo" />
          <p className="text-sm md:text-base font-semibold"></p>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
