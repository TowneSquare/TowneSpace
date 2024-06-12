import CollectionCard from '../../../components/collection_card';
import { useAppSelector } from '../../../state/hooks';

const Panel = () => {
  const collections = useAppSelector((state) => state.tokensState.myCollections);
  const isFetching = useAppSelector(state => state.tokensState.isFetching);

  if(isFetching) {
    return (
      <div className="flex w-full h-full min-h-[200px] justify-center items-center">
        <img src="/generate/loader.svg" className="w-24"/>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap items-baseline h-full gap-4">
      {collections.map((collection, index) => (
        <CollectionCard data={collection} index={index} key={index} />
      ))}
    </div>
  );
};

export default Panel;
