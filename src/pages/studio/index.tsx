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
  const filter = useAppSelector((state) => state.tokensState.filter);

  const collections = useAppSelector((state) => state.tokensState.collections);
  const currentCollection = useAppSelector(
    (state) => state.tokensState.currentCollection
  );

  const { account } = useWallet();

  useEffect(() => {
    console.log("fetch collections")
    if (account) dispatch(fetchCollections(account?.address));
  }, [account]);

  useEffect(() => {
    console.log("fetch nft")
    if (currentCollection && account) {
      dispatch(
        fetchNfts({
          address: account?.address,
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

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  return (
    <div className="">
      <Header />
      <div className="pt-9 px-2 md:px-12 border-b-2 border-b-gray-dark-1">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between">
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
