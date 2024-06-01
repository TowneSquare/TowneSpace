import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { toggleFinishEdit } from '../../state/dialog';
import { pinJSONToIPFS, sleep } from '../../util';
import { useEquipTrait, useEquipTraits } from '../../hooks/useEquipTrait';
import { NftMetadataType } from '../../type/nft_type';

const FinishEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bFinishEdit);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const equipTrait = useEquipTrait();
  const equipTraits = useEquipTraits();

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  const canvasRef = useRef<any>(null);
  const [isLoading, toggleLoading] = useState(false);

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
          image.crossOrigin = 'anonymous';
          image.src = currentTraitFolders[i].trait?.token_uri ?? '';

          while (!image.complete) {
            await sleep(10);
          }
          ctx.drawImage(image, 0, 0, 252, 252);
        }
      } else {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = currentNft?.token_uri ?? '';
        while (!image.complete) {
          await sleep(10);
        }
        ctx.drawImage(image, 0, 0, 252, 252);
      }
    };
    drawImage();
  }, [currentTraitFolders]);

  const onFinish = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    toggleLoading(true);
    const imageData = canvas.toDataURL('image/png');
    const blob = await fetch(imageData).then((res) => res.blob());

    try {
      const imageLink =
        'https://ipfs.io/ipfs/QmPXkpBsgNR1XcWUvCb9xaqXADCCCcuwC2jVpJauurHDJe';
      // await pinJSONToIPFS(blob);

      const tokenObjects: string[] = [];
      for (let i = 0; i < currentTraitFolders.length; i++) {
        const token_id = currentTraitFolders[i]?.trait?.token_data_id;
        console.log(token_id);
        if (token_id) {
          tokenObjects.push(token_id);
        }
      }

      if (tokenObjects.length > 0 && currentNft?.token_data_id) {
        console.log('equipping');
        // const res = await equipTrait(
        //   currentNft?.token_data_id,
        //   tokenObjects[0],
        //   imageLink
        // );

        const res = await equipTraits(
          currentNft?.token_data_id,
          tokenObjects,
          imageLink
        );
        console.log(res);

        toggleLoading(false);
        navigate('/studio/mytoken');
        dispatch(toggleFinishEdit(false));
      }
    } catch (e) {
      toggleLoading(false);
    }
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-dark-4 bg-opacity-80 flex items-center justify-center">
        <div className="rounded-lg w-2/6 bg-gray-dark-2 border-gray-light-3 border-2">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">Finish editing cNFT</h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex my-6 px-10 text-center flex-col justify-center items-center gap-6">
            <canvas
              ref={canvasRef}
              width={252}
              height={252}
              className="w-[210px] md:w-[270px] h-[210px] md:h-[270px]"
            />

            <p className="mx-10">
              Click “Finish editing” to save all the changes made to{' '}
              {currentNft?.token_name}
            </p>
          </div>
          <div className="item-center flex justify-center items-center flex-col gap-2">
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={() => onFinish()}
              className="px-10 my-2 flex gap-2 items-center"
            >
              Finish editing
              {isLoading && <img src="/generate/loader.svg" />}
            </PrimaryButton>
            <Link
              to=""
              className="px-10 mb-8"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <p className="text-sm md:text-base text-primary-light font-semibold">
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
