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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-dark-2 bg-opacity-80">
        <div className="w-2/6 rounded-lg bg-gray-dark-4">
          <div className="flex items-center justify-between m-6">
            <h2 className="text-lg font-semibold">Exit & discard changes</h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleExitEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 px-10 my-10 text-center">
            <p>
              Note that all the changes you have made to the cNFT will be
              discarded
            </p>
          </div>
          <div className="flex items-center justify-between px-12 mb-6">
            <Link
              to=""
              className="px-10 my-2"
              onClick={() => dispatch(toggleExitEdit(false))}
            >
              <p className="text-sm font-semibold md:text-base text-primary-light">
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
