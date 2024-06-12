import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="inline-block relative w-5 h-5">
      <input
        type="checkbox"
        className="opacity-0 absolute w-full h-full cursor-pointer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`block w-full h-full rounded-md border-2 transition-colors duration-200  ${
          checked ? 'bg-primary-light' : 'bg-gray border-gray'
        }`}
      ></span>
    </label>
  );
};

export default CustomCheckbox;