import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Collections from "./collections";
import Commands from "./commands";
import Home from "./home";
import Tabs from "./tabs";
import HelpCenter from "./tabs/links";
import Tokens from "./tokens";
import Welcome from "./welcome";

import CreateDialog from "../create/screen1";

const Studio = () => {
   return (
      <div className="relative">
         <Header />
         <div className="pt-9 px-2 md:px-12 border-b-2 border-b-gray-dark-1">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between">
               <Welcome />
               <HelpCenter />
               <Commands />
            </div>
            <Tabs />
         </div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytoken" element={<Tokens />} />
            <Route path="/mycollect" element={<Collections />} />
         </Routes>
         <CreateDialog />
      </div>
   )
}

export default Studio;