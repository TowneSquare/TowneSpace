import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/home';
import Studio from './pages/studio';
import Collections from './pages/collections';
import Customize from './pages/customize';
import Create from './pages/create';
import Deploy from './pages/deploy';
import Migrate from './pages/migrate';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { fetchNfts, fetchCollections } from './state/tokens';
import { useEffect } from 'react';
import Generate from './pages/generate';
import RedirectPage from './pages/redirectPage';
import { NFT_COLLECTION_OWNED_ID_QUERY } from './util';
import { useQuery } from '@apollo/client';
import CreateModal from './components/modal/createModal';

function App() {
  const dispatch = useAppDispatch();
  const collections = useAppSelector(state => state.tokensState.collections)
  const currentCollection = useAppSelector(state => state.tokensState.currentCollection)

  useEffect(() => {
    // dispatch(fetchCollections());
  }, []);

  useEffect(() => {
    // console.log("Collection: ", currentCollection);
    // if (currentCollection) {
    //   // dispatch(fetchNfts(currentCollection.name));
    //   const { loading, error, data } = useQuery(NFT_COLLECTION_OWNED_ID_QUERY, {
    //     variables: { wallet: "0x239589c5cfb0cc96f76fa59165a7cbb6ef99ad50d0acc34cf3a2585d861511be", offset: 0, collectionId: currentCollection.collection_id },
    //   });
    //   dispatch(data);
    // }
  }, [collections, currentCollection])

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
        <Route path="/migrate/*" element={<Migrate />} />
        <Route path="/redirectPage/" element={<RedirectPage />} />
      </Routes>
      <CreateModal />
    </div>
  );
}

export default App;