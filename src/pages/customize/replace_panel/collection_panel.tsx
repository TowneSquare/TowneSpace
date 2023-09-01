import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { NftMetadataType } from "../../../type/nft_type";
import { NFTS, TRAITS } from "../../../state/constants";
import ButtonStatus from "../../../type/button_status";
import PrimaryButton from "../../../components/primary_button";
import { toggleTraitPanel } from "../../../state/dialog";
import { chooseNewTrait } from "../../../state/tokens";

const CollectionPanel = () => {
   const currentTrait = useAppSelector(state => state.tokensState.currentTrait);
   const dispatch = useAppDispatch();
   const [traitCollection, setTraitCollection] = useState(TRAITS[0]);
   const [newTrait, setNewTrait] = useState<NftMetadataType | undefined>(undefined);

   const [traitTokens, setTraitTokens] = useState<NftMetadataType[] | undefined>(undefined);
   useEffect(() => {
      let res = NFTS.filter(nft => nft.collection == traitCollection.collection);
      setTraitTokens(res);
      setNewTrait(undefined);

   }, [traitCollection]);

   const traitCollections = TRAITS.map(trait => {
      return ({
         collection: trait,
         traitCount: NFTS.filter(nft => nft.collection == trait.collection).length
      })
   })
   const onSave = () => {
      if (newTrait) {
         dispatch(chooseNewTrait(newTrait));
         dispatch(toggleTraitPanel(false));
      }
   }
   return (
      <>
         <div className="flex gap-4 mt-12">
            <div>
               {traitCollections.map((trait, index) => (
                  <div
                     className={`h-16 px-4 py-2 flex items-center hover:bg-gray-light-1 ${traitCollection.collection == trait.collection.collection ? "bg-gray-light-1" : ""} rounded-md`}
                     key={index}
                     onClick={() => setTraitCollection(trait.collection)}
                  >
                     {`${trait.collection.collection}(${trait.traitCount})`}
                  </div>
               ))}
            </div>
            <div className="flex flex-wrap gap-4">
               {traitTokens?.map((token, index) => (
                  <div className={`w-36 p-2 rounded-md ${newTrait?.address == token.address ? "bg-gray-dark-1" : ""}`} 
                  key={index}
                  onClick={() => setNewTrait(token)}>
                     <div className="h-32 bg-gray-light-3 hover:bg-gray-light-2 rounded-md overflow-hidden">
                        <img src={token.uri} alt="token" className="w-32 h-32" />
                     </div>
                     <div className="flex gap-4">
                        <p className="">{token.collection}</p>
                        <img src="/nft-card/polygon-check.svg" alt="check" />
                     </div>
                     <p className="text-lg font-semibold">
                        {token.name}
                     </p>
                  </div>
               ))}
            </div>
         </div>
         <div className="absolute bottom-4 px-10 w-full flex justify-between">
            <PrimaryButton type={ButtonStatus.active} onClick={() => dispatch(toggleTraitPanel(false))}>
               Cancel
            </PrimaryButton>
            <PrimaryButton type={ButtonStatus.active} onClick={() => onSave()}>
               Save
            </PrimaryButton>
         </div>
      </>
   )
};

export default CollectionPanel;