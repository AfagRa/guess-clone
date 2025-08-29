import { useState } from 'react';
import { GoChevronDown } from "react-icons/go";

const Sort = ({sortBy, onSortChange}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'new-arrivals', label: 'New arrivals' },
    { value: 'price-high', label: 'Price: high to low' },
    { value: 'price-low', label: 'Price: low to high' },
    { value: 'percentage-off', label: 'Percentage off' }
  ];

  const handleSortChange = (value) => {
    onSortChange(value);
    setShowSortDropdown(false);
  };

  const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label;

  return (
    <div className='relative max-lg:w-full'>
      <button
        onClick={() => setShowSortDropdown(!showSortDropdown)}
        className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 underline transition-all"
      >
        Sort by{sortBy !== 'featured' ? ` ${currentSortLabel}` : ''}
        <GoChevronDown size={16} className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
      </button>
      
      {showSortDropdown && (
        <div className="absolute max-lg:left-0 max-lg:w-full lg:right-0 top-full mt-2 bg-white border border-gray-200 z-20 min-w-48">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:underline transition-all first:rounded-t-lg last:rounded-b-lg ${
                sortBy === option.value ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;