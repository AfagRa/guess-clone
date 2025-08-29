const BasketDropdown = ({showBasket}) => {
  return (
    <div>      
      {showBasket && (
        <div className="hidden md:block absolute top-full -right-2.5 w-96 bg-white border border-gray-200 shadow-lg z-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
              <h3 className="text-lg font-medium">
                Shopping bag (0)
              </h3>
              <a href="/basket" className="text-sm underline hover:no-underline">
                View shopping bag
              </a>
            </div>
            
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketDropdown;