import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, deleteItem, moveToFavorites } from '../../../store/basketSlice';
import BasketItem from './BasketItem';

const BasketGrid = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector(state => state.basket.items);

  const handleQuantityChange = (productId, color, size, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(deleteItem({ id: productId, color, size }));
    } else {
      dispatch(updateQuantity({ id: productId, color, size, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId, color, size) => {
    dispatch(deleteItem({ id: productId, color, size }));
  };

  const handleMoveToFavorites = (productId, color, size) => {
    dispatch(moveToFavorites({ id: productId, color, size }));
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 mb-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {basketItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">Your basket is empty</p>
          </div>
        ) : (
          basketItems.map(item => (
            <BasketItem
              key={`${item.id}-${item.selectedColor || item.color}-${item.selectedSize || item.size}`}
              product={item}
              basketItem={item}
              initialQuantity={item.quantity}
              selectedColor={item.selectedColor || item.color}
              selectedSize={item.selectedSize || item.size}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onMoveToFavorites={handleMoveToFavorites}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BasketGrid;