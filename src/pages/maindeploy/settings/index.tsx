import { Link } from 'react-router-dom';
import Header from './header';
import { useAppSelector } from '../../../state/hooks';

const Settings = () => {
  const state = useAppSelector((state) => state.deployState);
  return (
    <div className="pb-10">
      <Header />
      <div className="flex flex-col items-center">
        <p className="text-xl md:text-2xl font-semibold mt-2">
          Confirm your Export Settings
        </p>
        <p className="mt-1 text-sm md:text-base text-center">
          Please check if the information bellow is correct before continuing.
          <br />
          It won’t be possible to change it once it’s deployed on blockchain
        </p>
        <div className="md:w-1/2 mx-4  mt-9">
          <div className="flex justify-end">
            <Link to="/deploy/settings">
              <p className=" text-sm md:text-base font-semibold text-primary-light">
                Edit Settings
              </p>
            </Link>
          </div>
          <div className="mt-4 px-8 py-6 flex flex-col gap-2 border border-gray-light-3 rounded-lg">
            <p className="text-sm md:text-base font-semibold text-gray-light-1">
              GENERAL
            </p>
            <p className="text-sm md:text-base ">
              Collection name:&nbsp;
              <span className="font-semibold">{state.collectionName}</span>
            </p>
            <p className="text-sm md:text-base ">
              Collection Symbol:&nbsp;
              <span className="font-semibold">{state.collectionSymbol}</span>
            </p>
            <p className="text-sm md:text-base ">
              Total Supply:&nbsp;
              <span className="font-semibold">{state.totalSupply}</span>
            </p>
            <p className="text-sm md:text-base ">
              Token Name:&nbsp;
              <span className="font-semibold">{state.tokenName}</span>
            </p>
            <p className="text-sm md:text-base ">
              Token Description:&nbsp;
              <span className="font-semibold">
                {state.collectionDescription}
              </span>
            </p>
            <p className="text-sm md:text-base ">
              Token Extenal URL:&nbsp;
              <span className="font-semibold">{state.externalLink}</span>
            </p>
            <p className="text-sm md:text-base ">
              Blockchain:&nbsp;
              <span className="font-semibold">Aptos</span>
            </p>
          </div>
          <div className="mt-4 px-8 py-6 flex flex-col gap-2 border border-gray-light-3 rounded-lg">
            <p className="text-sm md:text-base font-semibold text-gray-light-1">
              ARTWORK
            </p>
            <p className="text-sm md:text-base ">
              Artwork Size:&nbsp;
              <span className="font-semibold">1200px</span>
            </p>
            <p className="text-sm md:text-base ">
              Artwork Format:&nbsp;
              <span className="font-semibold">Same as uploaded</span>
            </p>
          </div>
          <div className="mt-4 px-8 py-6 flex flex-col gap-2 border border-gray-light-3 rounded-lg">
            <p className="font-semibold text-gray-light-1">COMMISSIONS</p>
            <p className="text-sm md:text-base ">
              Payout address:&nbsp;
              <span className="font-semibold">{state.payoutAddress}</span>
            </p>
            <p className="text-sm md:text-base ">
              Royalties:&nbsp;
              <span className="font-semibold">{state.royalties}</span>
            </p>
            <p className="text-sm md:text-base ">
              Royalties payout address:&nbsp;
              <span className="font-semibold">
                {state.royaltiesPayoutAddress}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
