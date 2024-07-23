import { useEffect, useRef, useState } from 'react';
import { TokenType } from '../../../../type/folder_type';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { updateCurrentToken } from '../../../../state/deploy';


interface Props {
  token: TokenType;
  index: number;
}

const Token: React.FC<Props> = ({ token, index }) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedToken = useAppSelector(
    (state) => state.deployState.currentToken
  );
  const tokenName = useAppSelector((state) => state.deployState.tokenName);

  useEffect(() => {
    const drawImage = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      for (let i = token.files.length - 1; i >= 0; i--) {
        const image = new Image();
        image.src = token.files[i].imageUrl;
        await new Promise<void>((resolve) => {
          image.onload = () => {
            ctx?.drawImage(image, 0, 0, 178, 178);
            resolve();
          };
        });
      }
    };

    drawImage();
  }, [token]);

  return (
    <div
      className={`hover:bg-gray-light-3 rounded-md cursor-pointer  `}
      onClick={() => dispatch(updateCurrentToken(token))}
    >
      <div
        className={`${selectedToken?.name === token.name && 'border-[3px] border-primary-dark-1 p-[3px] '}  rounded-[8px]  overflow-hidden`}
      >
        <canvas
          ref={canvasRef}
          width={178}
          height={178}
          className="w-[140px] rounded-[6px]  md:w-[178px] h-[140px] md:h-[178px]"
        />
      </div>
      <p className="mt-2 px-2 md:px-4 text-sm md:text-base">
        {`${tokenName} ${token.name}`}
      </p>
    </div>
  );
};

export default Token;
