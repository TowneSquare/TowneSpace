import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../state/hooks';


const Preview = () => {
  const canvasRef = useRef<any>(null);

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );
  const [image, setImage] = useState<any>();

  useEffect(() => {
    function loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;

        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${src}`);
      });
    }
    async function overlayImagesOnCanvas(): Promise<void> {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Failed to get canvas context.');
        return;
      }

      // Clear the canvas
      ctx.clearRect(0, 0, 500, 500);

      try {
        // Load all images
        const imageUrls = [...currentTraitFolders]
          .reverse()
          .map((trait) => trait.trait?.token_uri as string);
        const images = await Promise.all(imageUrls?.map(loadImage));

        // Draw each image on the canvas, one on top of the other
        images.forEach((img) => {
          ctx.drawImage(img, 0, 0, 255, 255);
        });
      } catch (error) {
        console.error('Error loading images:', error);
      }
    }
    setTimeout(() => {
      overlayImagesOnCanvas();
    }, 1000);
    // const drawImage = async () => {
    //   //   const downloadPromises = traitsUri.map(async (traitUrl: string) => {
    //   //   return (await axios({ url: traitUrl, responseType: "arraybuffer" }))
    //   //     .data as Buffer;
    //   // })

    //   const canvas = canvasRef.current;
    //   if (!canvas) return;

    //   const ctx = canvas.getContext('2d');
    //   ctx.clearRect(0, 0, 500, 500);

    //   const hasTraits =
    //     currentTraitFolders.filter((folder) => folder.trait != undefined)
    //       .length > 0;

    //   if (hasTraits) {
    //     for (let i = currentTraitFolders.length - 1; i >= 0; i--) {
    //       const image = new Image();
    //       image.src = currentTraitFolders[i].trait?.token_uri ?? '';
    //       while (!image.complete) {
    //         await sleep(10);
    //       }
    //       ctx.drawImage(image, 0, 0, 252, 252);
    //       // await axios({url: currentTraitFolders[i].trait?.token_uri})
    //     }
    //   } else {
    //     const image = new Image();
    //     image.src = currentNft?.token_uri ?? '';
    //     while (!image.complete) {
    //       await sleep(10);
    //     }
    //     ctx.drawImage(image, 0, 0, 252, 252);
    //   }
    // };
    // drawImage();
  }, [currentTraitFolders]);

  console.log(
    [...currentTraitFolders].reverse(),
    currentTraitFolders,
    'preview'
  );

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
      <p className="mt-1 ml-2 text-xl font-semibold">
        {currentNft?.token_name}
      </p>
    </div>
  );
};

export default Preview;
