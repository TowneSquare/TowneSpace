const Search = () => {
  return (
    <div className="w-full md:w-[20vw] lg:w-[30vw] mx-2 px-4 py-2 flex gap-2 border border-gray-light-1 rounded-full">
      <img src="/header/search.svg" className="" alt="search" />
      <input
        className="w-full h-8 placeholder-gray-light-3 focus-visible:outline-0"
        placeholder="Search collections, NFTs or accounts"
        style={{ background: 'none' }}
      />
    </div>
  );
};

export default Search;
