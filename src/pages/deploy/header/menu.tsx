import { Link, useLocation } from 'react-router-dom';
import MenuType from '../../../type/menu_type';
import { toggleSetMenu } from '../../../state/dialog';
import { useAppDispatch } from '../../../state/hooks';
import { useAppSelector } from '../../../state/hooks';

interface Props {
  data: MenuType;
}
const Menu: React.FC<Props> = ({ data }) => {
  const stepStatus = useAppSelector((state) => state.dialogState.bStepManage);
  const location = useLocation();
  const isActive = location.pathname.includes(data.href);
  const dispatch = useAppDispatch();
  return (
    <Link
      onClick={() => { dispatch(toggleSetMenu(data.label)) }}
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
