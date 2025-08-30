import { useSelector } from "react-redux";
import { products } from "../../data/products";
import EmptyWishlist from "../../components/User/WishlistPageComponents/EmptyWishlist";
import WishlistGrid from "../../components/User/WishlistPageComponents/WishlistGrid";
import ItemsGrid from "../../components/User/ProductDetailsComponents/ItemsGrid";

const WishlistPage = () => {
  const favoriteItems = useSelector(state => state.wishlist.items)

  const getTotalItems = () => {
    return favoriteItems.reduce((total, item) => total + item.quantity, 0);
  };

  const randomItems = products.slice(0,10)
  const relevantItems = products.slice(10,20)

  return (
    <div className="max-w-6xl mx-auto pt-10 mb-16">
      <h2 className="font-medium text-md max-lg:ml-10">Favorites ({getTotalItems()})</h2>

      {favoriteItems.length > 0 ? 
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row max-lg:justify-center max-lg:items-center">
          <div className="w-full sm:max-w-3xl">
            <WishlistGrid />
          </div>
        </div>
        :
        <EmptyWishlist />
      }

      <div className={`space-y-12 mt-10 max-w-3xl mx-auto`}>
        <ItemsGrid 
          title="Top picks for you" 
          products={randomItems} 
          height="300px" 
          showPrice={true}
          maxWidth="auto"
        />

        <ItemsGrid 
          title="You might also like" 
          products={relevantItems} 
          height="300px" 
          showPrice={true}
          maxWidth="auto"
        />
      </div>
    </div>
  )
}

export default WishlistPage