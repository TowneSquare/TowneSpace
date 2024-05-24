import { Link, useNavigate, useLocation } from 'react-router-dom';
import Menu from './menu';
import MenuType from '../../../type/menu_type';

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const isActive = location.pathname.includes('/maindeploy/overview');

  return (
    <>
      <div className="w-full h-auto md:h-[92px] flex flex-col md:flex-row justify-between items-center bg-gray-dark-2 px-2 md:px-12 py-4 md:py-0 gap-20 z-10">
        <div className="flex items-center gap-4 md:gap-12">
          <img
            src="/logo.svg"
            className="w-[165px] h-[28.5px] cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="">
            <Link to="">
              <p className="text-sm md:text-base text-primary-light font-semibold">
                Help Center
              </p>
            </Link>
          </div>
        </div>
        <div className="h-full flex items-center justify-between md:justify-normal md:gap-2">
          <Link
            to="/maindeploy/overview"
            className={`px-3 md:px-4 py-2 md:py-3 flex items-center ${isActive ? 'bg-primary-light/30 border-2 border-primary-light' : 'bg-none'} rounded-md`}
          >
            <span className="text-sm md:text-base font-bold text-center">
              Deployment overview
            </span>
          </Link>
          <div className="h-[51%] border-solid border-r border-[#666666]"></div>
          {Menus.map((menu, index) => (
            <Menu data={menu} key={index} />
          ))}
        </div>
        <div className="">
          <Link to="" className="flex-end">
            <p className="text-sm md:text-base text-primary-light font-semibold">
              Go to My Collections
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

const Menus: MenuType[] = [
  {
    href: '/maindeploy/manage',
    label: 'Traits',
  },
  {
    href: '/maindeploy/preview',
    label: 'Collection preview',
  },
  {
    href: '/maindeploy/artsettings',
    label: 'Settings',
  },
];
export default Header;
