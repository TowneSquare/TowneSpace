import { Link } from "react-router-dom";
import Search from "./search";
import Menu from "./menu";
import Address from "./address";
import MenuType from "../../type/menu_type";

const Header = () => {
   return (
      <div className="w-full h-auto md:h-[92px] flex flex-col md:flex-row justify-normal md:justify-between items-center bg-gray-dark-2 px-2 md:px-12 py-4 md:py-0 gap-4">
         <div className="flex items-center gap-4 md:gap-12">
            <img src="/logo.svg" className="w-12" />
            <Search />
         </div>
         <div className="h-full flex items-center justify-between md:justify-normal md:gap-12">
            {Menus.map((menu, index) => (
               <Menu data={menu} key={index} />
            ))}
            <Address />
            <img className="w-8" src="/header/shopping-cart.svg" alt="bucket" />
         </div>
      </div>
   )
};


const Menus: MenuType[] = [
   {
      href: "/studio",
      label: "Studio"
   },
   {
      href: "/collections",
      label: "Collections"
   }
]
export default Header;