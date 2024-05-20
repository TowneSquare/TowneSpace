import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header"
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import Folders from "./folders";
import FolderType from "../../../type/folder_type";
import { updatePrimaryTrait, updateTraits } from "../../../state/create";

const Screen5 = () => {
   const navigate = useNavigate();
   const traits = useAppSelector(state => state.createState.traits);
   const [folders, setFolders] = useState<FolderType[]>(traits);
   const dispatch = useAppDispatch();

   const onNext = () => {
      dispatch(updateTraits(folders));
      navigate("/create/step6");
   }
   const canvasRef = useRef<any>(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      for (let i = (folders.length - 1); i >= 0; i--) {
         const image = new Image();
         image.src = folders[i].files[0].imageUrl;
         image.onload = () => {
            ctx.drawImage(image, 0, 0, 340, 340);
         }
      }
   }, [folders]);

   return (
      <div className="pb-10">
         <Header />
         <p className="text-base md:text-xl text-center mt-8">
            Drag to set the Trait category order that will be applied <br />to every Dynamic PFP generated
         </p>
         <div className="mt-16 flex justify-center gap-0 md:gap-8">
            <Folders folders={folders} setFolders={setFolders} />
            <div className="p-4">
               <canvas ref={canvasRef} width={340} height={340} className="w-full md:w-[340px]" />
            </div>
         </div>
      </div>
   )
};

export default Screen5;