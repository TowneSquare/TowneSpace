import { useEffect, useState } from "react";
import Filter from "./filter";
import FilterType from "../../../type/filter_type";
import Board from "./board";
import CollectionPanel from "./collection_panel";
import { useAppDispatch } from "../../../state/hooks";
import { fetchNfts } from "../../../state/nfts";
import { fetchCollections } from "../../../state/collections";

const Tokens = () => {
   const [filter, setFilter] = useState<FilterType>(FilterType.all);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchNfts());
      dispatch(fetchCollections());
   }, []);
   return (
      <div className="px-2 md:px-8 py-[50px]">
         <Filter filter={filter} setFilter={setFilter} />
         <div className="flex gap-10 mt-16">
            <CollectionPanel />
            <Board filter={filter} />
         </div>
      </div>
   )
}

export default Tokens;