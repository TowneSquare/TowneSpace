import { useEffect, useRef } from 'react';
import LazyImage from '../../components/lazyImage';
import { useAppSelector } from '../../state/hooks';
import { sleep } from '../../util';

const Preview = () => {
  const canvasRef = useRef<any>(null);

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  useEffect(() => {
    const drawImage = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 500, 500);

      const hasTraits =
        currentTraitFolders.filter((folder) => folder.trait != undefined)
          .length > 0;
      if (hasTraits) {
        for (let i = currentTraitFolders.length - 1; i >= 0; i--) {
          const image = new Image();
          image.src = currentTraitFolders[i].trait?.token_uri ?? '';
          while (!image.complete) {
            await sleep(10);
          }
          ctx.drawImage(image, 0, 0, 252, 252);
        }
      } else {
        const image = new Image();
        image.src = currentNft?.token_uri ?? '';
        while (!image.complete) {
          await sleep(10);
        }
        ctx.drawImage(image, 0, 0, 252, 252);
      }
    };
    drawImage();
  }, [currentTraitFolders]);

  return (
    <div className="w-[200px] md:md-[230px] lg:w-[264px]">
      <div className="bg-gray-light-2 w-[200px] md:w-[230px] lg:w-[264px] h-[200px] md:h-[230px] lg:h-[264px] rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={252}
          height={252}
          className="w-[210px] md:w-[270px] h-[210px] md:h-[270px]"
        />
      </div>
      <div className="ml-2 mt-6 flex items-center gap-2 text-[16px] font-medium text-gray-light-1">
        {currentNft?.collection_name}
      </div>
      <p className="mt-1 ml-2 text-xl font-semibold">{currentNft?.token_name}</p>
    </div>
  );
};

export default Preview;
