import { useState, Dispatch, SetStateAction } from "react";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";
import FilterType from "../../../type/filter_type";

interface Props {
   filter: number;
   setFilter: Dispatch<SetStateAction<number>>
}
const Filter: React.FC<Props> = ({filter, setFilter}) => {
   return (
      <div className="flex justify-center">
         <div className="flex p-1 bg-gray-dark-3 rounded-full">
            <PrimaryButton type={filter == 0 ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(0)} className="w-[120px]">
               Slothians
            </PrimaryButton>
            <PrimaryButton type={filter == 1 ? ButtonStatus.active : ButtonStatus.inactive} onClick={() => setFilter(1)}>
               Other collections
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Filter;