import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";
import { NftMetadataType } from "../../type/nft_type";

interface Props {
   data: NftMetadataType | undefined
}
const Header: React.FC<Props> = ({ data }) => {
   return (
      <div className="relative h-[124px] mx-8 flex justify-center items-center">
         <div className="absolute left-0">
            <p className="text-2xl font-semibold">×</p>
         </div>
         <div>
            <p className="text-xl font-bold text-center">
               {data ? data.name : "unknown"}
            </p>
            <p className="text-center">
               Select NFTs or crypto assets you want to put inside, replace or remove
            </p>
         </div>
         <div className="absolute right-0">
            <PrimaryButton type={ButtonStatus.active} className="px-10">
               Finish
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Header;