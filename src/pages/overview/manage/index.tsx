import { Route, Routes } from 'react-router-dom';
import Menus from './menus';
import Home from './home';
import Traits from './traits';
import Rarities from './rarities';
import Header from '../header';

const Manage = () => {
  return (
    <div>
      <Header />
      <div className="mt-10 mb-10 mx-4 flex justify-center">
        <div className="flex flex-col md:flex-row gap-10">
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
