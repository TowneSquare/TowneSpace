import { useNavigate } from "react-router-dom";
import Header from "./header"
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updatePrimaryTrait } from "../../../state/create";
import { Fragment } from "react";

const Screen6 = () => {
   const navigate = useNavigate();
   const traits = useAppSelector(state => state.createState.traits);
   const primaryTrait = useAppSelector(state => state.createState.primaryTrait);
   const dispatch = useAppDispatch();

   return (
      <div className="pb-10">
         <Header />
         <p className="text-base md:text-xl text-center">
            Select which trait will become the Primary NFT, the NFT <br />that will hold other Trait NFTs.&nbsp;
            <span className="text-primary-light">Learn more</span>
         </p>
         <div className="mt-16 flex flex-col md:flex-row justify-center gap-2 md:gap-8">
            <div className="min-w-max p-4 md:w-[30vw] flex flex-col gap-4 rounded-md">
               {traits.map((trait, index) => {
                  const isActive = trait.name == primaryTrait?.name;
                  const bg = isActive ? "bg-primary-dark border border-primary-light" : "bg-gray-dark-2 hover:bg-gray-dark-1";
                  return (
                     <div
                        className={`h-14 p-2 flex justify-between items-center gap-4 ${bg} rounded-md`}
                        key={index}
                        onClick={() => dispatch(updatePrimaryTrait(trait))}
                     >
                        <p className="text-sm md:text-base font-semibold">
                           {trait.name}
                        </p>
                        {isActive &&
                           <img src="/create/check.svg" alt="check" />
                        }
                     </div>
                  )
               })}
            </div>
            <div className="p-4 w-[340px] rounded-md">
               <p className="text-sm md:text-base">{primaryTrait?.name} will be the Primary NFT</p>
               <div className="w-340px bg-gray-light-3 rounded-md">
                  <img src={primaryTrait?.files[0].imageUrl} alt="img" className="mt-4 w-full" />
               </div>
               <p className="mt-4 text-sm md:text-base text-center">{primaryTrait?.name}</p>
            </div>
            <div className="p-4">
               <p className="text-sm md:text-base">Other traits will be placed inside the Primary NFT</p>
               <div className="flex flex-wrap gap-4 mt-4">
                  {traits.map((trait, index) => {
                     const isActive = trait.name == primaryTrait?.name;
                     return (
                        <Fragment key={index}>
                           {!isActive &&
                              <div className="w-32 rounded-md" key={index}>
                                 <div className="h-32 bg-gray-light-3 rounded-md">
                                    <img src={trait.files[0].imageUrl} alt="image" className="w-32 h-32" />
                                 </div>
                                 <p className="mt-2 text-sm md:text-base text-center">
                                    {trait.name}
                                 </p>
                              </div>
                           }
                        </Fragment>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
};

export default Screen6;