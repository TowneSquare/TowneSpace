import { useState, useEffect } from 'react';
import ToolTip from '../../../components/tooltip';
import { updateCollectionName } from '../../../state/deploy';
import {
  updateCollectionDescription,
  updateCollectionSymbol,
  updateExternalLink,
  updatePayoutAddress,
  updateRoyalties,
  updateRoyaltiesPayoutAddress,
  updateTotalSupply,
} from '../../../state/deploy';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import StoreModal from '../../../components/modal/storeModal';
import Header from '../header';
import {
  toggleHasReviewedCollectionSettings,
  toggleSettingModal,
} from '../../../state/dialog';
import { Slide, toast } from 'react-toastify';

const Settings = () => {
  const dispatch = useAppDispatch();

  const tokenName = useAppSelector((state) => state.deployState.collectionName);
  const totalSupply = useAppSelector((state) => state.deployState.totalSupply);

  const [uploadImg, setUploadImg] = useState<File>();
  const [previewImg, setPreviewImg] = useState('');
  const [collectionTotalSupply, setCollectionTotalSupply] = useState(
    String(totalSupply)
  );
  const [collectiondesc, setCollectionDescription] = useState('');

  const [collectionName, setCollectionName] = useState('');
  const [isUnsavedChanges, setIsChangeSaved] = useState<boolean>(false);
  const [shouldRegenerateCollection, setShouldRegenerateCollection] =
    useState<boolean>(false);

  const onFolderSelector = async () => {
    const selector = document.getElementById('folder-selector');
    selector?.click();
  };

  useEffect(() => {
    dispatch(toggleHasReviewedCollectionSettings(true));
  }, []);

  const onClickImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setUploadImg(selectedFiles?.[0]);
    console.log(URL.createObjectURL(selectedFiles?.[0]));
    setPreviewImg(URL.createObjectURL(selectedFiles?.[0]));
    dispatch(toggleSettingModal(true));
  };

  const onChangeTotalSupply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/,/g, '');
    const numberWithCommas = formattedValue
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/(?<=\d)(?=(\d{3})+\b)/g, '.');
    setCollectionTotalSupply(numberWithCommas);
    setShouldRegenerateCollection(false);
    // setIsChangeSaved(true);

    dispatch(toggleSettingModal(true));
  };

  const discardChanges = () => {
    setIsChangeSaved(false);
    setCollectionTotalSupply(String(totalSupply));
  };

  const saveAndApplyChanges = () => {
    setIsChangeSaved(false);
    dispatch(updateTotalSupply(collectionTotalSupply));
    toast.success('Settings saved!');

    setShouldRegenerateCollection(true);
  };

  return (
    <div>
      <div className="flex justify-center w-full mt-10">
        {isUnsavedChanges && (
          <div className="absolute w-[404px] h-[133px] border-2 bg-gray-light-3/20 border-gray-light-3 rounded-lg px-4 py-6 flex flex-col justify-between right-10 top-[25%]">
            <h1 className="text-base font-extrabold">
              You have unsaved changes
            </h1>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  discardChanges();
                }}
                className="px-4 py-2 text-base font-medium border-[1px] border-white rounded-full bg-gray-light-3/20"
              >
                {' '}
                Discard changes
              </button>
              <button
                onClick={() => {
                  saveAndApplyChanges();
                }}
                className="px-4 py-2 text-base font-medium rounded-full bg-primary-default"
              >
                Save & apply changes
              </button>
            </div>
          </div>
        )}
        {shouldRegenerateCollection && (
          <div className="w-[340px] h-[177px] absolute right-10 top-[25%] border-[1px] bg-gray-light-3/20 border-gray-light-3 rounded-lg py-6 px-4 flex-col flex justify-evenly">
            <h1 className="text-base font-semibold">Updates available!</h1>
            <p className="text-sm font-normal">
              Update collection preview to see the changes. The current preview
              will be replaced.
            </p>
            <button className="flex items-center px-4 py-2 mt-6 text-base font-medium rounded-full justify-evenly bg-primary-default">
              <img src="/reload.svg" />
              Regenerate collection preview
            </button>
          </div>
        )}
        <div className="mx-4">
          <div className="relative flex flex-col">
            <StoreModal
              onsave={() => {
                dispatch(updateCollectionName(collectionName));
                dispatch(updateCollectionDescription(collectiondesc));
                dispatch(toggleSettingModal(false));
              }}
            />
            <p className="text-2xl md:text-3xl">Settings</p>
            <p className="mt-1 text-base md:text-xl text-gray-light-1">
              Set how often or rarely each trait will appear in the collection
            </p>
          </div>
          <p className="text-xl mt-14 md:text-2xl">General</p>
          <div className="mt-12 mb-10 flex flex-col md:flex-row justify-center gap-[140px] border-b-gray-light-1">
            <div className="md:w-[450px]">
              <ToolTip label="Collection Name" className="mt-8">
                <p className="text-sm md:text-base">Collection Name</p>
              </ToolTip>
              <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                <input
                  className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                  placeholder={tokenName}
                  style={{ background: 'none' }}
                  onChange={(e) => {
                    setCollectionName(e.target.value);
                    dispatch(toggleSettingModal(true));
                  }}
                  value={tokenName}
                />
              </div>
              <ToolTip label="Collection Description" className="mt-8">
                <p className="text-sm md:text-base">Collection Descriptions</p>
              </ToolTip>
              <div className="min-w-[48px] h-[172px] px-4 py-2 border border-white rounded-lg mt-2">
                <textarea
                  className="w-full h-full placeholder-gray-light-3 focus-visible:outline-0"
                  placeholder="We're a collection of 10,000 crazy buddies ready to rule the metaverse."
                  style={{ background: 'none' }}
                  onChange={(e) => {
                    setCollectionDescription(e.target.value);
                    dispatch(toggleSettingModal(true));
                  }}
                />
              </div>
              <div className="flex gap-4 mt-8">
                <div>
                  <ToolTip label="Collection Symbol">
                    <p>Collection Symbol</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                    <input
                      className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                      placeholder="BDS"
                      style={{ background: 'none' }}
                      onChange={(e) => {
                        dispatch(updateCollectionSymbol(e.target.value));
                        dispatch(toggleSettingModal(true));
                      }}
                    />
                  </div>
                </div>
                <div>
                  <ToolTip label="Total Supply">
                    <p>Total Supply</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                    <input
                      className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                      placeholder="500"
                      value={collectionTotalSupply}
                      style={{ background: 'none' }}
                      onChange={onChangeTotalSupply}
                    />
                  </div>
                </div>
              </div>

              <ToolTip label="External Link" className="mt-8">
                <p>External Link</p>
              </ToolTip>
              <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                <input
                  className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                  placeholder="www.website.com"
                  style={{ background: 'none' }}
                  onChange={(e) => {
                    dispatch(updateExternalLink(e.target.value));
                    dispatch(toggleSettingModal(true));
                  }}
                />
              </div>
              <div className="h-px bg-gray-dark-1 -mr-[300px] my-10" />
              <p className="text-2xl mt-14">Commissions</p>
              <ToolTip label="Payout Address" className="mt-10">
                <p>Payout Address</p>
              </ToolTip>
              <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                <input
                  className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                  placeholder="0x4414d542b040c822A44b63f4704b40aee870281F"
                  style={{ background: 'none' }}
                  onChange={(e) => {
                    dispatch(updatePayoutAddress(e.target.value));
                    dispatch(toggleSettingModal(true));
                  }}
                />
              </div>
              <ToolTip label="Royalties %" className="mt-8">
                <p>Royalties %</p>
              </ToolTip>
              <div className="flex items-center gap-2">
                <div className="max-w-[96px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                  <input
                    className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                    placeholder="0"
                    style={{ background: 'none' }}
                    onChange={(e) => {
                      dispatch(updateRoyalties(parseInt(e.target.value)));
                      dispatch(toggleSettingModal(true));
                    }}
                  />
                </div>
                <p>%</p>
              </div>
              <ToolTip label="Royalties Payout Address" className="mt-10">
                <p>Royalties Payout Address</p>
              </ToolTip>
              <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                <input
                  className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                  placeholder="0x4414d542b040c822A44b63f4704b40aee870281F"
                  style={{ background: 'none' }}
                  onChange={(e) => {
                    dispatch(updateRoyaltiesPayoutAddress(e.target.value));
                    dispatch(toggleSettingModal(true));
                  }}
                />
              </div>
            </div>
            <div className="">
              <ToolTip label="Collection Photo" className="mt-8">
                <p>Collection Photo</p>
              </ToolTip>
              <div
                id="folder"
                className="w-[240px] h-[240px] cursor-pointe flex justify-center mt-2 items-center"
                onClick={() => onFolderSelector()}
                style={{
                  backgroundImage : 'url(/upload-ele.svg)',
                  backgroundSize: "contain",
                  backgroundRepeat:"no-repeat"
                }}
              >
                {!previewImg && (
                  <img
                    src="/deploy/upload.svg"
                    alt="upload"
                    className="w-6 h-6"
                  />
                )}
                {previewImg && <img src={previewImg} />}
                <input
                  accept="image/*"
                  type="file"
                  id="folder-selector"
                  className="hidden"
                  onChange={onClickImgUpload}
                />
                {!previewImg && <p>Upload image</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
