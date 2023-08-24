import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuType from "../../../type/menu_type";

const Tabs = () => {
   return (
      <div className="mt-10 md:mt-[175px] flex justify-center gap-8">
         {tabs.map((tab, index) => (
            <Tab data={tab} key={index} />
         ))}
      </div>
   )
}

interface Props {
   data: MenuType
};

const Tab: React.FC<Props> = ({ data }) => {
   const [isActive, setActive] = useState(false);
   const location = useLocation();

   useEffect(() => {
      if (location.pathname.includes(data.href))
         setActive(true);
      else
         setActive(false)
   }, [location.pathname, data])

   return (
      <div className={`py-2 ${isActive ? "border-b-4" : " "}`}>
         <Link to={data.href}>
            <h1 className={`text-xl leading-[150%] ${isActive ? "font-bold" : ""}`}>
               {data.label}
            </h1>
         </Link>
      </div>
   )
}
const tabs = [
   {
      href: "/studio/mytoken",
      label: "My Tokens"
   },
   {
      href: "/studio/mycollect",
      label: "My Colletions"
   }
]
export default Tabs;