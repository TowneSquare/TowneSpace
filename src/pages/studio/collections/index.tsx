import { useEffect } from 'react';
import { Events } from '../../../api';
import { APTOS_CONFIG } from '../../../constants';

const Collections = () => {
  useEffect(() => {
    const fetchList = async () => {
      const events = new Events(APTOS_CONFIG);
      const res = await events.getComposableTokenCreatedEvents();
      console.log(res);
    };
    fetchList();
  }, []);
  return <h1>My Collections</h1>;
};

export default Collections;
