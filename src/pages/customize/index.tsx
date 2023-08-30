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
import { useEffect } from "react";
import { NFTS } from "../../state/constants";
import { chooseNft } from "../../state/tokens";
import RemovePanel from "./remove_panel";

const Customize = () => {
   const { address } = useParams();
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!currentNft) {
         let res = NFTS.filter(nft => nft.address == address)
         if (res.length > 0)
            dispatch(chooseNft(res[0]))
      }
   }, [address])
   return (
      <div className="relative">
         <Header />
         <div className="px-2 md:px-[150px] flex gap-6">
            <Preview />
            <div className="flex flex-col gap-4 items-center">
               <Tokens />
               <SecondaryButton type={ButtonStatus.active} className="w-40">
                  + Add Trait
               </SecondaryButton>
            </div>
            <Trait />
         </div>
         <ReplacePanel />
         <RemovePanel />
      </div>
   )
}

export default Customize;