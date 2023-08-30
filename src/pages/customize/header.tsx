import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import { useAppSelector } from "../../state/hooks";
import ButtonStatus from "../../type/button_status";
import { NftMetadataType } from "../../type/nft_type";

interface Props {
}
const Header: React.FC<Props> = ({  }) => {
   const navigation = useNavigate();
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const onClose = () => {
      navigation("/studio/mytoken")
   }
   return (
      <div className="relative h-[124px] mx-8 flex justify-center items-center">
         <div className="absolute left-0 w-4 h-4 cursor-pointer" onClick={() => onClose()}>
            <p className="text-2xl font-semibold">×</p>
         </div>
         <div>
            <p className="text-xl font-bold text-center">
               {currentNft ? currentNft.name : "unknown"}
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