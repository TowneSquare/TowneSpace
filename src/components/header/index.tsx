import { Link } from "react-router-dom";
import Search from "./search";
import Menu from "./menu";
import Address from "./address";

const Header = () => {
   return (
      <div className="w-full h-24 flex justify-between items-center bg-gray-light-2 border-b border-b-gray-light-3 px-12">
         <div className="flex items-center gap-12">
            <img src="logo.svg" className="w-12" />
            <Search />
         </div>
         <div className="h-full flex items-center gap-16">
            {Menus.map((menu, index) => (
               <Menu data={menu} key={index} />
            ))}
            <Address />
            <img className="w-8" src="/header/shopping-cart.svg" alt="bucket" />
         </div>
      </div>
   )
};

export interface MenuType{
   href: string;
   label: string;
}
const Menus: MenuType[] = [
   {
      href: "studio",
      label: "Studio"
   },
   {
      href: "collections",
      label: "Collections"
   }
]
export default Header;