import { useSelector } from 'react-redux';
import BasketGrid from "../../components/User/BasketPageComponents/BasketGrid";
import PaymentSection from "../../components/User/BasketPageComponents/PaymentSection";
import ItemsGrid from "../../components/User/ProductDetailsComponents/ItemsGrid";
import EmptyBasket from "../../components/User/BasketPageComponents/EmptyBasket";
import {products} from "../../data/products"

const BasketPage = () => {
  const basketItems = useSelector(state => state.basket.items);

  const getTotalItems = () => {
    return basketItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
  const recentlyViewed = JSON.parse(localStorage.getItem("recently-viewed") || "[]")

  return (
    <div className="max-w-6xl mx-auto pt-10 mb-16">
      <h2 className="font-medium text-md">Shopping bag ({getTotalItems()})</h2>

      {basketItems.length > 0 ? (
        <div className="max-w-5xl mx-auto flex">
          <div className="w-3/5">
            <BasketGrid />
          </div>

          <div className="w-2/5 pr-8">
            <PaymentSection getTotalPrice={getTotalPrice} />
          </div>
        </div>
      ) : (
        <EmptyBasket />
      )}

      <div
        className={`space-y-12 mt-10 ${
          basketItems.length > 0 ? "" : "max-w-3xl mx-auto"
        }`}
      >
        <ItemsGrid
          title="Top picks for you"
          products={products.slice(0, 10)}
          height="300px"
          showPrice={true}
          maxWidth="auto"
        />

        <ItemsGrid
          title="Your recently viewed items"
          products={recentlyViewed.slice(0, 10)}
          height="300px"
          showPrice={true}
          maxWidth="auto"
        />

        {basketItems.length > 0 && (
          <ItemsGrid
            title="From your favorites"
            products={favorites.slice(0, 10)}
            height="300px"
            showPrice={true}
            maxWidth="auto"
          />
        )}
      </div>
    </div>
  );
};

export default BasketPage;
