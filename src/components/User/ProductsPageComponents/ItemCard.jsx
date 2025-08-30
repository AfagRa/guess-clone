import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import AddButtonModal from '../ProductDetailsComponents/AddButtonModal';
import { removeItem, addItem } from '../../../store/wishlistSlice';

const ItemCard = ({ item, onNavigate }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFavoriteNotification, setShowFavoriteNotification] = useState(false);
  const [showBasketNotification, setShowBasketNotification] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const currentImages = item.imagesByColor[item.colors[0]];
  const mainImage = currentImages[0];
  const hoverImage = currentImages[1] || currentImages[0];

  useEffect(() => {
    const isInWishlist = wishlistItems.some(wishlistItem => wishlistItem.id === item.id);
    setIsFavorited(isInWishlist);
  }, [item.id, wishlistItems]);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorited;
    
    if (newFavoriteState) {
      const wishlistItem = {
        id: item.id, 
        ...item, 
        selectedColor: item.colors[0], 
        selectedSize: item.sizes[0], 
        quantity: 1
      };
      
      dispatch(addItem(wishlistItem));
    } else {
      dispatch(removeItem({
        id: item.id,
        color: item.colors[0],
        size: item.sizes[0] 
      }));
    }
    
    setShowFavoriteNotification(true);
    setTimeout(() => { setShowFavoriteNotification(false); }, 1000);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    setShowAddModal(true);
  };

  const handleAddSuccess = () => {
    setShowBasketNotification(true);
    setTimeout(() => { setShowBasketNotification(false); }, 1000);
  };

  const handleCardClick = () => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
    const updatedViewed = [item, ...recentlyViewed.filter(v => v.id !== item.id)].slice(0, 10);
    localStorage.setItem('recently-viewed', JSON.stringify(updatedViewed));
    
    if (onNavigate) onNavigate(`/product/${item.id}`);
  };
 
  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <>
      {showFavoriteNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          {isFavorited ? 'Product added to favorites' : 'Product removed from favorites'}
        </div>
      )}

      {showBasketNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          Product added to the bag
        </div>
      )}
      
      <div onClick={handleCardClick} className="flex flex-col cursor-pointer bg-white relative">
        <div 
          className="relative aspect-[3/4] overflow-hidden mb-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? hoverImage : mainImage}
            alt={item.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <button 
            onClick={handleAddClick} 
            className="absolute cursor-pointer bottom-2 right-2 bg-white rounded-md px-1 sm:px-2 py-1 text-xs sm:text-sm hover:bg-gray-100 transition-colors"
          >
            Add +
          </button>
        </div>

        <div>
          <h3 className="text-xs leading-tight">{item.name}</h3>
          <div className="text-xs text-gray-500 mt-2">{item.colors.length} Color{item.colors.length > 1 ? 's' : ''}</div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.salePrice ? (
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="font-medium">{formatPrice(item.salePrice)}</span>
                  <span className="text-gray-400 line-through">{formatPrice(item.price)}</span>
                  <span className="text-gray-400">({item.percentageOff}% Off)</span>
                </div>
              ) : (
                <span className="font-medium">{formatPrice(item.price)}</span>
              )}
            </div>

            <button 
              onClick={handleFavoriteToggle} 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorited ? (
                <IoMdHeart className="text-gray-500 w-5 h-5" />
              ) : (
                <IoMdHeartEmpty className="text-gray-500 w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
              {item.ecoInfo && (
                <div className="bg-gray-100 rounded-[999px] px-1 py-0.5">
                  <p className="text-[10px] font-medium text-green-700">{item.ecoInfo}</p>
                </div>
              )} 
              {item.tags.map((tag, i) => (
                <div key={i} className="bg-gray-100 rounded-[999px] px-1 py-0.5">
                  <p className="text-[10px] text-gray-700">{tag}</p>
                </div>  
              ))}
          </div>
        </div>

        <AddButtonModal
          product={item}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      </div>
    </>
  );
};

export default ItemCard;