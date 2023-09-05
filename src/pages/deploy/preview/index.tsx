import ChooseTrait from "./choose_trait";
import Navbar from "./navbar";
import TokenPreview from "./token_preview";
import Tokens from "./tokens";

const Preview = () => {
   return (
      <div>
         <Navbar />
         <div className="mt-8 px-6 flex gap-4">
            <ChooseTrait />
            <Tokens />
            <TokenPreview />
         </div>
      </div>
   )
};

export default Preview;