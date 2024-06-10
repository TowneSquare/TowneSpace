import CollectionCard from '../../../components/collection_card';
import { useAppSelector } from '../../../state/hooks';

const Panel = () => {
  const collections = useAppSelector((state) => state.tokensState.myCollections);

  return (
    <div className="flex flex-wrap items-baseline h-full gap-4">
      {collections.map((collection, index) => (
        <CollectionCard data={collection} index={index} key={index} />
      ))}
    </div>
  );
};

export default Panel;
