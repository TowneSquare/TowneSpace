import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <label
      onClick={() => {
        onChange(!checked);
      }}
      className="inline-block relative w-[20px] h-[20px] "
    >
      <span
        className={`block w-full h-full rounded-md border-[1.5px] transition-colors duration-200 ${checked ? 'bg-primary-light' : 'bg-gray border-gray'} ${!checked ? 'hover:border-primary-light' : ''}`}
      >
        {checked && (
          <span className="absolute top-[6px] inset-0 flex items-center font-semibold text-sm justify-center text-white">
            <img alt="" src="/preview/checkarrow.svg" />
          </span>
        )}
      </span>
    </label>
  );
};

export default CustomCheckbox;
