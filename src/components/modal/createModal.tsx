import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { useAppSelector } from '../../state/hooks';
import { CancelIcon } from '../../svg';
import { useDispatch } from 'react-redux';
import { toggleCreateModal, toggleStep2 } from '../../state/dialog';

const CreateModal = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bCreateModal);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getImageSrc = () => {
    const timeStamp = new Date().getTime();
    switch (currentIndex) {
      case 1:
        return `/create/game-background.svg?${timeStamp}`;
      default:
        return `/create/dynamic-background.svg?${timeStamp}`;
    }
  };

  const handleContinue = () => {
    dispatch(toggleCreateModal(false));
    dispatch(toggleStep2(true));
  };

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} fixed z-[100] inset-0 flex justify-center items-center bg-[#00000050]`}
    >
      <div className="w-full lg:w-[1023px] mx-4 h-fit flex  bg-gray-dark-1 rounded-[10px]">
        <div className="flex flex-col md:w-[373px] bg-gray-dark-2 px-2 md:px-6 py-10 rounded-l-[10px]">
          <p className="text-2xl md:text-[29px] text-white font-bold">Create</p>
          <div className="mt-20 flex flex-col w-full">
            {Menus.map((menu, index) => (
              <div
                className={`h-[88px] px-2 md:px-4 flex items-center text-sm md:text-base hover:text-primary-dark-1 whitespace-nowrap ${currentIndex == index ? 'bg-gray-dark-1 text-primary-dark-1' : ''} rounded-md cursor-pointer`}
                key={index}
                onClick={() => setCurrentIndex(index)}
              >
                {menu.label}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[650px] flex flex-col relative">
          <div
            onClick={() => dispatch(toggleCreateModal(false))}
            className="absolute right-4 top-4 flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-20 cursor-pointer"
          >
            <CancelIcon />
          </div>
          <img
            src={getImageSrc()}
            className="bg-[#121212] rounded-tr-[10px]"
            alt="background"
          />
          <div className="h-full px-6 py-6 flex flex-col gap-4 justify-end">
            <p className="text-2xl md:text-[29px] font-bold white">
              Dynamic PFP
            </p>
            <p className="text-base md:text-xl">
              Dynamic PFPs will change their appearance based on their traits
              and metadata changes.
            </p>
            <div className="w-full flex items-center gap-6 sm:gap-14 justify-end">
              <Link to="/">
                <p className="text-sm md:text-base text-primary-light font-semibold whitespace-nowrap">
                  Learn More
                </p>
              </Link>
              <PrimaryButton
                className="w-[100px] sm:w-[153px]"
                type={ButtonStatus.active}
                onClick={handleContinue}
              >
                Create
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

const Menus = [
  {
    href: '/',
    label: 'Dynamic PFP',
  },
  {
    href: '/',
    label: 'Game NFTs',
  },
];
