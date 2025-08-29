import BasketItem from './BasketItem';

const BasketGrid  = ({basket, setBasket}) => {
  
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
  ];

  const handleQuantityChange = (productId, newQuantity) => {
    setBasket(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (productId) => {setBasket(prevItems => prevItems.filter(item => item.id !== productId))}

  const handleMoveToFavorites = (productId) => {
    console.log(`Move to favorites:`, productId);
    handleRemove(productId);
  }  

  return (
    <div className="max-w-6xl mx-auto mt-8 mb-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {basket.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">Your basket is empty</p>
          </div>
        ) : (
          basket.map(item => {
            const product = sample.find(p => p.id === item.id);
            return product ? (
              <BasketItem
                key={item.id}
                product={product}
                initialQuantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                onMoveToFavorites={handleMoveToFavorites}
              />
            ) : null;
          })
        )}
      </div>
    </div>
  );
};

export default BasketGrid;