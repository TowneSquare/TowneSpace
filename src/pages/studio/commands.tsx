import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";

const Commands = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 items-center">
         <div className="flex gap-2 md:gap-12">
            <PrimaryButton type={ButtonStatus.active} className="!px-12 py-3" onClick={() => navigate('/create')}>
               Create
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Commands;