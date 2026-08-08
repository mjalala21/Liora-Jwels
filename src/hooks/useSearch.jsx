import React from 'react'
import { useState } from 'react'
import useDebounce from "./useDebounce";

function useSearch(data) {

    const[search, setSearch] = useState("")

     const debouncedSearch = useDebounce(search, 500); 

    const searchedProducts = data.filter(
        item=>item.name.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return {
    search,
    setSearch,
    searchedProducts
  } 
}

export default useSearch