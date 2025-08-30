import { FiX } from "react-icons/fi"

const AllAppliedFilters = ({colorOptions, appliedFilters, setAppliedFilters, matchedItemsCount, totalItemsCount }) => {
  
  const getAllAppliedFilters = () => {
    const allFilters = []
    
    if (appliedFilters.category?.length > 0) {
      appliedFilters.category.forEach(item => {
        allFilters.push({
          type: 'category',
          value: item,
          display: item
        })
      })
    }
    
    if (appliedFilters.colors?.length > 0) {
      appliedFilters.colors.forEach(color => {
        const colorData = colorOptions.find(c => c.name.toLowerCase() === color.toLowerCase())
        allFilters.push({
          type: 'colors',
          value: color,
          display: color,
          hex: colorData ? colorData.hex : "#000"
        })
      })
    }
    
    if (appliedFilters.sizes?.length > 0) {
      appliedFilters.sizes.forEach(size => {
        allFilters.push({
          type: 'sizes',
          value: size,
          display: size
        })
      })
    }
    
    if (appliedFilters.price?.length > 0) {
      appliedFilters.price.forEach(priceRange => {
        allFilters.push({
          type: 'price',
          value: priceRange,
          display: `$${priceRange.min}.00 - $${priceRange.max}.00`
        })
      })
    }
    
    if (appliedFilters.discount?.length > 0) {
      appliedFilters.discount.forEach(discount => {
        allFilters.push({
          type: 'discount',
          value: discount,
          display: discount.label
        })
      })
    }
    
    if (appliedFilters.features?.length > 0) {
      appliedFilters.features.forEach(feature => {
        allFilters.push({
          type: 'features',
          value: feature,
          display: feature
        })
      })
    }
    
    return allFilters
  }

  const removeFilter = (filterType, filterValue) => {
    setAppliedFilters(prev => {
      const updated = { ...prev }
      
      if (filterType === 'price') {
        updated[filterType] = updated[filterType].filter(range => 
          !(range[0] === filterValue[0] && range[1] === filterValue[1])
        )
      } else {
        updated[filterType] = updated[filterType].filter(item => item !== filterValue)
      }
      
      return updated
    })
  }

  const clearAllFilters = () => {
    setAppliedFilters({
      category: [],
      colors: [],
      sizes: [],
      price: [],
      discount: [],
      features: []
    })
  }

  const appliedFiltersData = getAllAppliedFilters()
  const hasAppliedFilters = appliedFiltersData.length > 0
  const itemCountText = hasAppliedFilters ? `${matchedItemsCount} Styles` : `${totalItemsCount} Styles`

  return (
    <div className="border-b border-gray-800 py-1 mb-2">
      <div className="flex items-center justify-between gap-2 w-full py-2">
        <p className="text-sm">Filter</p>
        <span className="text-xs text-gray-600">{itemCountText}</span>
      </div>
      
      {hasAppliedFilters && (
        <div className="flex flex-wrap gap-3 mt-1">
          {appliedFiltersData.map((filter, index) => (
            <div key={`${filter.type}-${index}`} className="flex items-center">
                <span className="inline-flex items-center gap-1 bg-[#E1E1E1] px-1 py-1 text-sm">
               {filter.type === "colors" && <div className="w-5 h-5 rounded-full border-2 border-gray-300" style={{ background: filter.hex }}/> }
                {filter.display}
                <button onClick={() => removeFilter(filter.type, filter.value)}>
                    <FiX />
                </button>
                </span>
            </div>
            ))}
          
          <button onClick={clearAllFilters} className="cursor-pointer text-sm text-right w-full underline mt-2">
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

export default AllAppliedFilters