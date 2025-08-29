import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';
import { addItem } from '../../../store/basketSlice';

const AddButtonModal = ({ product, isOpen, onClose, onSuccess }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedColor && selectedSize && isOpen) {
      const productToAdd = {
        ...product,
        selectedColor,
        selectedSize,
        color: selectedColor,
        size: selectedSize
      };

      dispatch(addItem(productToAdd));

      onSuccess(); // Show toast

      setTimeout(() => onClose(), 300);

      setSelectedColor(null);
      setSelectedSize(null);
    }
  }, [selectedColor, selectedSize]);

  if (!isOpen) return null;

  const availableColors = product.colors || [];
  const availableSizes = product.sizes || [];

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      setSelectedColor(null);
      setSelectedSize(null);
    }
  };

  const handleModalClick = (e) => e.stopPropagation();

  const getColorStyle = (color) => {
    const colorMap = {
      'black': '#000000',
      'white': '#FFFFFF',
      'beige': '#F5F5DC',
      'brown': '#8B4513',
      'navy': '#000080',
      'gray': '#808080',
      'grey': '#808080',
      'red': '#FF0000',
      'blue': '#0000FF',
      'green': '#008000',
      'pink': '#FFC0CB'
    };
    return colorMap[color.toLowerCase()] || color;
  };

  return (
    <div onClick={handleOutsideClick} className="absolute -bottom-4 left-0 right-0 z-50">
      <div onClick={handleModalClick} className="bg-white border border-gray-200 shadow-lg p-4 w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          <IoCloseOutline size={24} />
        </button>

        <p className="text-xs text-gray-700 mb-4">{product.availability}</p>

        <div className="mb-6">
          <p className="text-sm mb-2">Select a color:</p>
          <div className="flex gap-2">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={(e) => { e.stopPropagation(); setSelectedColor(color); }}
                className={`w-8 h-8 rounded-full border-2 transition-colors cursor-pointer capitalize ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                style={{ backgroundColor: getColorStyle(color) }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm mb-2">Select a size:</p>
          <div className="flex gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`w-8 h-8 rounded-full cursor-pointer text-xs text-center border-2 transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddButtonModal;
