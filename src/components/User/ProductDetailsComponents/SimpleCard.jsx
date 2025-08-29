import { useState } from "react";
import { useNavigate } from "react-router";
import AddButtonModal from "./AddButtonModal";

let globalOpenModalId = null;

const SimpleCard = ({ product, height, showPrice, onAddSuccess }) => {
  const item = product;
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentImages = item.imagesByColor[item.colors[0]];
  const mainImage = currentImages[0];
  const hoverImage = currentImages[1] || currentImages[0];

  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.stopPropagation();

    globalOpenModalId = item.id;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    globalOpenModalId = null;
    setIsModalOpen(false);
  };

  const handleAddSuccess = () => {
    onAddSuccess();
  };

  const handleCardClick = () => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
    const updatedViewed = [item, ...recentlyViewed.filter(v => v.id !== item.id)].slice(0, 10);
    localStorage.setItem('recently-viewed', JSON.stringify(updatedViewed));

    navigate(`/product/${item.id}`, { replace: true });
  };

  const formatPrice = (price) => `${price.toFixed(2)}`;

  if (globalOpenModalId && globalOpenModalId !== item.id && isModalOpen) {
    setIsModalOpen(false);
  }

  return (
    <>
      <div onClick={handleCardClick} className="flex flex-col cursor-pointer max-w-[100%] relative">
        <div
          className="relative overflow-hidden mb-3 w-fit"
          style={{ height: height || "400px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? hoverImage : mainImage}
            alt={item.name}
            className="w-full h-full object-contain object-center rounded-sm"
          />
          <button
            onClick={handleAddClick}
            className="absolute bottom-2 right-2 rounded-md px-1 sm:px-2 py-1 text-[10px] cursor-pointer bg-gray-100 text-black"
          >
            Add +
          </button>
        </div>

        {isModalOpen && (
          <AddButtonModal
            product={item}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSuccess={handleAddSuccess}
          />
        )}

        <div>
          <h3 className="text-xs leading-tight break-words mb-1">{item.name}</h3>

          {showPrice &&
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                {item.salePrice ?
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>${formatPrice(item.salePrice)}</span>
                    <span className="text-gray-400 line-through">${formatPrice(item.price)}</span>
                    <span className="text-gray-400">(${item.percentageOff}% Off)</span>
                  </div>
                  :
                  <span>${formatPrice(item.price)}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default SimpleCard;