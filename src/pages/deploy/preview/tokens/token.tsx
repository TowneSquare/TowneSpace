import { useEffect, useRef } from "react";
import { TokenType } from "../../../../type/folder_type"
import { useAppDispatch } from "../../../../state/hooks";
import { updateCurrentToken } from "../../../../state/deploy";

interface Props {
   token: TokenType,
   index: number
}
const Token: React.FC<Props> = ({ token, index }) => {
   const dispatch = useAppDispatch();
   const canvasRef = useRef<any>(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      for (let i = (token.files.length - 1); i >= 0; i--) {
         const image = new Image();
         image.src = token.files[i].imageUrl;
         image.onload = () => {
            ctx.drawImage(image, 0, 0, 178, 178);
         }
      }
   }, [token]);

   return (
      <div
         className="p-2 hover:bg-gray-light-3 rounded-md cursor-pointer"
         onClick={() => dispatch(updateCurrentToken(token))}
      >
         <div className="h-[178px] bg-gray-dark-1 rounded-md overflow-hidden">
            <canvas ref={canvasRef} width={178} height={178} />
         </div>
         <p className="mt-2 px-4">
            {token.name}
         </p>
      </div>
   )
};

export default Token;