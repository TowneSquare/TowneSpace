import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../state/hooks';
import { chooseCollection } from '../../../../state/tokens';
import { NftMetadataType } from '../../../../type/nft_type';

interface Props {
  data: NftMetadataType;
}

const Collection: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const onChooseCollection = (collection: NftMetadataType) => {
    dispatch(chooseCollection(collection));
  };

  const [collectionImage, setCollectionImage] = useState('');

  useEffect(() => {
    async function getCollectionImage() {
      try {
        if (data?.single_token_uri.includes('ipfs://')) {
          let cid = data.single_token_uri.replace('ipfs://', '');
          let ipfsGatewayUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

          const result = await fetch(ipfsGatewayUrl);
          const json = await result.json();
          if (json.image && json.image.includes('ipfs://')) {
            cid = json.image.replace('ipfs://', '');
            let _tokenImageUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;
            setCollectionImage(_tokenImageUrl);
          } else {
            setCollectionImage(json.image);
          }
        } else {
          setCollectionImage(data.single_token_uri);
        }
      } catch (e) {}
    }
    getCollectionImage();
  }, []);

  return (
    <div
      className={`px-2 py-2 flex items-center gap-2 rounded-md hover:bg-gray-dark-1 cursor-pointer ${
        data?.collection_id === 'temp' ? 'bg-gray-dark-2' : ''
      }`}
      onClick={() => onChooseCollection(data)}
    >
      <img
        src={collectionImage}
        className="w-[40px]"
        alt={data.collection_name}
      />
      <span className="font-medium truncate">{data.collection_name}</span>
    </div>
  );
};

export default Collection;
