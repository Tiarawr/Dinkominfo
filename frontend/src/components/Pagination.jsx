import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mr-2 bg-gray-200 rounded"
      >
        Prev
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 ml-2 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  );
}
