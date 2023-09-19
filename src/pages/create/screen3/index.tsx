import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import Header from "./header";
import FolderType, { FileType } from "../../../type/folder_type";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updateTraits } from "../../../state/create";
import { toast } from "react-toastify";
import { isSupportFile } from "../../../util";

type ExtendFile = File & { path: string };

const Screen3 = () => {
   const dispatch = useAppDispatch();
   const traits = useAppSelector((state) => state.createState.traits);
   const [loading, toggleLoading] = useState(false);

   const onFolderSelector = async () => {
      if (traits.length > 0) {
         dispatch(updateTraits([]));
      } else {
         const selector: any = document.getElementById("folder-selector");
         if (selector) selector.value = null;
         selector?.click();
      }
   };
   const onChangeFolder = (e: any) => {
      console.log(e);
      toggleLoading(true);
      setTimeout(() => {
         const files: ExtendFile[] = [...e];
         const traits: FolderType[] = [];
         files.forEach((file) => {
            let paths = (
               file.webkitRelativePath != ""
                  ? file.webkitRelativePath
                  : file.path
            )
               .replace(/^\//, "")
               .split("/");

            if (paths.length == 3) {
               const fileName = paths[2].split(".");
               if (
                  fileName.length >= 2 &&
                  isSupportFile(fileName[fileName.length - 1])
               ) {
                  const imageUrl = URL.createObjectURL(file);
                  const obj: FileType = {
                     name: paths[2].split(".")[0],
                     folderName: paths[1],
                     file,
                     imageUrl,
                     rarities: 50,
                     isIncluded: true,
                  };

                  let isNew = true;
                  for (let i = 0; i < traits.length; i++) {
                     if (traits[i].name == paths[1]) {
                        traits[i].files.push(obj);
                        isNew = false;
                        break;
                     }
                  }
                  if (isNew) {
                     traits.push({ name: paths[1], files: [obj] });
                  }
               }
            }
         });

         dispatch(updateTraits(traits));
         toggleLoading(false);

         if (traits.length > 0) {
            const elem = document.getElementById("folder");
            if (elem) {
               elem.style.border = "1px solid #CCCCCC";
               elem.style.background = "none";
            }
         } else {
            toast.error("Uploaded folder not prepared properly!")
         }
      }, 1000);
   };

   const onDragEnter = (e: any) => {
      const elem = document.getElementById("folder");
      if (elem) {
         elem.style.border = "3px solid #9264F8";
         elem.style.background = "#B882FF1A";
      }
   };
   const onDragLeave = (e: any) => {
      const elem = document.getElementById("folder");
      if (elem) {
         elem.style.border = "1px dashed #CCCCCC";
         elem.style.background = "none";
      }
   };
   const onDrop = useCallback((acceptedFiles: any[]) => {
      onChangeFolder(acceptedFiles);
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      onDragEnter,
      onDragLeave,
   });

   let fileCount = 0;
   traits.forEach((trait) => (fileCount += trait.files.length));

   return (
      <div className="pb-10">
         <Header />
         <div className="flex flex-col items-center">
            <p className="mt-10 w-full text-base md:text-xl text-center">
               Let’s first upload images that will serve as the traits for your
               new PFP collection
            </p>
            <div className="mt-16 px-10 md:px-0 flex flex-col md:flex-row gap-10">
               <div className="md:w-[650px] px-8 py-10 flex flex-col gap-10 bg-gray-dark-2 rounded-md">
                  <div className="">
                     <p className="text-2xl md:text-3xl">
                        Upload Folder with assets
                     </p>
                     <p className="text-sm md:text-base font-bold mt-4">
                        Please upload a single folder that contains subfolders
                        with traits.
                        <br />
                        <br />
                        Each subfolder should include all the variants of each
                        trait type (e.g. all the hair trait images should be
                        inside the Hair subfolder, etc)
                        <br />
                        <br />
                        Need help? Download our Example assets folder or read
                        our Guidelines
                     </p>
                  </div>
                  <div className="flex flex-col items-center">
                     <p className="text-sm md:text-base font-semibold text-center">
                        Required Upload Folder structure
                     </p>
                     <img
                        src="/create/folder-structure.svg"
                        className="mt-6"
                        alt="structure"
                     />
                  </div>
               </div>
               <div
                  id="folder"
                  {...getRootProps()}
                  className="relative md:w-[490px] flex flex-col justify-center items-center border border-dashed border-gray-light-1 rounded-md cursor-pointer"
                  onClick={() => onFolderSelector()}
               >
                  {traits.length > 0 ? (
                     <>
                        <img src="/create/folder-checked.svg" alt="folder" />
                        <p className="text-base md:text-xl font-semibold mt-5">
                           Folder Uploaded!
                        </p>
                        <p className="text-sm md:text-base mt-1">
                           {fileCount} files have been uploaded
                        </p>
                        <p className="text-sm md:text-base mt-16">
                           Wrong folder?
                           <br />
                           <span className="text-primary-light">
                              Upload again
                           </span>
                        </p>
                     </>
                  ) : (
                     <>
                        <img src="/create/folder.svg" alt="folder" />
                        <p className="text-base md:text-xl font-semibold mt-5">
                           Drop your folder here
                        </p>
                        <p className="text-sm md:text-base mt-1">
                           or &nbsp;
                           <span className="text-primary-light font-semibold">
                              choose a folder
                           </span>
                           &nbsp; to upload
                        </p>
                     </>
                  )}

                  <input
                     directory=""
                     webkitdirectory=""
                     type="file"
                     id="folder-selector"
                     className="hidden"
                     onChange={(e: any) => onChangeFolder(e.target.files)}
                  />
                  <div
                     className={`-m-1 ${
                        loading ? "flex" : "hidden"
                     } absolute inset-0 justify-center items-center bg-black/50`}
                  >
                     <img
                        src="/create/spin.svg"
                        alt="spin"
                        className="animate-spin"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Screen3;

declare module "react" {
   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      directory?: string; // remember to make these attributes optional....
      webkitdirectory?: string;
   }
}
