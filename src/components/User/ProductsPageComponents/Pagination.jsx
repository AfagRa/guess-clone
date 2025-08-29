import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const Pagination = ({itemsPerPage, handleViewAll, totalItems, currentPage, totalPages, setCurrentPage}) => {

  const handlePageSelect = (e) => {
    const selectedPage = parseInt(e.target.value);
    setCurrentPage(selectedPage);
  };

  return (
    <div className='flex justify-end'>
        {itemsPerPage != totalItems &&
            <button onClick={handleViewAll} className="max-lg:underline text-sm mr-2 cursor-pointer text-gray-700 hover:text-gray-900">
                View all
            </button>
        }
        {itemsPerPage != totalItems && 
            <div className="flex items-center">
                <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                <GoChevronLeft size={16} />
                </button>
                
                <div className="flex items-center gap-1">
                    <select 
                        value={currentPage} 
                        onChange={handlePageSelect}
                        className="text-sm border-0 bg-transparent py-1 focus:outline-none cursor-pointer"
                    >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <option key={page} value={page}>
                                {page}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-500">
                        of {totalPages}
                    </span>
                </div>
                
                <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                <GoChevronRight size={16} />
                </button>
            </div>
        }
    </div>
  );
};

export default Pagination;