import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';
import { NftMetadataType } from '../../../type/nft_type';
import { NFTS } from '../../../state/constants';
import { useAppSelector } from '../../../state/hooks';
import { Token } from './token';

interface Props {}
const Tokens: React.FC<Props> = ({}) => {
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const [tokens, setTokens] = useState<NftMetadataType[]>([]);

  useEffect(() => {
    if (currentNft?.composed_nfts) {
      let tokens: NftMetadataType[] = [];
      currentNft?.composed_nfts.forEach((address) => {
        let token = NFTS.filter(
          (nft) => nft.token_data_id == address.token_data_id
        );
        if (token.length > 0) tokens.push(token[0]);
      });
      setTokens(tokens);
    }
  }, [currentNft?.composed_nfts]);

  const moveToken = useCallback((dragIndex: number, hoverIndex: number) => {
    setTokens((prevTokens: NftMetadataType[]) =>
      update(prevTokens, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTokens[dragIndex] as NftMetadataType],
        ],
      })
    );
  }, []);

  const renderToken = useCallback((token: NftMetadataType, index: number) => {
    return (
      <Token
        key={index}
        index={index}
        id={token.token_data_id}
        data={token}
        moveToken={moveToken}
      />
    );
  }, []);

  return (
    <div className="p-4 md:w-[30vw] flex flex-col gap-4 border border-gray-dark-1 rounded-md">
      {tokens.map((token, i) => renderToken(token, i))}
    </div>
  );
};

export default Tokens;

interface DropResult {
  name: string;
}
