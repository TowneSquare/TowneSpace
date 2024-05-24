import { Link, useLocation } from 'react-router-dom';
import MenuType from '../../../type/menu_type';

interface Props {
  data: MenuType;
}
const Menu: React.FC<Props> = ({ data }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(data.href);

  return (
    <Link
      to={data.href}
      className={`px-3 md:px-4 py-2 md:py-3 flex items-center ${isActive ? 'bg-primary-light/30 border-2 border-primary-light' : 'bg-none'} rounded-md`}
    >
      <span className="text-sm md:text-base font-bold text-center">
        {data.label}
      </span>
    </Link>
  );
};

export default Menu;
