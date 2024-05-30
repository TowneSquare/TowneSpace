import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { chooseCollection } from '../../../../state/tokens';
import Search from './search';
import { CollectionV1Fields, CollectionV2Fields } from '../../../../api';

const CollectionPanel = () => {
  const collections = useAppSelector((state) => state.tokensState.collections);
  const currentCollection = useAppSelector(
    (state) => state.tokensState.currentCollection
  );
  const dispatch = useAppDispatch();

  const onChooseCollection = (
    collection: CollectionV1Fields | CollectionV2Fields
  ) => {
    dispatch(chooseCollection(collection));
  };

  return (
    <div className="w-auto md:min-w-[300px] flex flex-col gap-4">
      <Search />
      {collections.map((collection, index) => (
        <div
          className={`px-2 py-2 flex items-center gap-2 rounded-md hover:bg-gray-dark-1 cursor-pointer ${collection.collection_name == currentCollection?.collection_name ? 'bg-gray-dark-2' : ''}`}
          key={index}
          onClick={() => onChooseCollection(collection)}
        >
          <img src={'/logo.png'} className="w-12" alt="uri" />
          <span className="font-medium truncate">
            {collection.collection_name}
          </span>
          <img src="/nft-card/polygon-check.svg" alt="check" />
        </div>
      ))}
    </div>
  );
};

export default CollectionPanel;
