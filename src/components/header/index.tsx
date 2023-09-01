import { Link, useNavigate } from "react-router-dom";
import Search from "./search";
import Menu from "./menu";
import Address from "./address";
import MenuType from "../../type/menu_type";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { toggleWalletPanel } from "../../state/dialog";
import WalletButtons from "../../wallet-adapter/WalletButtons";
import ConnectButton from "./connect_button";

const Header = () => {
   const isOpen = useAppSelector(state => state.dialogState.bWalletPanel);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   return (
      <>
         <div className="w-full h-auto md:h-[92px] flex flex-col md:flex-row justify-normal md:justify-between items-center bg-gray-dark-2 px-2 md:px-12 py-4 md:py-0 gap-4 z-10">
            <div className="flex items-center gap-4 md:gap-12">
               <img src="/logo.svg" className="w-[154.42px] h-[16.65px] cursor-pointer" onClick={() => navigate("/")} />
               <Search />
            </div>
            <div className="h-full flex items-center justify-between md:justify-normal md:gap-12">
               {Menus.map((menu, index) => (
                  <Menu data={menu} key={index} />
               ))}
               <ConnectButton />
               <Address />
               <img className="w-8" src="/header/shopping-cart.svg" alt="bucket" />
            </div>
         </div>
         <div className={`${isOpen ? "block" : "hidden"} absolute z-10 inset-0 flex justify-center items-center bg-[#00000050]`}>
            <div className="relative w-[400px]  bg-gray-dark-2 border-gray-light-3 rounded-md p-8">
               <p className="text-2xl font-bold text-center">Connect your wallet</p>
               <p className="px-10 font-semibold text-center mt-4">Connect an Aptos wallet from the list or create a new one</p>
               <WalletButtons />
               <p className="text-sm font-semibold text-center mt-8 leading-[200%]">
                  By connecting your wallet, you agree to the &nbsp;
                  <span className="text-primary-dark">Terms & Conditions</span>
                  &nbsp; and &nbsp;
                  <span className="text-primary-dark">Privacy Policy</span>
               </p>
               <div className="absolute top-6 right-6 w-4 h-4 cursor-pointer" onClick={() => dispatch(toggleWalletPanel(false))}>
                  <p className="text-3xl font-bold">×</p>
               </div>
            </div>
         </div>
      </>
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