import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Settings from './settings';
import Review from './review';
import Deploy from './deploy';
import OverView from './overview';
import Manage from './manage';
import Preview from './preview';
import ArtSettings from './artsettings';

const MainDeploy = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/review" element={<Review />} />
      <Route path="/deploy" element={<Deploy />} />
      <Route path="/overview" element={<OverView />} />
      <Route path="/artsettings" element={<ArtSettings />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/manage*" element={<Manage />} />
    </Routes>
  );
};

export default MainDeploy;
