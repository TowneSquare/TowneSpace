import FilterType from '../../../type/filter_type';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { emptyCollections, setNftFilter } from '../../../state/tokens';

interface Props {}
const Filter: React.FC<Props> = ({}) => {
  const filter = useAppSelector((state) => state.tokensState.nftFilter);
  const dispatch = useAppDispatch();

  const onComposable = () => {
    if (filter != FilterType.composable) {
      dispatch(setNftFilter(FilterType.composable));
      dispatch(emptyCollections());
    }
  };
  const onNfts = () => {
    if (filter != FilterType.nfts) {
      dispatch(setNftFilter(FilterType.nfts));
      dispatch(emptyCollections());
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex p-1 rounded-full bg-gray-dark-2">
        <button
          className={` px-6  py-2 rounded-full text-sm md:text-base font-semibold ${filter === FilterType.composable && 'bg-primary-default hover:bg-primary-dark-1'} hover:bg-gray-dark-1 active:bg-primary-default whitespace-nowrap`}
          onClick={() => onComposable()}
        >
          Tokens V2
        </button>

        <button
          className={` px-6  py-2 rounded-full text-sm md:text-base font-semibold   ${filter == FilterType.nfts && 'bg-primary-default hover:bg-primary-dark-1'} hover:bg-gray-dark-1  active:bg-primary-default whitespace-nowrap`}
          onClick={() => onNfts()}
        >
          Tokens V1
        </button>
      </div>
    </div>
  );
};

export default Filter;
