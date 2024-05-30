import { useState } from 'react';
import Filter from './filter';
import FilterType from '../../../type/filter_type';
import Board from './board';
import CollectionPanel from './collection_panel';

const Tokens = () => {
  return (
    <div className="px-2 md:px-8 pt-[40px] pb-4">
      <Filter />
      <div className="flex flex-col md:flex-row gap-10 mt-8">
        <CollectionPanel />
        <Board />
      </div>
    </div>
  );
};

export default Tokens;
