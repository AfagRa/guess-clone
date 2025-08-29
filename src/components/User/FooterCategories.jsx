import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const FooterCategories = ({ title, items, isMobile = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isMobile) {
    return (
      <div className="border-b border-gray-300 py-4 last:border-b-0">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex justify-between items-center w-full text-left"
        >
          <h3 className="text-sm">{title}</h3>
          {isExpanded ? 
            <IoChevronUp className="w-5 h-5" /> : 
            <IoChevronDown className="w-5 h-5" />
          }
        </button>
        {isExpanded && (
          <ul className="space-y-3 text-xs mt-4">
            {items.map((item, index) => (
              <li key={index}><a href={item.href || '#'}>{item.name}</a></li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-sm mb-5">{title}</h3>
      <ul className="space-y-3 text-xs">
        {items.map((item, index) => (
          <li key={index}><a href={item.href || '#'}>{item.name}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCategories;