import { Link, useLocation } from 'react-router-dom';
import MenuType from '../../../type/menu_type';

const Menus = () => {
  return (
    <div className="md:w-52 flex flex-col gap-4">
      {MENUS.map((menu, index) => (
        <Menu data={menu} key={index} />
      ))}
    </div>
  );
};
interface Props {
  data: MenuType;
}
const Menu: React.FC<Props> = ({ data }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(data.href);
  return (
    <Link to={data.href}>
      <p
        className={`p-4 ${isActive ? 'text-primary-light bg-gray-dark-1' : ''} rounded-md`}
      >
        {data.label}
      </p>
    </Link>
  );
};
export default Menus;

export const MENUS: MenuType[] = [
  {
    label: 'Manage traits',
    href: '/deploy/manage/traits',
  },
  {
    label: 'Rarities',
    href: '/deploy/manage/rarities',
  },
];
