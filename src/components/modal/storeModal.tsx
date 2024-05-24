import { useState } from 'react';
import ButtonStatus from '../../type/button_status';
import PrimaryButton from '../primary_button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoreModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute -right-[215px] px-4 w-[404px] h-[133px] bg-gray-dark-2 border border-gray-light-3 rounded-[8px]">
      <p className="text-[16px] py-6">You have unsaved changes</p>
      <div className="flex w-full justify-between">
        <PrimaryButton
          type={ButtonStatus.active}
          className="text-[16px] !px-4 bg-[#222223] border-[#FFFFFF] border hover:bg-[#222342]"
        >
          Discard changes
        </PrimaryButton>
        <PrimaryButton
          type={ButtonStatus.active}
          className="text-[16px] !px-4 mr-2 "
        >
          Save & apply changes
        </PrimaryButton>
      </div>
    </div>
  );
};

export default StoreModal;
