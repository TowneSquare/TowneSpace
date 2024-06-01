import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { toggleExitEdit } from '../../state/dialog';

const ExitEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bExitEdit);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-dark-2 bg-opacity-80 flex items-center justify-center">
        <div className="rounded-lg w-2/6 bg-gray-dark-4">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">Exit & discard changes</h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleExitEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex my-10 px-10 text-center flex-col justify-center items-center gap-6">
            <p>
              Note that all the changes you have made to the cNFT will be
              discarded
            </p>
          </div>
          <div className="flex justify-between px-12 mb-6">
            <Link
              to=""
              className="px-10 my-2"
              onClick={() => dispatch(toggleExitEdit(false))}
            >
              <p className="text-sm md:text-base text-primary-light font-semibold">
                Continue editing
              </p>
            </Link>
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={() => {
                navigate('/studio/mytoken');
                dispatch(toggleExitEdit(false));
              }}
              className="px-10 my-2 "
            >
              Exit & discard changes
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitEdit;
