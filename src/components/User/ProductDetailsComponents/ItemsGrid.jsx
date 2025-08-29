import { ToastContainer } from "react-toastify"
import SimpleCard from "./SimpleCard"

const ItemsGrid = ({title, products, height, showPrice, maxWidth}) => {
  return (
    <div className="w-full">
      <span className="text-xl font-medium mb-2 px-4">{title}</span>

      <div className="scroll-container flex gap-3 px-4 pb-2 overflow-x-auto">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0" style={{maxWidth: maxWidth}}>
            <SimpleCard
              product={product}
              height={height}
              showPrice={showPrice}
            />
          </div>
        ))}
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

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