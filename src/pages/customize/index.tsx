import { useParams } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import Header from "./header";
import Preview from "./preview";
import Tokens from "./tokens";
import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";
import SecondaryButton from "../../components/secondary_button";
import Trait from "./trait";

const Customize = () => {
   const { address } = useParams();
   const data = useAppSelector(state => {
      let result = state.tokensState.nfts.filter(nft => nft.address == address)
      return result.length > 0 ? result[0] : undefined;
   });

   return (
      <div>
         <Header data={data} />
         <div className="px-2 md:px-[150px] flex gap-6">
            <Preview data={data} />
            <div className="flex flex-col gap-4 items-center">
               <Tokens data={data} />
               <SecondaryButton type={ButtonStatus.active} className="w-40">
                  + Add Trait
               </SecondaryButton>
            </div>
            <Trait data={data}/>
         </div>
      </div>
   )
}

export default Customize;