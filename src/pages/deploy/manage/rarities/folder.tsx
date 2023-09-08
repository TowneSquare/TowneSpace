import FolderType from "../../../../type/folder_type";

interface Props {
   data: FolderType
}
const Folder: React.FC<Props> = ({ data }) => {
   return (
      <div className="px-6 py-4 bg-gray-dark-2 rounded-md">
         <div className="flex items-center justify-between">
            <p className="text-base md:text-xl font-semibold">{data.name}</p>
            <p className="text-sm md:text-base">{data.files.length} Traits</p>
         </div>
         <div className="mt-8 flex flex-col gap-10 md:gap-4">
            {data.files.map((file, index) => (
               <div className="flex items-center" key={index}>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-10">
                     <div className="flex gap-2 md:gap-10">
                        <div className="flex gap-4 items-center">
                           <div className="bg-gray-light-1 rounded-md">
                              <img src={file.imageUrl} alt="image" className="w-14 h-14" />
                           </div>
                           <p className="text-sm md:text-base w-20">{file.name}</p>
                        </div>
                        <div className="flex items-center gap-2 md:gap-10">
                           <input type="range" className="md:w-[250px]" />
                           <div className="px-4 py-2 flex items-center gap-2 border border-gray-light-1 rounded-full">
                              <input className="w-10 md:w-20 h-6 md:h-8 placeholder-gray-light-3 focus-visible:outline-0" placeholder="25%"
                                 style={{ background: "none" }} />
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-10">
                        <div className="flex">
                           <div className="w-12 h-11 flex justify-center items-center border-l border-t border-b border-primary-light rounded-l-full bg-primary-dark/30">
                              <p className="text-xl">%</p>
                           </div>
                           <div className="w-12  h-11 flex justify-center items-center border rounded-r-full bg-primary-dark/30">
                              <p className="text-xl">#</p>
                           </div>
                        </div>
                        <p className="text-sm md:text-base">25%</p>
                        <p className="text-sm md:text-base">500</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
export default Folder;