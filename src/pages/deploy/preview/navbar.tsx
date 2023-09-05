import { updateCollectionCount, updateFilter, updateTokenName } from "../../../state/deploy";
import { useAppDispatch } from "../../../state/hooks";

const Navbar = () => {
   const dispatch = useAppDispatch();
   return (
      <div className="mt-8 px-4 flex items-end gap-4">
         <div className="min-w-[64px] h-11 flex items-center justify-center border border-white rounded-full cursor-pointer">
            <img src="/deploy/order.svg" alt="order" />
         </div>
         <div className="">
            <p>Collection</p>
            <div className="min-w-[130px] h-11 px-4 flex items-center border border-white rounded-full mt-1">
               <input
                  className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="10,000"
                  style={{ background: "none" }}
                  onChange={(e) => dispatch(updateCollectionCount(parseInt(e.target.value)))}
               />
            </div>
         </div>
         <div className="min-w-[64px] h-11 flex justify-center items-center border border-primary-light rounded-full cursor-pointer">
            <img src="/deploy/refresh.svg" alt="refresh" />
         </div>
         <div className="w-full h-11 px-4 py-2 flex gap-2 border border-white rounded-full">
            <img src="/header/search.svg" className="" alt="search" />
            <input
               className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="Filter by name, trait"
               style={{ background: "none" }}
               onChange={(e) => dispatch(updateFilter(e.target.value))}
            />
         </div>
         <div className="">
            <p>Token Name</p>
            <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-1">
               <input
                  className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="Slothian"
                  style={{ background: "none" }}
                  onChange={(e) => dispatch(updateTokenName(e.target.value))}
               />
            </div>
         </div>
      </div>
   )
};


export default Navbar;