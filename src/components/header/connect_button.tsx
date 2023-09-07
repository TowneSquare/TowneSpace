import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toggleWalletPanel } from "../../state/dialog";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import WalletButtons from "../../wallet-adapter/WalletButtons";

const ConnectButton = () => {
   const dispatch = useAppDispatch();
   const { connected } = useWallet();
   const isOpen = useAppSelector(state => state.dialogState.bWalletPanel);

   if (connected)
      return null;

   return (
      <>
         <div className="font-semibold cursor-pointer" onClick={() => dispatch(toggleWalletPanel(true))}>
            <p className="whitespace-nowrap">Connect Wallet</p>
         </div>
         <div className={`${isOpen ? "block" : "hidden"} absolute z-10 inset-0 flex justify-center items-center bg-[#00000050]`}>
            <div className="relative w-[400px]  bg-gray-dark-2 border-gray-light-3 rounded-md p-8">
               <p className="text-2xl font-bold text-center">Connect your wallet</p>
               <p className="px-10 font-semibold text-center mt-4">Connect an Aptos wallet from the list or create a new one</p>
               <WalletButtons />
               <p className="text-sm font-semibold text-center mt-8 leading-[200%]">
                  By connecting your wallet, you agree to the &nbsp;
                  <span className="text-primary-dark">Terms & Conditions</span>
                  &nbsp; and &nbsp;
                  <span className="text-primary-dark">Privacy Policy</span>
               </p>
               <div className="absolute top-6 right-6 w-4 h-4 cursor-pointer" onClick={() => dispatch(toggleWalletPanel(false))}>
                  <p className="text-3xl font-bold">×</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default ConnectButton;