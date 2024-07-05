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
      <div className="after: w-[417px] overflow-auto h-3_4_scr p-4 border border-gray-dark-1 rounded-xl">
        {folders.map((folder, i) => renderFolder(folder, i))}
      </div>
    </div>
  );
};

export default Folders;
