import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import Header from '../header';

const Generate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header stepNumber={4} />
      <div className="flex flex-col items-center gap-8 mt-12 mb-12">
        <div className="flex gap-4 p-2 mx-4 border rounded-md md:w-1/3 md:p-4 md:gap-8 border-gray-light-3">
          <img src="/deploy/deploy-contract.png" alt="deploy" />
          <div className="flex flex-col justify-between py-4">
            <div>
              <p className="text-base font-semibold md:text-xl">
                Deploy collection
              </p>
              <p className="mt-1 text-sm md:text-base">
                Deploy the collection to Aptos Tesnet or Mainnet.
              </p>
            </div>
            <PrimaryButton
              type={ButtonStatus.active}
              className="px-1 md:w-[200px]"
              onClick={() => navigate('/generate/step1')}
            >
              Deploy Contract
            </PrimaryButton>
          </div>
        </div>
        <div className="flex gap-4 p-2 mx-4 border rounded-md md:w-1/3 md:p-4 md:gap-8 border-gray-light-3">
          <img src="/deploy/download-assets.png" alt="deploy" />
          <div className="flex flex-col justify-between py-4">
            <div>
              <p className="text-base font-semibold md:text-xl">
                Download assets
              </p>
              <p className="mt-1 text-sm md:text-base">
                Download the preview images and metadata files
              </p>
            </div>
            <PrimaryButton
              type={ButtonStatus.active}
              className="px-1 md:w-[200px]"
            >
              Dowload assets
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
