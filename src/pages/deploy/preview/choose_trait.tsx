import { useAppSelector } from "../../../state/hooks";

const ChooseTrait = () => {
   const traits = useAppSelector(state => state.createState.traits);

   return (
      <div className="min-w-[230px] flex flex-col gap-4">
         {traits.map((trait, index) => (
            <div className="" key={index}>
               <p className="font-semibold">{trait.name}</p>
               <div className="flex flex-col gap-1">
                  {trait.files.map((file, index)=>(
                     <div className="flex gap-2">
                        <input type="checkbox" />
                        <p className="">{file.name}</p>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
};

export default ChooseTrait;