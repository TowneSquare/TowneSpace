import update from 'immutability-helper';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Folder } from './folder';
import FolderType from '../../../../type/folder_type';

interface Props {
  folders: FolderType[];
  setFolders: Dispatch<SetStateAction<FolderType[]>>;
}
const Folders: React.FC<Props> = ({ folders, setFolders }) => {
  const moveToken = useCallback((dragIndex: number, hoverIndex: number) => {
    setFolders((prevFolders: FolderType[]) =>
      update(prevFolders, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevFolders[dragIndex] as FolderType],
        ],
      })
    );
  }, []);

  const renderFolder = useCallback((folder: FolderType, index: number) => {
    return (
      <Folder
        key={index}
        index={index}
        id={folder.name}
        data={folder}
        moveToken={moveToken}
      />
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-md w-96">
      {folders.map((folder, i) => renderFolder(folder, i))}
    </div>
  );
};

export default Folders;

interface DropResult {
  name: string;
}
