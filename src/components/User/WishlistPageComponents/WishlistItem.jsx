import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import OptionsModal from '../BasketPageComponents/OptionsModal';

const WishlistItem = ({ 
    product, 
    initialQuantity = 1, 
    selectedColor: initialColor, 
    selectedSize: initialSize, 
    onQuantityChange, 
    onRemove, 
    onMoveToBasket 
}) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [selectedColor, setSelectedColor] = useState(initialColor || (product.imagesByColor ? Object.keys(product.imagesByColor)[0] : null));
    const [selectedSize, setSelectedSize] = useState(initialSize || (product.sizes ? product.sizes[0] : null));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentPrice = product.salePrice || product.price;

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

    const handleMoveToBasket = () => {
        if (selectedColor && selectedSize) {
            onMoveToBasket && onMoveToBasket({
                product,
                selectedColor,
                selectedSize,
                quantity
            });
        } else {
            openModal();
        }
    };

    const openModal = () => { setIsModalOpen(true); };

    // Check if both color and size are selected
    const isReadyForBasket = selectedColor && selectedSize;
    const buttonText = isReadyForBasket ? 'Add to bag' : 'Select a size';

    // Get the product image
    const productImage = product.imagesByColor && selectedColor 
        ? product.imagesByColor[selectedColor][0] 
        : product.image || product.images?.[0];

    return (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Remove button */}
            <button 
                onClick={handleRemove} 
                className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50"
            >
                <MdOutlineClose size={16} className="text-gray-500" />
            </button>

            {/* Product Image */}
            <div className="aspect-[3/4] bg-gray-100">
                <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="p-4">
                {/* Price */}
                <div className="text-lg font-semibold mb-1">
                    ${currentPrice.toFixed(2)}
                </div>

                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {product.name}
                </h3>

                {/* Tags */}
                {product.tags && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-600">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Color Selection */}
                {product.imagesByColor && (
                    <div className="mb-2">
                        <button
                            onClick={openModal}
                            className="text-sm text-gray-700 hover:underline"
                        >
                            Color: <span className="capitalize font-medium">{selectedColor || 'Select'}</span>
                        </button>
                    </div>
                )}

                {/* Size Selection */}
                <div className="mb-4">
                    <button
                        onClick={openModal}
                        className="text-sm text-gray-700 hover:underline"
                    >
                        Size: <span className="font-medium">{selectedSize || 'Select'}</span>
                    </button>
                </div>

                {/* Quantity */}
                {isReadyForBasket && (
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-700">Qty:</span>
                        <select
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Add to Bag Button */}
                <button
                    onClick={handleMoveToBasket}
                    className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                        isReadyForBasket
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'border border-black text-black hover:bg-black hover:text-white'
                    }`}
                >
                    {buttonText}
                </button>
            </div>

            {/* Options Modal */}
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

export default WishlistItem;