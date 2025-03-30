import { SearchIcon } from 'lucide-react';
import  { useEffect, useState } from 'react'

const SearchInput = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearch = ()=>{
        console.log("searching for", searchInput)
    }
    
    useEffect(()=>{
        handleSearch()
    },[searchInput])

    return (
        <div className="group flex items-center gap-2 p-1 rounded-md bg-secondary border border-1 shadow-md border-black group-focus-within:border-black transition">
            <input
                className="rounded-md border-0 p-1 bg-secondary caret-gray-700 focus:outline-none"
                autoFocus
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            <SearchIcon className="cursor-pointer" onClick={handleSearch} />
      </div>
    )
}

export default SearchInput