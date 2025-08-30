import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../store/basketSlice';
import { removeItem } from '../../../store/wishlistSlice';
import OptionsModal from '../BasketPageComponents/OptionsModal';
import { useNavigate } from 'react-router';

const WishlistItem = ({product, initialQuantity = 1, selectedColor: initialColor, selectedSize: initialSize }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [selectedColor, setSelectedColor] = useState(initialColor || Object.keys(product.imagesByColor)[0]);
    const [selectedSize, setSelectedSize] = useState(initialSize || product.sizes[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBasketNotification, setShowBasketNotification] = useState(false);

    const dispatch = useDispatch();
    const currentPrice = product.salePrice || product.price;

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleModalUpdate = ({ color, size, quantity: newQuantity }) => {
        setSelectedColor(color);
        setSelectedSize(size);
        setQuantity(newQuantity);
    };

    const handleRemove = () => {
        dispatch(removeItem({
            id: product.id,
            color: selectedColor,
            size: selectedSize
        }));
    };

    const handleMoveToBasket = () => {
        if (isReadyForBasket) {
            dispatch(addItem({
                ...product,
                selectedColor,
                selectedSize,
                quantity
            }));

            setShowBasketNotification(true);
            setTimeout(() => { setShowBasketNotification(false); }, 1000);
        } else {
            setIsModalOpen(true);
        }
    };

    const openModal = () => { setIsModalOpen(true); };

    const navigate = useNavigate()

    const isReadyForBasket = selectedColor && selectedSize;

    return (
        <div className="pt-5 px-4 sm:px-10 w-full">
            {showBasketNotification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
                    Added to the basket
                </div>
            )}

            <div className='flex flex-col w-full sm:mx-auto max-lg:space-y-4 lg:flex-row justify-between items-center'>
                <div className="flex gap-6 relative pl-8 w-full lg:w-3/5">
                    <button onClick={handleRemove} className="absolute top-0 left-0 cursor-pointer">
                        <MdOutlineClose size={20} />
                    </button>
                    <div className='flex justify-center items-center space-x-3 sm:space-x-6 w-full'>
                        <div className="h-60 w-auto flex-shrink-0">
                            <img onClick={()=>{navigate(`/product/${product.id}`)}}
                                src={product.imagesByColor[selectedColor][0]}
                                alt={product.name}
                                className="cursor-pointer h-40 sm:w-full sm:h-full object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-sm font-semibold mb-2">${currentPrice.toFixed(2)}</h2>
                            <h3 className="text-xs font-medium mb-3">{product.name}</h3>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.tags && product.tags.map((tag, index) => (
                                    <span key={index} className="px-1.5 py-0.5 text-xs rounded-xl bg-gray-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <span onClick={openModal} className="text-xs cursor-pointer underline mb-4 mt-12">
                                Color: <span className="capitalize">{selectedColor}</span>
                            </span>

                            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mt-4 py-1 border-t border-b border-gray-300">
                                <span onClick={openModal} className="text-xs max-sm:w-full my-2 max-sm:border-b border-gray-300 max-sm:py-0.5 max-sm:block underline cursor-pointer">
                                    Size: {selectedSize} 
                                </span>

                                <div className="max-sm:w-full flex sm:items-center">
                                    <span className="text-xs">Qty:</span>
                                    <select
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                        className="rounded px-1 text-xs w-12 sm:w-22 outline-none"
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={handleMoveToBasket} className='py-2 max-sm:w-full sm:px-30 rounded-[999px] border-2 hover:bg-black hover:text-white text-center cursor-pointer'>
                    {isReadyForBasket ? 'Add to bag' : 'Select options'}
                </div>
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

export default WishlistItem;