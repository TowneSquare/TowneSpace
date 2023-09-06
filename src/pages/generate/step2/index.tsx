import { Link } from "react-router-dom";
import ChooseTrait from "./choose_trait";
import Header from "./header";
import TokenPreview from "./token_preview";
import Tokens from "./tokens";

const Step2 = () => {
   return (
      <div>
         <Header />
         <div className="flex gap-7 justify-center items-center">
            <p className="text-2xl font-semibold">
               Collection preview
            </p>
            <Link to="/deploy/preview">
               <p className="font-semibold text-primary-light">Edit</p>
            </Link>
         </div>
         <div className="mt-8 px-6 flex gap-4">
            <ChooseTrait />
            <Tokens />
            <TokenPreview />
         </div>
      </div>
   )
};

export default Step2;