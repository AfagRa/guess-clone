import { useState } from "react";
import BasketGrid from "../../components/User/BasketPageComponents/BasketGrid"
import PaymentSection from "../../components/User/BasketPageComponents/PaymentSection"
import ItemsGrid from "../../components/User/ProductDetailsComponents/ItemsGrid"
import EmptyBasket from "../../components/User/BasketPageComponents/EmptyBasket";

const BasketPage = () => {
  const [basket, setBasket] = useState([
    {
      id: "w1",
      quantity: 2,
      selectedColor: "beige",
      selectedSize: "M"
    },
    {
      id: "w3",
      quantity: 1,
      selectedColor: "black",
      selectedSize: "S"
    }
  ])

  const getTotalItems = () => {return basket.reduce((total, item) => total + item.quantity, 0)}
  
  const getTotalPrice = () => {
    return basket.reduce((total, basketItem) => {
      const product = sample.find(p => p.id === basketItem.id);
      if (product) {
        const price = product.salePrice || product.price;
        return total + (price * basketItem.quantity);
      }
      return total;
    }, 0);
  };

  const sample = [
    {
    id: "w1",
    name: "Eco Julianna Off-Shoulder Top",
    slug: "eco-julianna-off-shoulder-top",
    gender: "women",
    categoryPath: ["women", "apparel", "tops"],
    price: 59,
    salePrice: 47.20,
    percentageOff: 40,
    colors: ["beige", "white", "black"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["New Arrival", "Sustainable", "Bestseller"],
    material: "93% TENCEL™ Modal, 7% Elastane/Spandex",
    ecoInfo: "Eco-responsible wood-based fiber",
    rating: 4.5,
    reviewsCount: 142,
    availability: "In Stock",
    brand: "GUESS",
    description: "A sustainable off-shoulder top made with organic cotton. Lightweight, breathable, and perfect for summer.",
    features: [
      "Jersey knit top",
      "Shirring details at sides",
      "Crew neckline",
      "Sleeveless silhouette",
      "Slim fit and regular length",
      "93% TENCEL™ Modal, 7% Elastane/Spandex",
      "Eco-responsible wood-based fiber"
    ],
    imagesByColor: {
      beige: [
        "https://img.guess.com/image/upload/f_auto,q_auto:best,w_600/v1/NA/Style/ECOMM/W5BP42KACM2-G66B.jpg",
        "https://img.guess.com/image/upload/f_auto,q_auto:best,w_600/v1/NA/Style/ECOMM/W5BP42KACM2-G66B-ALT1.jpg",
        "https://placehold.co/600x800/DDD6CE/000000?text=Beige+3",
        "https://placehold.co/600x800/DDD6CE/000000?text=Beige+4"
      ],
      white: [
        "https://placehold.co/600x800/FFFFFF/000000?text=White+1",
        "https://placehold.co/600x800/FFFFFF/000000?text=White+2",
        "https://placehold.co/600x800/FFFFFF/000000?text=White+3",
        "https://placehold.co/600x800/FFFFFF/000000?text=White+4"
      ],
      black: [
        "https://placehold.co/600x800/000000/FFFFFF?text=Black+1",
        "https://placehold.co/600x800/000000/FFFFFF?text=Black+2",
        "https://placehold.co/600x800/000000/FFFFFF?text=Black+3",
        "https://placehold.co/600x800/000000/FFFFFF?text=Black+4"
      ]
    }
  },
  {
    id: "w3",
    name: "Cutout Knit Dress",
    slug: "cutout-knit-dress",
    gender: "women",
    categoryPath: ["women", "apparel", "dresses"],
    price: 120,
    salePrice: null,
    percentageOff: 0,
    colors: ["black", "off-white"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["New Arrival", "Dressy"],
    material: "50% Viscose, 28% Polyester, 22% Nylon",
    ecoInfo: null,
    rating: 4.4,
    reviewsCount: 55,
    availability: "In Stock",
    brand: "GUESS",
    description: "A chic, form-fitting knit dress with elegant cutout details at the waist. Perfect for a night out.",
    features: [
      "Ribbed knit fabrication",
      "Crewneck",
      "Sleeveless",
      "Cutout details at waist",
      "Mini length"
    ],
    imagesByColor: {
      black: [
        "https://placehold.co/600x800/000000/FFFFFF?text=Dress+Black+1",
        "https://placehold.co/600x800/000000/FFFFFF?text=Dress+Black+2",
        "https://placehold.co/600x800/000000/FFFFFF?text=Dress+Black+3",
        "https://placehold.co/600x800/000000/FFFFFF?text=Dress+Black+4"
      ],
      "off-white": [
        "https://placehold.co/600x800/F5F5DC/000000?text=Dress+Off-White+1",
        "https://placehold.co/600x800/F5F5DC/000000?text=Dress+Off-White+2",
        "https://placehold.co/600x800/F5F5DC/000000?text=Dress+Off-White+3",
        "https://placehold.co/600x800/F5F5DC/000000?text=Dress+Off-White+4"
      ]
    }
  },
  ]

  return (
    <div className="max-w-6xl mx-auto pt-10 mb-16">
      <h2 className="font-medium text-md">Shopping bag ({getTotalItems()})</h2>

      {basket.length > 0 ? 
        <div className="max-w-5xl mx-auto flex">
          <div className="w-3/5">
            <BasketGrid
              basket={basket}
              setBasket={setBasket}
            />
          </div>

          <div className="w-2/5 pr-8">
            <PaymentSection 
              getTotalPrice={getTotalPrice}
            />
          </div>
        </div>
        :
        <EmptyBasket />
      }

      <div className={`space-y-12 mt-10 ${basket.length > 0 ? '' : 'max-w-3xl mx-auto'}`}>
        <ItemsGrid 
        title="Top picks for you" 
        products={sample} 
        height="300px" 
        showPrice={true}
        maxWidth="auto"
        />

        <ItemsGrid 
        title="Your recently viewed items" 
        products={JSON.parse(localStorage.getItem("recently-viewed") || "[]")} 
        height="300px" 
        showPrice={true}
        maxWidth="auto"
        />

        {basket.length > 0 &&
          <ItemsGrid 
          title="From your favorites" 
          products={sample} 
          height="300px" 
          showPrice={true}
          maxWidth="auto"
          />
        }
      </div>
    </div>
  )
}

export default BasketPage