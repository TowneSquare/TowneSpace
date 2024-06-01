import { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';

import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import Folder from './folder';
import CustomFolderType from '../../../type/custom_folder_type';
import { setCurrentTraitFolders } from '../../../state/tokens';

const Folders = () => {
  const dispatch = useAppDispatch();

  const currentTraitFolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );
  console.log(currentTraitFolders);

  const [folders, setFolders] =
    useState<CustomFolderType[]>(currentTraitFolders);

  useEffect(() => {
    dispatch(setCurrentTraitFolders(folders));
  }, [folders]);

  useEffect(() => {
    setFolders(currentTraitFolders)
  }, [currentTraitFolders]);

  const moveToken = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setFolders((prevFolders: CustomFolderType[]) =>
        update(prevFolders, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevFolders[dragIndex] as CustomFolderType],
          ],
        })
      );
    },
    [currentTraitFolders]
  );

  const renderFolder = useCallback(
    (folder: CustomFolderType, index: number) => {
      return (
        <Folder
          key={index}
          id={folder.name}
          index={index}
          data={folder}
          moveToken={moveToken}
        />
      );
    },
    []
  );

  return (
    <div>
      <div className="ml-2 after: w-[385px] overflow-auto  h-[75vh] p-2 border-2 border-gray-dark-1 rounded-xl">
        {folders.map((folder, i) => renderFolder(folder, i))}
      </div>
    </div>
  );
};

export default Folders;
