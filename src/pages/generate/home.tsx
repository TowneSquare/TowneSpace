import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigation = useNavigate();
   useEffect(() => {
      navigation("/generate/step1");
   })
   return (
      <h1>Home</h1>
   )
};

export default Home