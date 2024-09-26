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
import { PINATA } from '../../constants';
import { useEquipTraits } from '../../hooks/useEquipTrait';

const FinishEdit = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bFinishEdit);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const replaceTraits = useReplaceTraits();
  const equipTraits = useEquipTraits();

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
          ctx.drawImage(image, 0, 0, 700, 700);
        }
      } else {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = currentNft?.token_uri ?? '';
        while (!image.complete) {
          await sleep(10);
        }
        ctx.drawImage(image, 0, 0, 700, 700);
      }
      console.log(currentNft, 'currentNFT');
    };
    drawImage();
  }, [currentTraitFolders]);

  console.log(currentTraitFolders, 'currentTraitFolders');

  const onFinish = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    toggleLoading(true);
    const imageData = canvas.toDataURL('image/png');
    const blob = await fetch(imageData).then((res) => res.blob());

    try {
      // const imageLink =
      //   // 'https://ipfs.io/ipfs/QmPXkpBsgNR1XcWUvCb9xaqXADCCCcuwC2jVpJauurHDJe';
      //   await pinJSONToIPFS(blob);
      // console.log(imageLink);
      const file = new File([new Blob([blob])], currentNft?.token_name ?? '');
      const upload = await PINATA.upload.file(file);
         console.log(upload, "cid")
      const uri = `https://rose-gentle-halibut-945.mypinata.cloud/ipfs/${upload.IpfsHash}`;
   

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

      // if (currentNft?.token_data_id) {
      //   console.log('replacing', addObjects, removeObjects);

      //   const res = await replaceTraits(
      //     currentNft?.token_data_id,
      //     removeObjects,
      //     addObjects,
      //     uri
      //   );
      //   console.log(res);

      //   toggleLoading(false);
      //   navigate('/studio/mytoken');
      //   dispatch(toggleFinishEdit(false));
      // }

      const traitObject = currentTraitFolders.map(
        (currentTrait) => currentTrait.trait?.token_data_id
      ) as string[];
      if (currentNft?.composed_nfts?.length == 1) {
        console.log(currentNft.composed_nfts, currentNft.token_data_id, traitObject, uri, "payload")
        const res = await equipTraits(
          currentNft.token_data_id,
          traitObject,
          uri
        );
        toggleLoading(false);
        navigate('/studio/mytoken');
        dispatch(toggleFinishEdit(false));
      }
    } catch (e) {
      toggleLoading(false);
      console.log(e)
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
