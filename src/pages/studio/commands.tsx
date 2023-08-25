import PrimaryButton from "../../components/primary_button";
import ButtonStatus from "../../type/button_status";

const Commands = () => {
   return (
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 items-center">
         <div className="flex gap-2 md:gap-12">
            <PrimaryButton type={ButtonStatus.active} className="px-16 py-3">
               Create
            </PrimaryButton>
            <PrimaryButton type={ButtonStatus.active} className="px-12 py-3">
               Migrate NFTs
            </PrimaryButton>
         </div>
      </div>
   )
}

export default Commands;