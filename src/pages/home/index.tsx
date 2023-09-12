import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { useAppDispatch } from "../../state/hooks";
import { toggleWalletPanel } from "../../state/dialog";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const Home = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { connected } = useWallet();

   if(connected)
      navigate("/studio");

   return (
      <div className="w-full h-screen !bg-cover" style={{ background: "url('/home/background.webp')" }} >
         <Header />
         <div className="h-[calc(100vh-92px)] flex flex-col justify-center items-center">
            <p className="text-[48px] font-bold text-center">
               Welcome to TownSpace Studio!
            </p>
            <p className="text-2xl font-semibold leading-[150%] text-center">
               Join the revolution!<br />
               Create and customize Composable NFTs!
            </p>

            <button
               className="px-8 py-4 flex gap-4 justify-center items-center mt-12 text-black font-medium bg-white  hover:bg-gray-light-2 active:bg-gray-light-1 rounded-full"
               onClick={() => dispatch(toggleWalletPanel(true))}
            >
               <img src="/home/wallet.svg" alt="wallet" />
               Connect Wallet
            </button>
         </div>
      </div>
   )
};

export default Home