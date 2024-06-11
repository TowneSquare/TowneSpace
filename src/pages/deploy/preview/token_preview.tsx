import { Fragment, useEffect, useRef } from 'react';
import { useAppSelector } from '../../../state/hooks';
import { sleep } from '../../../util';
import { useDispatch } from 'react-redux';
import { updateCurrentToken } from '../../../state/deploy';
import SecondaryButton from '../../../components/secondary_button';
import ButtonStatus from '../../../type/button_status';

const TokenPreview = () => {
  const dispatch = useDispatch();
  const currentToken = useAppSelector(
    (state) => state.deployState.currentToken
  );
  const tokenName = useAppSelector((state) => state.deployState.tokenName);
  const canvasRef = useRef<any>(null);
  const onClose = () => {
    dispatch(updateCurrentToken(undefined));
  };

  useEffect(() => {
    const drawImage = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !currentToken) return;

      const ctx = canvas.getContext('2d');
      for (let i = currentToken.files.length - 1; i >= 0; i--) {
        const image = new Image();
        image.src = currentToken.files[i].imageUrl;
        while (!image.complete) {
          await sleep(10);
        }
        ctx.drawImage(image, 0, 0, 252, 252);
      }
    };
    drawImage();
  }, [currentToken]);

  return (
    <>
      {currentToken && (
        <div>
          <div className="min-w-[260px] md:min-w-[315px] py-4 px-6 bg-gray-dark-2 rounded-t-md">
            <div className="flex justify-end">
              <div className="w-6 h-6 cursor-pointer" onClick={() => onClose()}>
                <p className="text-2xl font-semibold">×</p>
              </div>
            </div>
            <div className="mt-2">
              <canvas
                ref={canvasRef}
                width={252}
                height={252}
                className="w-[210px] md:w-[270px] h-[210px] md:h-[270px]"
              />
              <p className="mt-2 text-sm md:text-base">{tokenName}</p>
              <p className="text-sm md:text-base">{currentToken?.name}</p>
              <div className="flex flex-col gap-2 mt-2 overflow-y-auto h-80">
                {currentToken?.files.map((file, index) => (
                  <div className='w-full h-12 my-1'>
                    <div className="p-[8px] w-full rounded-md bg-gray-dark-1/10">
                      <div
                        className="flex items-center text-center rounded-md"
                        key={index}
                      >
                        <div className="w-[40px] h-[40px] mr-4 rounded-md bg-gray-dark-1">
                          <img
                            src={file.imageUrl}
                            alt="image"
                            className="rounded-md"
                          />
                        </div>
                        <div className='flex flex-col justify-start text-left'>
                          <p className="text-xs text-gray-light-1">
                            {file.folderName}
                          </p>
                          <p className="text-xs">
                            {file.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='p-6 border-t-2 bg-gray-dark-2 rounded-b-md border-gray-light-3'>
            <SecondaryButton
              type={ButtonStatus.active}
              className="w-full"
            >
              Regenerate
            </SecondaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenPreview;
