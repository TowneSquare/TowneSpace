interface Props {
  className?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: any) => void;
}
const PrimaryInput: React.FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <input
        className={`${className} w-full px-4 py-2 rounded-full font-semibold bg-black border border-bg-gray-dark-3`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default PrimaryInput;
