import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SizeChart from "./SizeChart";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { GoShare } from "react-icons/go";
import CategoryHeader from "../ProductsPageComponents/CategoryHeader";
import { addItem } from "../../../store/basketSlice";

const ProductInfo = ({ product, selectedColor, setSelectedColor, renderStars }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showBasketNotification, setShowBasketNotification] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedColor && product.imagesByColor) {
      const firstColor = Object.keys(product.imagesByColor)[0];
      if (firstColor) {
        setSelectedColor(firstColor);
      }
    }
  }, [product, selectedColor, setSelectedColor]);

  const handleAddToBag = () => {
    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize
    };

    dispatch(addItem(productToAdd));

    setShowBasketNotification(true);
    setTimeout(() => setShowBasketNotification(false), 2000);

    console.log('Added:', product.name, selectedColor, selectedSize);
  };


  const handleWishlistToggle = () => {
    if (isInWishlist) {
      setIsInWishlist(false);
      showNotificationMessage('Removed from wishlist');
    } else {
      setIsInWishlist(true);
      showNotificationMessage('Added to wishlist');
    }
  };

  const scrollToRating = () => {
    const ratingSection = document.getElementById('product-rating-section');
    if (ratingSection) {
      ratingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const getSizeChartCategory = () => {
    if (product.categoryPath?.includes('shoes') || product.categoryPath?.includes('footwear')) {
      return 'shoes';
    }
    if (product.gender === 'men' || product.categoryPath?.includes('men')) {
      return 'men';
    }
    return 'women';
  };

  const getColorDisplay = (color) => {
    const colorMap = {
      beige: '#DDD6CE',
      white: '#FFFFFF',
      black: '#000000',
      grey: '#808080',
      gray: '#808080'
    };
    return colorMap[color.toLowerCase()] || color.toLowerCase();
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`

  return (
    <div className="w-full max-md:px-3 md:pr-10 pb-8">
      {showBasketNotification && (
        <div className="fixed top-25 left-1/2 transform -translate-x-1/2 z-50 bg-gray-400 text-white px-3 py-2 flex items-center shadow-lg">
          Added to the basket
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium mb-2">{product.name}</h1>
          <div className="gap-x-5 flex cursor-pointer">
            <div onClick={handleWishlistToggle}>{isInWishlist ? <IoMdHeart size={25} /> : <IoMdHeartEmpty size={25} />}</div>
            <GoShare size={25} />
          </div>
        </div>

        <div className="mb-4">
          {product.salePrice ? (
            <div className="flex items-center gap-1 sm:gap-2 text-lg">
              <span className="font-medium">{formatPrice(product.salePrice)}</span>
              <span className="text-gray-400 line-through">{formatPrice(product.price)}</span>
              <span className="text-gray-400">({product.percentageOff}% Off)</span>
            </div>
          ) : (
            <span className="font-medium">{formatPrice(product.price)}</span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-x-1">
            {renderStars(product.rating)}
          </div>
          <span onClick={scrollToRating} className="text-sm underline cursor-pointer text-gray-600">
            {product.rating} stars
          </span>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
            {product.ecoInfo && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                {product.ecoInfo}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm mb-2">Color: {selectedColor}</div>
          <div className="flex gap-4">
            {Object.keys(product.imagesByColor).map((color) => (
              <button
                key={color}
                onClick={() => {
                  console.log('Color changed to:', color);
                  setSelectedColor(color);
                }}
                className={`w-8 h-8 rounded-full border-2 transition-colors cursor-pointer capitalize ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                style={{ backgroundColor: getColorDisplay(color) }}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Size</span>
            <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-sm underline cursor-pointer" >
              Size chart
            </button>
          </div>
          <div className="flex space-x-4">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-full cursor-pointer text-sm text-center border-2 transition-colors ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToBag}
          className="mb-6 w-full bg-black text-white py-3 px-4 rounded-full cursor-pointer hover:bg-white border-3 hover:text-black transition-colors"
        >
          Add to bag
        </button>

        {showSizeGuide && (
          <div className="mb-6">
            <SizeChart
              category={getSizeChartCategory()}
              isOpen={showSizeGuide}
              onClose={() => setShowSizeGuide(false)}
            />
          </div>
        )}

        <div className="mb-6 text-xs font-medium">
          <p>Free Shipping with $125+ Purchase</p>
          <p>Free Returns on All Orders</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="list-disc pl-4 text-sm font-medium">
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Details</h3>
          <p className="text-sm mb-2">• Style #: {product.id.toUpperCase()}</p>
        </div>

        <CategoryHeader path={product.categoryPath} />
      </div>
    </div>
  );
};

export default ProductInfo;