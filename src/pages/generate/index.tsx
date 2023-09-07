import { Route, Routes } from "react-router-dom"
import Home from "./home"
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

const Generate = () => {
   return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/step1" element={<Step1 />} />
      <Route path="/step2" element={<Step2 />} />
      <Route path="/step3" element={<Step3 />} />
   </Routes>
   )
}

export default Generate;