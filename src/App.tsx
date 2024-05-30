import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Studio from './pages/studio';
import Collections from './pages/collections';
import Customize from './pages/customize';
import Create from './pages/create';
import Deploy from './pages/deploy';
import Migrate from './pages/migrate';
import Generate from './pages/generate';
import Overview from './pages/overview';
import MainDeploy from './pages/maindeploy';
import RedirectPage from './pages/redirectPage';
import { useQuery } from '@apollo/client';
import CreateModal from './components/modal/createModal';
import CreateStep2 from './components/modal/createStep2';
import NftCustomize from './pages/nft_customize';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio/*" element={<Studio />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customize/:address" element={<Customize />} />
        <Route path="/create/*" element={<Create />} />
        <Route path="/deploy/*" element={<Deploy />} />
        <Route path="/generate/*" element={<Generate />} />
        <Route path="/overview/*" element={<Overview />} />
        <Route path="/maindeploy/*" element={<MainDeploy />} />
        <Route path="/migrate/*" element={<Migrate />} />
        <Route path="/nftcustomize/:address" element={<NftCustomize />} />
        <Route path="/redirectPage/" element={<RedirectPage />} />
      </Routes>
      <CreateModal />
      <CreateStep2 />
    </div>
  );
}

export default App;
