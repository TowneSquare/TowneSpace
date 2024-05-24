import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import Header from './header';
import DeployModal from '../../../components/modal/deployModal';
import { useState } from 'react';

const Deploy = () => {
  const [option, setOption] = useState(0);

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const openDeployModal = () => setIsDeployModalOpen(true);
  const closeDeployModal = () => setIsDeployModalOpen(false);

  const navigate = useNavigate();

  const onClickDeploy = async () => {
    setOption(1);
  };

  const onClickToOverview = () => {
    navigate('/maindeploy/overview');
  };

  return (
    <div className="pb-10">
      <Header />
      {option == 0 ? (
        <div className="mx-4 flex flex-col items-center">
          <p className="textxl md:text-2xl font-semibold mt-2">Deploy assets</p>
          <p className="mt-1 text-sm md:text-base text-center">
            Choose the network where would you like to deploy the smart
            contract.
            <br />
            We highly recommend that you first deploy smart contracts on Testnet
          </p>
          <div className="md:w-1/2 flex flex-col items-center gap-4 mt-9">
            {Options.map((data, index) => {
              const isActive = option == index;
              const cn = isActive
                ? 'border border-primary-dark bg-primary-light/30'
                : 'border border-gray-light-3';
              const src = isActive
                ? '/generate/radio-checked.svg'
                : '/generate/radio.svg';

              return (
                <div
                  className={` ${cn} p-2 md:w-[430px] flex items-center gap-4 rounded-md cursor-pointer`}
                  key={index}
                  onClick={() => setOption(index)}
                >
                  <img src={src} alt="raiod" />
                  <div>
                    <p className="text-lg md:text-xl font-semibold">
                      {data.title}
                    </p>
                    <p className="text-sm">{data.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <PrimaryButton
            type={ButtonStatus.active}
            onClick={onClickDeploy}
            className="mt-10"
          >
            Deploy
          </PrimaryButton>
        </div>
      ) : (
        <div className="mx-4 flex flex-col items-center">
          <p className="textxl md:text-2xl font-semibold mt-2">
            Successfully deployed to Mainnet!
          </p>
          <div className="p-2 md:w-[27%] flex justify-center items-center gap-4 rounded-md mt-10 border text-center">
            <div className="bg-gray-800 p-4 rounded-lg block items-center text-center">
              <div className="flex items-center space-x-2 mb-3">
                <img src="/generate/check.svg" />
                <span className="text-green-500 text-[#2AB576]">
                  Submitted collection for deployment
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <img src="/generate/check.svg" />
                <span className="text-green-500 text-[#2AB576]">
                  Confirmed deployment
                </span>
              </div>
            </div>
          </div>
          <PrimaryButton
            type={ButtonStatus.active}
            onClick={() => onClickToOverview()}
            className="mt-10"
          >
            View deployment overview
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Deploy;

const Options = [
  {
    title: 'Aptos Mainnet',
    content:
      'Deploy to Mainnet and your collection will be live on the Aptos blockchain. Please keep in mind that further modifications to the smart contract won’t be possible',
  },
];
