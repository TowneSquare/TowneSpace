import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";

const Screen1 = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const navigate = useNavigate();
   return (
      <div className="w-full h-screen flex justify-center items-center">
         <div className="w-full lg:max-w-[50%] mx-4 min-h-[50%] flex">
            <div className="md:w-1/3 bg-gray-dark-2 px-2 md:px-6 py-10">
               <p className="text-2xl md:text-3xl text-white font-bold">Create</p>
               <div className="mt-20">
                  {Menus.map((menu, index) => (
                     <div className={`h-24 px-2 md:px-4 flex items-center text-sm md:text-base hover:text-primary-light whitespace-nowrap ${currentIndex == index ? "bg-gray-light-3" : ""} rounded-md cursor-pointer`}
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                     >
                        {menu.label}
                     </div>
                  ))}
               </div>
            </div>
            <div className="w-full flex flex-col">
               <img src="/create/dynamic-background.webp" alt="background" />
               <div className="px-6 py-6 flex flex-col gap-4 justify-end bg-gray-dark-1">
                  <p className="text-2xl md:text-3xl font-bold white">
                     Dynamic PFP
                  </p>
                  <p className="text-base md:text-xl">
                     Dynamic PFPs will change their appearance based on their traits and metadata changes.
                  </p>
                  <div className="w-full flex items-center gap-8 justify-end">
                     <Link to="/">
                        <p className="text-sm md:text-base text-primary-light font-semibold whitespace-nowrap">
                           Learn More
                        </p>
                     </Link>
                     <PrimaryButton type={ButtonStatus.active} onClick={() => navigate("/create/step2")}>
                        Create
                     </PrimaryButton>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Screen1;

const Menus = [
   {
      href: "/",
      label: "Dynamic PFP"
   },
   {
      href: "/",
      label: "Game NFTs"
   },
]