import { useState, Dispatch, SetStateAction } from "react";
import Button from "../../../components/button";
import ButtonStatus from "../../../type/button_status";
import FilterType from "../../../type/filter_type";

interface Props{
   filter: FilterType,
   setFilter: Dispatch<SetStateAction<FilterType>>
}
const Filter: React.FC<Props> = ({filter, setFilter}) => {
   return (
      <div className="flex gap-3">
         <Button type={filter == FilterType.all ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(FilterType.all)}>
            All
         </Button>
         <Button type={filter == FilterType.nft ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(FilterType.nft)}>
            NFTs
         </Button>
         <Button type={filter == FilterType.nftv2 ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(FilterType.nftv2)}>
            NFTs v2
         </Button>
      </div>
   )
}

export default Filter;