import { Route, Routes } from "react-router-dom";
import Header from "./header";
import Home from "./home";
import Preview from "./preview";
import Manage from "./manage";
import Settings from "./settings";
import Generate from "./generate";

const Deploy = () => {
   return (
      <div>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/manage/*" element={<Manage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/generate" element={<Generate />} />
         </Routes>
      </div>
   )
}

export default Deploy;