import { NftMetadataType } from "../../type/nft_type";

interface Props {
   data: NftMetadataType | undefined
}
const Preview: React.FC<Props> = ({ data }) => {
   return (
      <div className="w-[264px]">
         <div className="h-[264px rounded-lg overflow-hidden">
            <img src={data?.uri} className="w-full h-full" alt="uri" />
         </div>
         <div className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-gray-light-1">
            {data?.collection}
            <img src="/nft-card/polygon-check.svg" alt="check" />
         </div>
         <p className="text-lg font-semibold">
            {data?.name}
         </p>
      </div>
   )
};

export default Preview;