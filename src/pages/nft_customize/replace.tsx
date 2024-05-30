import SecondaryButton from '../../components/secondary_button';
import {
  toggleRemoveTrait,
  toggleRemoveTraitConfirm,
  toggleNFTEdit,
} from '../../state/dialog';
import { useAppDispatch } from '../../state/hooks';
import ButtonStatus from '../../type/button_status';
import RemoveDialog from './remove_dialog';
import RemoveConfirm from './remove_confirm';
import NFTEdit from './nft_edit';

const Replace = () => {
  const dispatch = useAppDispatch();

  const isActive = false;
  return (
    <div>
      {isActive ? (
        <div className="w-[470px] h-[75vh] gap-8 bg-gray-dark-1 rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
          <img src="/customize/non-trait.svg" />
          <p className="w-[270px] px-4 text-center">
            Select a Trait you wish to replace or remove the Dynamic PFP
          </p>
        </div>
      ) : (
        <div className="min-w-[270px] md:min-w-[315px] gap-8 bg-gray-dark-1 rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
          <div className="w-[270px]">
            <img src="/customize/banner.png" className="w-full mb-4" />
            <div className="w-full flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start mr-8">
              <p className="text-gray-light-1 mb-2">Sl0thians</p>
              <p className="text-gray-light-1 mt-2 font-normal">HAT</p>
              <p className="">Crown #7821</p>
              <p className="text-gray-light-1 my-4">
                NFT Description lorem ipsum dolro sit amet qot lorem ipsum dolro
                sit amet qot
              </p>
            </div>
            <SecondaryButton
              type={ButtonStatus.active}
              className="my-4 w-full"
              onClick={() => {
                dispatch(toggleNFTEdit(true));
              }}
            >
              <div className="flex gap-4 justify-center items-center">
                <img src="/customize/replace.svg" alt="upload" />
                <p className="font-medium">Replace Traits</p>
              </div>
            </SecondaryButton>
            <SecondaryButton
              type={ButtonStatus.active}
              className="w-full"
              onClick={() => {
                dispatch(toggleRemoveTrait(true));
              }}
            >
              <div className="flex gap-4 justify-center items-center">
                <img src="/customize/close.svg" alt="upload" />
                <p className="font-medium">Remove Trait</p>
              </div>
            </SecondaryButton>
            <div className="flex my-2 gap-2">
              <img src="/customize/info.svg" alt="" />
              <p className="text-left text-sm w-full">
                Removed Crypto asset is transferred to your wallet
              </p>
            </div>
          </div>
        </div>
      )}
      <RemoveDialog />
      <RemoveConfirm />
      <NFTEdit />
    </div>
  );
};

export default Replace;
