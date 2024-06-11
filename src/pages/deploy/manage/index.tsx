import { Route, Routes } from 'react-router-dom';
import Menus from './menus';
import Home from './home';
import Traits from './traits';
import Rarities from './rarities';
import Header from '../header';

const Manage = () => {
  return (
    <div>
      <div className="flex justify-center mx-4 mt-10 mb-10">
        <div className="flex flex-col gap-10 md:flex-row">
          <Menus />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/traits" element={<Traits />} />
            <Route path="/rarities" element={<Rarities />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Manage;
