import { useEffect, useRef } from 'react';
import { TokenType } from '../../../../type/folder_type';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { updateCurrentToken } from '../../../../state/deploy';
import { sleep } from '../../../../util';

interface Props {
  token: TokenType;
  index: number;
}

const Token: React.FC<Props> = ({ token, index }) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<any>(null);
  const tokenName = useAppSelector((state) => state.deployState.tokenName);

  useEffect(() => {
    const drawImage = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      for (let i = token.files.length - 1; i >= 0; i--) {
        const image = new Image();
        image.src = token.files[i].imageUrl;
        while (!image.complete) {
          await sleep(100);
        }
        ctx.drawImage(image, 0, 0, 138, 138);
      }
    };
    drawImage();
  }, [token]);

  return (
    <div className="p-2">
      <div className="bg-gray-dark-1 rounded-md overflow-hidden">
        <canvas
          ref={canvasRef}
          width={138}
          height={138}
          className="w-[100px] md:w-[100px] h-[100px] md:h-[100px]"
        />
      </div>
    </div>
  );
};

export default Token;
