import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";
import { useDispatch } from "react-redux";
import { toggleCreateModal } from "../../state/dialog";

const Commands = () => {
   const dispatch = useDispatch();
   return (
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 items-center">
         <div className="flex gap-2 md:gap-12">
            <PrimaryButton type={ButtonStatus.active} className="!px-12 py-3" onClick={() => dispatch(toggleCreateModal(true)) }>
               Create
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Commands;