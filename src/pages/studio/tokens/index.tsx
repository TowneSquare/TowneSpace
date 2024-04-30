import { useState } from "react";
import Filter from "./filter";
import FilterType from "../../../type/filter_type";
import Board from "./board";
import CollectionPanel from "./collection_panel";

const Tokens = () => {
   const [filter, setFilter] = useState<FilterType>(FilterType.composable);

   return (
      <div className="px-2 md:px-8 py-[50px]">
         <Filter filter={filter} setFilter={setFilter} />
         <div className="flex flex-col md:flex-row gap-10 mt-16">
            <CollectionPanel />
            <Board filter={filter} />
         </div>
      </div>
   )
}

export default Tokens;