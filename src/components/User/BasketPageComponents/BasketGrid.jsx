import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, deleteItem, moveToFavorites } from '../../../store/basketSlice';
import BasketItem from './BasketItem';


const BasketGrid = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector(state => state.basket.items);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(deleteItem(productId));
    } else {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const handleRemove = (productId) => {
    dispatch(deleteItem(productId));
  };

  const handleMoveToFavorites = (productId) => {
    dispatch(moveToFavorites(productId));
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
              key={`${item.id}-${item.color}-${item.size}`}
              product={item}
              basketItem={item}
              initialQuantity={item.quantity}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onMoveToFavorites={handleMoveToFavorites}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BasketGrid;