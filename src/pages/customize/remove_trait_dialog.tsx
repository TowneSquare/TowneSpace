import { useAppDispatch, useAppSelector } from '../../state/hooks';
import React from 'react';
import PrimaryButton from '../../components/primary_button';
import ButtonStatus from '../../type/button_status';
import {
  toggleRemoveTrait,
  toggleRemoveTraitConfirm,
} from '../../state/dialog';
import LazyImage from '../../components/lazyImage';
import CustomFolderType from '../../type/custom_folder_type';
import { chooseCurrentTraitFolder, setCurrentTraitFolders } from '../../state/tokens';

const RemoveDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.dialogState.bTraitRemove);

  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );
  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );

  const onRemove = () => {
    const tempFolders: CustomFolderType[] = JSON.parse(
      JSON.stringify(currentTraitFolders)
    );
    for (const folder of tempFolders) {
      if (folder.name == currentTraitFolder?.name) {
        folder.trait = undefined;
        break;
      }
    }
    dispatch(setCurrentTraitFolders(tempFolders));

    const tempTrait: CustomFolderType = JSON.parse(
      JSON.stringify(currentTraitFolder)
    );
    tempTrait.trait = undefined;
    dispatch(chooseCurrentTraitFolder(tempTrait));

    dispatch(toggleRemoveTrait(false));
    dispatch(toggleRemoveTraitConfirm(true));
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-dark-2 bg-opacity-80 flex items-center justify-center">
        <div className="rounded-lg w-1/4 bg-gray-dark-4">
          <div className="flex justify-between m-6 items-center">
            <h2 className="text-lg font-semibold">
              Remove trait from Slothian #9898{' '}
            </h2>
            <button
              className="text-gray-700"
              onClick={() => dispatch(toggleRemoveTrait(false))}
            >
              <img src="/customize/close.svg" alt="close" />
            </button>
          </div>
          <div className="flex mt-4 p-2 mx-4 text-center flex-col justify-center items-center gap-6">
            <LazyImage src={currentTraitFolder?.trait?.token_uri} alt="" />
            <p>
              Do you want to remove {currentTraitFolder?.trait?.token_name} from{' '}
              {currentNft?.token_name}?<br />
              {currentTraitFolder?.trait?.token_name}&nbsp; will be transferred
              back to your wallet.
            </p>
            <PrimaryButton
              type={ButtonStatus.active}
              onClick={onRemove}
              className="px-10 my-6 w-1/2"
            >
              Remove Trait
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveDialog;
