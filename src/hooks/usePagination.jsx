import { useEffect, useState } from "react";


function usePagination(data, itemsPerPage) {

  const [page, setPage] = useState(1);


  const totalPages = Math.ceil(
    data.length / itemsPerPage
  );


  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage


  const currentItems = data.slice(
    start,end );


  const nextPage = () => {

    if(page < totalPages){
      setPage(page + 1);
    }

  };


  const previousPage = () => {

    if(page > 1){
      setPage(page - 1);
    }

  };

useEffect(()=>{
    setPage(1)
},[data])


  return {
    page,
    setPage,
    totalPages,
    currentItems,
    nextPage,
    previousPage
  };

}


export default usePagination;