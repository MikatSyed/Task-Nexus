import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 0) return null;

  return (
    <div className="flex justify-center my-8 space-x-2">
      <button
        className={`px-4 py-2 rounded-md transition-colors duration-300 
          ${currentPage === 1 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-2 rounded-md transition-colors duration-300 
            ${currentPage === index + 1 
              ? 'bg-teal-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-teal-500 hover:text-white'
            }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`px-4 py-2 rounded-md transition-colors duration-300 
          ${currentPage === totalPages 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
