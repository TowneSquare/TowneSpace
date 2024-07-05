import { useAppDispatch, useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import CustomFolderType from '../../type/custom_folder_type';
import { toggleRemoveTraitConfirm } from '../../state/dialog';
import { chooseCurrentTraitFolder } from '../../state/tokens';

const RemoveConfirm = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(
    (state) => state.dialogState.bRemoveTraitConfirm
  );

  const currentNft = useAppSelector(state => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(state => state.tokensState.currentTraitFolder);

  const onConfirm = () => {
    const tempTrait: CustomFolderType = JSON.parse(
      JSON.stringify(currentTraitFolder)
    );
    tempTrait.trait = undefined;
    dispatch(chooseCurrentTraitFolder(tempTrait));
    dispatch(toggleRemoveTraitConfirm(false));
  }

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {/* dialog bg */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        {/* dialog */}
        <div className="w-[512px] rounded-lg bg-gray-dark-2">
          {/* dialog header */}
          <div className="flex items-center justify-between m-6">
            <h2 className="text-xl font-semibold">
              Remove trait from {currentNft?.token_name}
            </h2>
            <button
              className="text-gray-700"
              onClick={onConfirm}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          {/* dialog body */}
          <div className="flex flex-col items-center justify-center gap-6 p-2 mx-4 mt-4 text-center">
            <img src="/customize/checkcircle.svg" alt="" />
            <p className='text-base font-normal'>
              <span className='font-bold'>{currentTraitFolder?.trait?.token_name}</span> has been removed from <span className='font-bold'>{currentNft?.token_name}</span>. <br/>You can find it in your wallet.
            </p>
            <PrimaryButton
              type={ButtonStatus.active}
              className="w-1/2 px-10 my-6"
              onClick={onConfirm}
            >
              Great
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveConfirm;
