import ToolTip from "../../../components/tooltip";
import { updateCollectionName } from "../../../state/create";
import { updateCollectionDescription, updateCollectionSymbol, updateExternalLink, updatePayoutAddress, updateRoyalties, updateRoyaltiesPayoutAddress, updateTotalSupply } from "../../../state/deploy";
import { useAppDispatch } from "../../../state/hooks";

const Settings = () => {
   const dispatch = useAppDispatch();
   return (
      <div className="px-52 mt-10 flex justify-center">
         <div className="">
            <p className="text-3xl">Settings</p>
            <p className="mt-1 text-xl">Set how often or rarely each trait will appear in the collection</p>
            <p className="mt-14 text-2xl">General</p>
            <div className="mt-12 mb-10 flex justify-center gap-10  border-b-gray-light-1">
               <div className="w-[450px]">
                  <ToolTip label="Collection Name">
                     <p>Collection Name</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                     <input
                        className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="Slothian"
                        style={{ background: "none" }}
                        onChange={(e) => dispatch(updateCollectionName(e.target.value))}
                     />
                  </div>
                  <ToolTip label="Collection Description" className="mt-8">
                     <p>Collection Description</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-[172px] px-4 py-2 border border-white rounded-lg mt-2">
                     <textarea
                        className="w-full h-full placeholder-gray-light-3 focus-visible:outline-0"
                        placeholder="We're a collection of 10,000 crazy buddies ready to rule the metaverse."
                        style={{ background: "none" }}
                        onChange={(e) => dispatch(updateCollectionDescription(e.target.value))}
                     />
                  </div>
                  <div className="mt-8 flex gap-4">
                     <div>
                        <ToolTip label="Collection Symbol">
                           <p>Collection Symbol</p>
                        </ToolTip>
                        <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                           <input
                              className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="BDS"
                              style={{ background: "none" }}
                              onChange={(e) => dispatch(updateCollectionSymbol(e.target.value))}
                           />
                        </div>
                     </div>
                     <div>
                        <ToolTip label="Total Supply">
                           <p>Total Supply</p>
                        </ToolTip>
                        <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                           <input
                              className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="10,000"
                              style={{ background: "none" }}
                              onChange={(e) => dispatch(updateTotalSupply(parseInt(e.target.value)))}
                           />
                        </div>
                     </div>
                  </div>

                  <ToolTip label="External Link" className="mt-8">
                     <p>External Link</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                     <input
                        className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                        placeholder="www.website.com"
                        style={{ background: "none" }}
                        onChange={(e) => dispatch(updateExternalLink(e.target.value))}
                     />
                  </div>
                  <div className="h-px bg-gray-dark-1 -mr-[300px] my-10" />
                  <p className="mt-14 text-2xl">Commissions</p>
                  <ToolTip label="Payout Address" className="mt-10">
                     <p>Payout Address</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                     <input
                        className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="0x4414d542b040c822A44b63f4704b40aee870281F"
                        style={{ background: "none" }}
                        onChange={(e) => dispatch(updatePayoutAddress(e.target.value))}
                     />
                  </div>
                  <ToolTip label="Royalties %" className="mt-8">
                     <p>Royalties %</p>
                  </ToolTip>
                  <div className="flex items-center gap-2">
                     <div className="max-w-[96px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                        <input
                           className="w-full placeholder-gray-light-3 focus-visible:outline-0"
                           placeholder="0"
                           style={{ background: "none" }}
                           onChange={(e) => dispatch(updateRoyalties(parseInt(e.target.value)))}
                        />
                     </div>
                     <p>%</p>
                  </div>
                  <ToolTip label="Royalties Payout Address" className="mt-10">
                     <p>Royalties Payout Address</p>
                  </ToolTip>
                  <div className="min-w-[48px] h-11 px-4 py-2 border border-white rounded-full mt-2">
                     <input
                        className="w-full placeholder-gray-light-3 focus-visible:outline-0" placeholder="0x4414d542b040c822A44b63f4704b40aee870281F"
                        style={{ background: "none" }}
                        onChange={(e) => dispatch(updateRoyaltiesPayoutAddress(e.target.value))}
                     />
                  </div>
               </div>
               <div className="">
                  <ToolTip label="Collection Photo" className="mt-8">
                     <p>Collection Photo</p>
                  </ToolTip>
                  <div className="w-[234px] h-[234px] flex gap-2 justify-center items-center border border-dashed border-primary-light rounded-lg mt-2">
                     <img src="/deploy/upload.svg" alt="upload" className="w-6 h-6" />
                     <p>Upload image</p>
                  </div>
               </div>
            </div>


         </div>
      </div>
   )
};

export default Settings;