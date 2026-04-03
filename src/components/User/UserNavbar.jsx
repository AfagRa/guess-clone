import { useState, useEffect, useRef } from 'react';
import { CiSearch, CiHeart } from "react-icons/ci";
import UserNavbarMobile from './UserNavbarMobile';
import UserNavbarDesktop from './UserNavbarDesktop';
import BasketDropdown from './BasketDropdown';
import Banner from './HomePageComponents/Banner';
import { Link, useNavigate } from 'react-router';
import { PiBagThin } from 'react-icons/pi';
import { useSelector, useDispatch } from 'react-redux';
import { hideBasketDropdown, showBasketDropdown } from '../../store/basketSlice';
import { setSearchQuery, activateSearch, deactivateSearch } from '../../store/searchSlice';
import { logout } from '../../store/authSlice';
import { apiFetch } from '../../services/api';

const UserNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basketItems = useSelector(state => state.basket.items);
  const showBasket = useSelector(state => state.basket.showDropdown);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const totalItemsCount = basketItems.reduce((total, item) => total + item.quantity, 0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    if (!showInput) {
      setShowInput(true);
    } else if (inputValue.trim()) {
      dispatch(setSearchQuery(inputValue));
      dispatch(activateSearch());
      navigate('/women/clothing/view-all');
    }
  };

  const handleLogoClick = () => {
    setShowInput(false);
    setInputValue('');
    dispatch(deactivateSearch());
    navigate('/');
  };

  const userInitial = () => {
    const n = user?.name?.trim() || user?.email?.trim() || '';
    if (!n) return '?';
    return n.charAt(0).toUpperCase();
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    try {
      await apiFetch('/auth/logout', { method: 'POST', body: JSON.stringify({}) });
    } catch {
    }
    dispatch(logout());
  };

  return (
    <>
      <div className={`w-full fixed top-0 left-0 right-0 bg-white border-b border-gray-200 transition-transform duration-300 z-50 
        ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <Banner />
        
        <nav className="flex items-center justify-between px-3.5 py-2 relative">
          <div className="flex gap-12">
            <button onClick={handleLogoClick} className="flex items-center">
              <img className="w-auto h-5 cursor-pointer" src="https://cdn.worldvectorlogo.com/logos/guess-2.svg" alt="guess-logo" />
            </button>
            <UserNavbarDesktop />
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {showInput && (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm mr-2 w-48"
                  />
                )}
                <button onClick={handleSearchClick} className="cursor-pointer p-2">
                  <CiSearch className="w-5 h-5" />
                </button>
              </div>

              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-medium text-white"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    {userInitial()}
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] border border-gray-200 bg-white py-1 text-xs shadow-sm">
                      <Link
                        to="/profile"
                        className="block px-3 py-2 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/profile?tab=orders"
                        className="block px-3 py-2 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-block text-xs underline"
                >
                  Sign in
                </Link>
              )}

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