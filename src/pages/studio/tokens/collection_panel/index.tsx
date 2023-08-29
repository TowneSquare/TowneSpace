import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { chooseCollection, fetchNfts } from "../../../../state/tokens";
import Search from "./search";

const CollectionPanel = () => {
   const COLLECTIONS = useAppSelector(state => state.tokensState.collections);
   const collectionIndex = useAppSelector(state => state.tokensState.collectionIndex);
   const dispatch = useAppDispatch();

   const onChooseCollection = (index: number) => {
      dispatch(chooseCollection(index));
   }
   return (
      <div className="w-auto md:w-[300px] flex flex-col gap-4">
         <Search />
         {COLLECTIONS.map((data, index) => (
            <div
               className={`px-2 py-2 flex items-center gap-2 rounded-md hover:bg-gray-dark-1 cursor-pointer ${index == collectionIndex ? "bg-gray-dark-2" : ""}`}
               key={index}
               onClick= {() => onChooseCollection(index)}
            >
               <img src={data.uri} className="" alt="uri" />
               <span className="font-medium">{data.name}</span>
               <img src="/nft-card/polygon-check.svg" alt="check" />
            </div>
         ))}
      </div>
   )
};

export default CollectionPanel;