import Header from "./header";

const Screen3 = () => {
   return (
      <div className="pb-10">
         <Header />
         <p className="mt-10 text-xl text-center">
            Let’s first upload images that will serve as the traits for<br /> your new PFP collection
         </p>
         <div className="mx-[250px] mt-24 p-6 flex gap-10 bg-gray-dark-2 rounded-md">
            <div className="w-1/2">
               <p className="text-3xl">
                  Upload Folder with assets
               </p>
               <p className="font-bold mt-4">
                  Please upload a single folder that contains subfolders with traits.
                  <br /><br />
                  Each subfolder should include all the variants of each trait type (e.g. all the hair trait images should be inside the Hair subfolder, etc)
                  <br /><br />
                  Need help? Download our Example assets folder or read our Guidelines
               </p>
            </div>
            <div className="">
               <p className="font-semibold text-center">
                  Required Upload Folder structure
               </p>
               <img src="/create/folder-structure.svg" className="mt-6" alt="structure" />
            </div>
         </div>
         <div className="mx-[250px] mt-16 py-[140px] flex flex-col justify-center items-center border border-dashed border-gray-light-1 rounded-md">
            <img src="/create/folder.svg" alt="folder" />
            <p className="text-xl font-semibold mt-5">
               Drop your folder here
            </p>
            <p className="">
               or &nbsp;<span className="text-primary-light font-semibold">choose a folder</span>&nbsp; to upload
            </p>
         </div>
      </div>
   )
}

export default Screen3;