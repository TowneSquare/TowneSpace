import { useEffect } from 'react';
import { Events, Queries } from '../../../api';
import { APTOS, APTOS_CONFIG } from '../../../state/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const Collections = () => {
  const { account } = useWallet();

  useEffect(() => {
    const address =
      '0xbb42ebc3eb2e08b0471af69b1d7522c71de6e43488af5200272e0d368c8c0ac7';

    const fetchList = async () => {
      const queries = new Queries(APTOS);
      const res = await queries.getOwnedV2Collections(0, 100, address);
      console.log(res);

      // const tokenRes = await queries.getOwnedV2Tokens(0, 100, address);
      // console.log(tokenRes);
    };
    fetchList();
  }, []);
  return <h1>My Collections</h1>;
};

export default Collections;
