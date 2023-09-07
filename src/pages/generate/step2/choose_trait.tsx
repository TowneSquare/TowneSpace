import { useAppSelector } from "../../../state/hooks";

const ChooseTrait = () => {
   const traits = useAppSelector(state => state.createState.traits);

   return (
      <div className="min-w-[230px] flex flex-col gap-2 md:gap-4">
         {traits.map((trait, index) => (
            <div className="" key={index}>
               <p className="text-sm md:text-base font-semibold">{trait.name}</p>
               <div className="flex flex-col gap-1">
                  {trait.files.map((file, index)=>(
                     <div className="flex gap-2" key={index}>
                        <input type="checkbox" />
                        <p className="text-sm md:text-base ">{file.name}</p>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
};

export default ChooseTrait;