import { Dispatch, SetStateAction } from 'react';
import PrimaryButton from '../../../components/primary_button';
import ButtonStatus from '../../../type/button_status';
import FilterType from '../../../type/filter_type';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { setFilter } from '../../../state/tokens';

interface Props {}
const Filter: React.FC<Props> = ({}) => {
  const filter = useAppSelector((state) => state.tokensState.filter);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center">
      <div className="flex bg-gray-dark-2 rounded-full">
        <PrimaryButton
          type={
            filter == FilterType.composable
              ? ButtonStatus.active
              : ButtonStatus.inactive
          }
          onClick={() => dispatch(setFilter(FilterType.composable))}
        >
          Composable NFTs
        </PrimaryButton>
        <PrimaryButton
          type={
            filter == FilterType.nfts
              ? ButtonStatus.active
              : ButtonStatus.inactive
          }
          onClick={() => dispatch(setFilter(FilterType.nfts))}
          className="md:w-[120px]"
        >
          NFTs
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Filter;
