import { useRef, useState } from 'react'
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
    { name: "Women's Jeans", path: "/women/apparel/jeans-denims/view-all" },
    { name: "Handbags", path: "/handbags/view-all" }, 
    { name: "Women's Tops", path: "/women/apparel/tops/view-all" },
    { name: "Women's Shorts", path: "/women/apparel/shorts" },
    { name: "Women's Shoes", path: "/women/apparel/shoes/view-all" },
    { name: "Women's Skirts", path: "/women/apparel/skirts" },
    { name: "Dresses", path: "/women/apparel/dresses" },
    { name: "Women's Apparel", path: "/women/apparel" },
    { name: "Men's Apparel", path: "/men/apparel" }
  ];

  const dispatch = useDispatch();
  const basketItems = useSelector(state => state.basket.items);

  const handleAddToBasket = (product) => {dispatch(addItem(product))}

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const curatedForYou = products.slice(0,10)

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