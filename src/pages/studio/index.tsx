import Collections from "./collections";
import Commands from "./commands";
import Home from "./home";
import Tabs from "./tabs";
import Tokens from "./tokens";
import Welcome from "./welcome";

import { Route, Routes } from "react-router-dom";

const Studio = () => {
   return (
      <div className="">
         <div className="pt-9 px-2 md:px-12 border-b-2 border-b-gray-dark-1">
            <div className="flex flex-col md:flex-row justify-between">
               <Welcome />
               <Commands />
            </div>
            <Tabs />
         </div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mytoken" element={<Tokens />} />
            <Route path="/mycollect" element={<Collections />} />
         </Routes>
      </div>
   )
}

export default Studio;