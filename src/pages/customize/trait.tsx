import { useAppDispatch, useAppSelector } from "../../state/hooks";
import SecondaryButton from "../../components/secondary_button";
import ButtonStatus from "../../type/button_status";
import { toggleRemovePanel, toggleTraitPanel } from "../../state/dialog";

interface Props {
}
const Trait: React.FC<Props> = ({ }) => {
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const currentTrait = useAppSelector(state => state.tokensState.currentTrait);
   const dispatch = useAppDispatch();

   const onReplaceTrait = () => {
      dispatch(toggleTraitPanel(true));
   }
   const onRemoveTrait = () => {
      dispatch(toggleRemovePanel(true));
   }
   return (
      <>
         {currentTrait ?
            <div className="md:w-[30vw] mx-4 md:mx-0 px-4 lg:px-10 py-10 flex flex-col rounded-md bg-gray-dark-2">
               <div className="w-48 md:w-52 lg:w-64 h-48 md:h-52 lg:h-64 bg-gray-dark-1 rounded-md">
                  <img src={currentTrait.uri} alt="uri" className="w-full h-full" />
               </div>
               <div className="flex gap-2 mt-4">
                  <p className="text-[14px] text-gray-light-1 font-semibold">
                     {currentNft?.collection}
                  </p>
                  <img src="/nft-card/polygon-check.svg" alt="check" />
               </div>
               <p className="text-[14px] text-gray-light-1 pt-4 font-semibold">
                  {currentTrait.collection}
               </p>
               <p className="text-[14px] font-semibold">
                  {currentTrait.name}
               </p>
               <p className="text-[14px] mt-4">
                  NFT Description lorem ipsum dolro sit amet qot lorem ipsum dolro sit amet qot
               </p>
               <SecondaryButton type={ButtonStatus.active} className="mt-4 flex justify-center" onClick={() => onReplaceTrait()}>
                  <div className="flex gap-2">
                     <img src="/customize/replace.svg" alt="replace" />
                     <span>Replace Trait</span>
                  </div>
               </SecondaryButton>
               <SecondaryButton type={ButtonStatus.active} className="mt-4 flex justify-center" onClick={() => onRemoveTrait()}>
                  <div className="flex gap-2">
                     <img src="/customize/remove.svg" alt="replace" />
                     <span>Remove Trait</span>
                  </div>
               </SecondaryButton>
               <div className="flex items-center gap-2 mt-2">
                  <img src="/customize/alert.svg" alt="alert" />
                  <p className="text-[14px]">
                     Removed item is transferred back to your wallet
                  </p>
               </div>
            </div>
            :
            <div className="w-full md:w-[30vw] h-[100vh] flex flex-col justify-center items-center rounded-md bg-gray-dark-2">
               <img src="/customize/non-trait.svg" alt="trait" />
               <p className="font-semibold text-center mt-4">
                  Select a Trait to replace it or<br />
                  remove it from the NFT
               </p>
            </div>
         }
      </>
   )
}

export default Trait;