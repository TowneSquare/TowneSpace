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
    <div className="fixed inset-0 bg-gray-dark-2 bg-opacity-50 flex items-center justify-center">
      <div className="rounded-lg w-1/3 bg-gray-dark-4">
        <div className="flex justify-between m-6 items-center border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-700">
            &times;
          </button>
        </div>
        <div className="mt-6 p-6 text-center">{children}</div>
      </div>
    </div>
  );
};

export default DeployModal;
