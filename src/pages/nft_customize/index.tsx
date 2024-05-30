import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Preview from './preview';
import Header from './header';
import Replace from './replace';
import Traits from './traits';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import ExitEdit from './exit_edit';
import FinishEdit from './finish_edit';
import { chooseNft } from '../../state/tokens';

const NftCustomize = () => {
  const { address } = useParams();
  const nfts = useAppSelector((state) => state.tokensState.nfts);
  const currentNft = useAppSelector((state) => state.tokensState.currentNft);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      (!currentNft || currentNft.token_data_id != address) &&
      address &&
      nfts.length > 0
    ) {
      let res = nfts.filter((nft) => nft.token_data_id == address);
      if (res.length > 0) {
        dispatch(chooseNft(res[0]));
      }
    }
  }, [address, nfts]);

  return (
    <div className="relative">
      <Header />
      <div className="md:mx-20 lg:mx-32 flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
        <Preview />
        <Traits />
        <Replace />
      </div>
      <ExitEdit />
      <FinishEdit />
    </div>
  );
};

export default NftCustomize;
