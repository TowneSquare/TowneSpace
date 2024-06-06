import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toggleChooseTrait } from '../../state/dialog';
import { useState } from 'react';
import { NftMetadataType } from '../../type/nft_type';
import LazyImage from '../../components/lazyImage';
import {
  chooseCurrentTraitFolder,
  setCurrentTraitFolders,
} from '../../state/tokens';
import CustomFolderType from '../../type/custom_folder_type';

const ChooseTrait = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialogState.bChooseTrait);
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const nfts = useAppSelector((state) => state.tokensState.nfts);
  const traits = nfts.filter(
    (nft) => nft.description == currentTraitFolder?.name && nft.composed_to == false
  );
  const [selectedTrait, setSelectedTrait] = useState<
    NftMetadataType | undefined
  >(undefined);

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
            <div className="w-full p-6 grid grid-cols-4">
              {traits.length > 0 ? (
                traits.map((trait, index) => {
                  const isActive =
                    selectedTrait?.token_data_id == trait.token_data_id;
                  const borderColor = isActive
                    ? 'border-primary-default'
                    : 'border-gray-dark-1';
                  const isSelected =
                    currentTraitFolder?.trait?.token_data_id ==
                    trait.token_data_id;
                  const bgColor = isSelected
                    ? 'bg-primary-default border-primary-default'
                    : '';

                  return (
                    <div
                      className=""
                      key={index}
                      onClick={() => setSelectedTrait(trait)}
                    >
                      <div
                        className={`w-[120px] h-[120px] cursor-pointer border-4 relative ${borderColor} ${bgColor} rounded-xl`}
                      >
                        {isSelected && (
                          <img
                            className="absolute m-10"
                            src="/customize/check.svg"
                            alt=""
                          />
                        )}
                        <LazyImage
                          src={trait.token_uri}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="my-2">
                        <p className="text-[13px]">{trait.collection_name}</p>
                        <p className="text-sm">{trait.token_name}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="w-[592px] h-[75vh] gap- rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
                    <img src="/customize/non-trait.svg" />
                    <p className="w-[300px] px-4 my-10 text-center">
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
                  <p className="text-sm md:text-base text-primary-light font-semibold">
                    Cancel
                  </p>
                </Link>
              </div>
              <button
                className="md:flex flex-col hidden bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center"
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