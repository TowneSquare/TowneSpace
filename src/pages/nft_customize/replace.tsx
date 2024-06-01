import SecondaryButton from '../../components/secondary_button';
import { toggleRemoveTrait, toggleChooseTrait } from '../../state/dialog';
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

  return (
    <div>
      {!isActive ? (
        <div className="w-full md:w-[470px] h-[75vh] gap-8 bg-gray-dark-1 rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
          <img src="/customize/non-trait.svg" />
          <p className="w-[270px] px-4 text-center">
            Select a Trait you wish to replace or remove the Dynamic PFP
          </p>
        </div>
      ) : (
        <div className="w-[470px] gap-8 bg-gray-dark-1 rounded-2xl px-14 py-8 flex flex-col items-center justify-center">
          <div className="w-[270px]">
            <div className="w-full rounded-lg bg-gray-dark-2 ">
            <img src={trait?.token_uri} className="w-full mb-4" />
            </div>
            <div className="w-full flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start mr-8">
              <p className="text-gray-light-1 mb-2">{trait?.collection_name}</p>
              <p className="text-gray-light-1 mt-2 font-normal">
                {currentTraitFolder.name}
              </p>
              <p className="">{trait?.token_name}</p>
              <p className="text-gray-light-1 my-4">{trait?.description}</p>
            </div>
            <SecondaryButton
              type={ButtonStatus.active}
              className="my-4 w-full"
              onClick={() => {
                dispatch(toggleChooseTrait(true));
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
    </div>
  );
};

export default Replace;
