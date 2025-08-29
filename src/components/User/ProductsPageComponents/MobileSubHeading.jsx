import { useState } from "react";
import { GoChevronDown } from "react-icons/go"
import Sort from "./Sort";
import FilterSidebar from "./FilterSidebar";

const MobileSubHeading = ( {sortBy, onSortChange, mainCategory, section, cat, subcat2, catlist, allSections, products, appliedFilters, setAppliedFilters, matchedItemsCount, colorOptions} ) => {
    const [showFilter, setShowFilter] = useState(false)
  
    return (
        <>
            <div className="relative my-5 w-full flex lg:hidden">
                <div className="w-1/2 cursor-pointer flex items-center gap-2 py-2 border-t border-b border-r border-gray-200">
                    <Sort sortBy={sortBy} onSortChange={onSortChange} />
                </div>
                
                <div onClick={() => setShowFilter(!showFilter)} className="w-1/2 cursor-pointer flex items-center gap-2 py-2 px-3 border-t border-b border-gray-200">
                    <span className="underline text-sm">Filter</span>
                    <GoChevronDown size={16} className={`transform transition-transform ${showFilter ? 'rotate-180' : ''}`} />
                </div>

                {showFilter && (
                    <div className="absolute top-full right-0 z-100 bg-white w-1/2">
                        <FilterSidebar
                            mainCategory={mainCategory}
                            section={section}
                            cat={cat}
                            subcat2={subcat2}
                            catlist={catlist}
                            allSections={allSections}
                            products={products}
                            appliedFilters={appliedFilters}
                            setAppliedFilters={setAppliedFilters}
                            matchedItemsCount={matchedItemsCount}
                            colorOptions={colorOptions}
                        />
                    </div>
                )}
            </div>
        </>
  )
}

export default MobileSubHeading