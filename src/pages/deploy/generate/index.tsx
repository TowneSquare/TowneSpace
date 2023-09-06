import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/primary_button";
import ButtonStatus from "../../../type/button_status";

const Generate = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col gap-8 items-center mt-12">
         <div className="w-1/3 p-4 flex gap-8 border border-gray-light-3 rounded-md">
            <img src="/deploy/deploy-contract.png" alt="deploy" />
            <div className="py-4 flex flex-col justify-between">
               <div>
                  <p className="text-xl font-semibold">
                     Deploy contract
                  </p>
                  <p className="mt-1">
                     Deploy the contract to Aptos Tesnet or Mainnet.
                  </p>
               </div>
               <PrimaryButton type={ButtonStatus.active} className="px-1 w-[200px]"
                  onClick={() => navigate("/generate/step1")}
               >
                  Deploy Contract
               </PrimaryButton>
            </div>
         </div>
         <div className="w-1/3 p-4 flex gap-8 border border-gray-light-3 rounded-md">
            <img src="/deploy/download-assets.png" alt="deploy" />
            <div className="py-4 flex flex-col justify-between">
               <div>
                  <p className="text-xl font-semibold">
                     Download asset
                  </p>
                  <p className="mt-1">
                     Download the set of images that will be created upon minting through the smart contract.
                  </p>
               </div>
               <PrimaryButton type={ButtonStatus.active} className="px-1 w-[200px]">
                  Dowload assets
               </PrimaryButton>
            </div>
         </div>
      </div>
   )
};

export default Generate;