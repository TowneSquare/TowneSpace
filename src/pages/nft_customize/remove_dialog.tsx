import { useAppDispatch, useAppSelector } from '../../state/hooks';
import React from 'react';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import {
  toggleRemoveTrait,
  toggleRemoveTraitConfirm,
} from '../../state/dialog';

const RemoveDialog = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bTraitRemove);
  const isD = useAppSelector((state) => state.dialogState.bRemoveTraitConfirm);

  const dispatch = useAppDispatch();

  const onHandleModal = () => {
    dispatch(toggleRemoveTrait(false));
    dispatch(toggleRemoveTraitConfirm(true));
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-dark-2 bg-opacity-80 flex items-center justify-center">
        <div className="rounded-lg w-1/4 bg-gray-dark-4">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">
              Remove trait from Slothian #9898{' '}
            </h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleRemoveTrait(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex mt-4 p-2 mx-4 text-center flex-col justify-center items-center gap-6">
            <img src="/customize/banner.png" alt="" />
            <p>
              Do you want to remove Crown #7821 from Slothian #9898?Crown #7821
              will be transferred back to your wallet.
            </p>
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={onHandleModal}
              className="px-10 my-6 w-1/2"
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
