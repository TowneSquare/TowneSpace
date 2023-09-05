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
      dispatch(updatePrimaryTrait(folders[0]))
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
         <Header onNext={onNext} />
         <p className="text-xl text-center">
            Drag to set the Trait category order that will be applied <br />to every Dynamic PFP generated
         </p>
         <div className="mt-16 flex justify-center gap-8">
            <Folders folders={folders} setFolders={setFolders} />
            <canvas ref={canvasRef} width={340} height={340} />
         </div>
      </div>
   )
};

export default Screen5;