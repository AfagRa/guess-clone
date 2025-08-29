import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { allCategories } from '../../data/categories';

const UserNavbarMobile = ({ isVisible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuStack, setMobileMenuStack] = useState([]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setMobileMenuStack([]);
    }
  };

  const buildCategoryPath = (menuStack, currentItem) => {
    let path = '';
    
    menuStack.forEach(stackItem => {
      const label = stackItem.item.name || stackItem.item.title;
      if (label) {
        path += `/${label.toLowerCase().replace(/\s+/g, '-')}`;
      }
    });

    if (currentItem?.name) {
      path += `/${currentItem.name.toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    return path;
  };

  const handleMobileMenuItemClick = (item) => {
    const normalizedItem = { ...item, name: item.name || item.title };

    if (item.dropdown) {
      setMobileMenuStack([...mobileMenuStack, { type: 'main', item: normalizedItem }]);
    } else if (item.sectionData) {
      setMobileMenuStack([...mobileMenuStack, { type: 'section', item: normalizedItem }]);
    } else if (item.subcategories && item.subcategories.length > 0) {
      setMobileMenuStack([...mobileMenuStack, { type: 'subcategory', item: normalizedItem }]);
    } else {
      const path = buildCategoryPath(mobileMenuStack, normalizedItem);
      window.location.href = path;  
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
        title: '',
        items: [
          { name: 'Sign in or Register', href: '/profile', isSignIn: true },
          ...allCategories
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
      <div className={`fixed left-0 right-0 z-50 bg-white transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} 
      style={{ 
        top: isVisible ? '70px' : '0px',
        height: isVisible ? 'calc(100vh - 70px)' : '100vh'
      }}>
        <div className="h-full overflow-y-auto">
          {mobileMenuStack.length > 0 && (
            <div className="flex items-center p-3 border-b border-gray-200">
              <button onClick={goBackMobileMenu} className="p-2">
                <IoChevronBack className="w-5 h-5" />
              </button>
              <h2 className="text-md">{menuData.title}</h2>
            </div>
          )}

          <div className="py-4">
            {menuData.items.map((item, index) => (
              <div key={index} className='px-5'>
                {item.isSignIn ? (
                  <div className="px-10 py-4 border-b border-gray-200">
                    <span>Hi, </span> 
                    <button className="text-sm underline">
                      {item.name}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleMobileMenuItemClick(item)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left  border-b border-gray-200 hover:bg-gray-50"
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
      <button 
        onClick={toggleMobileMenu}
        className="cursor-pointer p-2 lg:hidden"
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? (
          <HiOutlineX className="w-5 h-5" />
        ) : (
          <HiOutlineMenu className="w-5 h-5" />
        )}
      </button>
      {renderMobileMenu()}
    </>
  );
};

export default UserNavbarMobile;