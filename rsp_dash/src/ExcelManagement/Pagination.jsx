import React from 'react';

const Pagination = ({ products, itemsPerPage, paginate, currentPage }) => {
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Calculate the range of pages to display dynamically
  const displayPages = (() => {
    const totalPagesToShow = Math.min(pageCount, 10); // Set the maximum number of pages to show
    const startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
    const endPage = Math.min(pageCount, startPage + totalPagesToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  })();

  return (
    <ul className='pagination'>
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button onClick={() => paginate(currentPage - 1)} className='page-link'>
          Previous
        </button>
      </li>
      {displayPages.map((pageNumber) => (
        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
          <button onClick={() => paginate(pageNumber)} className='page-link'>
            {pageNumber}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
        <button onClick={() => paginate(currentPage + 1)} className='page-link'>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
