import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { chooseCollection } from '../../../../state/tokens';
import Search from './search';
import { CollectionV1Fields, CollectionV2Fields } from '../../../../api';
import LazyImage from '../../../../components/lazyImage';

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

  const isEmpty = collections.length == 0;
  console.log(collections, "collections")
  return (
    <div className="flex flex-col w-auto gap-4">
      {!isEmpty && <Search />}
      {collections.map((collection, index) => (
        <div
          className={`px-2 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-dark-1 cursor-pointer ${collection.collection_id == currentCollection?.collection_id ? 'bg-gray-dark-1' : ''}`}
          key={index}
          onClick={() => onChooseCollection(collection)}
        >
          <LazyImage
            src={collection.collection_uri}
            className="w-12 rounded-lg"
            alt="uri"
          />
          <span
            className={`font-medium truncate ${collection.collection_name == currentCollection?.collection_name ? 'text-primary-light' : 'text-white'}`}
          >
            {collection.collection_name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CollectionPanel;
