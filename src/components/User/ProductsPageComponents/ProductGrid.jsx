import { useMemo, useState } from "react";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import ProductGridHeader from "./ProductGridHeader"; 
import MobileSubHeading from "./MobileSubHeading";

const ProductGrid = ({ products, categoryTitle, matchedItemsCount, onNavigate,  
  mainCategory,
  section,
  cat,
  subcat2,
  catlist,
  allSections,
  filteredByCategory,
  appliedFilters,
  setAppliedFilters, colorOptions
 }) => {
  const [sortBy, setSortBy] = useState("featured");
  const [viewColumns, setViewColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const viewOptions = [2, 4, 6];

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-low":
        return sorted.sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
        );
      case "price-high":
        return sorted.sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
        );
      case "new-arrivals":
        return sorted
          .filter((p) => p.tags?.includes("New Arrival"))
          .concat(sorted.filter((p) => !p.tags?.includes("New Arrival")));
      case "percentage-off":
        return sorted.sort(
          (a, b) => (b.percentageOff || 0) - (a.percentageOff || 0)
        );
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleViewChange = (columns) => {
    setViewColumns(columns);
  };

  const handleViewAll = () => {
    setItemsPerPage(sortedProducts.length);
    setCurrentPage(1);
  };

  const getGridCols = () => {
    switch (viewColumns) {
      case 2:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-2";
      case 4:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
      case 6:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-4 py-2 sm:py-3 md:py-6">
      <ProductGridHeader
        categoryTitle={categoryTitle}
        matchedItemsCount={matchedItemsCount || sortedProducts.length}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        viewColumns={viewColumns}
        onViewChange={handleViewChange}
        viewOptions={viewOptions}
        itemsPerPage={itemsPerPage}
        handleViewAll={handleViewAll}
        totalItems={products.length}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        maincat={mainCategory} 
        subcat={section} 
        cat={cat}
        subcat2={subcat2}
        catlist={catlist}
        allSections={allSections} 
      />

      <MobileSubHeading
        sortBy={sortBy}
        onSortChange={handleSortChange}
        mainCategory={mainCategory}
        section={section}
        cat={cat}
        subcat2={subcat2}
        catlist={catlist}
        allSections={allSections}
        products={filteredByCategory}
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
        matchedItemsCount={matchedItemsCount}
        colorOptions={colorOptions}
      />

      <div className={`grid grid-cols-xs ${getGridCols()} mb-5 gap-3 sm:gap-6`}>
        {currentProducts.map((product) => (
          <ItemCard
            key={product.id}
            item={product}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        handleViewAll={handleViewAll}
        totalItems={products.length}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductGrid;
