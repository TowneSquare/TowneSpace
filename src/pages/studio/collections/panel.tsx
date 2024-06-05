import CollectionCard from '../../../components/collection_card';
import { useAppSelector } from '../../../state/hooks';

const Panel = () => {
  const collections = useAppSelector((state) => state.tokensState.collections);
  console.log(collections)
  return (
    <div className="flex h-full flex-wrap gap-4 items-baseline">
      {collections.map((collection, index) => (
        <CollectionCard data={collection} index={index} key={index} />
      ))}
    </div>
  );
};

export default Panel;
