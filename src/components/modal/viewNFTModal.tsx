import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleViewNFTModal } from '../../state/dialog';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../lazyImage';
import { useEffect, useState } from 'react';
import { NftMetadataType } from '../../type/nft_type';

const ViewNFTModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => state.dialogState.bViewNFTModal);

  const nfts = useAppSelector((state) => state.tokensState.nfts);
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const [traits, setTraits] = useState<NftMetadataType[]>([]);
  const [seletedTrait, setSelectedTrait] = useState<
    NftMetadataType | undefined
  >(undefined);

  useEffect(() => {
    const fetch = async () => {
      if (currentNft?.composed_nfts) {
        const traits = [];
        for (const object of currentNft?.composed_nfts) {
          const res = nfts.filter(
            (nft) => nft.token_data_id == object.token_data_id
          );
          if (res.length > 0) traits.push(res[0]);
        }
        setTraits(traits);

        if (traits.length > 0) setSelectedTrait(traits[0]);
        else setSelectedTrait(undefined);
      }
    };
    fetch();
  }, [currentNft]);

  const onClickToCustomize = () => {
    navigate(`/nftcustomize/${currentNft?.token_data_id}`);
    dispatch(toggleViewNFTModal(false));
  };

  return (
    <div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed z-10 inset-0 flex justify-end items-center bg-[#00000050]`}
      >
        <div className="relative w-[875px] h-full  bg-gray-dark-2 border-gray-light-3 rounded-md">
          <div
            className={`flex w-full h-[92px] justify-between items-center bg-gray-dark-2 px-6 gap-4 z-10`}
          >
            <div className="flex items-center gap-2">
              <div
                className="right-6 w-6 h-6 mr-1 cursor-pointer"
                onClick={() => dispatch(toggleViewNFTModal(false))}
              >
                <img src="/customize/close.svg" />
              </div>
              <img src="/customize/V2Badges.svg" />
              <div className="">
                <p>{currentNft?.token_name}</p>
                <p>{currentNft?.collection_name}</p>
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
            <div className="ml-2 w-[255px] overflow-auto  h-[80vh] p-2 border-2 border-gray-dark-1 rounded-xl">
              {traits.map((trait, index) => (
                <div
                  className="h-[76px] mb-2 gap-2 rounded-[8px] w-full flex items-center bg-gray-dark-1 p-2 cursor-pointer"
                  key={index}
                >
                  <div className="w-[60px] bg-gray-light-3 rounded-lg">
                    <LazyImage
                      src={trait.token_uri}
                      alt="image"
                      className="w-[60px] h-[60px]"
                    />
                  </div>
                  <div className="flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start">
                    <p className="text-gray-light-1">{trait.collection_name}</p>
                    <p className="text-gray-light-1 mt-2 font-normal">
                      {trait.description}
                    </p>
                    <p className="">{trait.token_name}</p>
                  </div>
                </div>
              ))}
            </div>
            {seletedTrait && (
              <div className="bg-[#000000] rounded-[10px] w-[310px] h-[80vh] ml-[27px] p-4">
                <div className="bg-gray-light-3">
                  <LazyImage
                    className="w-[278px] h-[278px]"
                    src={seletedTrait.token_uri}
                    alt=""
                  />
                </div>
                <div className="gap-1 mt-2">
                  <p className="text-xl mb-2">{seletedTrait.token_name}</p>
                  <p className="text-sm text-gray-light-1">
                    {seletedTrait.description}
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
