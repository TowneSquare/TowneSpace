import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Header from "./header";
import Preview from "./preview";
import Tokens from "./tokens";
import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";
import SecondaryButton from "../../components/secondary_button";
import Trait from "./trait";
import ReplacePanel from "./replace_panel";
import { useEffect, useState } from "react";
import { NFTS } from "../../state/constants";
import { chooseNft } from "../../state/tokens";
import RemovePanel from "./remove_panel";

const Customize = () => {
   const { address } = useParams();
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!currentNft && address) {
         let res = NFTS.filter(nft => nft.address == address)
         if (res.length > 0)
            dispatch(chooseNft(res[0]))
      }
   }, [address]);

   return (
      <div className="relative">
         <Header />
         <div className="px-2 md:px-[150px] flex justify-center gap-6">
            <Preview />
            {currentNft?.object_tokens && currentNft.object_tokens.length > 0 ?
               <>
                  <div className="flex flex-col gap-4 items-center">
                     <Tokens />
                     <SecondaryButton type={ButtonStatus.active} className="w-40">
                        + Add Trait
                     </SecondaryButton>
                  </div>
                  <Trait />
               </>
               :
               <>
                  <div className="w-[30vw] py-[100px] flex flex-col gap-10 justify-center items-center border border-gray-light-2 rounded-md">
                     <img src="/customize/haveno-trait.svg" alt="haveno-trait" />
                     <p className="text-xl font-semibold text-gray-light-2 text-center">
                        {currentNft?.name} doesn't have<br /> any Trait NFTs
                     </p>
                     <p className="text-lg font-semibold text-gray-light-2 text-center -mt-4">
                           When you add Trait NFTs,<br /> they will appear here
                        </p>
                     <SecondaryButton type={ButtonStatus.active} className="w-40">
                        + Add Trait
                     </SecondaryButton>
                  </div>
               </>
            }
         </div>
         <ReplacePanel />
         <RemovePanel />
      </div>
   )
}

export default Customize;