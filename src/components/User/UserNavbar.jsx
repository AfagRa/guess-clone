import { useState, useEffect } from 'react';
import { CiSearch, CiHeart } from "react-icons/ci";
import UserNavbarMobile from './UserNavbarMobile';
import UserNavbarDesktop from './UserNavbarDesktop';
import BasketDropdown from './BasketDropdown';
import Banner from './HomePageComponents/Banner';
import { useNavigate } from 'react-router';
import { PiBagThin } from 'react-icons/pi';
import { useSelector, useDispatch } from 'react-redux';
import { hideBasketDropdown, showBasketDropdown } from '../../store/basketSlice'; // Updated import

const UserNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) setIsVisible(true);
      else setIsVisible(false);   
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basketItems = useSelector(state => state.basket.items);
  const showBasket = useSelector(state => state.basket.showDropdown);
  const totalItemsCount = basketItems.reduce((total, item) => total + item.quantity, 0);

  const handleMouseEnterBasket = () => {dispatch(showBasketDropdown())}

  const handleMouseLeaveBasket = () => {dispatch(hideBasketDropdown())}

  useEffect(() => {
    if (showBasket) {
      const timer = setTimeout(() => {
        dispatch(hideBasketDropdown());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showBasket, dispatch]);

  return (
    <>
      <div className={`w-full fixed top-0 left-0 right-0 bg-white border-b border-gray-200 transition-transform duration-300 z-50 
        ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <Banner />
        
        <nav className="flex items-center justify-between px-3.5 py-2 relative">
          <div className="flex gap-12">
            <a href="/" className="flex items-center">
              <img className="w-auto h-5" src="https://www.guess.com/on/demandware.static/Sites-guess_us-Site/-/default/dw9bbf66d2/images/logo-guess-header.svg" alt="guess-logo" />
            </a>
            <UserNavbarDesktop />
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <a href="/profile" className="hidden md:flex items-center space-x-2 text-xs">
              <p>Hi, <u>Sign in or Register</u></p>
            </a>
            
            <div className="flex items-center">
              <button className="cursor-pointer p-2">
                <CiSearch className="w-5 h-5" />
              </button>
              <button className="cursor-pointer p-2">
                <CiHeart onClick={()=> navigate('/wishlist')} className="w-5 h-5" />
              </button>
              <div className="relative">
                <div onClick={()=> navigate('/basket')} 
                  onMouseEnter={handleMouseEnterBasket}
                  onMouseLeave={handleMouseLeaveBasket} 
                  className="cursor-pointer p-2 flex justify-center items-center"
                >
                  <PiBagThin className="w-5 h-5 cursor-pointer" />
                  {totalItemsCount > 0 && (
                    <span className="text-sm ml-1">
                      {totalItemsCount > 99 ? '99+' : totalItemsCount}
                    </span>
                  )}
                </div>
                <div onMouseEnter={handleMouseEnterBasket} onMouseLeave={handleMouseLeaveBasket}>
                  <BasketDropdown showBasket={showBasket} />
                </div>
              </div>
              <UserNavbarMobile isVisible={isVisible} />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default UserNavbar;