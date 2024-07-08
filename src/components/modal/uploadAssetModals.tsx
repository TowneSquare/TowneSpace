import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { CancelIcon } from '../../svg';
import { toggleUploadAssetModal } from '../../state/dialog';

const UploadAssetModal = () => {
  const isOpen = useAppSelector((state) => state.dialogState.bUploadAssetModal);

  const dispatch = useAppDispatch();

  return (
    <div
      className={`${isOpen.visible ? 'block' : 'hidden'}  fixed z-[100] inset-0 flex justify-center items-center bg-black/70`}
      style={{
        backgroundImage: `url(/create/background-create.png)`,
        backgroundSize: 'cover',
      }}
    >
      <div className="md:w-[558px] pt-6 pb-8 border border-gray-light-3 px-6 h-fit mx-4 bg-gray-dark-2 rounded-lg">
        <div className="">
          <div className="justify-between flex pb-6 ">
            <p className="mr-1 text-sm font-semibold text-xl  md:text-base flex-start">
              {isOpen.type === 'invalid_file'
                ? 'Unsupported file formats detected'
                : 'Uploaded folder not prepared properly'}
            </p>
            <div
              onClick={() => {
                dispatch(
                  toggleUploadAssetModal({
                    visible: false,
                    type: undefined,
                  })
                );
              }}
            >
              <CancelIcon />
            </div>
          </div>

          <p className="mr-1 text-sm font-normal pb-6 md:text-base">
            {isOpen.type === 'invalid_file'
              ? 'It seems you have uploaded unsupported file formats.'
              : 'It looks like your assets weren’t prepared properly!'}
          </p>
          {isOpen.type === 'invalid_folder' && (
            <p className="mr-1 text-sm font-normal pb-6 mt-1 md:text-base">
              If you need help you can always check out our{' '}
              <span className="text-primary-dark-1">Guidelines</span>
            </p>
          )}
          {isOpen.type == 'invalid_file' && (
            <p className="mr-1 text-sm font-normal md:text-base pb-6">
              Supported formats: jpg, png, webp, gif, svg
            </p>
          )}
        </div>
        <div className="justify-center align-center flex  mt-2 ">
          <div
            onClick={() => {
              dispatch(
                toggleUploadAssetModal({
                  visible: false,
                  type: undefined,
                })
              );
            }}
            className="py-3 w-36 cursor-pointer justify-center align-center flex  bg-gray-dark-1  border rounded-full"
          >
            <p className="text-lg font-medium md:text-base">Try again</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAssetModal;
