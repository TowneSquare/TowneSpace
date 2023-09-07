import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";

interface Props {
}
const Header: React.FC<Props> = ({ }) => {
   const navigate = useNavigate();
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const onClose = () => {
      navigate("/studio")
   }
   return (
      <div className="relative h-[124px] mx-4 md:mx-8 flex justify-center items-center">
         <div className="absolute left-0 w-4 h-4 cursor-pointer" onClick={() => onClose()}>
            <p className="text-2xl font-semibold">×</p>
         </div>
         <div>
            <p className="text-xl font-bold text-center">
               Upload assets
            </p>
            <p className="text-center">
               Set up - Step 2 of  4
            </p>
         </div>
         <div className="absolute right-0">
            <PrimaryButton type={ButtonStatus.active} className="px-10" onClick={() => navigate("/create/step5")}>
               Next
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Header;