import FilterType from "../../../type/filter_type";
import NftCard from "../../../components/nft_card";
import { useAppSelector } from "../../../state/hooks";
import { NFT_COLLECTION_OWNED_ID_QUERY } from "../../../util";
import { useQuery } from "@apollo/client";
import { NftMetadataType } from "../../../type/nft_type";

interface Props {
   filter: FilterType,
}
const Board: React.FC<Props> = ({ filter }) => {
   const currentCollection = useAppSelector(state => state.tokensState.currentCollection)
   
   const { loading, error, data } = useQuery(NFT_COLLECTION_OWNED_ID_QUERY, {
      variables: { wallet: "0x239589c5cfb0cc96f76fa59165a7cbb6ef99ad50d0acc34cf3a2585d861511be", offset: 0, collectionId: currentCollection?.collection_id },
   });
   if(loading) {
      return null;
   }
   
   return (
      <div className="flex flex-wrap gap-10 items-baseline">
         {
            data?.current_token_ownerships_v2.length > 0 ?
            data?.current_token_ownerships_v2.map((nft: NftMetadataType, index: number) => (
               filter == "nfts" && (nft.token_standard == "v1" || nft.token_standard == "v2") ? <NftCard data={nft} key={index} /> : null
            ))
            :
            null
         }
      </div>
   )
}

export default Board;