import { Icon } from '@iconify/react';
import Header from '../../components/header';
import Footer from '../home/items/footer';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="flex my-8 w-full px-[25px]">
        <div
          onClick={() => {
            navigate('/');
          }}
          className="flex gap-1 cursor-pointer"
        >
          <Icon icon={'ion:arrow-back'} fontSize={24} />
          <div className="text-[16px] font-medium text-white">Back</div>
        </div>
      </div>
      <div className="flex flex-col items-center sm:mt-16">
        <img
          src="./home/responsive-mobile.png"
          className="w-[295px] h-[187px]"
        />
        <div className="flex flex-col w-[80%] sm:w-[605px] gap-3 mt-[55px] mb-32 sm:mb-44">
          <p className="test-[20px] text-white font-semibold">
            Please switch to a laptop or a desktop device
          </p>
          <p className="test-[18px] text-white font-normal">
            TowneSpace Studio is currently not supported for mobile or tablet.
            Please switch to a laptop or desktop device to use the studio.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RedirectPage;
