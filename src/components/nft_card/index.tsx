import { useNavigate } from "react-router-dom";
import { NftMetadataType, NftType } from "../../type/nft_type";
import { isUriEmpty } from "../../util";
import { useAppDispatch } from "../../state/hooks";
import { chooseNft } from "../../state/tokens";
import { useEffect, useState } from "react";

interface Props {
   data: NftMetadataType
}
const NftCard: React.FC<Props> = ({ data }) => {
   const navigation = useNavigate();
   const dispatch = useAppDispatch();
   const onCustomize = () => {
      if (data.token_standard == "v2") {
         dispatch(chooseNft(data))
         navigation(`/customize/${data.address}`);
      }
   }
   const [tokenImage, setTokenImage] = useState("");
   
   useEffect(() => {
      // React advises to declare the async function directly inside useEffect
      async function getTokenImage() {
         if(data.current_token_data.token_uri.includes("ipfs://")) {
            let cid = data.current_token_data.token_uri.replace("ipfs://", "");
            let ipfsGatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
      
            const result = await fetch(ipfsGatewayUrl)
            const json = await result.json()
            if(json.image && json.image.includes("ipfs://")) {
               cid = json.image.replace("ipfs://", "");
               let _tokenImageUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
               setTokenImage(_tokenImageUrl);
            } else {
               setTokenImage(json.image)
            }
         } else {
            setTokenImage(data.current_token_data.token_uri);
         }
      };
      getTokenImage();
    }, []);
    
   return (
      <div className="group w-[140px] md:w-[167px] bg-gray-dark-2 rounded-lg cursor-pointer">
         <div className="relative h-[132px] md:h-[156px] bg-gray-light-2 rounded-t-lg">
            {!isUriEmpty(tokenImage) &&
               <img src={tokenImage} className="w-full h-full rounded-t-[8px]" alt="nft" />
            }
            <div className="group/3dots hidden group-hover:flex flex-col absolute w-6 h-6 justify-center items-center top-2 right-2 hover:bg-black rounded-full z-10">
               <img src="/nft-card/3dots.svg" alt="3dots" />
               <div className="hidden group-hover/3dots:block absolute top-6 right-0 ">
                  <div className="w-full h-2" />
                  <div className="py-2 rounded-lg bg-white">
                     <p className="px-2 text-[10px] md:text-[13px] text-gray-dark-2 hover:bg-gray-light-2 whitespace-nowrap ">
                        See on TowneSpace
                     </p>
                     <div className="mt-2 h-px bg-gray-dark-2" />
                     <p className="px-2 mt-2 text-[10px] md:text-[13px] text-gray-dark-2  hover:bg-gray-light-2" onClick={() => onCustomize()}>
                        Customize
                     </p>
                  </div>
               </div>
            </div>
            <div className="absolute flex left-1 bottom-1">
               {data.token_standard == "v2" &&
                  <img src="/nft-card/v2-badge.svg" alt="v2-badge" />
               }
               {data.object_tokens && data.object_tokens.length > 0 &&
                  <img src="/nft-card/composed.svg" alt="composed" />
               }
            </div>
            <div className="hidden group-hover:block absolute inset-0 bg-black opacity-50" />

         </div>
         <div className="mx-2 my-2">
            <div className="flex items-center gap-2 text-xs md:text-[14px] font-semibold text-gray-light-1">
               {data.current_token_data.current_collection.collection_name}
               {/* <img src="/nft-card/polygon-check.svg" alt="check" /> */}
            </div>
            <p className="text-base md:text-lg font-semibold">
               {data.current_token_data.token_name}
            </p>
            <div className="mt-3 flex gap-2">
               <img src="/nft-card/aptos-logo.svg" alt="logo" />
               <p className="text-sm md:text-base font-semibold">
                  {data.price}
               </p>
            </div>
         </div>
      </div>
   )
};

export default NftCard;