import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './itemTypes'
import { NftMetadataType } from '../../../type/nft_type'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { chooseTrait } from '../../../state/tokens'

export interface Props {
  id: any
  data: NftMetadataType
  index: number
  moveToken: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Token: FC<Props> = ({ id, data, index, moveToken }) => {
  const currentNft = useAppSelector(state => state.tokensState.currentNft)
  const currentTrait = useAppSelector(state => state.tokensState.currentTrait)
  const dispatch = useAppDispatch();

  const onChooseTrait = (token: NftMetadataType) => {
    dispatch(chooseTrait(token))
  }

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.TOKEN,
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
    type: ItemTypes.TOKEN,
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
    <div ref={ref} data-handler-id={handlerId} className={`relative p-2 flex items-center gap-4 bg-gray-dark-2 hover:bg-gray-light-3 rounded-md cursor-pointer ${currentTrait?.address == data.address ? "bg-gray-light-3" : ""} opacity-${opacity}`}
      key={index}
      onClick={() => onChooseTrait(data)}
    >
      <img src="/customize/indicator.svg" alt="indicator" />
      <div className="w-20 h-20 bg-gray-dark-1 rounded-md">
        <img src={data.uri} alt="uri" className="w-full h-full" />
      </div>
      <div className="">
        <div className="flex gap-2">
          <p className="text-[14px] text-gray-light-1 font-semibold">
            {currentNft?.collection}
          </p>
          <img src="/nft-card/polygon-check.svg" alt="check" />
        </div>
        <p className="text-[14px] text-gray-light-1 font-semibold pt-4">
          {data.collection}
        </p>
        <p className="text-[14px] font-semibold">
          {data.name}
        </p>
      </div>
    </div>
  )
}
