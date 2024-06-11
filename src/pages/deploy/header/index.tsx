import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu';
import MenuType from '../../../type/menu_type';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuType[]>(Menus);

  return (
    <>
      <div className="w-full h-auto md:h-[92px] flex flex-col md:flex-row justify-normal items-center bg-gray-dark-2 px-2 md:px-12 py-4 md:py-0 gap-20 z-10">
        <div className="flex items-center gap-4 md:gap-12">
          <img
            src="/logo.svg"
            className="w-[165px] h-[28.5px] cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="">
            <Link to="">
              <p className="text-sm font-semibold md:text-base text-primary-light">
                Help Center
              </p>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between h-full md:justify-normal md:gap-2">
          {Menus.map((data, index) => (
            <Menu data={data} key={index} index={index} menu={menu} setMenu={setMenu}/>
          ))}
        </div>
      </div>
    </>
  );
};
export default Header;

const Menus =  [
  { label: 'Manage', href: '/deploy/manage', visited: false },
  { label: 'Collection Preview', href: '/deploy/preview', visited: false },
  { label: 'Settings', href: '/deploy/settings', visited: false },
  { label: 'Deploy', href: '/deploy/generate', visited: false },
];