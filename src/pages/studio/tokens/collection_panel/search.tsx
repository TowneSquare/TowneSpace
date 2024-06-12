const Search = () => {
  return (
    <div className="flex gap-2 py-2 border rounded-full w-auto md:min-w-[300px] px-4 border-gray-light-1">
      <img src="/header/search.svg" className="" alt="search" />
      <input
        className="w-full h-6 text-sm md:h-8 md:text-base placeholder-gray-light-3 focus-visible:outline-0"
        placeholder="Filter by collection"
        style={{ background: 'none' }}
      />
    </div>
  );
};

export default Search;
