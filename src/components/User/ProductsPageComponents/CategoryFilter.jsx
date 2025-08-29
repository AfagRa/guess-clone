import { Link } from "react-router"

const CategoryFilter = ({ maincat, subcat, cat, subcat2, catlist, allSections }) => {
    // Fix: subcat is an object, we need subcat.slug
    const subcatSlug = subcat?.slug || subcat
    // Determine what level we're at
    const isAtSectionLevel = !cat || cat === 'view-all'
    
    return (
        <div className="space-y-2">
            
            {isAtSectionLevel ? (
                // SECTION LEVEL: Show Apparel, Accessories, Featured Shops
                allSections && allSections.map((section, ind) => {
                    const isActiveSection = section.slug === subcatSlug
                    return (
                        <div key={ind}>
                            <Link
                                to={`/${maincat?.slug}/${section.slug}/view-all`}
                                className='text-xs my-1 block'
                            >
                                {section.title}
                            </Link>
                            
                            {/* Show children for active section */}
                            {isActiveSection && section.items && (
                                <div className="pl-4 space-y-1 mt-1">
                                    <Link 
                                        to={`/${maincat?.slug}/${section.slug}/view-all`}
                                        className={`text-xs cursor-pointer block ${cat === "view-all" ? "underline" : ""}`}
                                    >
                                        View All
                                    </Link>
                                    
                                    {section.items.map((item, index) => (
                                        <Link 
                                            key={index}
                                            to={`/${maincat?.slug}/${section.slug}/${item.slug}${
                                                item.subcategories && item.subcategories.length > 0 ? '/view-all' : ''
                                            }`}
                                            className="text-xs my-1 cursor-pointer block hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })
            ) : (
                // ITEM LEVEL: Show View All + catlist items (Tops siblings)
                <div>
                    <Link 
                        to={`/${maincat?.slug}/${subcatSlug}/view-all`}
                        className={`text-xs cursor-pointer block ${cat === "view-all" ? "underline" : ""}`}
                    >
                        View All
                    </Link>
                    
                    {catlist && catlist.map((item, index) => (
                        <div key={index}>
                            <Link 
                                to={`/${maincat?.slug}/${subcatSlug}/${item.slug}${
                                    item.subcategories && item.subcategories.length > 0 ? '/view-all' : ''
                                }`}
                                className='text-xs my-1 cursor-pointer block'
                            >
                                {item.name}
                            </Link>
                            
                            {/* Show subcategories for active item */}
                            {item.slug === cat && item.subcategories && (
                                <div className="pl-4 space-y-1 mt-1">
                                    {item.subcategories.map((subItem, subIndex) => (
                                        <Link 
                                            key={subIndex} 
                                            to={`/${maincat?.slug}/${subcatSlug}/${item.slug}/${subItem.slug}`}
                                            className={`text-xs cursor-pointer block ${subItem.slug === subcat2 ? "underline" : ""}`}
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoryFilter