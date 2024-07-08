import ButtonStatus from '../../type/button_status';

interface Props {
  children: any;
  type: ButtonStatus;
  className?: string;
  onClick?: () => void;
}
const PrimaryButton: React.FC<Props> = ({
  children,
  type,
  className,
  onClick,
}) => {
  const isActive = type == ButtonStatus.active;
  return (
    <>
      {type == ButtonStatus.active ? (
        <button
          className={`${className} px-6  py-2 rounded-full text-sm md:text-base font-semibold bg-primary-default hover:bg-primary-light active:bg-primary-dark whitespace-nowrap`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : type == ButtonStatus.disabled ? (
        <button
          className={`${className} px-6 py-2  rounded-full text-sm md:text-base font-semibold bg-transparent hover:bg-gray-dark- whitespace-nowrap`}
        >
          {children}
        </button>
      ) : (
        <button
          className={`${className} px-6 py-2 rounded-full text-sm md:text-base font-semibold bg-primary-light/40 hover:bg-gray-dark- whitespace-nowrap`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
