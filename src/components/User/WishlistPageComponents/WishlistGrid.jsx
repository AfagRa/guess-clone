import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateQuantity } from "../../../store/wishlistSlice";
import { addItem } from "../../../store/basketSlice";
import { CiHeart } from "react-icons/ci";
import WishlistItem from "./WishlistItem";

const WishlistGrid = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);

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

    const handleMoveToBasket = (item) => {
        dispatch(deleteItem({ 
            id: item.id, 
            color: item.selectedColor || item.color, 
            size: item.selectedSize || item.size 
        }));
        
        dispatch(addItem({
            ...item,
            selectedColor: item.selectedColor || item.color,
            selectedSize: item.selectedSize || item.size
        }));
    };

    return (
        <div className="w-full sm:mx-auto mt-8 mb-8">
            <div className="w-full sm:mx-auto space-y-6">
                {wishlistItems.map(item => (
                    <WishlistItem
                        key={`${item.id}-${item.selectedColor || item.color}-${item.selectedSize || item.size}`}
                        product={item}
                        wishlistItem={item}
                        initialQuantity={item.quantity}
                        selectedColor={item.selectedColor || item.color}
                        selectedSize={item.selectedSize || item.size}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                        onMoveToBasket={handleMoveToBasket}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishlistGrid;