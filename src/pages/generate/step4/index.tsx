import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import Header from './header';
import { useState } from 'react';

const Step4 = () => {
  const navigate = useNavigate();

  const [isDeploying, setIsDeploying] = useState(1);

  const onClose = () => {
    navigate('/generate/step3');
  };

  const onClickToOverview = () => {
    navigate('/overview/manage');
  };

  return (
    <div className="pb-10">
      <Header />
      {isDeploying == 0 ? (
        <div className="mx-4 flex flex-col items-center">
          <p className="textxl md:text-2xl font-semibold mt-2">
            Deploying to Testnet...
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
                <img src="/generate/loader.svg" />
                <span className="text-green-500 text-[#AAAAAA]">
                  Awaiting confirmation of deployment
                </span>
              </div>
            </div>
          </div>
          <br />
          <div onClick={() => onClose()}>
            <p className="text md:text-sm text-[#FF4471] cursor-pointer font-semibold mt-2">
              Deploying to Testnet...
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-4 flex flex-col items-center">
          <p className="textxl md:text-2xl font-semibold mt-2">
            Successfully deployed to Testnet!
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

export default Step4;
