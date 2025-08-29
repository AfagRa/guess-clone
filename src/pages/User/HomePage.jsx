import { useMemo, useRef, useState } from 'react'
import '../../styles/homepage.css';
import ItemsGrid from '../../components/User/ProductDetailsComponents/ItemsGrid';
import { products } from '../../data/products';
import HeroSection from '../../components/User/HomePageComponents/HeroSection';
import CategoryScroller from '../../components/User/HomePageComponents/CategoryScroller';
import GallerySection from '../../components/User/HomePageComponents/GallerySection';
import SecondCategoryScroller from '../../components/User/HomePageComponents/SecondCategoryScroller';
import CategoryGrid from '../../components/User/HomePageComponents/CategoryGrid';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/basketSlice';

const HomePage = () => {
  const categories = [
    { name: "Women's Jeans", path: "/womens-jeans" },
    { name: "Handbags", path: "/handbags" }, 
    { name: "Women's Tops", path: "/womens-tops" },
    { name: "Women's Shorts", path: "/womens-shorts" },
    { name: "Women's Shoes", path: "/womens-shoes" },
    { name: "Women's Skirts", path: "/womens-skirts" },
    { name: "Dresses", path: "/dresses" },
    { name: "Women's Apparel", path: "/womens-apparel" },
    { name: "Men's Apparel", path: "/mens-apparel" }
  ];

  const dispatch = useDispatch();
  const basketItems = useSelector(state => state.basket.items);

  // Add console log to see what useSelector returns
  console.log('🛒 Current basket items from useSelector:', basketItems);

  // Calculate total items in basket for display
  const totalItemsInBasket = basketItems.reduce((total, item) => total + item.quantity, 0);
  console.log('🔢 Total items in basket:', totalItemsInBasket);

  const handleAddToBasket = (product) => {
    console.log('📦 Product being added (this is the payload):', product);
    
    dispatch(addItem(product));
    
    console.log('✅ Action dispatched! Check Redux DevTools to see the action and payload');
    console.log(`Added ${product.name} to basket. Total items will be: ${totalItemsInBasket + 1}`);
  }

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const curatedForYou = useMemo(() => {
  return [...products].sort(() => Math.random() - 0.5).slice(0, 7);
}, []); // ✅ Only runs once → ItemsGrid stays stable

  const handleVideo = () => {
    if (!videoRef.current) return
    if (isPlaying) videoRef.current.pause()
    else videoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  return (
    <div className='px-0 sm:px-10 md:px-0'>
      <HeroSection videoRef={videoRef} isPlaying={isPlaying} handleVideo={handleVideo} />

      <div>
        <div className="w-full bg-white py-10">
          <CategoryScroller categories={categories}/>
          <GallerySection />
          <CategoryGrid />
          <SecondCategoryScroller videoRef={videoRef} isPlaying={isPlaying} handleVideo={handleVideo} />

          <ItemsGrid
            title={<h2 className="text-center mb-5 mt-10 text-md sm:text-xl md:text-2xl lg:text-4xl font-normal">Curated Just for You</h2>}
            products={curatedForYou} 
            height={"400px"} 
            showPrice={true} 
            maxWidth={"auto"}
            onAddToBasket={handleAddToBasket}
            basketItems={basketItems}
          />
        </div>
      </div>

    </div>
  )
}

export default HomePage