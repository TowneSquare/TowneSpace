const Search = () => {
   return (
      <div className="mx-2 px-4 py-2 flex gap-2 border border-gray-light-1 rounded-full">
         <img src="/header/search.svg" className="" alt="search" />
         <input className="w-auto md:w-[30vw] h-8 placeholder-gray-light-3 focus-visible:outline-0" placeholder="Search collections, NFTs or accounts" 
         style={{background: "none"}}/>
      </div>
   )
}

export default Search;