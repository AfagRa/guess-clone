const ProductCard = ({ product, onAddToBasket }) => {
  return (
    <a 
      href={`${product.category}/${product.link}`}
      className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden relative group block"
    >
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        
        <img 
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        
        <button 
          className="absolute bottom-3 right-3 bg-white text-black px-3 py-1 rounded-md text-sm font-medium shadow-md hover:bg-gray-50 transition-colors z-10"
          onClick={(e) => {
            e.preventDefault();
            onAddToBasket(product);
          }}
        >
          Add +
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            {product.price}
          </span>
          
          {product.originalPrice && (
            <>
              <span className="text-gray-500 line-through text-sm">
                {product.originalPrice}
              </span>
              <span className="text-green-600 text-sm font-medium">
                {product.discount}
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;