import FilterType from "../../../type/filter_type";
import NftCard from "../../../components/nft_card";
import { useAppSelector } from "../../../state/hooks";

interface Props {
   filter: FilterType,
}
const Board: React.FC<Props> = ({ filter }) => {
   const NFTS = useAppSelector(state => state.tokensState.nfts.filter(nft => nft.type & filter));
   return (
      <div className="flex flex-wrap gap-10">
         {NFTS.map((nft, index) => (
            <NftCard data={nft} key={index} />
         ))}
      </div>
   )
}

export default Board;