import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import { useAppDispatch } from "../../state/hooks";
import { toggleWalletPanel } from "../../state/dialog";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Main_section from "./items/main_section";
import Second from "./items/second";
import Third from "./items/third";
import Last from "./items/last";
import Footer from "./items/footer";

const Home = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { connected } = useWallet();

   if (connected) {
      navigate("/studio");
   }

   return (
      <div className="w-full h-screen !bg-cover bg-gray-dark-3" >
         <Header />
         <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-center w-full">
               <Main_section />
               <Second />
               <Third />
               <Last />
               <Footer />
            </div>
         </div>
      </div>
   )
};

export default Home