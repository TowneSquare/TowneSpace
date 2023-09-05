import { useNavigate } from "react-router-dom";
import Header from "./header"
import { useAppSelector } from "../../../state/hooks";
import FolderType from "../../../type/folder_type";

const Screen4 = () => {
   const navigate = useNavigate();
   const traits = useAppSelector(state => state.createState.traits);

   return (
      <div className="pb-10">
         <Header />
         <p className="text-xl text-center">
            Check how are you assets named and how they look like.<br />
            If there are errors, you can always &nbsp;
            <span className="text-primary-light cursor-pointer" onClick={() => navigate("/create/step3")}>upload them again</span>
         </p>
         <div className="mt-16 flex flex-col gap-8">
            {traits.map((trait, index) => (
               <Trait data={trait} key={index} />
            ))}
         </div>
      </div>
   )
};

const Trait = ({ data }: { data: FolderType }) => {
   return (
      <div className="px-32">
         <div className="w-full flex justify-between">
            <p className="text-xl font-semibold">
               {data.name}
            </p>
            <p>{data.files.length} Traits</p>
         </div>
         <div className="mt-4 flex flex-wrap gap-4">
            {data.files.map((file, index) => (
               <div className="w-32 rounded-md">
                  <div className="h-32 bg-gray-light-3 rounded-md">
                     <img src={file.imageUrl} alt="image" className="w-32 h-32" />
                  </div>
                  <p className="mt-2 text-center">
                     {file.name}
                  </p>
               </div>
            ))}
         </div>
      </div>
   )
}
export default Screen4;