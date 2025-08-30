import Sort from "./Sort";
import Pagination from "./Pagination";
import { GoChevronDown } from "react-icons/go";
import CategoryFilter from "./CategoryFilter";
import { useState } from "react";

const ProductGridHeader = ({categoryTitle, matchedItemsCount, sortBy, onSortChange, viewColumns, onViewChange, viewOptions, itemsPerPage, handleViewAll, totalItems, currentPage, totalPages, setCurrentPage, section, cat, subcat2, catlist, allSections, mainCategory}) => {

    const [showCat, setShowCat] = useState(false)
    return (
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-md sm:text-lg lg:text-xl font-medium cursor-pointer">
            <span className="max-lg:underline">{categoryTitle}</span>
            <GoChevronDown onClick={() => setShowCat(!showCat)} className="inline lg:hidden ml-1" />
            <span className="text-gray-500 font-normal">
            ({matchedItemsCount} Styles)
            </span>
        </h1>

        {showCat && (
            <div className="absolute top-full right-0 z-100 bg-white w-1/2">
                <CategoryFilter
                    maincat={mainCategory} 
                    subcat={section} 
                    cat={cat}
                    subcat2={subcat2}
                    catlist={catlist}
                    allSections={allSections} 
                />
            </div>
        )}

        <div className="flex items-center gap-4 max-sm:hidden">
            <div className="relative max-lg:hidden">
            <Sort sortBy={sortBy} onSortChange={onSortChange} />
            </div>

            <div className="hidden lg:flex items-center justify-center gap-2">
                <span className="text-xs">View</span>
                {viewOptions.map((cols, index) => (
                    <div key={cols} className="flex items-center justify-center space-x-0.5">
                    <button
                        onClick={() => onViewChange(cols)}
                        className={`text-xs text-center cursor-pointer ${
                        viewColumns === cols ? "font-medium" : ""
                        }`}
                    >
                        {cols}
                    </button>
                    {index < viewOptions.length - 1 && (<span className="font-light">|</span>)}
                    </div>
                ))}
            </div>

            <Pagination
            itemsPerPage={itemsPerPage}
            handleViewAll={handleViewAll}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            />
        </div>
        </div>
    );
};

export default ProductGridHeader;
