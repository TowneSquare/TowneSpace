import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import { saveAs } from 'file-saver';
import { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import JSZip from 'jszip';
import { toast } from 'react-toastify';
import { AssetImageData, ImageMetadata } from '../../../type/folder_type';
import { generateTokens } from '../../../util/generateToken';
import { updateTokens } from '../../../state/deploy';

const Generate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const traits = useAppSelector((state) => state.createState.traits);
  const tokens = useAppSelector((state) => state.deployState.tokens);
  const tokenName = useAppSelector((state) => state.deployState.tokenName);
  const totalSupply = useAppSelector((state) => state.deployState.totalSupply);
  const hasReviewedCollectionSettings = useAppSelector(
    (state) => state.dialogState.hasReviewedSettings
  );
  // Dispatch generated tokens only once on component mount
  // useEffect(() => {
  //   const generatedTokens = generateTokens(traits, totalSupply);
  //   dispatch(updateTokens(generatedTokens));
  // }, [dispatch, traits]);

  const handleDeploy = async () => {
    if (!hasReviewedCollectionSettings) {
      toast.error(
        'Before deploying the collection on Aptos Tesnet or Mainnet, please review the Settings page.'
      );
      return;
    }
    const canvas = canvasRef.current;

    if (!canvas) {
      toast.error('Please try again');
      return;
    }

    const ctx = canvas.getContext('2d');
    let imagesBlob: AssetImageData[] = [];
    let metadata: ImageMetadata[] = [];
    try {
      let hasValidBlobs = false; // Step 1: Introduce a boolean variable

      for (const token of tokens.slice(0, totalSupply)) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

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

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png');
        });

        if (blob) {
          hasValidBlobs = true; // Step 2: Set hasValidBlobs to true when a valid blob is created
          imagesBlob.push({
            name: `${tokenName} ${token.name}.png`,
            image: blob,
          });
        }

        metadata.push(
          ...token.files.map((file) => ({
            name: file.name,
            percentage: file.rarities,
            rarityNumber: file.rarityNumber,
          }))
        );
      }

      if (!hasValidBlobs) {
        toast.error(
          'Before deploying the collection on Aptos Tesnet or Mainnet, please review the Collection preview page.'
        );
        return;
      }

      navigate('/generate/step1');
    } catch (err) {}
  };
  const handlePreview = async () => {
    if (!hasReviewedCollectionSettings) {
      toast.error(
        'Before deploying the collection on Aptos Tesnet or Mainnet, please review the Settings page.'
      );
      return;
    }
    const canvas = canvasRef.current;

    if (!canvas) {
      toast.error('Please try again');
      return;
    }

    const ctx = canvas.getContext('2d');
    let imagesBlob: AssetImageData[] = [];
    let metadata: ImageMetadata[] = [];

    try {
      for (const token of tokens.slice(0, totalSupply)) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

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

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png');
        });

        if (blob) {
          imagesBlob.push({
            name: `${tokenName} ${token.name}.png`,
            image: blob,
          });
        }

        metadata.push(
          ...token.files.map((file) => ({
            name: file.name,
            percentage: file.rarities,
            rarityNumber: file.rarityNumber,
          }))
        );
      }

      // ZIP creation and download logic remains the same
      const zip = new JSZip();
      const folder = zip.folder('previews');

      imagesBlob.forEach((image) => {
        folder?.file(image.name, image.image);
      });
      if (imagesBlob.length === 0) {
        toast.error(
          'Before downloading the preview images and metadata files, please review the Collection preview page.'
        );
        return;
      }

      folder?.file('metadata.json', JSON.stringify(metadata, null, 2));

      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'previews.zip');
        toast.success('Download successful');
      });
    } catch (error) {
      toast.error('An error occurred during the preview generation process');
      console.error('Error in handlePreview:', error);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={178}
        height={178}
        style={{ display: 'none' }}
      />
      <div className="flex flex-col items-center gap-8 mt-12 mb-12">
        <div className="flex gap-4 p-2 mx-4 border rounded-md md:w-1/2 md:p-4 md:gap-8 border-gray-light-3">
          <img
            src="/deploy/deploy-contract.png"
            alt="deploy"
            className="w-[137px] h-[213px]"
          />
          <div className="flex flex-col justify-between py-4">
            <div>
              <p className="text-base font-semibold md:text-xl">
                Deploy collection
              </p>
              <p className="mt-1 text-sm md:text-base">
                Deploy the collection to Aptos Tesnet or Mainnet.
              </p>
            </div>
            <PrimaryButton
              type={ButtonStatus.active}
              className="px-1 md:w-[200px]"
              onClick={handleDeploy}
            >
              Deploy Contract
            </PrimaryButton>
          </div>
        </div>
        <div className="flex gap-4 p-2 mx-4 border rounded-md md:w-1/2 md:p-4 md:gap-8 border-gray-light-3">
          <img
            src="/deploy/download-assets.png"
            alt="deploy"
            className="w-[137px] h-[213px]"
          />
          <div className="flex flex-col justify-between py-4">
            <div>
              <p className="text-base font-semibold md:text-xl">
                Download assets
              </p>
              <p className="mt-1 text-sm md:text-base">
                Download the preview images and metadata files
              </p>
            </div>
            <PrimaryButton
              type={ButtonStatus.active}
              className="px-1 md:w-[200px]"
              onClick={handlePreview}
            >
              Download assets
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
