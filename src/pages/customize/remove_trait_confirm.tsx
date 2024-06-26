import { useAppDispatch, useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { toggleRemoveTraitConfirm } from '../../state/dialog';

const RemoveConfirm = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(
    (state) => state.dialogState.bRemoveTraitConfirm
  );

  const currentNft = useAppSelector(state => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(state => state.tokensState.currentTraitFolder);
  
  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-dark-2 bg-opacity-80 flex items-center justify-center">
        <div className="rounded-lg w-1/4 bg-gray-dark-4">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">
              Remove trait from {currentNft?.token_name}
            </h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleRemoveTraitConfirm(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex mt-4 p-2 mx-4 text-center flex-col justify-center items-center gap-6">
            <img src="/customize/checkcircle.svg" alt="" />
            <p>
              {currentTraitFolder?.trait?.token_name} has been removed from {currentNft?.token_name}. <br/>You can find it
              in your wallet.
            </p>
            <PrimaryButton
              type={ButtonStatus.active}
              className="px-10 my-6 w-1/2"
              onClick={() => dispatch(toggleRemoveTraitConfirm(false))}
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
