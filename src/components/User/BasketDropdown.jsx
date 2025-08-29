import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const BasketDropdown = ({ showBasket }) => {
  const basketItems = useSelector(state => state.basket.items).slice().reverse();
  const totalItemsCount = basketItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = basketItems.reduce((total, item) => total + (item.salePrice || item.price) * item.quantity, 0);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const getShippingThreshold = () => {
    const threshold = 125;
    const remaining = threshold - totalPrice;
    return { threshold, remaining, qualifies: totalPrice >= threshold };
  };

  const shippingInfo = getShippingThreshold();
 
  return (
    <div>      
      {showBasket && (
        <div className="hidden md:block absolute top-full -right-2.5 w-96 bg-white border border-gray-200 shadow-lg z-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
              <h3 className="text-lg font-medium">
                Shopping bag ({totalItemsCount})
              </h3>
              <Link to="/basket" className="text-sm underline hover:no-underline">
                View shopping bag
              </Link>
            </div>
            
            {basketItems.length === 0 ? (
              <div className="text-center">
                <p className="text-sm mb-6 pb-4 border-b border-gray-300">
                  You have no items in your bag.
                </p>
                <p className="text-blue-600 text-sm mb-6 pb-4 border-b border-gray-300">
                  Spend $125+ for free shipping
                </p>
                <button className="w-full bg-white border-2 border-black py-3 px-6 rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200">
                  Sign in or create an account
                </button>
              </div>
            ) : (
              <>
                <div className="max-h-40 overflow-y-auto mb-4">
                  {basketItems.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3 py-4">
                      <div className="h-20 w-auto flex-shrink-0">
                        <img
                          src={item.imagesByColor?.[item.selectedColor]?.[0] || ""}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-medium  leading-tight">
                            {item.name}
                          </h4>
                          <button className="ml-2 flex-shrink-0">
                            <IoMdClose />
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-600 mb-1">
                          <p>Color: {item.color}</p>
                          <p>Size: {item.size}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            {item.salePrice ? (
                              <div className="flex items-center gap-2">
                                <span>{formatPrice(item.salePrice)}</span>
                                <span className="text-gray-400 line-through text-xs">{formatPrice(item.price)}</span>
                              </div>
                            ) : (
                              <span>{formatPrice(item.price)}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right text-sm font-medium mt-1">
                          Item total: {formatPrice((item.salePrice || item.price) * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 pb-4 border-b border-gray-300">
                  {shippingInfo.qualifies ? (
                    <p className="text-sm font-medium">
                      Your order qualifies for free shipping
                    </p>
                  ) : (
                    <p className="text-sm">
                      Spend {formatPrice(shippingInfo.remaining)} more for free shipping
                    </p>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((totalPrice / shippingInfo.threshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-lg font-medium">
                    <span>Estimated total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border-2 py-2 px-4 rounded-full text-sm hover:bg-black hover:text-white transition-colors duration-200">
                      Shopping bag
                    </button>
                    <button className="flex-1 bg-black text-white py-2 px-4 rounded-full text-sm">
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketDropdown;