import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { createCanvas } from 'canvas';

import Header from "./header"
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updatePrimaryTrait } from "../../../state/create";

const Screen6 = () => {
   const navigate = useNavigate();
   const traits = useAppSelector(state => state.createState.traits);
   const primaryTrait = useAppSelector(state => state.createState.primaryTrait);
   const dispatch = useAppDispatch();

   return (
      <div className="pb-10">
         <Header onNext={() => { }} />
         <p className="text-xl text-center">
            Select which trait will become the Primary NFT, the NFT <br />that will hold other Trait NFTs.&nbsp;
            <span className="text-primary-light">Learn more</span>
         </p>
         <div className="mt-16 flex justify-center gap-8">
            <div className="p-4 w-[30vw] flex flex-col gap-4 rounded-md">
               {traits.map((trait, index) => {
                  const isActive = trait.name == primaryTrait?.name;
                  const bg = isActive ? "bg-primary-dark border border-primary-light" : "bg-gray-dark-2 hover:bg-gray-dark-1";
                  return (
                     <div
                        className={`h-14 p-2 flex justify-between items-center gap-4 ${bg} rounded-md`}
                        key={index}
                        onClick={() => dispatch(updatePrimaryTrait(trait))}
                     >
                        <p className="font-semibold">
                           {trait.name}
                        </p>
                        {isActive &&
                           <img src="/create/check.svg" alt="check" />
                        }
                     </div>
                  )
               })}
            </div>
            <div className="w-[340px] rounded-md">
               <p className="">{primaryTrait?.name} will be the Primary NFT</p>
               <div className="w-340px bg-gray-light-3 rounded-md">
                  <img src={primaryTrait?.files[0].imageUrl} alt="img" className="mt-4 w-full" />
               </div>
               <p className="mt-4">{primaryTrait?.name}</p>
            </div>
            <div className="">
               <p className="t">Other traits will be placed inside the Primary NFT</p>
               <div className="flex flex-wrap gap-4 mt-4">
                  {traits.map((trait, index) => {
                     const isActive = trait.name == primaryTrait?.name;
                     return (
                        <>
                           {!isActive &&
                              <div className="w-32 rounded-md" key={index}>
                                 <div className="h-32 bg-gray-light-3 rounded-md">
                                    <img src={trait.files[0].imageUrl} alt="image" className="w-32 h-32" />
                                 </div>
                                 <p className="mt-2 text-center">
                                    {trait.name}
                                 </p>
                              </div>
                           }
                        </>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
};

export default Screen6;