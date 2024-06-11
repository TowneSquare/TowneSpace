import { Link, useNavigate } from 'react-router-dom';
import Menu from './menu';
import MenuType from '../../../type/menu_type';
import { updateStep } from '../../../state/deploy';
import { useAppSelector } from '../../../state/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  stepNumber: number;
}

const Header: React.FC<Props> = ({ stepNumber }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useAppSelector((state) => state.deployState.step);

  const handleStep = () => {
    navigate(Menus[stepNumber].href);
  }
  useEffect(() => {
    dispatch(updateStep(stepNumber));
  }, [stepNumber]);

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
        <div className="flex items-center justify-between h-full md:justify-normal md:gap-2" onClick={handleStep}>
          {Menus.map((menu, index) => (
            <Menu data={menu} currentItem={index} currentStep={currentStep} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const Menus: MenuType[] = [
  {
    href: '/deploy/manage',
    label: 'Manage',
  },
  {
    href: '/deploy/preview',
    label: 'Collection Preview',
  },
  {
    href: '/deploy/settings',
    label: 'Settings',
  },
  {
    href: '/deploy/generate',
    label: 'Deploy',
  },
];
export default Header;
