import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuType from "../../../type/menu_type";

const Tabs = () => {
   return (
      <div className="relative mt-9 flex w-full justify-center items-center">
         <div className="flex gap-12">
            {tabs.map((tab, index) => (
               <Tab data={tab} key={index} />
            ))}
         </div>
         <div className="absolute right-4 flex gap-12 items-center">
            {Links.map((link, index) => (
               <a href={link.href} target="blank">
                  <span className="font-semibold text-primary-default">
                     {link.label}
                  </span>
               </a>
            ))}
         </div>
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
      <div className={`px-4 py-2 ${isActive ? "border-b-4 border-b-primary-default" : " "}`}>
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
      label: "My Collections"
   }
]


const Links = [
   {
      href: "",
      label: "Help Center"
   },
   {
      href: "",
      label: "Guides"
   }
]
export default Tabs;