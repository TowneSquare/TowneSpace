import { useNavigate } from "react-router-dom";
import { NftMetadataType, NftType } from "../../type/nft_type";
import { isUriEmpty } from "../../util";
import { useAppDispatch } from "../../state/hooks";
import { chooseNft } from "../../state/tokens";

interface Props {
   data: NftMetadataType
}
const NftCard: React.FC<Props> = ({ data }) => {
   const navigation = useNavigate();
   const dispatch = useAppDispatch();
   const onCustomize = () => {
      if (data.type == NftType.nftv2) {
         dispatch(chooseNft(data))
         navigation(`/customize/${data.address}`);
      }
   }
   return (
      <div className="group w-[167px] bg-gray-dark-2 rounded-lg cursor-pointer">
         <div className="relative h-[156px] bg-gray-light-2 rounded-t-lg">
            {!isUriEmpty(data.uri) &&
               <img src={data.uri} className="w-full h-full" alt="nft" />
            }
            <div className="group/3dots hidden group-hover:flex flex-col absolute w-6 h-6 justify-center items-center top-2 right-2 hover:bg-black rounded-full z-10">
               <img src="/nft-card/3dots.svg" alt="3dots" />
               <div className="hidden group-hover/3dots:block absolute top-6 right-0 ">
                  <div className="w-full h-2" />
                  <div className="py-2 rounded-lg bg-white">
                     <p className="px-2 text-[13px] text-gray-dark-2 hover:bg-gray-light-2 whitespace-nowrap ">
                        See on TowneSpace
                     </p>
                     <div className="mt-2 h-px bg-gray-dark-2" />
                     <p className="px-2 mt-2 text-[13px] text-gray-dark-2  hover:bg-gray-light-2" onClick={() => onCustomize()}>
                        Customize
                     </p>
                  </div>
               </div>
            </div>
            <div className="absolute flex left-1 bottom-1">
               {data.type == NftType.nftv2 &&
                  <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
               }
               {data.object_tokens && data.object_tokens.length > 0 &&
                  <img src="/nft-card/composed.svg" alt="composed" />
               }
            </div>
            <div className="hidden group-hover:block absolute inset-0 bg-black opacity-50" />

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