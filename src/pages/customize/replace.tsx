import SecondaryButton from '../../components/secondary_button';
import {
  toggleRemoveTrait,
  toggleChooseTrait,
  toggleViewNFTModal,
} from '../../state/dialog';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import ButtonStatus from '../../type/button_status';
import RemoveDialog from './remove_trait_dialog';
import RemoveConfirm from './remove_trait_confirm';

const Replace = () => {
  const dispatch = useAppDispatch();
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const trait = currentTraitFolder?.trait;
  const isActive = currentTraitFolder?.trait != undefined;

  const width = currentTraitFolder?.name === 'Body' ? 'w-100' : 'w-replace';
  
  return (
    <div>
      {!isActive ? (
        <div className="flex flex-col items-center justify-center w-full gap-8 py-8 md:w-100 h-3_4_scr bg-gray-dark-2 rounded-2xl px-14">
          <img src="/customize/non-trait.svg" />
          <p className="w-[270px] px-4 text-center">
            Select a Trait you wish to replace or remove the Dynamic PFP
          </p>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center py-8 bg-gray-dark-2 rounded-2xl px-14 ${width}`}
        >
          <div className="w-[270px] flex flex-col gap-y-4">
            <div className="w-full rounded-lg bg-gray-dark-1">
              <img src={trait?.token_uri} className="w-full" />
            </div>
            <div className="flex flex-col w-full font-semibold leading-4 gap-y-4 text-2xs md:text-sm text-start text-gray-light-1">
              <p>{trait?.collection_name}</p>
              <div className="flex flex-col gap-y-1">
                <p className="uppercase">{currentTraitFolder.name}</p>
                <p className="text-base text-white">{trait?.token_name}</p>
              </div>
              <p className="font-normal">{trait?.description}</p>
            </div>
            {(currentTraitFolder.trait?.composed_to ||
              (currentTraitFolder.trait?.description !== 'Body' &&
                !currentTraitFolder.trait?.composed_to)) && (
              <div className="flex flex-col mt-3">
                <SecondaryButton
                  type={ButtonStatus.active}
                  className="w-full"
                  onClick={() => {
                    dispatch(toggleChooseTrait(true));
                  }}
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <img src="/customize/replace.svg" alt="upload" />
                    <p className="font-medium">Replace Traits</p>
                  </div>
                </SecondaryButton>
                <SecondaryButton
                  type={ButtonStatus.active}
                  className="w-full mt-4 mb-2"
                  onClick={() => {
                    dispatch(toggleRemoveTrait(true));
                  }}
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <img src="/customize/close.svg" alt="upload" />
                    <p className="font-medium">Remove Trait</p>
                  </div>
                </SecondaryButton>
                <div className="flex gap-2">
                  <img src="/customize/info.svg" alt="" />
                  <p className="w-full text-sm text-left text-gray-light-1">
                    Removed Crypto asset is transferred to your wallet
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <RemoveDialog />
      <RemoveConfirm />
    </div>
  );
};

export default Replace;
