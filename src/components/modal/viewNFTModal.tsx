import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleViewNFTModal } from '../../state/dialog';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../lazyImage';
import { useEffect, useState } from 'react';
import { NftMetadataType } from '../../type/nft_type';
import CustomFolderType from '../../type/custom_folder_type';
import { chooseCurrentTraitFolder } from '../../state/tokens';

const ViewNFTModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.dialogState.bViewNFTModal);

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

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
            className={`flex w-full h-[92px] justify-between items-center bg-gray-dark-2 px-6 gap-4 z-10`}
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
                <p className='text-[23px] font-semibold leading-[29px]'>{currentNft?.token_name}</p>
                <p className='font-medium leading-[21px] text-gray-light-1'>{currentNft?.collection_name}</p>
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
              {currentTraitFolders
                .filter((folder) => folder.trait != undefined)
                .map((folder, index) => {
                  const isActive = currentTraitFolder?.trait?.token_data_id == folder.trait?.token_data_id;
                  const bg = isActive ? "bg-gray-dark-1" : "bg-gray-dark-2"
                  return (
                    <div
                      className={`h-[76px] mb-2 gap-2 rounded-[8px] w-full flex items-center ${bg} hover:bg-gray-light-3/50 p-2 cursor-pointer`}
                      key={index}
                      onClick={() => onClickFolder(folder)}
                    >
                      <div className="w-[60px] bg-gray-light-3 rounded-lg">
                        <LazyImage
                          src={folder?.trait?.token_uri}
                          alt="image"
                          className="w-[60px] h-[60px]"
                        />
                      </div>
                      <div className="flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start">
                        <p className="text-gray-light-1">
                          {folder?.trait?.collection_name}
                        </p>
                        <p className="mt-2 md:text-[13px] font-normal text-gray-light-1">
                          {folder?.trait?.description}
                        </p>
                        <p className="">{folder?.trait?.token_name}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {currentTraitFolder?.trait && (
              <div className="bg-[#000000] rounded-[10px] w-[310px] h-[80vh] ml-[27px] flex flex-col gap-y-2 p-4">
                <div className="rounded-md bg-gray-light-3">
                  <LazyImage
                    className="w-[278px] h-[278px]"
                    src={currentTraitFolder?.trait?.token_uri}
                    alt=""
                  />
                </div>
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
