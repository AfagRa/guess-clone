import { useState } from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import CategoryFilter from "./CategoryFilter"
import ColorFilter from "./ColorFilter"
import SizeFilter from "./SizeFilter"
import PriceFilter from "./PriceFilter"
import DiscountFilter from "./DiscountFilter"
import FeatureFilter from "./FeatureFilter"
import AllAppliedFilters from "./AllAppliedFilters"

const FilterSidebar = ({mainCategory, section, cat, subcat2, catlist, products, allSections, appliedFilters, setAppliedFilters, matchedItemsCount, colorOptions}) => {
  const availableColors = [...new Set(products.flatMap(p => p.colors))]
  const availableSizes = [...new Set(products.flatMap(p => p.sizes))]
  const availableDiscount = [...new Set(products.map(p => p.percentageOff))]
  const availableFeatures = [...new Set(products.flatMap(p => p.features))]
  const prices = products.map(p => p.salePrice ?? p.price)
  const maxPrice = prices.length ? Math.max(...prices) : 0
  
  const [openFilters, setOpenFilters] = useState({category: true})
  
  const toggleFilter = (f) => {
    setOpenFilters(prev => ({
      ...prev,
      [f]: !prev[f]
    }))
  }

  return (
    <div className="w-full px-0.5">
      <div className="max-lg:hidden border-b border-gray-800 py-1">
        <div onClick={() => toggleFilter('category')} className="flex items-center justify-between cursor-pointer gap-2 w-full py-2">
          <p className="text-sm">
            {appliedFilters.category?.length > 0 ? `Category (${appliedFilters.category.length})` : 'Category'}
          </p>
          {openFilters['category'] ? <FiMinus /> : <FiPlus />}
        </div>

        {openFilters['category'] && (
          <div className="mt-1 space-y-2 pl-4">
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
      </div>

      <AllAppliedFilters 
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
        matchedItemsCount={matchedItemsCount}
        totalItemsCount={products.length}
        colorOptions={colorOptions}
      />

      {/* Color Filter */}
      <div className="border-b border-gray-800 py-1">
        <div onClick={() => toggleFilter('colors')} className="flex items-center justify-between cursor-pointer gap-2 w-full py-2">
          <p className="text-sm">
            {appliedFilters.colors?.length > 0 ? `Color (${appliedFilters.colors.length})` : 'Color'}
          </p>
          {openFilters['colors'] ? <FiMinus /> : <FiPlus />}
        </div>

        {openFilters['colors'] && (
          <div className="mt-1 space-y-2 pl-4">
            <ColorFilter 
              colors={colorOptions}
              availableColors={availableColors}
              appliedColors={appliedFilters.colors} 
              setAppliedColors={(newColors) => setAppliedFilters(prev => ({ ...prev, colors: newColors }))} 
            />
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b border-gray-800 py-1">
        <div onClick={() => toggleFilter('sizes')} className="flex items-center justify-between cursor-pointer gap-2 w-full py-2">
          <p className="text-sm">
            {appliedFilters.sizes?.length > 0 ? `Size (${appliedFilters.sizes.length})` : 'Size'}
          </p>
          {openFilters['sizes'] ? <FiMinus /> : <FiPlus />}
        </div>

        {openFilters['sizes'] && (
          <div className="mt-1 space-y-2 pl-4">
            <SizeFilter 
              availableSizes={availableSizes}
              appliedSizes={appliedFilters.sizes} 
              setAppliedSizes={(newSizes) => setAppliedFilters(prev => ({ ...prev, sizes: newSizes }))} 
            />
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-800 py-1">
        <div onClick={() => toggleFilter('price')} className="flex items-center justify-between cursor-pointer gap-2 w-full py-2">
          <p className="text-sm">
            {appliedFilters.price?.length > 0 ? `Price (${appliedFilters.price.length})` : 'Price'}
          </p>
          {openFilters['price'] ? <FiMinus /> : <FiPlus />}
        </div>

        {openFilters['price'] && (
          <div className="mt-1 space-y-2 pl-4">
            <PriceFilter 
              maxPrice={maxPrice}
              appliedPrice={appliedFilters.price} 
              setAppliedPrice={(newPrices) => setAppliedFilters(prev => ({ ...prev, price: newPrices }))} 
            />
          </div>
        )}
      </div>

      {/* Discount Filter */}
      <div className="border-b border-gray-800 py-1">
        <div onClick={() => toggleFilter('discount')} className="flex items-center justify-between cursor-pointer gap-2 w-full py-2">
          <p className="text-sm">
            {appliedFilters.discount?.length > 0 ? `Percentage off (${appliedFilters.discount.length})` : 'Percentage off'}
          </p>
          {openFilters['discount'] ? <FiMinus /> : <FiPlus />}
        </div>

        {openFilters['discount'] && (
          <div className="mt-1 space-y-2 pl-4">
            <DiscountFilter
              availableDiscount={availableDiscount}
              appliedDiscount={appliedFilters.discount} 
              setAppliedDiscount={(newDiscount) => setAppliedFilters(prev => ({ ...prev, discount: newDiscount }))} 
            />
          </div>
        )}
      </div>

      {/* Features Filter */}
      <div className="border-b border-gray-800 py-1">
        <div onClick={() => toggleFilter('features')} className="flex items-center justify-between cursor-pointer gap-2 w-full py-2">
          <p className="text-sm">
            {appliedFilters.features?.length > 0 ? `Features (${appliedFilters.features.length})` : 'Features'}
          </p>
          {openFilters['features'] ? <FiMinus /> : <FiPlus />}
        </div>

        {openFilters['features'] && (
          <div className="mt-1 space-y-2 pl-4">
            <FeatureFilter
              availableFeatures={availableFeatures}
              appliedFeatures={appliedFilters.features} 
              setAppliedFeatures={(newFeature) => setAppliedFilters(prev => ({ ...prev, features: newFeature }))} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar