import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary_button';
import PrimaryInput from '../../components/primary_input';
import ButtonStatus from '../../type/button_status';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { updateCollectionName, updateTotalSupply } from '../../state/deploy';
import { ArrowBottom, CancelIcon, QuestionMark } from '../../svg';
import { useState } from 'react';
import { toggleCreateModal, toggleStep2 } from '../../state/dialog';

const CreateStep2 = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bStep2);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [collectionName, setCollectionName] = useState('');
  const [maxSupply, setMaxSupply] = useState('');

  const handleCollectionNameChange = (e: any) => {
    setCollectionName(e.target.value);
    dispatch(updateCollectionName(e.target.value));
  };

  const handleSubmit = () => {
    if (!isButtonDisabled) {
      dispatch(toggleStep2(false));
      navigate('/create/step1');
    }
  };

  const handleMaxSupplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[\d,]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      const formattedValue = e.target.value.replace(/,/g, '');
      const numberWithCommas = formattedValue
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/(?<=\d)(?=(\d{3})+\b)/g, '.');
      setMaxSupply(numberWithCommas);
    }
    dispatch(updateTotalSupply(e.target.value));
  };

  const isButtonDisabled = !collectionName || !maxSupply;

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} fixed z-[100] inset-0 flex justify-center items-center bg-black/80`}
      style={{
        backgroundImage: `url(/create/background-create.png)`,
        backgroundSize: 'cover',
      }}
    >
      <div
        onClick={() => {
          dispatch(toggleStep2(false));
          dispatch(toggleCreateModal(true));
        }}
        className="absolute z-[100] left-4 top-4 flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-20 cursor-pointer"
      >
        <CancelIcon />
      </div>
      <p
        className="absolute top-20 text-[40px] font-semibold leading-normal"
        style={{ textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' }}
      >
        Create Dynamic PFPs
      </p>
      <div className="md:w-[558px] h-fit mx-4 bg-gray-dark-1 rounded-lg">
        <div className="flex justify-center mt-10 mb-9">
          <p className="text-base font-semibold md:text-xl">
            Create a new collection for your PFPs
          </p>
        </div>
        <div className="px-4 md:px-8">
          <div className="relative flex items-center">
            <p className="mr-1 text-sm font-normal md:text-base">
              What is the collection’s name?
            </p>
            <div className="relative group">
              <QuestionMark />
              <div className="flex-col gap-[2px] items-center hidden group-hover:flex absolute -right-[170px] bottom-8">
                <div className="border border-gray-light-3 leading-normal w-[368px] h-fit p-3 bg-black text-white text-sm rounded-md shadow-lg">
                  This will be the official name of your cNFT collection which
                  will appear by default on NFT marketplaces. Note that you
                  can’t change the collection name after its deployed on the
                  blockchain.
                </div>
                <ArrowBottom />
              </div>
            </div>
          </div>
          <PrimaryInput
            onChange={handleCollectionNameChange}
            className="mt-2 font-normal bg-gray-dark-3 placeholder:text-gray-light-3"
            placeholder="Insert collection name"
          />
          <div className="flex items-center gap-1 mt-8">
            <p className="text-sm md:text-base">
              How many Dynamic PFPs will the collection have?
            </p>
            <div className="relative group">
              <QuestionMark />
              <div className="flex-col gap-[2px] items-center hidden group-hover:flex absolute -right-[120px] bottom-8">
                <div className="border border-gray-light-3 leading-normal w-[260px] h-fit p-3 bg-black text-white text-sm rounded-md shadow-lg">
                  This is the total number of Dynamic PFPs you will create in
                  this collection.
                </div>
                <ArrowBottom />
              </div>
            </div>
          </div>
          <PrimaryInput
            onChange={handleMaxSupplyChange}
            className="mt-2 font-normal bg-gray-dark-3 placeholder:text-gray-light-3"
            placeholder="10,000"
            value={maxSupply}
          />
        </div>
        <div className="flex justify-center my-14">
          <PrimaryButton
            className={`w-[230px] h-[48px] ${isButtonDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
            type={ButtonStatus.active}
            onClick={handleSubmit}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CreateStep2;
