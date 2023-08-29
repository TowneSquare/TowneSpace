import { useEffect, useState } from "react";
import { NftMetadataType } from "../../type/nft_type";
import { NFTS } from "../../state/constants";
import { useAppDispatch } from "../../state/hooks";
import { chooseTrait } from "../../state/tokens";

interface Props {
   data: NftMetadataType | undefined
}
const Tokens: React.FC<Props> = ({ data }) => {
   const [tokens, setTokens] = useState<NftMetadataType[]>([]);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (data?.object_tokens) {
         let tokens: NftMetadataType[] = [];
         data?.object_tokens.forEach(address => {
            let token = NFTS.filter((nft) => nft.address == address)
            if (token.length > 0)
               tokens.push(token[0])
         });
         setTokens(tokens);;
      }
   }, [data?.object_tokens])

   const onChooseTrait = (address: string) => {
      dispatch(chooseTrait(address))
   }
   return (
      <div className="p-4 w-[30vw] flex flex-col gap-4 border border-gray-dark-1 rounded-md">
         {tokens.map((token, index) => (
            <div className="p-2 flex items-center gap-4 bg-gray-dark-2 hover:bg-gray-light-3 rounded-md cursor-pointer"
               onClick = {() => onChooseTrait(token.address)}
            >
               <img src="/customize/indicator.svg" alt="indicator" />
               <div className="w-20 h-20 bg-gray-dark-1 rounded-md">
                  <img src={token.uri} alt="uri" className="w-full h-full" />
               </div>
               <div className="">
                  <div className="flex gap-2">
                     <p className="text-[14px] text-gray-light-1 font-semibold">
                        {data?.collection}
                     </p>
                     <img src="/nft-card/polygon-check.svg" alt="check" />
                  </div>
                  <p className="text-[14px] text-gray-light-1 font-semibold pt-4">
                     {token.collection}
                  </p>
                  <p className="text-[14px] font-semibold">
                     {token.name}
                  </p>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Tokens;