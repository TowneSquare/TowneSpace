import { Route, Routes } from "react-router-dom"
import Home from "./home"
import Step1 from "./step1"
import Step2 from "./step2"

const Generate = () => {
   return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/step1" element={<Step1 />} />
      <Route path="/step2" element={<Step2 />} />
   </Routes>
   )
}

export default Generate;