import { useState } from 'react';
import { allCategories } from '../../data/categories';

const UserNavbarDesktop = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const handleMouseEnter = (index) => {
    if (allCategories[index].dropdown) setActiveDropdown(index)
  };

  const handleMouseLeave = () => setActiveDropdown(null)

  const buildCategoryPath = (menuStack, currentItem) => {
    let path = ''
    
    menuStack.forEach(stackItem => {
      const slug = stackItem.item.slug || stackItem.item.name?.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
      if (slug) path += `/${slug}`
    });

    if (currentItem?.slug) path += `/${currentItem.slug}`
    else if (currentItem?.name) path += `/${currentItem.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')}`
    
    return path;
  };

  const handleMainNavClick = (item, e) => {
    if (item.dropdown) {
      e.preventDefault();
      const firstSection = item.dropdown.sections[0];
      const viewAllPath = `/${item.slug}/${firstSection.slug}/view-all`;
      window.location.href = viewAllPath;
    }
  };

   const handleSectionTitleClick = (mainItem, section, e) => {
    e.preventDefault();
    const sectionPath = `/${mainItem.slug}/${section.slug}/view-all`;
    window.location.href = sectionPath;
  };

  const handleSubItemClick = (mainItem, section, subItem, e) => {
    e.preventDefault();
    
    if (subItem.isViewAll) {
      window.location.href = `/${mainItem.slug}/${section.slug}/view-all`;
      return;
    }

    if (subItem?.subcategories?.length > 0) {
      window.location.href = `/${mainItem.slug}/${section.slug}/${subItem.slug}/view-all`;
      return;
    }
    
    const path = buildCategoryPath(
      [
        { type: 'main', item: mainItem }, 
        { type: 'section', item: section }
      ],
      subItem
    );
    window.location.href = path;
  };

  return (
    <div className="w-full hidden lg:flex items-center text-xs space-x-4">
      {allCategories.map((item, index) => (
        <div key={item.name}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href={`/${item.slug}`} 
            onClick={(e) => handleMainNavClick(item, e)}
            className={`py-[17px] cursor-pointer transition ease-in-out ${activeDropdown === index ? "border-b-2 border-black" : ""}`}
          >
            {item.name}
          </a>
          
          {item.dropdown && activeDropdown === index && (
            <div className="absolute w-full left-0 top-[51px] bg-white border-t border-gray-200 shadow-lg z-50">
              <div className="flex items-start px-35 py-6 mx-auto">
                <div className="flex gap-5">
                  {item.dropdown.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className='mr-5'>
                      <h3 className="font-semibold mb-4 text-sm cursor-pointer"
                      onClick={(e) => handleSectionTitleClick(item, section, e)}>
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a 
                              onClick={(e) => handleSubItemClick(item, section, subItem, e)}
                              className={`text-xs block hover:underline ${subItem.className || 'text-black'}`}
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
  );
};

export default UserNavbarDesktop;
