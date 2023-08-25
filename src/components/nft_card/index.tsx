import { NftMetadataType, NftType } from "../../type/nft_type";
import { isUriEmpty } from "../../util";

interface Props {
   data: NftMetadataType
}
const NftCard: React.FC<Props> = ({ data }) => {
   return (
      <div className="w-[167px] bg-gray-dark-2 rounded-lg">
         <div className="relative h-[156px] bg-gray-light-2 rounded-t-lg overflow-hidden">
            {!isUriEmpty(data.uri) &&
               <img src={data.uri} className="w-full h-full" alt="nft" />
            }
            <div className="absolute top-2 right-2">
               <img src="/nft-card/3dots.svg" alt="3dots" />
            </div>
            <div className="absolute flex left-1 bottom-1">
               {data.type == NftType.nftv2 &&
                  <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
               }
               {data.object_tokens && data.object_tokens.length > 0 &&
                  <img src="/nft-card/composed.svg" alt="composed" />
               }
            </div>
         </div>
         <div className="mx-2 my-2">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-gray-light-1">
               {data.collection}
               <img src="/nft-card/polygon-check.svg" alt="check" />
            </div>
            <p className="text-lg font-semibold">
               {data.name}
            </p>
            <div className="mt-3 flex gap-2">
               <img src="/nft-card/aptos-logo.svg" alt="logo" />
               <p className="font-semibold">
                  {data.price}
               </p>
            </div>
         </div>
      </div>
   )
};

export default NftCard;