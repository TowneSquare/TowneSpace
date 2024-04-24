import { useNavigate } from "react-router-dom";
import Menu from "./menu";
import ConnectButton from "./connect_button";
import { useEffect, useState } from "react";

const Header = () => {
   const navigate = useNavigate();
   const [show, toggleShow] = useState(false);

   const [pathname, setPathname] = useState('');

   useEffect(() => {
      setPathname(window.location.pathname);
   }, []);

   const openStudio = () => {
      navigate("/studio");
  }

   return (
      <>
         {pathname == '/' ?
            <div className={`flex w-full h-[92px] justify-between items-center bg-gray-dark-3 px-12 gap-4 z-10`}>
               <div className="flex items-center gap-4 md:gap-12">
                  <img src="/logo.svg" className="w-[228px] h-[40px] cursor-pointer" onClick={() => navigate("/")} />
               </div>
               <button className="md:flex flex-col hidden bg-primary-default rounded-[40px] w-[242px] md:w-[196px] h-[48px] items-center justify-center" onClick={() => openStudio()}>
                  <p className="font-[500] text-[16px]">Creator studio</p>
               </button>
            </div>
            :
            <div className={`flex w-full h-[92px] justify-between items-center bg-gray-dark-2 px-12 gap-4 z-10`}>
               <div className="flex items-center gap-4 md:gap-12">
                  <img src="/logo.svg" className="w-[228px] h-[40px] cursor-pointer" onClick={() => navigate("/")} />
               </div>
               <div className=" flex gap-14">
                  <Menu data={{
                     href: "/migrate",
                     label: "Migrate"
                  }} />
                  <ConnectButton />
               </div>
            </div>
         }
      </>
   )
};

export default Header;