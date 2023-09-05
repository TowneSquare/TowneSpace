import { useEffect, useRef } from "react";
import { FileType } from "../../../../type/folder_type"
import { useAppSelector } from "../../../../state/hooks";

interface Props{
   data: FileType[],
   index: number
}
const Token: React.FC<Props> = ({data, index}) => {
   const tokenName = useAppSelector(state => state.deployState.tokenName);
   const canvasRef = useRef<any>(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      for (let i = (data.length - 1); i >= 0; i--) {
         const image = new Image();
         image.src = data[i].imageUrl;
         image.onload = () => {
            ctx.drawImage(image, 0, 0, 178, 178);
         }
      }
   }, [data]);

   return (
      <div className="w-[178px] rounded-md">
         <div className="h-[178px] bg-gray-dark-1 rounded-md overflow-hidden">
            <canvas ref={canvasRef} width={178} height={178} />
         </div>
         <p className="mt-2">
            {tokenName} #{index}
         </p>
      </div>
   )
};

export default Token;