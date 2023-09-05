import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './itemTypes'
import FolderType from '../../../../type/folder_type'
import { useAppDispatch, useAppSelector } from '../../../../state/hooks'

export interface Props {
  id: any
  data: FolderType
  index: number
  moveToken: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Folder: FC<Props> = ({ id, data, index, moveToken }) => {
  const currentNft = useAppSelector(state => state.tokensState.currentNft)
  const currentTrait = useAppSelector(state => state.tokensState.currentTrait)
  const dispatch = useAppDispatch();


  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.FOLDER,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveToken(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FOLDER,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 100
  drag(drop(ref))
  return (
    <div ref={ref} data-handler-id={handlerId} className="h-14 p-2 flex items-center gap-4 bg-gray-dark-1 rounded-md">
      <img src="/create/indicator.svg" alt="indicator" />
      <p className="font-semibold">
        {data.name}
      </p>
    </div>
  )
}
