import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import { toggleFinishEdit } from '../../state/dialog';
import { compareAddress, pinJSONToIPFS, sleep } from '../../util';
import { useReplaceTraits } from '../../hooks/useReplaceTrait';
import { ComposedNft } from '../../api';
import CustomFolderType from '../../type/custom_folder_type';

const FinishEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bFinishEdit);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const replaceTraits = useReplaceTraits();

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const composedTraits = currentNft?.composed_nfts;

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
        // 'https://ipfs.io/ipfs/QmPXkpBsgNR1XcWUvCb9xaqXADCCCcuwC2jVpJauurHDJe';
        await pinJSONToIPFS(blob);
      console.log(imageLink);


      const addObjects = currentTraitFolders.reduce((acc: string[], folder: CustomFolderType) => {
        const token_id = folder?.trait?.token_data_id;
        if (
          token_id && 
          (!composedTraits ||
            !composedTraits.find((trait) => compareAddress(trait.token_data_id, token_id)))
        )
          acc.push(token_id);
        return acc;
      }, []);

      let removeObjects: string[] = [];
      if (composedTraits) {
        removeObjects = composedTraits.reduce(
          (acc: string[], trait: ComposedNft) => {
            if (
              !currentTraitFolders.find(
                (folder) => compareAddress(folder.trait?.token_data_id, trait.token_data_id)
              )
            )
              acc.push(trait.token_data_id);
            return acc;
          },
          []
        );
      }

      if (currentNft?.token_data_id) {
        console.log('replacing', addObjects, removeObjects);

        const res = await replaceTraits(
          currentNft?.token_data_id,
          removeObjects,
          addObjects,
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-dark-4 bg-opacity-80">
        <div className="w-2/6 border-2 rounded-lg bg-gray-dark-2 border-gray-light-3">
          <div className="flex items-center justify-between m-6">
            <h2 className="text-lg font-semibold">Finish editing cNFT</h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 px-10 my-6 text-center">
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
          <div className="flex flex-col items-center justify-center gap-2 item-center">
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={() => onFinish()}
              className="flex items-center gap-2 px-10 my-2"
            >
              Finish editing
              {isLoading && <img src="/generate/loader.svg" />}
            </PrimaryButton>
            <Link
              to=""
              className="px-10 mb-8"
              onClick={() => dispatch(toggleFinishEdit(false))}
            >
              <p className="text-sm font-semibold md:text-base text-primary-light">
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
