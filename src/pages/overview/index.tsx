import { Route, Routes } from 'react-router-dom';
import Home from './home';
import View from './view';
import MainDeploy from './maindeploy';
import Manage from './manage';
import Preview from './preview';
import Setiings from './settings';
import Generate from './generate';

const Overview = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View />} />
        <Route path="/maindeploy" element={<MainDeploy />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/settings" element={<Setiings />} />
        <Route path="/manage*" element={<Manage />} />
        <Route path="/deploy" element={<Generate />} />
      </Routes>
    </div>
  );
};

export default Overview;
