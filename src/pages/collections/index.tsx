import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Tabs from "./tabs";
import Title from "./title";
import All from "./All";
import V1 from "./V1";
import V2 from "./V2";
import Verified from "./Verified";

const Collections  = () => {
    return (
       <div className="">
          <Header />
          <div className="pt-9 px-2 md:px-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between">
               <Title />
               <Verified />
            </div>
            <Tabs />
         </div>
         <Routes>
            <Route path="/all" element={<All />} />
            <Route path="/v1" element={<V1 />} />
            <Route path="/v2" element={<V2 />} />
         </Routes>
       </div>
    )
 }
 
 export default Collections;