import { useAppSelector } from '../../state/hooks';

interface Props {}
const Preview: React.FC<Props> = ({}) => {
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);

  return (
    <div className="w-[200px] md:md-[230px] lg:w-[264px]">
      <div className="h-[200px] md:h-[230px] lg:h-[264px] rounded-lg overflow-hidden">
        <img src={currentNft?.token_uri} className="w-full h-full" alt="uri" />
      </div>
      <div className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-gray-light-1">
        {currentNft?.collection_name}
        <img src="/nft-card/polygon-check.svg" alt="check" />
      </div>
      <p className="text-lg font-semibold">{currentNft?.token_name}</p>
    </div>
  );
};

export default Preview;
