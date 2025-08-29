import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

const OptionsModal = ({ isOpen, onClose, product, currentColor, currentSize, currentQuantity, onUpdate }) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [selectedSize, setSelectedSize] = useState(currentSize);
  const [quantity, setQuantity] = useState(currentQuantity);
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleUpdate = () => {
    onUpdate({
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    });
    handleClose();
  };

  const getColorStyle = (color) => {
    const colorMap = {
      beige: '#DDD6CE',
      white: '#FFFFFF',
      black: '#000000',
      'cream white': '#F8F6F0',
      'off-white': '#F5F5DC',
      navy: '#000080'
    };
    return colorMap[color] || color;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-[#333333b1] flex items-center justify-center z-50 ${
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg p-6 w-96 max-w-md mx-4 ${
        isClosing ? 'animate-slideUp' : 'animate-slideDown'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-md font-medium">{product.name}</h3>
            <button 
              onClick={() => window.location.href = `/product/${product.id}`}
              className="text-xs underline mt-1"
            >
              View product details
            </button>
          </div>
          <button onClick={handleClose}><MdOutlineClose size={20} /></button>
        </div>

        <div className="mb-6">
          <h4 className="text-sm mb-2">
            Color: <span className="capitalize">{selectedColor}</span>
          </h4>
          <div className="flex gap-4">
            {Object.keys(product.imagesByColor).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-colors cursor-pointer capitalize ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                style={{backgroundColor: getColorStyle(color)}}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm mb-2">Size:</h4>
          <div className="flex gap-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-full cursor-pointer text-sm text-center border-2 transition-colors ${
                  selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center border-b border-gray-300 py-2">
          <span className="text-sm">Qty: </span>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full outline-none text-sm"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white border-2 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors"
        >
          Update
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OptionsModal;