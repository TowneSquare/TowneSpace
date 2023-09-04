import { useNavigate } from "react-router-dom";
import Header from "./header"
import { useAppSelector } from "../../../state/hooks";
import { FileType } from "../../../type/folder_type";

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
            {Object.keys(traits).map((key, index) => (
               <Trait name={key} data={traits[key]} key={index} />
            ))}
         </div>
      </div>
   )
};

const Trait = ({ name, data }: { name: string, data: FileType[] }) => {
   return (
      <div className="px-32">
         <div className="w-full flex justify-between">
            <p className="text-xl font-semibold">
               {name}
            </p>
            <p>{data.length} Traits</p>
         </div>
         <div className="mt-4 flex flex-wrap gap-4">
            {data.map((file, index) => (
               <div className="w-32 rounded-md">
                  <img src={file.imageUrl} alt="image" className="w-32 h-32" />
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