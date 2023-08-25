import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Studio from './pages/studio';
import Collections from './pages/collections';
import Customize from './pages/customize';
import { useAppDispatch } from './state/hooks';
import { fetchNfts } from './state/nfts';
import { fetchCollections } from './state/collections';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
     dispatch(fetchNfts());
     dispatch(fetchCollections());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio/*" element={<Studio />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customize/:address" element={<Customize />} />
      </Routes>
    </div>
  );
}

export default App;