import React, { useState } from 'react'

const paginate = (Component:any,itemsPerPage:number) => {
  
  return () => {
    const [currentPage, setCurrentPage] = useState(1);

    const goToPage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return (
        <Component 
        startIndex={startIndex}
        endIndex={endIndex}
        goToPage={goToPage}
        currentPage={currentPage}
        />
    )
  }
}

export default paginate
