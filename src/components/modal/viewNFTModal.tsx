import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleViewNFTModal } from '../../state/dialog';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../lazyImage';
import { useEffect, useState } from 'react';
import { NFT_TYPE, NftMetadataType, TRAIT_NAME } from '../../type/nft_type';
import CustomFolderType from '../../type/custom_folder_type';
import { chooseCurrentTraitFolder, fetchNfts } from '../../state/tokens';
import { Tooltip } from 'react-tooltip';
import { PINATA } from '../../constants';
import { useReplaceTraits } from '../../hooks/useReplaceTrait';
import { removeWordFromString } from '../../util';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import FilterType from '../../type/filter_type';

const ViewNFTModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const replaceTraits = useReplaceTraits();
  const isOpen = useAppSelector((state) => state.dialogState.bViewNFTModal);
  const currentCollection = useAppSelector(
    (state) => state.tokensState.currentCollection
  );
  const { account } = useWallet();
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
  const [isLoading, setIsloading] = useState(false);
  let [showSignWalletModal, setShowSignWalletModal] = useState(false);
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  
  // useEffect(() => {
  //   if (currentTraitFolder == undefined && currentTraitFolders.length > 0) {
  //     dispatch(chooseCurrentTraitFolder(currentTraitFolders[0]));
  //   }
  // }, [currentTraitFolders]);

  const onClickToCustomize = () => {
    navigate(`/customize/${currentNft?.token_data_id}`);
    dispatch(toggleViewNFTModal(false));
  };


  console.log(currentNft, "currentNFT")


  const sortedTraitFolders = [...currentTraitFolders]
    .sort((a, b) => {
      const indexA = folderType.indexOf(a.name);
      const indexB = folderType.indexOf(b.name);
      return indexA - indexB;
    });
  const generateMetadata = async () => {
    setShowSignWalletModal(true);
    try {
      if (!currentNft) {
        return;
      }
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      canvas.width = 700
      canvas.height = 700
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => reject(`Failed to load image: ${src}`);
        });
      };
      const overlayImagesOnCanvas = async () => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Failed to get canvas context.');
          return;
        }

        // Clear the canvas
        ctx.clearRect(0, 0, 1000, 1000);
        

        try {
          // Load all images
          const imageUrls = sortedTraitFolders
            .reverse()
            .filter((trait) => trait.trait != undefined)
            .map((trait) => trait.trait?.token_uri as string);
          const images = await Promise.all(imageUrls?.map(loadImage));

          // Draw each image on the canvas, one on top of the other
          images.forEach((img) => {
            ctx.drawImage(img, 0, 0, 700, 700);
          });
        } catch (error) {
          console.error('Error loading images:', error);
        }
      };
      await overlayImagesOnCanvas();
      const imageData = canvas.toDataURL('image/png');
      // Download canvas
      const blob = await fetch(imageData).then((res) => res.blob());
      const file = new File([new Blob([blob])], currentNft?.token_name ?? '');
      // upload image to pinata
      const upload = await PINATA.upload.file(file);
      const uri = `https://aquamarine-electoral-hyena-268.mypinata.cloud/ipfs/${upload.IpfsHash}`;
      const res = await replaceTraits(currentNft?.token_data_id, [], [], uri);
      setShowSignWalletModal(false);
      if (res?.success) {
        const oldUri = removeWordFromString(currentNft?.token_uri);
        await PINATA.unpin([oldUri]);
        if (currentCollection && account) {
          setIsloading(true);
          dispatch(
            fetchNfts({
              address: account?.address.toString(),
              collection_id: currentCollection.collection_id,
            })
          );
        }
        setIsloading(false);
      }
    } catch (error) {
      console.error(error, 'generate metadata');
      setIsloading(false);
      setShowSignWalletModal(false);
    }
  };

  const onClickFolder = (folder: CustomFolderType) => {
    dispatch(chooseCurrentTraitFolder(folder));
  };

  const SignTransactionModal = ({ openModal }: { openModal: boolean }) => {
    return (
      <>
        <Dialog
          open={openModal}
          onClose={() => setShowSignWalletModal(false)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-[#121212]/50" />
          <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
            <DialogPanel className="max-w-lg p-12 space-y-4 bg-[#222222] rounded-md border-[#666] border">
              <DialogTitle className="font-normal">
                Sign the transaction in your wallet
              </DialogTitle>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
  };
  return (
    <div  className="flex">
      
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 flex animate-fade-right animate-duratiom-[3000ms] justify-end items-center bg-[#000000CC]`}
      >
        <div className='w-full h-full'  onClick={() => dispatch(toggleViewNFTModal(false))} ></div>
        {currentNft?.type == NFT_TYPE.COMPOSABLE ? (
          <div className="relative w-[875px] px-5 h-full  bg-gray-dark-2 border-gray-light-3 rounded-md">
            <div
              className={`flex z-10 gap-4 justify-between items-center w-full h-[92px] bg-gray-dark-2`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 mr-1 cursor-pointer "
                  onClick={() => dispatch(toggleViewNFTModal(false))}
                >
                  <img src="/customize/close.svg" />
                </div>
                <div>
                  <p className="text-xl font-semibold">Preview cNFT & traits</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button
                  onClick={() => {
                    generateMetadata();
                  }}
                  className="font-medium text-primary-default"
                >
                  Refresh metadata
                </button>
                <button
                  className="md:flex flex-col hidden bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center"
                  onClick={() => {
                    onClickToCustomize();
                  }}
                >
                  <p className="font-[500] text-[16px]">Customize cNFT</p>
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center">
                <div className="w-[206px] h-[206px] bg-gray-light-2 flex justify-center items-center rounded-xl">
                  <LazyImage src={currentNft?.token_uri} />
                  {isLoading && (
                    <div className='absolute w-[206px] flex justify-center items-center h-[206px] bg-[#222222]/80'>
                      <img
                        src="/generate/loader.svg"
                        className="w-16"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center">
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
                <div className="bg-[#000000] animate-fade animate-duration-[3000ms] rounded-[10px] w-[310px] h-[80vh] ml-[27px] flex flex-col gap-y-2 p-4">
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
        ) : (
          <div className="relative w-[350px] h-full  bg-gray-dark-3 border-gray-light-3 rounded-md">
            <div
              className={`flex flex-col z-10 justify-between items-start w-full h-[92px] bg-gray-dark-3`}
            >
              <div className="flex items-center px-2 py-10">
                <div
                  className="w-6 h-6 mr-1 cursor-pointer right-6"
                  onClick={() => dispatch(toggleViewNFTModal(false))}
                >
                  <img src="/customize/close.svg" />
                </div>
                {/* <img src="/customize/V2Badges.svg" /> */}
                <div className="">
                  <p className="text-[23px] font-semibold leading-[29px]">
                    {currentNft?.token_name}
                  </p>
                  <p className="font-medium leading-[21px] text-gray-light-1">
                    {currentNft?.collection_name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col px-6">
                <div className=" w-[300px] h-[300px] bg-gray-light-2 rounded-xl">
                  <LazyImage src={currentNft?.token_uri} />
                </div>
                <div>
                  <p className="text-sm font-light">
                    {currentNft?.description}
                  </p>
                  <p className="text-lg font-extrabold">
                    {currentNft?.token_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <SignTransactionModal openModal={showSignWalletModal} />
    </div>
  );
};

export default ViewNFTModal;
