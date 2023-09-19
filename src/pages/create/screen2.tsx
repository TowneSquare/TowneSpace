import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import PrimaryInput from "../../components/primary_input";
import ButtonStatus from "../../type/button_status";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateCollectionName, updateTotalMaxSupply } from "../../state/create";
import ToolTip from "../../components/tooltip";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Screen2 = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const collectionName = useAppSelector(
      (state) => state.createState.collectionName
   );
   const totalSupply = useAppSelector(
      (state) => state.createState.totalMaxSupply
   );


   const onContinue = () => {
      if(collectionName == "" || totalSupply == ""){
         toast.error("You should input collection name and total supply")
         return;
      }
      if (!/^[0-9]+$/.test(totalSupply))
         return;

      navigate("/create/step3");
   };
   return (
      <div
         className="relative w-full h-screen flex justify-center items-center !bg-cover"
         style={{
            background: "url('/create/background.webp')",
         }}
      >
         <div
            className="absolute left-3 top-3 w-10 h-10 flex justify-center items-center rounded-full bg-primary-light/50 hover:bg-primary-light/80 cursor-pointer"
            onClick={() => navigate("/studio")}
         >
            <p className="text-2xl font-semibold">×</p>
         </div>
         <div className="md:w-[512px] mx-4 p-6 bg-gray-dark-1 rounded-md">
            <div className="flex justify-center">
               <p className="text-base md:text-xl font-semibold text-center">
                  Create a new collection for your PFPs
               </p>
            </div>
            <div className="flex flex-col items-center px-4 md:px-8 pt-14">
               <p className="w-[80%] text-sm md:text-base text-center">
                  Name your collection and state how many PFPs do you want to
                  create
               </p>
               <div className="w-full pt-4">
                  <ToolTip label="This will be the official name of your cNFT collection which will appear by default on NFT marketplaces. Note that you can’t change the collection name after its deployed on the blockchain.">
                     <p className="text-sm md:text-base">
                        What is the collection’s name?
                     </p>
                  </ToolTip>
                  <PrimaryInput
                     className="mt-2"
                     placeholder="Slothians"
                     value={collectionName}
                     onChange={(e) =>
                        dispatch(updateCollectionName(e.target.value))
                     }
                  />
               </div>
               <div className="w-full pt-4">
                  <ToolTip label="This is the total number of Dynamic PFPs you will create in this collection.">
                     <p className="text-sm md:text-base">
                        How many Dynamic PFPs will the collection have?
                     </p>
                  </ToolTip>
                  <PrimaryInput
                     className="mt-2"
                     placeholder="10,000"
                     value={totalSupply}
                     mustNumber={true}
                     onChange={(e) =>
                        dispatch(updateTotalMaxSupply(e.target.value))
                     }
                  />
               </div>
            </div>
            <div className="flex justify-center mt-14">
               <PrimaryButton
                  type={ButtonStatus.active}
                  onClick={() => onContinue()}
               >
                  Continue
               </PrimaryButton>
            </div>
         </div>
      </div>
   );
};

export default Screen2;
