import { useState, useEffect } from 'react';
import { CiSearch, CiHeart } from "react-icons/ci";
import { PiBagThin } from "react-icons/pi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { navItems } from '../../../data/categories';

const UserNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showBasket, setShowBasket] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuStack, setMobileMenuStack] = useState([]);

  const promoText = "Hassle-Free Returns on All Orders & Shipping Is Free with $125+ Purchase";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMouseEnter = (index) => {
    if (navItems[index].dropdown) {
      setActiveDropdown(index);
    }
  };

  const handleMouseLeave = () => setActiveDropdown(null);
  const handleBasketMouseEnter = () => setShowBasket(true);
  const handleBasketMouseLeave = () => setShowBasket(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setMobileMenuStack([]);
    }
  };

  const handleMobileMenuItemClick = (item) => {
    if (item.dropdown) {
      setMobileMenuStack([...mobileMenuStack, { type: 'main', item }]);
    } else if (item.sectionData) {
      setMobileMenuStack([...mobileMenuStack, { type: 'section', item }]);
    } else if (item.subcategories) {
      setMobileMenuStack([...mobileMenuStack, { type: 'subcategory', item }]);
    } else {
      setMobileMenuOpen(false);
      setMobileMenuStack([]);
    }
  };

  const goBackMobileMenu = () => {
    setMobileMenuStack(mobileMenuStack.slice(0, -1));
  };

  const getCurrentMobileMenuItems = () => {
    if (mobileMenuStack.length === 0) {
      return {
        title: 'Menu',
        items: [
          { name: 'Sign in or Register', href: '/profile', isSignIn: true },
          ...navItems
        ]
      };
    }

    const current = mobileMenuStack[mobileMenuStack.length - 1];
    
    if (current.type === 'main') {
      const sectionItems = current.item.dropdown.sections.map(section => ({
        name: section.title,
        href: '#',
        sectionData: section
      }));
      return {
        title: current.item.name,
        items: sectionItems
      };
    }
    
    if (current.type === 'section') {
      return {
        title: current.item.name,
        items: current.item.sectionData.items
      };
    }
    
    if (current.type === 'subcategory') {
      return {
        title: current.item.name,
        items: current.item.subcategories || []
      };
    }
  };

  const renderMobileMenu = () => {
    const menuData = getCurrentMobileMenuItems();
    
    return (
      <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {mobileMenuStack.length > 0 ? (
              <button onClick={goBackMobileMenu} className="p-2">
                <IoChevronBack className="w-5 h-5" />
              </button>
            ) : (
              <div></div>
            )}
            <h2 className="text-lg font-medium">{menuData.title}</h2>
            <button onClick={toggleMobileMenu} className="p-2">
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4">
            {mobileMenuStack.length > 0 && (
              <button
                onClick={goBackMobileMenu}
                className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-200"
              >
                <IoChevronBack className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{menuData.title}</span>
              </button>
            )}
            
            {menuData.items.map((item, index) => (
              <div key={index}>
                {item.isSignIn ? (
                  <div className="px-4 py-3 border-b border-gray-200">
                    <button className="text-sm text-blue-600 underline">
                      {item.name}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleMobileMenuItemClick(item)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <span className="text-sm">{item.name}</span>
                    {(item.dropdown || item.subcategories || item.sectionData) && (
                      <IoChevronForward className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden" />
      )}

      <div className={`w-full fixed top-0 left-0 right-0 bg-white transition-transform duration-300 z-50 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}>
        <div className="text-gray-600 text-xs py-2 overflow-hidden relative border-b border-gray-200">
          <div className="animate-scroll whitespace-nowrap">
            <span className="inline-block px-2">{promoText}</span>
            <span className="inline-block px-2">•</span>
            <span className="inline-block px-2">{promoText}</span>
            <span className="inline-block px-2">•</span>
            <span className="inline-block px-2">{promoText}</span>
            <span className="inline-block px-2">•</span>
            <span className="inline-block px-2">{promoText}</span>
            <span className="inline-block px-2">•</span>
            <span className="inline-block px-2">{promoText}</span>
            <span className="inline-block px-2">•</span>
          </div>
        </div>
        
        <nav className="flex items-center justify-between px-3.5 py-2 relative">
          <div className="flex gap-12">
            <a href="/" className="flex items-center">
              <img className="w-auto h-5" src="https://www.guess.com/on/demandware.static/Sites-guess_us-Site/-/default/dw9bbf66d2/images/logo-guess-header.svg" alt="guess-logo" />
            </a>
            
            <div className="w-full hidden md:flex items-center text-xs space-x-4">
              {navItems.map((item, index) => (
                <div key={item.name}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href={item.href} className={`py-[17px] transition ease-in-out ${activeDropdown === index ? "border-b-2 border-black" : ""}`}>
                    {item.name}
                  </a>
                  
                  {item.dropdown && activeDropdown === index && (
                    <div className="absolute w-full left-0 top-[51px] bg-white border-t border-gray-200 shadow-lg z-50">
                      <div className="flex items-start px-35 py-6 mx-auto">
                        <div className="flex gap-5">
                          {item.dropdown.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className='mr-5'>
                              <h3 className="font-semibold mb-4 text-sm">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <a
                                      href={subItem.href}
                                      className={`text-xs block ${
                                        subItem.className || 'text-black'
                                      }`}
                                    >
                                      {subItem.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {item.dropdown.images && (
                          <div className="flex flex-shrink-0 border-l-1 border-gray-300 ml-10 pl-10">
                            {item.dropdown.images.map((image, imageIndex) => (
                              <img key={imageIndex} src={image.src} alt={image.alt} 
                                className="h-64 object-cover"/>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
                <CiHeart className="w-5 h-5" />
              </button>
              
              <div className="relative"
                onMouseEnter={handleBasketMouseEnter}
                onMouseLeave={handleBasketMouseLeave}
              >
                <button className="cursor-pointer p-2">
                  <PiBagThin className="w-5 h-5" />
                </button>
                
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

              <button 
                onClick={toggleMobileMenu}
                className="cursor-pointer p-2 md:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
        
        <style jsx="true">{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </div>

      {renderMobileMenu()}
    </>
  );
};

export default UserNavbar;