import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { Tooltip } from 'react-tooltip';

import LazyImage from '../../../components/lazyImage';
import { toggleChooseTrait } from '../../../state/dialog';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { chooseCurrentTraitFolder } from '../../../state/tokens';
import CustomFolderType from '../../../type/custom_folder_type';

import { ItemTypes } from './itemTypes';

interface Props {
  id: any;
  data: CustomFolderType;
  index: number;
  moveToken: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Folder: React.FC<Props> = ({ id, data, index, moveToken }) => {
  const dispatch = useAppDispatch();
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const currentTraitfolders = useAppSelector(
    (state) => state.tokensState.currentTraitFolders
  );
  const currentTraitFolder = useAppSelector(
    (state) => state.tokensState.currentTraitFolder
  );

  const onChooseFolder = (folder: CustomFolderType) => {
    dispatch(chooseCurrentTraitFolder(folder));
    if (!folder.trait) {
      dispatch(toggleChooseTrait(true));
    }
  };

  const isStared = data.name  === "Body";
  const background = isStared ? 'bg-gray-dark-2' : 'bg-gray-dark-1';

  const isActive = data.name == currentTraitFolder?.name;
  const bgColor = isActive
    ? 'border-2 border-primary-dark-1 bg-primary-dark-1/20'
    : 'bg-gray-dark-1';

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.FOLDER,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveToken(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FOLDER,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 100;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`h-[100px] mb-2 gap-2 rounded-[8px] w-full flex items-center ${background} ${bgColor} p-2 cursor-pointer hover:bg-gray-light-3/60`}
      onClick={() => onChooseFolder(data)}
    >
      {data.trait ? (
        <>
          <img src="/customize/equal.svg" />
          <div className="w-[84px] bg-gray-light-3 rounded-lg">
            <LazyImage
              src={data.trait.token_uri}
              alt="image"
              className="w-[84px] h-[84px]"
            />
          </div>
          <div className="w-[154px] flex flex-col leading-4 font-semibold text-[10px] md:text-[14px] text-start mr-8">
            <p className="text-gray-light-1">{currentNft?.collection_name}</p>
            <p className="mt-2 font-normal text-gray-light-1">{data.name}</p>
            <p className="">{currentNft?.token_name}</p>
          </div>
          <div className="flex justify-end">
            {isStared && (
              <div>
                <Tooltip id="my-tooltip" className="border border-white bg-gray-dark-3" />
                <img
                  src="/customize/star.png"
                  className='ml-2'
                  alt="star"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="This is a base trait. It can’t be removed or replaced."
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Folder;
