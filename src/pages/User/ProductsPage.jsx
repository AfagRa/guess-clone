import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import FilterSidebar from "../../components/User/ProductsPageComponents/FilterSidebar"
import ProductGrid from "../../components/User/ProductsPageComponents/ProductGrid"
import CategoryHeader from "../../components/User/ProductsPageComponents/CategoryHeader"
import { allCategories } from "../../data/categories"
import { products } from "../../data/products"

const ProductsPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  
  const path = [params.main, ...params['*'].split('/')]
  const [maincat, subcat, ...rest] = path

  const mainCategory = allCategories.find(c => c.slug === maincat)
  const section = mainCategory?.dropdown?.sections?.find(sec => sec.slug === subcat)
  const catlist = section?.items || []

  const colorOptions = [
    { name: "beige", hex: "#eeeee4" },
    { name: "black", hex: "#000000" },
    { name: "blue", hex: "#3b82f6" },
    { name: "brown", hex: "#5a381e" },
    { name: "gold", hex: "#c59d5f" },
    { name: "green", hex: "#22Cc5e" },
    { name: "grey", hex: "#6b7280" },
    { name: "multiple colors", hex: "conic-gradient(red, orange, yellow, green, blue, purple)" },
    { name: "red", hex: "#ff0000" },
    { name: "pink", hex: "#ff80d1" },
    { name: "purple", hex: "#7e22ce" },
    { name: "orange", hex: "#f97316" },
  ]

  useEffect(() => {
    const urlPathLength = path.length
    
    if (urlPathLength === 2) {
      navigate(`/${maincat}/${subcat}/view-all`)
      return
    }
    
    if (urlPathLength === 3 && path[2] !== 'view-all') {
      const item = catlist.find(c => c.slug === path[2])
      if (item && item.subcategories && item.subcategories.length > 0) {
        navigate(`/${maincat}/${subcat}/${path[2]}/view-all`)
        return
      }
    }
  }, [path, navigate, maincat, subcat, catlist])

  const [appliedFilters, setAppliedFilters] = useState({
    colors: [],
    sizes: [],
    price: [],
    discount: [],
    features: []
  })

   const filteredByCategory = products.filter(product => {
      const productPath = product.categoryPath
      const urlPathLength = path.length
      if (productPath[0] !== maincat) return false
      if (productPath[1] !== subcat) return false
      if (urlPathLength === 2) return true
      if (urlPathLength === 3) {
        if (path[2] === 'view-all') return true
        return productPath[2] === path[2]
      }
      if (urlPathLength === 4) {
        if (path[3] === 'view-all') return productPath[2] === path[2]
        return productPath[2] === path[2] && productPath[3] === path[3]
      }  
      return false
    })

  const filteredProducts = filteredByCategory.filter(product => {
    if (appliedFilters.colors.length > 0 && !product.colors.some(c => appliedFilters.colors.includes(c))) return false
    if (appliedFilters.sizes.length > 0 && !product.sizes.some(s => appliedFilters.sizes.includes(s))) return false
    if (appliedFilters.price.length > 0) {
      const { min, max } = appliedFilters.price[0]
      if (product.price < min || product.price > max) return false
    }
    if (appliedFilters.discount.length > 0) {
      const inRange = appliedFilters.discount.filter(range =>
        product.percentageOff >= range.min && product.percentageOff <= range.max
      ).length > 0
      if (!inRange) return false
    }
    if (appliedFilters.features.length > 0 && !appliedFilters.features.some(f => product.features.includes(f))) return false
    return true
  })

  const getCurrentCategoryTitle = () => {
    const [main, section, item, subItem] = path
    
    if (subItem && subItem !== 'view-all') {
      const currentItem = catlist.find(i => i.slug === item)
      const currentSubItem = currentItem?.subcategories?.find(s => s.slug === subItem)
      return currentSubItem?.name || subItem.replace('-', ' ')
    }
    
    if (item && item !== 'view-all') {
      const currentItem = catlist.find(i => i.slug === item)
      return currentItem?.name || item.replace('-', ' ')
    }
    
    return section?.title || mainCategory?.name || "Products"
  }

  return (
    <section className="px-3 py-2 grid gap-x-4 grid-cols-1 lg:grid-cols-[20%_auto] xl:grid-cols-[16%_auto] grid-rows-[30px_auto]">
      <div className="col-span-full row-start-1 row-end-2">
        <CategoryHeader path={path} />
      </div>

      <div className="hidden lg:block col-start-1 col-end-2 row-start-2 row-end-3">
        <FilterSidebar
          mainCategory={mainCategory}
          section={section}
          cat={path[2]}
          subcat2={path[3]}
          catlist={catlist}
          allSections={mainCategory?.dropdown?.sections || []}
          products={filteredByCategory}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          matchedItemsCount={filteredProducts.length}
          colorOptions={colorOptions}
        />
      </div>

      <div className="col-start-1 lg:col-start-2 col-end-2 row-start-2 row-end-3" >
        <ProductGrid
          products={filteredProducts}
          matchedItemsCount={filteredProducts.length}
          categoryTitle={getCurrentCategoryTitle()}
          onNavigate={(path) => navigate(path)}
          mainCategory={mainCategory}
          section={section}
          cat={path[2]}
          subcat2={path[3]}
          catlist={catlist}
          allSections={mainCategory?.dropdown?.sections || []}
          filteredByCategory={filteredByCategory}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          colorOptions={colorOptions}
          subcat={section} 
        />
      </div>
    </section>
  )
}

export default ProductsPage;