import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Studio from './pages/studio';
import Collections from './pages/collections';
import Create from './pages/create';
import Deploy from './pages/deploy';
import Migrate from './pages/migrate';
import Generate from './pages/generate';
import Overview from './pages/overview';
import MainDeploy from './pages/maindeploy';
import RedirectPage from './pages/redirectPage';
import CreateModal from './components/modal/createModal';
import CreateStep2 from './components/modal/createStep2';
import Customize from './pages/customize';
import Archived from './pages/archived';
import UploadAssetModal from './components/modal/uploadAssetModals';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio/*" element={<Studio />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/create/*" element={<Create />} />
          <Route path="/deploy/*" element={<Deploy />} />
          <Route path="/generate/*" element={<Generate />} />
          <Route path="/overview/*" element={<Overview />} />
          <Route path="/maindeploy/*" element={<MainDeploy />} />
          <Route path="/migrate/*" element={<Migrate />} />
          <Route path="/customize/:address" element={<Customize />} />
          <Route path="/archived/" element={<Archived />} />
          <Route path="/redirectPage/" element={<RedirectPage />} />
        </Routes>
        <CreateModal />
        <CreateStep2 />
        <UploadAssetModal />
      </div>
    </QueryClientProvider>
  );
}

export default App;
