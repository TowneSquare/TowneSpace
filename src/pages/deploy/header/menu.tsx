import { Link, useLocation } from 'react-router-dom';
import MenuType from '../../../type/menu_type';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  data: MenuType;
  index: number;
  menu: MenuType[];
  setMenu: Dispatch<SetStateAction<MenuType[]>>;
}
const Menu: React.FC<Props> = ({ data, index, menu, setMenu }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(data.href);
  
  useEffect(() => {
    if(isActive && menu[index].visited == false){
      menu[index].visited = true;
      setMenu([...menu]);
    }
  }, [isActive, index, menu, setMenu])
  return (
    <Link
      to={data.href}
      className={`px-3 md:px-4 py-2 md:py-3 flex items-center ${isActive ? 'bg-primary-light/30 border-2 border-primary-light' : 'bg-none'} rounded-md`}
    >
      <span className="text-sm font-bold text-center md:text-base">
        {data.label}
      </span>
      {!data.visited && <img src="/deploy/dot.svg" alt="" className='mb-4 ml-4' />}
    </Link>
  );
};

export default Menu;
