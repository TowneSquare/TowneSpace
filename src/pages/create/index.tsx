import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import Screen5 from "./screen5";

const Create = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/step1" element={<Screen1 />} />
         <Route path="/step2" element={<Screen2 />} />
         <Route path="/step3" element={<Screen3 />} />
         <Route path="/step4" element={<Screen4 />} />
         <Route path="/step5" element={<Screen5 />} />
      </Routes>
   )
}

export default Create;