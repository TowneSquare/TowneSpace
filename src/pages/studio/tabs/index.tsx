import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuType from '../../../type/menu_type';

const Tabs = () => {
  return (
    <div className="relative flex items-center justify-center w-full mt-9">
      <div className="flex gap-12">
        {tabs.map((tab, index) => (
          <Tab data={tab} key={index} />
        ))}
      </div>
    </div>
  );
};

interface Props {
  data: MenuType;
}

const Tab: React.FC<Props> = ({ data }) => {
  const [isActive, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes(data.href)) setActive(true);
    else setActive(false);
  }, [location.pathname, data]);

  return (
    <div
      className={`px-4 py-2 ${isActive ? 'border-b-4 border-b-primary-default' : ' '}`}
    >
      <Link to={data.href}>
        <h1
          className={`lg:text-xl leading-[150%] ${isActive ? 'font-bold' : ''}`}
        >
          {data.label}
        </h1>
      </Link>
    </div>
  );
};
const tabs = [
  {
    href: '/studio/mytoken',
    label: 'My NFTs',
  },
  {
    href: '/studio/mycollect',
    label: 'My Collections',
  },
];

export default Tabs;
