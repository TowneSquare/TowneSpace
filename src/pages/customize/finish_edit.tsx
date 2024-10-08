import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { toggleFinishEdit } from '../../state/dialog';
import {
  compareAddress,
  pinJSONToIPFS,
  removeWordFromString,
  sleep,
} from '../../util';
import { useReplaceTraits } from '../../hooks/useReplaceTrait';
import { ComposedNft } from '../../api';
import CustomFolderType from '../../type/custom_folder_type';
import { PINATA } from '../../constants';
import { useEquipTraits } from '../../hooks/useEquipTrait';
import { TRAIT_NAME } from '../../type/nft_type';
import { useUnequipTraits } from '../../hooks/useUnequipTrait';

const FinishEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bFinishEdit);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const replaceTraits = useReplaceTraits();
  const equipTraits = useEquipTraits();
  const unEquipTraits = useUnequipTraits();

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const composedTraits = currentNft?.composed_nfts;

  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  const folderType = [
    'Badge',
    'Mouth',
    'Eyes',
    'Hat',
    'Clothing',
    'Body',
    'Background',
  ];
  const canvasRef = useRef<any>(null);
  const [isLoading, toggleLoading] = useState(false);

  useEffect(() => {
    function loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${src}`);
      });
    }
    async function overlayImagesOnCanvas(): Promise<void> {
      const sortedTraitFolders = [...currentTraitFolders].sort((a, b) => {
        const indexA = folderType.indexOf(a.name);
        const indexB = folderType.indexOf(b.name);
        return indexA - indexB;
      });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Failed to get canvas context.');
        return;
      }

      // Clear the canvas
      ctx.clearRect(0, 0, 1000, 1000);

      try {
        // Load all images
        const imageUrls = [...currentTraitFolders]
          .reverse()
          .filter((trait) => trait.trait != undefined)
          .map((trait) => trait.trait?.token_uri as string);
        const images = await Promise.all(imageUrls?.map(loadImage));

        // Draw each image on the canvas, one on top of the other
        images.forEach((img) => {
          ctx.drawImage(img, 0, 0, 700, 700);
        });
      } catch (error) {
        console.error('Error loading images:', error);
      }
    }
    setTimeout(() => {
      overlayImagesOnCanvas();
    }, 1000);
  }, [currentTraitFolders]);

  const onFinish = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    toggleLoading(true);
    const imageData = canvas.toDataURL('image/png');
    const blob = await fetch(imageData).then((res) => res.blob());

    try {
      const file = new File([new Blob([blob])], currentNft?.token_name ?? '');
      const upload = await PINATA.upload.file(file);
      const uri = `https://aquamarine-electoral-hyena-268.mypinata.cloud/ipfs/${upload.IpfsHash}`;

      const addObjects = currentTraitFolders.reduce(
        (acc: string[], folder: CustomFolderType) => {
          const token_id = folder?.trait?.token_data_id;
          if (
            token_id &&
            (!composedTraits ||
              !composedTraits.find((trait) =>
                compareAddress(trait.token_data_id, token_id)
              ))
          )
            acc.push(token_id);
          return acc;
        },
        []
      );

      let removeObjects: string[] = [];
      if (composedTraits) {
        removeObjects = composedTraits.reduce(
          (acc: string[], trait: ComposedNft) => {
            if (
              !currentTraitFolders.find((folder) =>
                compareAddress(folder.trait?.token_data_id, trait.token_data_id)
              )
            )
              acc.push(trait.token_data_id);
            return acc;
          },
          []
        );
      }

      if (currentNft?.token_data_id && !addObjects.length) {
        const res = await unEquipTraits(
          currentNft.token_data_id,
          removeObjects,
          uri
        );

        if (res?.success) {
          toggleLoading(false);
          navigate('/studio/mytoken');
          const oldUri = removeWordFromString(currentNft?.token_uri);
          await PINATA.unpin([oldUri]);
          dispatch(toggleFinishEdit(false));
        }
      }

      if (currentNft?.token_data_id && !removeObjects.length) {
        const traitObject = currentTraitFolders
          .filter((filteredCurrent) => filteredCurrent.name != TRAIT_NAME.BODY)
          .map((currentTrait) => currentTrait.trait?.token_data_id) as string[];

        const res = await equipTraits(
          currentNft.token_data_id,
          addObjects,
          uri
        );
        if (res?.success) {
          toggleLoading(false);
          navigate('/studio/mytoken');
          const oldUri = removeWordFromString(currentNft?.token_uri);
          await PINATA.unpin([oldUri]);
          dispatch(toggleFinishEdit(false));
        }
      }

      if (currentNft?.token_data_id && removeObjects.length > 0 && addObjects.length > 0) {
        const res = await replaceTraits(
          currentNft?.token_data_id,
          removeObjects,
          addObjects,
          uri
        );
        if (res?.success) {
          const oldUri = removeWordFromString(currentNft?.token_uri);
          await PINATA.unpin([oldUri]);
          toggleLoading(false);
          navigate('/studio/mytoken');
          dispatch(toggleFinishEdit(false));
        }
      }
    } catch (e) {
      toggleLoading(false);
      console.log(e);
    }
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {/* dialog bg */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        {/* dialog */}
        <div className="border rounded-lg w-dialog bg-gray-dark-2 border-gray-light-3">
          {/* dialog header */}
          <div className="flex items-center justify-between m-6">
            <h2 className="text-xl font-semibold">Finish editing cNFT</h2>
            <button
              className="w-6 h-6 text-gray-700"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          {/* dialog body */}
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <canvas
              ref={canvasRef}
              width={700}
              height={700}
              className="w-[180px] h-[180px]"
            />
          </div>
          <div className="flex flex-col items-center px-10 pt-4 pb-14 gap-y-4">
            <p className="pb-2 leading-5 text-center">
              Click “Finish editing” to save all the changes made to
              <br />
              <span className="font-bold">{currentNft?.token_name}</span>
            </p>
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={() => onFinish()}
              className="flex items-center gap-2 px-10 text-sm font-medium md:text-lg"
            >
              Finish editing and Compose
              {isLoading && <img src="/generate/loader.svg" />}
            </PrimaryButton>
            <Link
              to=""
              className=""
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <p className="text-sm font-medium md:text-lg text-primary-light">
                Continue editing
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishEdit;
