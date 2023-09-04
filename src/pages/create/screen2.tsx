import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/primary_button";
import PrimaryInput from "../../components/primary_input";
import ButtonStatus from "../../type/button_status";
import { useAppDispatch } from "../../state/hooks";
import { updateCollectionName, updateTotalMaxSupply } from "../../state/create";

const Screen2 = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   return (
      <div className="w-full h-screen flex justify-center items-center">
         <div className="md:w-[512px] p-6 bg-gray-dark-1 rounded-md">
            <div className="flex justify-between">
               <p className="text-xl font-semibold">Create Collection</p>
               <div className="w-4 h-6 cursor-pointer" onClick={() => navigate("/studio")}>
                  <p className="text-2xl font-semibold">×</p>
               </div>
            </div>
            <div className="px-8 pt-14">
               <p>
                  Insert a collection name and total supply for your Dynamic PFPs
               </p>
               <p className="pt-4">Collection Name</p>
               <PrimaryInput className="mt-2" onChange={(e) => dispatch(updateCollectionName(e.target.value))}/>
               <p className="pt-4">Token max supply</p>
               <PrimaryInput className="mt-2" onChange={(e) => dispatch(updateTotalMaxSupply(e.target.value))}/>
            </div>
            <div className="flex justify-center mt-14">
               <PrimaryButton type={ButtonStatus.active} onClick={() => navigate("/create/step3")}>
                  Continue
               </PrimaryButton>
            </div>
         </div>
      </div>
   )
}

export default Screen2;