import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DeployModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-80 flex items-center justify-center">
      <div className="rounded-3xl w-1/3 bg-[#121212]">
        <div className="flex justify-between bg-[#1C1C1C] p-4 rounded-t-3xl  items-center ">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p onClick={onClose} className="cursor-pointer text-4xl font-[200]">
            ×
          </p>
        </div>
        <div className=" py-10 text-center">{children}</div>
      </div>
    </div>
  );
};

export default DeployModal;
