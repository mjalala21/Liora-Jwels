import React ,{useMemo} from 'react'
import { useState } from 'react'
import useDebounce from "./useDebounce";

function useSearch(data, getSearchValue) {

    const[search, setSearch] = useState("")

     const debouncedSearch = useDebounce(search, 500); 

    // const searchedProducts = data.filter(
    //     item=>item.name.toLowerCase().includes(debouncedSearch.toLowerCase()))

    const searchedData = useMemo(()=>{
      return data.filter((item)=>{
      const searchedValue = String(getSearchValue(item) ?? "");

      return searchedValue.toLowerCase().includes(debouncedSearch.toLowerCase())
    })
    },[data, debouncedSearch, getSearchValue]);
    

  return {
    search,
    setSearch,
    searchedData
  } 
}

export default useSearch