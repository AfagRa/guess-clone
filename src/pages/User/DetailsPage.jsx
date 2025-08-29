import { useParams } from "react-router"
import { products } from "../../data/products"
import ProductImageGallery from "../../components/User/ProductDetailsComponents/ProductImageGallery"
import ProductInfo from "../../components/User/ProductDetailsComponents/ProductInfo"
import ProductRating from "../../components/User/ProductDetailsComponents/ProductRating"
import ItemsGrid from "../../components/User/ProductDetailsComponents/ItemsGrid"
import { useState, useEffect } from "react"
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5"

const DetailsPage = () => {
  const {id} = useParams()
  const product = products.find(elm => elm.id == id)

  if (!product) return <div>Product not found</div>

  const relatedProducts = products.filter(item => (item.categoryPath == product.categoryPath || item.tags?.some(tag => product.tags?.includes(tag)))).slice(0,10)
  const recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed") || "[]")
  const productImages = product.imagesByColor

  const [selectedColor, setSelectedColor] = useState(Object.keys(productImages)[0])

  useEffect(() => {
    window.scrollTo(0,0)
    if (productImages && Object.keys(productImages).length > 0) setSelectedColor(Object.keys(productImages)[0]) 
  }, [id])

  const renderStars = (rating) => {
    const stars = []
    const roundedRating = Math.round(rating * 2) / 2
    const fullStars = Math.floor(roundedRating)
    const hasHalfStar = (roundedRating % 1) === 0.5
    
    for (let i = 0; i < fullStars; i++) stars.push(<IoStar key={i} size={20} />)
    if (hasHalfStar) stars.push(<IoStarHalf key="half" size={20} />)
    
    const totalStarsShown = fullStars + (hasHalfStar ? 1 : 0);
    for (let i = totalStarsShown; i < 5; i++) stars.push(<IoStarOutline key={`empty-${i}`} size={20}/>)
    
    return stars
  };

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-col md:flex-row w-full gap-4 mb-4 pb-10 border-b border-gray-200">
          <div className="w-full md:w-1/2 lg:w-2/3">
            <ProductImageGallery images={productImages[selectedColor] || []} productName={product.name} />
          </div>
          
          <div className="w-full md:sticky md:top-5 h-fit md:w-1/2 lg:w-1/3 pt-10">
            <ProductInfo product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} renderStars={renderStars} />
            <ItemsGrid 
              title="Wear With" 
              products={relatedProducts.slice(0, 3)} 
              height="180px"
              maxWidth="33%"
              showPrice={false}
            />
          </div>
        </div>

        <ProductRating  product={product} renderStars={renderStars} />

        <div className="mb-10">
          <ItemsGrid 
            title="You might also like" 
            products={relatedProducts} 
            height="400px" 
            showPrice={true}
            maxWidth="auto"
          />
        </div>
        
        <ItemsGrid 
          title="Products viewed recently" 
          products={recentlyViewed} 
          height="400px" 
          showPrice={true}
          maxWidth="auto"
        />
      </div>
    </>
  )
}

export default DetailsPage