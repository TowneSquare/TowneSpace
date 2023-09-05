import update from 'immutability-helper'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Folder } from "./folder";
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import FolderType from '../../../../type/folder_type';

interface Props {
   folders: FolderType[],
   setFolders: Dispatch<SetStateAction<FolderType[]>>
}
const Folders: React.FC<Props> = ({folders, setFolders }) => {

   const moveToken = useCallback((dragIndex: number, hoverIndex: number) => {
      setFolders((prevFolders: FolderType[]) =>
         update(prevFolders, {
            $splice: [
               [dragIndex, 1],
               [hoverIndex, 0, prevFolders[dragIndex] as FolderType],
            ],
         }),
      )
   }, [])

   const renderFolder = useCallback(
      (folder: FolderType, index: number) => {
         return (
            <Folder
               key={index}
               index={index}
               id={folder.name}
               data={folder}
               moveToken={moveToken}
            />
         )
      },
      [],
   )

   return (
      <DndProvider backend={HTML5Backend}>
         <div className="p-4 w-[30vw] flex flex-col gap-4 border border-gray-dark-1 rounded-md">
            {folders.map((folder, i) => renderFolder(folder, i))}
         </div>
      </DndProvider>

   )
}

export default Folders;

interface DropResult {
   name: string
}