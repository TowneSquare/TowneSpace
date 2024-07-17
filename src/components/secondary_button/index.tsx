import ButtonStatus from '../../type/button_status';

interface Props {
  children: any;
  type: ButtonStatus;
  className?: string;
  onClick?: () => void;
}
const SecondaryButton: React.FC<Props> = ({
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
          className={`${className} px-6 py-2 rounded-full text-sm md:text-base font-semibold bg-gray-dark-1 hover:bg-white/30 active:bg-gray-dark-1 whitespace-nowrap border border-white`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button
          className={`${className} px-6 py-2 rounded-full text-sm md:text-base font-semibold bg-transparent hover:bg-gray-dark- whitespace-nowrap`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default SecondaryButton;
