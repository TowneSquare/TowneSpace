import { useState, Dispatch, SetStateAction, useEffect } from "react";
import FilterType from "../../../type/filter_type";
import { NftMetadataType } from "../../../type/nft_type";
import NftCard from "../../../components/nft_card";
import { useAppSelector } from "../../../state/hooks";

interface Props {
   filter: FilterType,
}
const Board: React.FC<Props> = ({ filter }) => {
   const NFTS = useAppSelector(state => state.nftsState.nfts.filter(nft => nft.type & filter));
   return (
      <div className="flex flex-wrap gap-10">
         {NFTS.map((nft, index) => (
            <NftCard data={nft} key={index} />
         ))}
      </div>
   )
}

export default Board;