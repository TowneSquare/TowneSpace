import FilterType from '../../../type/filter_type';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { emptyCollections, setNftFilter, updateShowOnlyCNFT } from '../../../state/tokens';
import { Checkbox } from '@headlessui/react';
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";

interface Props {}
const Filter: React.FC<Props> = ({}) => {
  const filter = useAppSelector((state) => state.tokensState.nftFilter);
  const showOnlyCNFT = useAppSelector((state) => state.tokensState.showOnlyCNFT);
  const dispatch = useAppDispatch();
  const [enabled, setEnabled] = useState(false);
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
    <div className="flex flex-row items-centerr justify-evenly">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={showOnlyCNFT}
          onChange={() => {
            dispatch(updateShowOnlyCNFT(!showOnlyCNFT))
          }}
          className="group flex justify-center items-center h-5 w-5 rounded-md border border-white bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-primary-light"
        >
          <FaCheck className="hidden w-8 h-8 fill-white group-data-[checked]:block" />
        </Checkbox>
        <p>Show just cNFTs</p>
      </div>
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
      <div></div>
    </div>
  );
};

export default Filter;
