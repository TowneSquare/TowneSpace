import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../state/hooks";

const TokenPreview = () => {
   const currentToken = useAppSelector(state => state.deployState.currentToken);
   const tokenName = useAppSelector(state => state.deployState.tokenName);
   const canvasRef = useRef<any>(null);
   const onClose = () => {

   }

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !currentToken) return;

      const ctx = canvas.getContext('2d');
      for (let i = (currentToken.files.length - 1); i >= 0; i--) {
         const image = new Image();
         image.src = currentToken.files[i].imageUrl;
         image.onload = () => {
            ctx.drawImage(image, 0, 0, 252, 252);
         }
      }
   }, [currentToken]);

   return (
      <div className="min-w-[315px] bg-gray-dark-3">
         <div className="flex justify-end">
            <div className="w-6 h-6 cursor-pointer" onClick={() => onClose()}>
               <p className="text-2xl font-semibold">×</p>
            </div>
         </div>
         <div className="w-[252px]">
            <canvas ref={canvasRef} width={252} height={252} />
            <p className="">{tokenName}</p>
            <p className="">{currentToken?.name}</p>
            <div className="flex flex-col gap-2 mt-2">
               {currentToken?.files.map((file, index) => (
                  <p className="">{file.folderName} {file.name}</p>
               ))}
            </div>
         </div>

      </div>
   )
};

export default TokenPreview;