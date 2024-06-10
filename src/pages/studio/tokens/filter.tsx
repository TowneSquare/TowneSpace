import { Dispatch, SetStateAction } from 'react';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
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
        <PrimaryButton
          type={
            filter == FilterType.composable
              ? ButtonStatus.active
              : ButtonStatus.inactive
          }
          onClick={() => onComposable()}
        >
          V2 Tokens
        </PrimaryButton>
        <PrimaryButton
          type={
            filter == FilterType.nfts
              ? ButtonStatus.active
              : ButtonStatus.inactive
          }
          onClick={() => onNfts()}
          className="md:w-[120px]"
        >
          V1 Tokens
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Filter;
