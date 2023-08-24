import { useState } from "react";
import Filter from "./filter";
import FilterType from "../../../type/filter_type";
import Board from "./board";

const Tokens = () => {
   const [filter, setFilter] = useState<FilterType>(FilterType.all);

   return (
      <div className="px-[150px] py-[50px]">
         <Filter filter={filter} setFilter={setFilter}/>
         <Board filter={filter} />
      </div>
   )
}

export default Tokens;