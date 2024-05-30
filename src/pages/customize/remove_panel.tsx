import PrimaryButton from '../../components/primary_button';
import { toggleRemovePanel } from '../../state/dialog';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import ButtonStatus from '../../type/button_status';

const RemovePanel = () => {
  const currentTrait = useAppSelector(
    (state) => state.tokensState.currentTrait
  );
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const isOpen = useAppSelector((state) => state.dialogState.bRemovePanel);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${isOpen ? 'flex' : 'hidden'} absolute inset-0 h-[100vh] bg-[#00000050] justify-center items-center`}
    >
      <div className="p-4 w-1/3 bg-gray-dark-2 rounded-md border border-gray-light-3">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">
            Remove trait from {currentNft?.token_name}
          </p>
          <div
            className="w-4 h-4 cursor-pointer"
            onClick={() => dispatch(toggleRemovePanel(false))}
          >
            <p className="text-xl font-semibold">×</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          <div className="w-[180px] h-[180px] bg-gray-dark-1 rounded-md">
            <img
              src={currentTrait?.token_uri}
              alt="uri"
              className="w-[180px] h-[180px]"
            />
          </div>
        </div>
        <p className="text-lg text-center mt-8">
          Do you want to remove {currentTrait?.token_name} from{' '}
          {currentNft?.token_name}? <br />
          {currentTrait?.token_name} will be transferred to your wallet
        </p>
        <div className="w-full flex justify-center mt-8">
          <PrimaryButton type={ButtonStatus.active}>Remove Trait</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default RemovePanel;
