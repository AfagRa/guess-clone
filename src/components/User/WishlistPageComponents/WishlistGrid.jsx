import { useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";

const WishlistGrid = () => {
    const wishlistItems = useSelector(state => state.wishlist.items);

    return (
        <div className="w-full sm:mx-auto mt-8 mb-8">
            <div className="w-full sm:mx-auto space-y-6">
                {wishlistItems.slice().reverse().map(item => (
                    <WishlistItem
                        key={`${item.id}-${item.selectedColor || item.color}-${item.selectedSize || item.size}`}
                        product={item}
                        wishlistItem={item}
                        initialQuantity={item.quantity}
                        selectedColor={item.selectedColor || item.color}
                        selectedSize={item.selectedSize || item.size}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishlistGrid;