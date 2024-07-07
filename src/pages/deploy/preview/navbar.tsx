import { updateFilter, updateTokenName } from '../../../state/deploy';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';

interface Props {
  onSideBarToggle: () => void;
  isSideBarActive: boolean;
}

const Navbar = ({ onSideBarToggle, isSideBarActive }: Props) => {
  const dispatch = useAppDispatch();

  const tokenName = useAppSelector((state) => state.deployState.collectionName);
  const totalSupply = useAppSelector((state) => state.deployState.totalSupply);
  return (
    <div className="flex flex-col gap-2 px-2  mt-8 md:flex-row md:items-end">
      <div className="flex gap-2 items-end ">
        <div
          onClick={onSideBarToggle}
          className={`min-w-[64px] h-11 flex items-center justify-center border  ${isSideBarActive && ` bg-[#FFFFFF] bg-opacity-10`} border-gray-light-1 rounded-full cursor-pointer`}
        >
          <img src="/deploy/order.svg" alt="order" />
        </div>
        <div className="">
          <p className="text-sm md:text-base">cNFT name</p>
          <div className="md:min-w-[130px] h-11 px-4 flex items-center border border-gray-light-1 rounded-full mt-1">
            <input
              className="w-full placeholder-gray-light-3 focus-visible:outline-0"
              placeholder="Token Name"
              style={{ background: 'none' }}
              value={tokenName}
              disabled
            />
          </div>
        </div>
        <div className="">
          <p className="text-sm md:text-base">Total cNFTs</p>
          <div className="md:min-w-[130px] h-11 px-4 flex items-center border border-gray-light-1 rounded-full mt-1">
            <input
              className="w-full placeholder-gray-light-3 focus-visible:outline-0"
              placeholder="10,000"
              style={{ background: 'none' }}
              value={totalSupply}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex items-end w-full gap-2">
        <div className="min-w-[225px] bg-[#9264F81A] h-11 flex justify-center gap-2 items-center border border-primary-light rounded-full cursor-pointer">
          <img src="/deploy/refresh.svg" alt="refresh" />
          <p className="text-[16px] font-medium text-primary-light">
            Regenerate collection
          </p>
        </div>
        <div className="flex w-full gap-2 px-4 py-2 border rounded-full h-11 border-gray-light-1">
          <img src="/header/search.svg" className="" alt="search" />
          <input
            className="w-full placeholder-gray-light-3 focus-visible:outline-0"
            placeholder="Filter by name, trait"
            style={{ background: 'none' }}
            onChange={(e) => dispatch(updateFilter(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
