import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import WalletButtons from '../../wallet-adapter/WalletButtons';
import { toggleViewNFTModal } from '../../state/dialog';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewNFTModal = () => {
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.dialogState.bViewNFTModal);
  const sentRequest = useAppSelector((state) => state.dialogState.bWalletHold);
  const dispatch = useAppDispatch();

  const onClickToCustomize = () => {
    navigate('/nftcustomize');
    dispatch(toggleViewNFTModal(false));
  };

  const traits = [
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'HAT',
      traitsType: 'Crown #58',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'MOUTH',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'EYES',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'EYES',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'EYES',
      traitsType: 'Gum #7821',
    },
    {
      image: '/customize/banner.png',
      tokenName: 'Cool SLOTHS',
      traitsName: 'BACKGROUND',
      traitsType: 'Gum #7821',
    },
  ];
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
                <p>Sloth #9898</p>
                <p>Cool Sloths</p>
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
              <img src="/customize/banner.png" />
            </div>
            <div className="ml-2 w-[255px] overflow-auto  h-[80vh] p-2 border-2 border-gray-dark-1 rounded-xl">
              {traits.map((trait, index) => (
                <div className="h-[76px] mb-2 gap-2 rounded-[8px] w-full flex items-center bg-gray-dark-1 p-2 cursor-pointer">
                  <div className="w-[60px] bg-gray-light-3 rounded-lg">
                    <img
                      src={trait.image}
                      alt="image"
                      className="w-[60px] h-[60px]"
                    />
                  </div>
                  <div className="flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start">
                    <p className="text-gray-light-1">{trait.tokenName}</p>
                    <p className="text-gray-light-1 mt-2 font-normal">
                      {trait.traitsName}
                    </p>
                    <p className="">{trait.traitsType}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#000000] rounded-[10px] w-[310px] h-[80vh] ml-[27px] p-4">
              <div>
                <img
                  className="w-[278px] h-[278px]"
                  src="/customize/banner.png"
                  alt=""
                />
              </div>
              <div className="gap-1 mt-2">
                <p className="text-xl mb-2">Slothian #9898</p>
                <p className="text-sm text-gray-light-1">
                  NFT Description lorem ipsum dolro sit amet qot lorem ipsum
                  dolro sit amet qotNFT Description lorem ipsum dolro sit amet
                  qot lorem ipsum dolro sit amet qot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNFTModal;
