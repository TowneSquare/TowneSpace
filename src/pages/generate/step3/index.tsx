import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import Header from './header';
import { useState } from 'react';

const Step3 = () => {
  const [option, setOption] = useState(0);
  return (
    <div className="pb-10">
      <Header />
      <div className="mx-4 flex flex-col items-center">
        <p className="textxl md:text-2xl font-semibold mt-2">Deploy assets</p>
        <p className="mt-1 text-sm md:text-base text-center">
          Choose the network where would you like to deploy the smart contract.
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
        <PrimaryButton type={ButtonStatus.active} className="mt-10">
          Deploy
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Step3;

const Options = [
  {
    title: 'Aptos Testnet (Recommended)',
    content:
      'Deploy to Testnet in order to test if the assets upload successfully and that there are no critical errors. You will need Testnet APT to pay the gas fees ',
  },
  {
    title: 'Aptos Mainnet',
    content:
      'Deploy to Mainnet and your collection will be live on the Aptos blockchain. Please keep in mind that further modifications to the smart contract won’t be possible',
  },
];
