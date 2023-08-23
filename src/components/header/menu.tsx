import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import MenuType from "../../type/menu_type";

interface Props {
   data: MenuType
}
const Menu: React.FC<Props> = ({ data }) => {
   const [isActive, setActive] = useState(false);
   const location = useLocation();

   useEffect(() => {
      if (location.pathname.includes(data.href))
         setActive(true);
      else
         setActive(false)
   }, [location.pathname, data])

   return (
      <Link to={data.href} className={`h-full flex items-center px-4 ${isActive ? "bg-gray-light-4" : "bg-none"}`}>
         <span className="font-bold">{data.label}</span>
      </Link>
   )
}

export default Menu;