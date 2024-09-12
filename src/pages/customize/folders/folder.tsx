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

  const isStared = !data.trait?.composed_to;
  const background = isStared ? 'border-2 border-white/0 bg-white/5' : 'border-2 border-white/0 bg-white/10';

  const isActive = data.name === currentTraitFolder?.name;
  const bgColor = isActive && 'border-2 !border-primary-dark-1 !bg-primary-default/20';
  const str = "@#$@#$@#$@#$@#$@#$@#$@#$@#$@#"
  const isEmpty = !data.trait;
  const borderEmpty = isEmpty ? '!border !border-gray-light-3 border-dashed' : '';

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
      className={`flex gap-2 items-center p-2 mb-1 w-full rounded-lg cursor-pointer h-[100px] ${background} ${bgColor} ${borderEmpty} hover:bg-gray-light-3/60`}
      onClick={() => onChooseFolder(data)}
    >
      <img src="/customize/equal.svg" />
      <div className="w-[84px] h-[84px] bg-gray-light-3 rounded-lg">
        {data.trait && <LazyImage
          src={data.trait.token_uri}
          alt="image"
          className="w-[84px] h-[84px]"
        />}
      </div>
      <div className="flex flex-col justify-between h-full py-1 ml-2 mr-8 font-semibold leading-4 grow text-2xs md:text-sm text-start">
        <p className="text-gray-light-1">{currentNft?.collection_name}</p>
        <div className="flex flex-col w-full gap-y-1">
          <p className="leading-tight uppercase whitespace-nowrap text-gray-light-1">
            {data.name.length < 15 ? data.name : data.name.slice(10)+"..."}
          </p>
          <p className={`text-base leading-tight ${data.trait ? 'text-white' : 'text-gray-light-1 font-normal'}`}>{data.trait?.token_name || '-'}</p>
        </div>
      </div>
      <div className="flex justify-end">
        {isStared && (
          <div>
            <Tooltip id="my-tooltip" className="border border-white bg-gray-dark-3" />
            <img
              src="/customize/star.png"
              className='w-8'
              alt="star"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="This is a base trait. It can’t be removed or replaced."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
