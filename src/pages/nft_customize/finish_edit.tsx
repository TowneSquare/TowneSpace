import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { toggleFinishEdit } from '../../state/dialog';

const FinishEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bFinishEdit);
  console.log(isOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-dark-4 bg-opacity-80 flex items-center justify-center">
        <div className="rounded-lg w-2/6 bg-gray-dark-2 border-gray-light-3 border-2">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">Finish editing cNFT</h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex my-6 px-10 text-center flex-col justify-center items-center gap-6">
            <img src="/customize/banner.png" alt="" />
            <p className="mx-10">
              Click “Finish editing” to save all the changes made to Slothian
              #9898
            </p>
          </div>
          <div className="item-center flex justify-center items-center flex-col gap-2">
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={() => {
                navigate('/studio/mytoken');
                dispatch(toggleFinishEdit(false));
              }}
              className="px-10 my-2 "
            >
              Exit & discard changes
            </PrimaryButton>
            <Link
              to=""
              className="px-10 mb-8"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <p className="text-sm md:text-base text-primary-light font-semibold">
                Continue editing
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishEdit;
