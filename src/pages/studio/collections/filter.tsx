import FilterType from '../../../type/filter_type';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { emptyMyCollections, setCollectionFilter } from '../../../state/tokens';
import { useNavigate } from 'react-router-dom';

interface Props {}
const Filter: React.FC<Props> = ({}) => {
  const filter = useAppSelector((state) => state.tokensState.collectionFilter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onComposable = () => {
    if (filter != FilterType.composable) {
      dispatch(setCollectionFilter(FilterType.composable));
      dispatch(emptyMyCollections());
    }
  };
  const onNfts = () => {
    if (filter != FilterType.nfts) {
      dispatch(setCollectionFilter(FilterType.nfts));
      dispatch(emptyMyCollections());
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full">
      <div className="flex bg-gray-dark-2 p-1 rounded-full">
        <button
          className={` px-6  py-2 rounded-full text-sm md:text-base font-semibold ${filter === FilterType.composable && 'bg-primary-default hover:bg-primary-dark-1'} hover:bg-gray-dark-1 active:bg-primary-default whitespace-nowrap`}
          onClick={() => onComposable()}
        >
          cNFT Collections
        </button>

        <button
          className={` px-6  py-2 rounded-full text-sm md:text-base font-semibold   ${filter == FilterType.nfts && 'bg-primary-default hover:bg-primary-dark-1'} hover:bg-gray-dark-1  active:bg-primary-default whitespace-nowrap`}
          onClick={() => onNfts()}
        >
          NFT Collections
        </button>
      </div>
      <div className="absolute right-20" onClick={() => navigate('/archived')}>
        <p className="text-base text-primary-default hover:text-primary-light/50 cursor-pointer">
          Archived collections
        </p>
      </div>
    </div>
  );
};

export default Filter;
