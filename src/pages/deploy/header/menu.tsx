import { Link, useLocation } from "react-router-dom";
import MenuType from "../../../type/menu_type";

interface Props {
   data: MenuType
}
const Menu: React.FC<Props> = ({ data }) => {
   const location = useLocation();
   const isActive = location.pathname.includes(data.href);

   return (
      <Link to={data.href} className={`py-3 flex items-center px-4 ${isActive ? "bg-primary-light/30 border-2 border-primary-light" : "bg-none"} rounded-md`}>
         <span className="font-bold">{data.label}</span>
      </Link>
   )
}

export default Menu;