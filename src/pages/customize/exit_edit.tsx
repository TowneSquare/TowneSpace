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
      {/* dialog bg */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        {/* dialog */}
        <div className="w-[553px] border rounded-lg bg-gray-dark-4 border-gray-light-3">
          {/* dialog header */}
          <div className="flex items-center justify-between m-6">
            <h2 className="text-xl font-semibold">Exit & discard changes</h2>
            <button
              className="w-6 h-6 text-gray-700"
              onClick={() => dispatch(toggleExitEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          {/* dialog body */}
          <div className="flex flex-col items-center justify-center mx-auto my-10 text-center w-100">
            <p className='text-xl'>
              Note that all the changes you have made to the cNFT will be
              discarded
            </p>
          </div>
          <div className="flex items-center justify-between px-12 mb-6">
            <Link
              to=""
              className="my-2"
              onClick={() => dispatch(toggleExitEdit(false))}
            >
              <p className="text-sm font-medium md:text-lg text-primary-light">
                Continue editing
              </p>
            </Link>
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={() => {
                navigate('/studio/mytoken');
                dispatch(toggleExitEdit(false));
              }}
              className="px-10 my-2"
            >
              <p className='text-sm font-medium md:text-lg'>Exit & discard changes</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitEdit;
