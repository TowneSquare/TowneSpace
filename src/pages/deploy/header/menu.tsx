import { Link, useLocation } from 'react-router-dom';
import MenuType from '../../../type/menu_type';

interface Props {
  data: MenuType;
  currentItem: number;
  currentStep: number;
}
const Menu: React.FC<Props> = ({ data, currentItem, currentStep }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(data.href);
  
  return (
    <Link
      to={data.href}
      className={`px-3 md:px-4 py-2 md:py-3 flex items-center ${isActive ? 'bg-primary-light/30 border-2 border-primary-light' : 'bg-none'} rounded-md`}
    >
      <span className="text-sm font-bold text-center md:text-base">
        {data.label}
      </span>
      {currentItem +1 > currentStep && <img src="/deploy/dot.svg" alt="" className='mb-4 ml-4' />}
    </Link>
  );
};

export default Menu;
