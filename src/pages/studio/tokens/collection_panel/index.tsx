import { useQuery } from '@apollo/client';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { chooseCollection } from '../../../../state/tokens';
import { NftMetadataType } from '../../../../type/nft_type';
import { NFT_COLLECTION_OWNED_QUERY } from '../../../../util';
import Search from './search';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useState } from 'react';
import Collection from './collection';

const CollectionPanel = () => {
  const { account } = useWallet();
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] =
    useState<NftMetadataType | null>(null);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(NFT_COLLECTION_OWNED_QUERY, {
    variables: {
      wallet:
        '0x239589c5cfb0cc96f76fa59165a7cbb6ef99ad50d0acc34cf3a2585d861511be',
      offset: 0,
    },
  });

  if (loading) return null;
  if (data.current_collection_ownership_v2_view && collections.length == 0) {
    setCurrentCollection(data.current_collection_ownership_v2_view[0]);
    setCollections(data.current_collection_ownership_v2_view);
    console.log(data.current_collection_ownership_v2_view[0]);
  }

  return (
    <div className="w-auto md:w-[300px] flex flex-col gap-4">
      <Search />
      {collections.map((collection: NftMetadataType, index) => (
        // <div
        //    className={`px-2 py-2 flex items-center gap-2 rounded-md hover:bg-gray-dark-1 cursor-pointer ${collection?.collection_id === currentCollection?.collection_id ? "bg-gray-dark-2" : ""}`}
        //    key={index}
        //    onClick= {() => onChooseCollection(collection)}
        // >
        //    <img src={collection.collection_uri} className="w-[40px]" alt={collection.collection_name} />
        //    <span className="font-medium truncate">{collection.collection_name}</span>
        // </div>
        <Collection data={collection} key={index} />
      ))}
    </div>
  );
};

export default CollectionPanel;
