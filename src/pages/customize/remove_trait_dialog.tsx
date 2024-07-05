import { useAppDispatch, useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import {
  toggleRemoveTrait,
  toggleRemoveTraitConfirm,
} from '../../state/dialog';
import LazyImage from '../../components/lazyImage';
import CustomFolderType from '../../type/custom_folder_type';
import { setCurrentTraitFolders } from '../../state/tokens';

const RemoveDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialogState.bTraitRemove);

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  const onRemove = () => {
    const tempFolders: CustomFolderType[] = JSON.parse(
      JSON.stringify(currentTraitFolders)
    );
    for (const folder of tempFolders) {
      if (folder.name == currentTraitFolder?.name) {
        folder.trait = undefined;
        break;
      }
    }
    dispatch(setCurrentTraitFolders(tempFolders));



    dispatch(toggleRemoveTrait(false));
    dispatch(toggleRemoveTraitConfirm(true));
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {/* dialog bg */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        {/* dialog */}
        <div className="w-[512px] rounded-lg bg-gray-dark-2">
          {/* dialog header */}
          <div className="flex items-center justify-between m-6">
            <h2 className="text-xl font-semibold">
              Remove trait from {currentNft?.token_name}{' '}
            </h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleRemoveTrait(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          {/* dialog body */}
          <div className="flex flex-col items-center justify-center pt-2 text-center gap-y-4">
            <div className='w-[180px] h-[180px] bg-gray-dark-1 rounded'>
              <LazyImage className='w-[180px] h-[180px]' src={currentTraitFolder?.trait?.token_uri} alt="" />
            </div>
            <p className='text-base font-normal'>
              Do you want to remove <span className='font-bold'>{currentTraitFolder?.trait?.token_name}</span> from{' '} <span className='font-bold'>{currentNft?.token_name}?</span><br />
              <span className='font-bold'>{currentTraitFolder?.trait?.token_name}</span> will be transferred back to your wallet.
            </p>
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={onRemove}
              className="w-1/2 px-10 mt-6 mb-10"
            >
              Remove Trait
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveDialog;
