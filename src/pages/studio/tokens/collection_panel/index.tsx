import getCollections from "../../../../state/collections";
import { useAppSelector } from "../../../../state/hooks";
import Search from "./search";

const CollectionPanel = () => {
   const COLLECTIONS = useAppSelector(state => state.collectionsState.collections);
   
   return (
      <div className="w-auto md:w-[300px] flex flex-col gap-4">
         <Search />
         {COLLECTIONS.map((data, index) => (
            <div className="px-2 py-2 flex items-center gap-2 rounded-md hover:bg-gray-dark-1 cursor-pointer" key={index}>
               <img src={data.uri} className="" alt="uri" />
               <span className="font-medium">{data.collection}</span>
               <img src="/nft-card/polygon-check.svg" alt="check" />
            </div>
         ))}
      </div>
   )
};

export default CollectionPanel;