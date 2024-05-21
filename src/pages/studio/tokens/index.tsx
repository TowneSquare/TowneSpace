import { useState } from 'react';
import Filter from './filter';
import FilterType from '../../../type/filter_type';
import Board from './board';
import CollectionPanel from './collection_panel';

const Tokens = () => {
  const [filter, setFilter] = useState<FilterType>(FilterType.composable);

  return (
    <div className="px-2 md:px-8 pt-[40px] pb-4">
      <Filter filter={filter} setFilter={setFilter} />
      <div className="flex flex-col md:flex-row gap-10 mt-8">
        <CollectionPanel />
        <Board filter={filter} />
      </div>
    </div>
  );
};

export default Tokens;
