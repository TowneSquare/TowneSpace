import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary_button';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import ButtonStatus from '../../type/button_status';
import { toggleExitEdit, toggleFinishEdit } from '../../state/dialog';

interface Props {}
const Header: React.FC<Props> = ({}) => {
  const navigation = useNavigate();
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(toggleExitEdit(true));
  };
  return (
    <div className="relative h-[124px] mx-2 md:mx-8 flex justify-center items-center">
      <div
        className="absolute left-0 w-4 h-4 cursor-pointer"
        onClick={() => onClose()}
      >
        <img src="/customize/close.svg" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-center md:text-xl">
          Customize {currentNft?.token_name}
        </p>
        <p className="w-1/2 text-sm text-center md:w-full md:text-base">
          Select NFTs or crypto assets you want to put inside, replace or remove
        </p>
      </div>
      <div className="absolute right-0">
        <PrimaryButton
          onClick={() => {
            dispatch(toggleFinishEdit(true));
          }}
          type={ButtonStatus.active}
          className="px-10"
        >
          Finish
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Header;
