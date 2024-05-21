import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Screen3 from './screen1';
import Screen4 from './screen2';
import Screen5 from './screen5';
import Screen6 from './screen6';

const Create = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/step1" element={<Screen3 />} />
      <Route path="/step2" element={<Screen4 />} />
      <Route path="/step3" element={<Screen5 />} />
      <Route path="/step4" element={<Screen6 />} />
    </Routes>
  );
};

export default Create;
