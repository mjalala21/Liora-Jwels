import React from 'react'

function Pagination({
    page,
    setPage,
    totalPages,
    currentItems,
    nextPage, 
    previousPage,
    

}) {
  return (
    <div className='flex justify-center gap-10'>
        <button disabled={page===1} onClick={previousPage}>Previous</button>
        <div>

        {
            Array.from({length : totalPages},(_,index)=>(
                <button key={index} onClick={()=>setPage(index+1)} className={`w-10 h-10 rounded-xl ${page===index+1 ? "bg-[#D4AF37]" : "bg-white"}`}>{index+1}</button>
            ))  
        }
        </div>

        <button disabled={page===totalPages} onClick={nextPage}>Next</button>
    </div>
  )
}

export default Pagination