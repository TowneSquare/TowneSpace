import { NftMetadataType, NftType } from "../../type/nft_type";
import { isUriEmpty } from "../../util";

interface Props {
   data: NftMetadataType
}
const NftCard: React.FC<Props> = ({ data }) => {
   return (
      <div className="w-[167px]">
         <div className="relative h-[156px] bg-gray-light-2">
            {!isUriEmpty(data.uri) &&
               <img src={data.uri} className="w-full h-full" alt="nft" />
            }
            <div className="absolute top-2 right-2">
               <img src="/nft-card/3dots.svg" alt="3dots" />
            </div>
            <div className="absolute bottom-2 right-2">
               {data.type == NftType.nft ?
                  <img src="/nft-card/v1-badge.svg" alt="v1-badge" />
                  :
                  <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
               }
            </div>
            {data.object_tokens && data.object_tokens.length > 0 &&
               <div className="absolute bottom-8 right-2">
                  <img src="/nft-card/composed.svg" alt="composed" />
               </div>
            }
         </div>
         <div className="mt-2 flex items-center gap-2 text-[13px]">
            {data.collection}
            <img src="/nft-card/circle-check.svg" alt="check" />
         </div>
         <p className="text-lg font-bold">
            {data.name}
         </p>

         <p className="mt-3 text-lg font-bold">
            {data.price} APT
         </p>
      </div>
   )
};

export default NftCard;