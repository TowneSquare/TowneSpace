import update from 'immutability-helper'
import { useCallback, useEffect, useState } from "react";
import { NftMetadataType } from "../../../type/nft_type";
import { NFTS } from "../../../state/constants";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { chooseTrait } from "../../../state/tokens";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Token } from "./token";

interface Props {
}
const Tokens: React.FC<Props> = ({ }) => {
   const currentNft = useAppSelector(state => state.tokensState.currentNft)
   const [tokens, setTokens] = useState<NftMetadataType[]>([]);
   const currentTrait = useAppSelector(state => state.tokensState.currentTrait)
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (currentNft?.object_tokens) {
         let tokens: NftMetadataType[] = [];
         currentNft?.object_tokens.forEach(address => {
            let token = NFTS.filter((nft) => nft.address == address)
            if (token.length > 0)
               tokens.push(token[0])
         });
         setTokens(tokens);;
      }
   }, [currentNft?.object_tokens])


   const moveToken = useCallback((dragIndex: number, hoverIndex: number) => {
      setTokens((prevTokens: NftMetadataType[]) =>
         update(prevTokens, {
            $splice: [
               [dragIndex, 1],
               [hoverIndex, 0, prevTokens[dragIndex] as NftMetadataType],
            ],
         }),
      )
   }, [])

   const renderToken = useCallback(
      (token: NftMetadataType, index: number) => {
         return (
            <Token
               key={index}
               index={index}
               id={token.address}
               data={token}
               moveToken={moveToken}
            />
         )
      },
      [],
   )

   return (
      <DndProvider backend={HTML5Backend}>
         <div className="p-4 w-[30vw] flex flex-col gap-4 border border-gray-dark-1 rounded-md">
            {tokens.map((token, i) => renderToken(token, i))}
         </div>
      </DndProvider>

   )
}

export default Tokens;

interface DropResult {
   name: string
}