import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../state/hooks";
import { sleep } from "../../../util";

const TokenPreview = () => {
   const currentToken = useAppSelector(state => state.deployState.currentToken);
   const tokenName = useAppSelector(state => state.deployState.tokenName);
   const canvasRef = useRef<any>(null);
   const onClose = () => {

   }

   useEffect(() => {
      const drawImage = async () => {
         const canvas = canvasRef.current;
         if (!canvas || !currentToken) return;

         const ctx = canvas.getContext('2d');
         for (let i = (currentToken.files.length - 1); i >= 0; i--) {
            const image = new Image();
            image.src = currentToken.files[i].imageUrl;
            while (!image.complete) {
               await sleep(10);
            }
            ctx.drawImage(image, 0, 0, 252, 252);
         }
      }
      drawImage();
   }, [currentToken]);

   return (
      <div className="min-w-[312px]">
         <div className="px-8 py-4 bg-gray-dark-2 rounded-md">
            <p className="text-center">
               This is how your NFTs might look like on Marketplace
            </p>
            <canvas ref={canvasRef} width={252} height={252} className="mt-2" />
            <p className="">{tokenName}</p>
            <p className="">{currentToken?.name}</p>
            <div className="flex flex-wrap gap-2 mt-2">
               {currentToken?.files.map((file, index) => (
                  <div className="w-[120px] p-2 border border-gray-light-3 rounded-md">
                     <p className="text-sm font-semibold">{file.folderName}</p>
                     <p className="text-lg font-semibold">{file.name}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
};

export default TokenPreview;