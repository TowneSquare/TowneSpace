import NftCard from '../../../components/nft_card';
import { useAppSelector } from '../../../state/hooks';
interface Props {}
const Board: React.FC<Props> = ({}) => {
  const filter = useAppSelector((state) => state.tokensState.filter);
  const NFTS = useAppSelector((state) => state.tokensState.nfts);

  return (
    <div className="flex h-full flex-wrap gap-4 items-baseline">
      {NFTS.map((nft, index) => (
        <NftCard data={nft} key={index} />
      ))}
    </div>
  );
};

export default Board;
