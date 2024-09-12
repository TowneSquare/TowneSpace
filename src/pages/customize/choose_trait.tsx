import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleChooseTrait } from '../../state/dialog';
import { NftMetadataType } from '../../type/nft_type';
import LazyImage from '../../components/lazyImage';
import {
  chooseCurrentTraitFolder,
  setCurrentTraitFolders,
} from '../../state/tokens';
import CustomFolderType from '../../type/custom_folder_type';
import { TokenFields } from '../../api';
import { compareAddress } from '../../util';

const ChooseTrait = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialogState.bChooseTrait);
  const [traits, setTraits] = useState<TokenFields[]>([]);
  const [isEnableSaveBtn, setIsEnableSaveBtn] = useState(false);

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);

  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const allNfts = useAppSelector((state) => state.tokensState.allNfts);
  const nfts = useAppSelector((state) => state.tokensState.nfts);

  const [selectedTrait, setSelectedTrait] = useState<
    NftMetadataType | undefined
  >(undefined);
  console.log("selectedTrait", selectedTrait);
  useEffect(() => {
    let traits = nfts.filter(
      (nft) =>
        nft.description == currentTraitFolder?.name
    );
    if (currentNft?.composed_nfts) {
      for (const composed of currentNft?.composed_nfts) {
        const trait = allNfts.find((nft) =>
          compareAddress(nft.token_data_id, composed.token_data_id)
        );
        if (trait && trait.description == currentTraitFolder?.name) {
          traits.push(trait);
        }
      }
    }
    setTraits(traits);
  }, [currentTraitFolder]);

  const css = traits.length < 0 ? 'flex' : 'flex-col justify-between';

  const onSave = () => {
    if (currentTraitFolder) {
      const tempFolders: CustomFolderType[] = JSON.parse(
        JSON.stringify(currentTraitFolders)
      );
      for (const folder of tempFolders) {
        if (folder.name == currentTraitFolder.name) {
          folder.trait = selectedTrait;
          break;
        }
      }
      dispatch(setCurrentTraitFolders(tempFolders));

      const tempTrait: CustomFolderType = JSON.parse(
        JSON.stringify(currentTraitFolder)
      );
      tempTrait.trait = selectedTrait;
      dispatch(chooseCurrentTraitFolder(tempTrait));
    }
    dispatch(toggleChooseTrait(false));
  };
  return (
    <div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 flex justify-end items-center bg-[#00000050]`}
      >
        <div className="relative w-[592px] flex flex-col h-full bg-gray-dark-2 border-gray-light-3 rounded-md">
          <div
            className={`flex w-full h-[92px] justify-center items-center bg-gray-dark-2 px-6 gap-4 z-10`}
          >
            <p className="p-4 text-xl">Replace Traits</p>
          </div>

          <div className={`flex ${css} h-full`}>
            <div className="grid w-full grid-cols-4 p-6">
              {traits.length > 0 ? (
                traits.map((trait, index) => {
                  const isActive =
                    selectedTrait?.token_data_id == trait.token_data_id;
                  const borderColor = isActive ?
                    'border-4 border-primary-default' : '';
                  const isSelected =
                    currentTraitFolder?.trait?.token_data_id ==
                    trait.token_data_id;

                  return (
                    <div
                      className=""
                      key={index}
                      onClick={() => { setSelectedTrait(trait); setIsEnableSaveBtn(true) }}
                    >
                      <div
                        className={`w-[120px] h-[120px] flex justify-center items-center cursor-pointer relative ${borderColor} rounded-xl overflow-hidden`}
                      >
                        <LazyImage
                          src={trait.token_uri}
                          className="w-full h-full"
                        />
                        {isSelected && (
                          <div className='absolute flex items-center justify-center w-full h-full bg-primary-default/70'>
                            <img
                              className="w-8 h-8"
                              src="/customize/check.svg"
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                      <div className="my-2">
                        <p className="text-gray-light-1 text-[13px]">{trait.collection_name}</p>
                        <p className="text-sm">{trait.token_name}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="w-[592px] h-3_4_scr gap- rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
                    <img src="/customize/non-trait.svg" />
                    <p className="w-[300px] px-4 my-10 text-center text-gray-light-1">
                      You don’t have any of these Traits. When you transfer them
                      in your wallet, they will show up here.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`flex w-full h-[92px] justify-between items-center bg-gray-dark-3 px-6 gap-4 z-10`}
            >
              <div className="flex items-center gap-2">
                <Link
                  to=""
                  onClick={() => {
                    dispatch(toggleChooseTrait(false));
                  }}
                >
                  <p className="text-sm font-semibold md:text-base text-primary-light" onClick={() => setIsEnableSaveBtn(false)}>
                    Cancel
                  </p>
                </Link>
              </div>
              <button
                className={`md:flex flex-col hidden ${isEnableSaveBtn ? 'bg-primary-light' : 'bg-primary-footer'} rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center `}
                onClick={() => onSave()}
              >
                <p className="font-[500] text-[16px]">Save</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTrait;
