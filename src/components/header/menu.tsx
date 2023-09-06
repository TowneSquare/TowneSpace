import { Link, useLocation } from "react-router-dom"
import MenuType from "../../type/menu_type";

interface Props {
   data: MenuType
}
const Menu: React.FC<Props> = ({ data }) => {
   const location = useLocation();
   const isActive = location.pathname.includes(data.href);

   return (
      <Link to={data.href} className={`h-full flex items-center px-4 ${isActive ? "text-primary-light" : "bg-none"}`}>
         <span className="font-bold">{data.label}</span>
      </Link>
   )
}

export default Menu;