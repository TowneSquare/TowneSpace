import { useState } from 'react';
import ButtonStatus from '../../type/button_status';
import PrimaryButton from '../primary_button';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { toggleSettingModal } from '../../state/dialog';
interface Props {
  onsave: () => void;
}
const StoreModal = ({ onsave }: Props) => {
  const isOpen = useAppSelector((state) => state.dialogState.bSetModal);
  const dispatch = useAppDispatch();
  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute -right-[215px] px-4 w-[404px] h-[133px] bg-gray-dark-2 border border-gray-light-3 rounded-[8px]">
        <p className="text-[16px] py-6">You have unsaved changes</p>
        <div className="flex justify-between w-full">
          <PrimaryButton
            type={ButtonStatus.active}
            className="text-[16px] !px-4 bg-[#222223] border-[#FFFFFF] border hover:bg-[#222342]"
            onClick={() => {
              dispatch(toggleSettingModal(false));
            }}
          >
            Discard changes
          </PrimaryButton>
          <PrimaryButton
            type={ButtonStatus.active}
            onClick={onsave}
            className="text-[16px] !px-4 mr-2 "
          >
            Save & apply changes
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
