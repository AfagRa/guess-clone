import { useState } from "react";
import SimpleCard from "./SimpleCard"

const ItemsGrid = ({title, products, height, showPrice, maxWidth}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      {showSuccessMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl border px-4 py-3 z-50 text-sm font-medium">
          Product added to shopping bag
        </div>
      )}
      
      <span className="text-xl font-medium mb-2 px-4">{title}</span>

      <div className="scroll-container flex gap-3 px-4 pb-2 overflow-x-auto">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0" style={{maxWidth: maxWidth}}>
            <SimpleCard
              product={product}
              height={height}
              showPrice={showPrice}
              onAddSuccess={handleAddSuccess}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .scroll-container {
          scrollbar-width: none; 
          -ms-overflow-style: none;
        }
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        .scroll-container * {
          will-change: transform;
        }
      `}</style>
    </div>
  )
}

export default ItemsGrid