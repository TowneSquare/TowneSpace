import { updateFilter, updateTokenName } from '../../../state/deploy';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';

const Navbar = () => {
  const dispatch = useAppDispatch();

  const tokenName = useAppSelector((state) => state.deployState.tokenName);
  const tokens = useAppSelector((state) => state.deployState.tokens);

  return (
    <div className="mt-1 px-4 flex flex-col md:flex-row md:items-end gap-4">
      <div className="flex items-end gap-4">
        <div className="min-w-[64px] h-11 flex items-center justify-center border bg-[#FFFFFF] bg-opacity-10 border-gray-light-1 rounded-full cursor-pointer">
          <img src="/deploy/order.svg" alt="order" />
        </div>
        <div className="">
          <p className="text-sm md:text-base">cNFT name</p>
          <div className="md:min-w-[130px] h-11 px-4 flex items-center border border-gray-light-1 rounded-full mt-1">
            <input
              className="w-full placeholder-gray-light-3 focus-visible:outline-0"
              placeholder="Cool Sloths"
              style={{ background: 'none' }}
              value={tokens.length}
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
              value={tokens.length}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-end gap-4">
        <div className="min-w-[225px] bg-[#9264F81A] h-11 flex justify-center gap-2 items-center border border-primary-light rounded-full cursor-pointer">
          <img src="/deploy/refresh.svg" alt="refresh" />
          <p className="text-[16px] font-medium text-primary-light">
            Regenerate collection
          </p>
        </div>
        <div className="w-full h-11 px-4 py-2 flex gap-2 border border-gray-light-1 rounded-full">
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
