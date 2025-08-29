import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { MdOutlineClose } from 'react-icons/md';
import OptionsModal from './OptionsModal';

const BasketItem = ({ product, initialQuantity = 1, selectedColor: initialColor, selectedSize: initialSize, onQuantityChange, onRemove, onMoveToFavorites}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedColor, setSelectedColor] = useState(initialColor || Object.keys(product.imagesByColor)[0]);
  const [selectedSize, setSelectedSize] = useState(initialSize || product.sizes[0]);
  const [shippingOption, setShippingOption] = useState('ship');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPrice = product.salePrice || product.price;
  const totalPrice = currentPrice * quantity;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onQuantityChange && onQuantityChange(product.id, selectedColor, selectedSize, newQuantity);
    }
  };

  const handleModalUpdate = ({ color, size, quantity: newQuantity }) => {
    setSelectedColor(color);
    setSelectedSize(size);
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(product.id, color, size, newQuantity);
  };

  const handleRemove = () => {
    onRemove && onRemove(product.id, selectedColor, selectedSize);
  };

  const handleMoveToFavorites = () => {
    onMoveToFavorites && onMoveToFavorites(product.id, selectedColor, selectedSize);
  };

  const openModal = () => { setIsModalOpen(true); };

  const getShippingDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-5 px-10">
      <div className="flex gap-6 relative">
        <button onClick={handleRemove} className="absolute top-0 right-0">
          <MdOutlineClose size={20} />
        </button>
        <div className="h-60 w-auto flex-shrink-0">
          <img
            src={product.imagesByColor[selectedColor][0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-sm font-semibold mb-2">${currentPrice.toFixed(2)}</h2>
          <h3 className="text-xs font-medium mb-3">{product.name}</h3>

          <div className="flex gap-2 mb-4">
            {product.tags && product.tags.map((tag, index) => (
              <span key={index} className="px-1.5 py-0.5 text-xs rounded-xl bg-gray-100">
                {tag}
              </span>
            ))}
          </div>

          <span onClick={openModal} className="text-xs cursor-pointer underline mb-2 mt-12">
            Color: <span className="capitalize">{selectedColor}</span>
          </span>

          <div className="flex items-center justify-between mb-4 py-1 border-t border-b border-gray-300">
            <span onClick={openModal} className="text-xs underline cursor-pointer">
              Size: {selectedSize} 
            </span>

            <div className="flex items-center">
              <span className="text-xs">Qty:</span>
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="rounded px-1 text-xs w-22 outline-none"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Move to Favorites */}
          <button onClick={handleMoveToFavorites} className="flex items-center gap-2 text-xs mb-4">
            <CiHeart size={16} />
            Move to favorites
          </button>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name={`shipping-${product.id}-${selectedColor}-${selectedSize}`}
                value="ship"
                checked={shippingOption === 'ship'}
                onChange={(e) => setShippingOption(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-xs">
                Ship to home on {getShippingDate(9)}
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name={`shipping-${product.id}-${selectedColor}-${selectedSize}`}
                value="pickup"
                checked={shippingOption === 'pickup'}
                onChange={(e) => setShippingOption(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-xs">
                Free pick-up in-store {getShippingDate(1)}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="text-right pb-8 pt-6 border-b border-gray-300">
        <span className="text-sm font-medium">
          Item total ${totalPrice.toFixed(2)}
        </span>
      </div>

      <OptionsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        currentColor={selectedColor}
        currentSize={selectedSize}
        currentQuantity={quantity}
        onUpdate={handleModalUpdate}
      />
    </div>
  );
};

export default BasketItem;