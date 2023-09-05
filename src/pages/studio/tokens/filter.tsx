import { Dispatch, SetStateAction } from "react";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";
import FilterType from "../../../type/filter_type";

interface Props {
   filter: FilterType,
   setFilter: Dispatch<SetStateAction<FilterType>>
}
const Filter: React.FC<Props> = ({ filter, setFilter }) => {
   return (
      <div className="flex justify-center">
         <div className="flex bg-gray-dark-2 rounded-full">
            <PrimaryButton type={filter == FilterType.all ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(FilterType.all)} className="w-[120px]">
               All
            </PrimaryButton>
            <PrimaryButton type={filter == FilterType.nft ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(FilterType.nft)} className="w-[120px]">
               NFTs
            </PrimaryButton>
            <PrimaryButton type={filter == FilterType.nftv2 ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(FilterType.nftv2)}>
               Composable NFTs (V2)
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Filter;