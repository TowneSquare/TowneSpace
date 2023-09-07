import { Link, useNavigate } from "react-router-dom";
import Menu from "./menu";
import MenuType from "../../../type/menu_type";

const Header = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className="w-full h-auto md:h-[92px] flex flex-col md:flex-row justify-normal md:justify-between items-center bg-gray-dark-2 px-2 md:px-12 py-4 md:py-0 gap-4 z-10">
            <div className="flex items-center gap-4 md:gap-12">
               <img src="/logo.svg" className="w-[154.42px] h-[16.65px] cursor-pointer" onClick={() => navigate("/")} />
            </div>
            <div className="h-full flex items-center justify-between md:justify-normal md:gap-2">
               {Menus.map((menu, index) => (
                  <Menu data={menu} key={index} />
               ))}
            </div>
            <div className="">
               <Link to="">
                  <p className="text-sm md:text-base text-primary-light font-semibold">
                     Help Center
                  </p>
               </Link>
            </div>
         </div>

      </>
   )
};


const Menus: MenuType[] = [
   {
      href: "/deploy/preview",
      label: "Collection Preview"
   },
   {
      href: "/deploy/manage",
      label: "Manage"
   },
   {
      href: "/deploy/settings",
      label: "Settings"
   },
   {
      href: "/deploy/generate",
      label: "Generate"
   }
]
export default Header;