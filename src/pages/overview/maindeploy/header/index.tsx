import PrimaryButton from '../../../../components/primary_button';
import ButtonStatus from '../../../../type/button_status';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const onClickBackTo = () => {
    navigate('/overview/view');
  };

  return (
    <div className="w-full h-auto md:h-[92px] flex flex-col md:flex-row justify-normal items-center bg-gray-dark-2 px-2 md:px-12 py-4 md:py-0 gap-20 z-10">
      <div className="flex justify-between gap-4 md:gap-12 cursor-pointer">
        <PrimaryButton
          onClick={() => {
            onClickBackTo();
          }}
          type={ButtonStatus.active}
          className="h-[40px] flex items-center justify-center border-solid border-2 border-[#FFFFFF] bg-[#222222] hover:bg-[#222233] cursor-pointer"
        >
          <img src="/deploy/arrow.svg" className="mr-[7px] cursor-pointer" />
          TESTNET
        </PrimaryButton>
      </div>
      <div className="absolute flex w-full justify-center">
        <p className="text-[20px] text-[#FFAD33] mr-12">
          This is a preview of your collection on Testnet
        </p>
      </div>
    </div>
  );
};

export default Header;
