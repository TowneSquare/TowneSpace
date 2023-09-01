import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toggleWalletPanel } from "../../state/dialog";
import { useAppDispatch } from "../../state/hooks";

const ConnectButton = () => {
   const dispatch = useAppDispatch();
   const { connected } = useWallet();
   if(connected)
      return null;
   
   return (
      <div className="font-semibold cursor-pointer" onClick={() => dispatch(toggleWalletPanel(true))}>
         <p>Connect Wallet</p>
      </div>
   )
}

export default ConnectButton;