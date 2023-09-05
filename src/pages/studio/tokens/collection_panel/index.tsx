import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { chooseCollection } from "../../../../state/tokens";
import { NftMetadataType } from "../../../../type/nft_type";
import Search from "./search";

const CollectionPanel = () => {
   const collections = useAppSelector(state => state.tokensState.collections);
   const currentCollection = useAppSelector(state => state.tokensState.currentCollection);
   const dispatch = useAppDispatch();

   const onChooseCollection = (collection: NftMetadataType) => {
      dispatch(chooseCollection(collection));
   }
   return (
      <div className="w-auto md:w-[300px] flex flex-col gap-4">
         <Search />
         {collections.map((collection, index) => (
            <div
               className={`px-2 py-2 flex items-center gap-2 rounded-md hover:bg-gray-dark-1 cursor-pointer ${collection.address == currentCollection?.address ? "bg-gray-dark-2" : ""}`}
               key={index}
               onClick= {() => onChooseCollection(collection)}
            >
               <img src={collection.uri} className="" alt="uri" />
               <span className="font-medium">{collection.name}</span>
               <img src="/nft-card/polygon-check.svg" alt="check" />
            </div>
         ))}
      </div>
   )
};

export default CollectionPanel;