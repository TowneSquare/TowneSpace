import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../state/hooks';
import { sleep } from '../../../util';
import { useDispatch } from 'react-redux';
import { updateCurrentToken } from '../../../state/deploy';
import SecondaryButton from '../../../components/secondary_button';
import ButtonStatus from '../../../type/button_status';

const TokenPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentToken = useAppSelector(
    (state) => state.deployState.currentToken
  );
  const tokenName = useAppSelector((state) => state.deployState.tokenName);
  const canvasRef = useRef<any>(null);
  const onClose = () => {
    dispatch(updateCurrentToken(undefined));
  };

  const onClickToSetting = () => {
    navigate('/maindeploy/settings');
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
          <div className="min-w-[260px] md:min-w-[315px] p-6 bg-gray-dark-2 rounded-md">
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
              <p className="text-sm md:text-base mt-2">{tokenName}</p>
              <p className="text-sm md:text-base">{currentToken?.name}</p>
              <div className="flex flex-col gap-2 mt-2">
                {currentToken?.files.map((file, index) => (
                  <p className="text-sm md:text-base" key={index}>
                    {file.folderName} {file.name}
                  </p>
                ))}
              </div>
              <SecondaryButton
                type={ButtonStatus.active}
                className="mt-4 w-full"
                onClick={() => {
                  onClickToSetting();
                }}
              >
                Regenerate
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenPreview;
