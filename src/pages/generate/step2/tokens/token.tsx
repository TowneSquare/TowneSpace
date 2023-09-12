import { useEffect, useRef } from "react";
import { TokenType } from "../../../../type/folder_type"
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { updateCurrentToken } from "../../../../state/deploy";
import { sleep } from "../../../../util";

interface Props {
   token: TokenType,
   index: number
}

const Token: React.FC<Props> = ({ token, index }) => {
   const dispatch = useAppDispatch();
   const canvasRef = useRef<any>(null);
   const tokenName = useAppSelector(state => state.deployState.tokenName);

   useEffect(() => {
      const drawImage = async () => {
         const canvas = canvasRef.current;
         if (!canvas) return;

         const ctx = canvas.getContext('2d');


         for (let i = (token.files.length - 1); i >= 0; i--) {
            const image = new Image();
            image.src = token.files[i].imageUrl;
            while (!image.complete) {
               await sleep(100);
            }
            ctx.drawImage(image, 0, 0, 178, 178);
         }
      }
      drawImage();
   }, [token]);

   return (
      <div
         className="p-2 hover:bg-gray-light-3 rounded-md cursor-pointer"
         onClick={() => dispatch(updateCurrentToken(token))}
      >
         <div className="bg-gray-dark-1 rounded-md overflow-hidden">
            <canvas ref={canvasRef} width={178} height={178} className="w-[140px] md:w-[178px] h-[140px] md:h-[178px]" />
         </div>
         <p className="mt-2 px-2 md:px-4 text-sm md:text-base">
            {`${tokenName} ${token.name}`}
         </p>
      </div>
   )
};

export default Token;