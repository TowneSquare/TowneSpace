import { useEffect } from 'react';
import Header from '../../components/header';
import Collections from './collections';
import Commands from './commands';
import Home from './home';
import Tabs from './tabs';
import HelpCenter from './tabs/links';
import Tokens from './tokens';
import Welcome from './welcome';
import ViewNFTModal from '../../components/modal/viewNFTModal';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { fetchCollections, fetchNfts } from '../../state/tokens';

const Studio = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filter = useAppSelector(state => state.tokensState.nftFilter);
  const collections = useAppSelector((state) => state.tokensState.collections);
  const currentCollection = useAppSelector(
    (state) => state.tokensState.currentCollection
  );

  const { connected, account } = useWallet();
  
  useEffect(() => {
    if (!connected) navigate('/');
  }, [connected]);

  useEffect(() => {
    if (account) dispatch(fetchCollections(account?.address.toString()));
  }, [account, filter]);

  useEffect(() => {
    if (currentCollection && account) {
      dispatch(
        fetchNfts({
          address: account?.address.toString(),
          collection_id: currentCollection.collection_id,
        })
      );
    }
  }, [collections, currentCollection]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        navigate('/redirectPage');
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  return (
    <div className="">
      <Header />
      <div className="px-2 border-b-2 pt-9 md:px-12 border-b-gray-dark-1">
        <div className="flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between">
          <Welcome />
          <div className="flex items-center gap-14">
            <HelpCenter />
            <Commands />
            <ViewNFTModal />
          </div>
        </div>
        <Tabs />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mytoken" element={<Tokens />} />
        <Route path="/mycollect" element={<Collections />} />
      </Routes>
    </div>
  );
};

export default Studio;
