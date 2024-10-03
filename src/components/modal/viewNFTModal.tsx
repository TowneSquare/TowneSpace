import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleViewNFTModal } from '../../state/dialog';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../lazyImage';
import { useEffect, useState } from 'react';
import { NftMetadataType } from '../../type/nft_type';
import CustomFolderType from '../../type/custom_folder_type';
import { chooseCurrentTraitFolder } from '../../state/tokens';
import { Tooltip } from 'react-tooltip';

const ViewNFTModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.dialogState.bViewNFTModal);
  const folderType = [
    'Badge',
    'Mouth',
    'Eyes',
    'Hat',
    'Clothing',
    'Body',
    'Background',
  ];
  const [isStared, setIsStared] = useState(false);
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  const sortedTraitFolders = [...currentTraitFolders].sort((a, b) => {
    const indexA = folderType.indexOf(a.name);
    const indexB = folderType.indexOf(b.name);
    return indexA - indexB;
  });
  useEffect(() => {
    if (currentTraitFolder == undefined && currentTraitFolders.length > 0) {
      dispatch(chooseCurrentTraitFolder(currentTraitFolders[0]));
    }
  }, currentTraitFolders);

  const onClickToCustomize = () => {
    navigate(`/customize/${currentNft?.token_data_id}`);
    dispatch(toggleViewNFTModal(false));
  };

  const onClickFolder = (folder: CustomFolderType) => {
    dispatch(chooseCurrentTraitFolder(folder));
  };
  return (
    <div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 flex justify-end items-center bg-[#000000CC]`}
      >
        <div className="relative w-[875px] h-full  bg-gray-dark-2 border-gray-light-3 rounded-md">
          <div
            className={`flex z-10 gap-4 justify-between items-center px-6 w-full h-[92px] bg-gray-dark-2`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 mr-1 cursor-pointer right-6"
                onClick={() => dispatch(toggleViewNFTModal(false))}
              >
                <img src="/customize/close.svg" />
              </div>
              <img src="/customize/V2Badges.svg" />
              <div className="">
                <p className="text-[23px] font-semibold leading-[29px]">
                  {currentNft?.token_name}
                </p>
                <p className="font-medium leading-[21px] text-gray-light-1">
                  {currentNft?.collection_name}
                </p>
              </div>
            </div>
            <button
              className="md:flex flex-col hidden bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center"
              onClick={() => {
                onClickToCustomize();
              }}
            >
              <p className="font-[500] text-[16px]">Customize cNFT</p>
            </button>
          </div>
          <div className="flex">
            <div className="ml-16 w-[206px] h-[206px] border-4 border-primary-default rounded-xl">
              <LazyImage src={currentNft?.token_uri} />
            </div>
            <div className="ml-3 w-[255px] overflow-auto  h-[80vh] p-2 border-2 border-gray-dark-1 rounded-xl">
              {sortedTraitFolders.map((folder, index) => {
                const isActive =
                  currentTraitFolder?.trait?.token_data_id ==
                  folder.trait?.token_data_id;
                const bg = isActive ? 'bg-gray-dark-1' : 'bg-gray-dark-2';
                return (
                  <div
                    className={`flex gap-2 items-center p-2 mb-2 w-full cursor-pointer h-[76px] rounded-[8px] ${bg} hover:bg-gray-light-3/50`}
                    key={index}
                    onClick={() => onClickFolder(folder)}
                  >
                    <div className="w-[60px] h-[60px] bg-gray-light-3 rounded-lg">
                      {folder.trait && (
                        <LazyImage
                          src={folder.trait.token_uri}
                          alt="image"
                          className="w-[60px] h-[60px] rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start">
                      <p className="text-gray-light-1">
                        {folder.trait?.collection_name
                          ? folder.trait?.collection_name
                          : currentNft?.collection_name}
                      </p>
                      <p className="mt-2 md:text-[13px] font-normal text-gray-light-1">
                        {folder.trait?.description
                          ? folder.trait?.description
                          : folder.name}
                      </p>
                      <p className="">
                        {folder?.trait?.token_name
                          ? folder?.trait?.token_name
                          : '-'}
                      </p>
                    </div>
                    {folder?.trait?.description == 'Body' && (
                      <div className="ml-2">
                        <Tooltip
                          id="my-tooltip"
                          className="border border-white -2 bg-gray-dark-3"
                        />
                        <img
                          src="/customize/star.png"
                          className="w-8"
                          alt="star"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="This is a base trait. It can’t be removed or replaced."
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {currentTraitFolder && (
              <div className="bg-[#000000] rounded-[10px] w-[310px] h-[80vh] ml-[27px] flex flex-col gap-y-2 p-4">
                {currentTraitFolder?.trait ? (
                  <div className="self-start rounded-md bg-gray-light-3">
                    <LazyImage
                      className="w-[278px] h-[278px]"
                      src={currentTraitFolder?.trait?.token_uri}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center self-center justify-center h-full gap-8 mt-20">
                    <img src="/customize/noneImage.svg" alt="" />
                    <div>
                      <p className="text-base font-medium leading-[25px] text-center">
                        No Trait
                      </p>
                      <button
                        onClick={() => {
                          onClickToCustomize();
                        }}
                        className="text-base text-[#B882FF] font-medium leading-[25px] text-center"
                      >
                        Add trait to cNFT
                      </button>
                    </div>
                  </div>
                )}
                <div className="gap-1 mt-2">
                  <p className="mb-2 text-xl font-semibold">
                    {currentTraitFolder?.trait?.token_name}
                  </p>
                  <p className="text-sm text-gray-light-1">
                    {currentTraitFolder?.trait?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNFTModal;
