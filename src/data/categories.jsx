export const allCategories = [
  {
    name: 'Sale',
    slug: 'sale',
    dropdown: null
  },
  {
    name: 'Women',
    slug: 'women',
    dropdown: {
      sections: [
        {
          title: 'Apparel',
          slug: 'apparel',
          displayTitle: "Women's",
          items: [
            { name: 'New Arrivals', slug: 'new-arrivals' },
            { 
              name: 'Jeans & Denim',
              slug: 'jeans-denim',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Skinny Jeans', slug: 'skinny-jeans' },
                { name: 'Straight Jeans', slug: 'straight-jeans' },
                { name: 'Bootcut Jeans', slug: 'bootcut-jeans' },
                { name: 'Wide Leg Jeans', slug: 'wide-leg-jeans' },
                { name: 'High Waisted Jeans', slug: 'high-waisted-jeans' },
                { name: 'Low Rise Jeans', slug: 'low-rise-jeans' },
                { name: 'Distressed Jeans', slug: 'distressed-jeans' },
                { name: 'Dark Wash Jeans', slug: 'dark-wash-jeans' },
                { name: 'Light Wash Jeans', slug: 'light-wash-jeans' },
                { name: 'Black Jeans', slug: 'black-jeans' },
                { name: 'White Jeans', slug: 'white-jeans' },
                { name: 'Colored Jeans', slug: 'colored-jeans' },
                { name: 'Denim Shorts', slug: 'denim-shorts' },
                { name: 'Denim Skirts', slug: 'denim-skirts' },
                { name: 'Denim Jackets', slug: 'denim-jackets' },
                { name: 'Denim Overalls', slug: 'denim-overalls' }
              ]
            },
            { 
              name: 'Dresses & Jumpsuits',
              slug: 'dresses-jumpsuits',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Casual Dresses', slug: 'casual-dresses' },
                { name: 'Party Dresses', slug: 'party-dresses' },
                { name: 'Evening Dresses', slug: 'evening-dresses' },
                { name: 'Maxi Dresses', slug: 'maxi-dresses' },
                { name: 'Mini Dresses', slug: 'mini-dresses' },
                { name: 'Midi Dresses', slug: 'midi-dresses' },
                { name: 'Bodycon Dresses', slug: 'bodycon-dresses' },
                { name: 'A-Line Dresses', slug: 'a-line-dresses' },
                { name: 'Wrap Dresses', slug: 'wrap-dresses' },
                { name: 'Shirt Dresses', slug: 'shirt-dresses' },
                { name: 'Sweater Dresses', slug: 'sweater-dresses' },
                { name: 'T-Shirt Dresses', slug: 't-shirt-dresses' },
                { name: 'Jumpsuits', slug: 'jumpsuits' },
                { name: 'Rompers', slug: 'rompers' },
                { name: 'Playsuits', slug: 'playsuits' }
              ]
            },
            { 
              name: 'Tops',
              slug: 'tops',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'T-Shirts', slug: 't-shirts' },
                { name: 'Tank Tops', slug: 'tank-tops' },
                { name: 'Blouses', slug: 'blouses' },
                { name: 'Crop Tops', slug: 'crop-tops' },
                { name: 'Graphic Tees', slug: 'graphic-tees' },
                { name: 'Basic Tees', slug: 'basic-tees' },
                { name: 'Long Sleeve Tops', slug: 'long-sleeve-tops' },
                { name: 'Off Shoulder Tops', slug: 'off-shoulder-tops' },
                { name: 'Halter Tops', slug: 'halter-tops' },
                { name: 'Tube Tops', slug: 'tube-tops' },
                { name: 'Peplum Tops', slug: 'peplum-tops' },
                { name: 'Button Down Shirts', slug: 'button-down-shirts' },
                { name: 'Polo Shirts', slug: 'polo-shirts' }
              ]
            },
            { 
              name: 'Sweaters & Knits',
              slug: 'sweaters-knits',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Cardigans', slug: 'cardigans' },
                { name: 'Pullovers', slug: 'pullovers' },
                { name: 'Hoodies', slug: 'hoodies' },
                { name: 'Sweatshirts', slug: 'sweatshirts' },
                { name: 'Turtlenecks', slug: 'turtlenecks' },
                { name: 'V-Neck Sweaters', slug: 'v-neck-sweaters' },
                { name: 'Crew Neck Sweaters', slug: 'crew-neck-sweaters' },
                { name: 'Oversized Sweaters', slug: 'oversized-sweaters' },
                { name: 'Cropped Sweaters', slug: 'cropped-sweaters' },
                { name: 'Zip-Up Hoodies', slug: 'zip-up-hoodies' },
                { name: 'Pullover Hoodies', slug: 'pullover-hoodies' }
              ]
            },
            { 
              name: 'Jackets & Coats',
              slug: 'jackets-coats',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Leather Jackets', slug: 'leather-jackets' },
                { name: 'Blazers', slug: 'blazers' },
                { name: 'Denim Jackets', slug: 'denim-jackets' },
                { name: 'Bomber Jackets', slug: 'bomber-jackets' },
                { name: 'Winter Coats', slug: 'winter-coats' },
                { name: 'Trench Coats', slug: 'trench-coats' },
                { name: 'Puffer Jackets', slug: 'puffer-jackets' },
                { name: 'Wool Coats', slug: 'wool-coats' },
                { name: 'Peacoats', slug: 'peacoats' },
                { name: 'Parkas', slug: 'parkas' },
                { name: 'Windbreakers', slug: 'windbreakers' },
                { name: 'Vests', slug: 'vests' }
              ]
            },
            { 
              name: 'Bottoms',
              slug: 'bottoms',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Pants', slug: 'pants' },
                { name: 'Shorts', slug: 'shorts' },
                { name: 'Skirts', slug: 'skirts' },
                { name: 'Leggings', slug: 'leggings' },
                { name: 'Joggers', slug: 'joggers' },
                { name: 'Trousers', slug: 'trousers' },
                { name: 'Capris', slug: 'capris' },
                { name: 'Palazzo Pants', slug: 'palazzo-pants' },
                { name: 'Wide Leg Pants', slug: 'wide-leg-pants' },
                { name: 'Skinny Pants', slug: 'skinny-pants' }
              ]
            },
            { 
              name: 'Activewear',
              slug: 'activewear',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Sports Bras', slug: 'sports-bras' },
                { name: 'Workout Tops', slug: 'workout-tops' },
                { name: 'Yoga Pants', slug: 'yoga-pants' },
                { name: 'Athletic Shorts', slug: 'athletic-shorts' },
                { name: 'Track Suits', slug: 'track-suits' },
                { name: 'Gym Hoodies', slug: 'gym-hoodies' },
                { name: 'Running Gear', slug: 'running-gear' }
              ]
            },
            { 
              name: 'Swimwear',
              slug: 'swimwear',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Bikinis', slug: 'bikinis' },
                { name: 'One Pieces', slug: 'one-pieces' },
                { name: 'Cover Ups', slug: 'cover-ups' },
                { name: 'Swim Shorts', slug: 'swim-shorts' }
              ]
            },
            { 
              name: 'Intimates',
              slug: 'intimates',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Bras', slug: 'bras' },
                { name: 'Panties', slug: 'panties' },
                { name: 'Lingerie Sets', slug: 'lingerie-sets' },
                { name: 'Sleepwear', slug: 'sleepwear' },
                { name: 'Shapewear', slug: 'shapewear' }
              ]
            }
          ]
        },
        {
          title: 'Accessories',
          slug: 'accessories',
          items: [
            { 
              name: 'Handbags',
              slug: 'handbags',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Tote Bags', slug: 'tote-bags' },
                { name: 'Crossbody Bags', slug: 'crossbody-bags' },
                { name: 'Shoulder Bags', slug: 'shoulder-bags' },
                { name: 'Clutches', slug: 'clutches' },
                { name: 'Backpacks', slug: 'backpacks' },
                { name: 'Mini Bags', slug: 'mini-bags' },
                { name: 'Evening Bags', slug: 'evening-bags' },
                { name: 'Hobo Bags', slug: 'hobo-bags' },
                { name: 'Bucket Bags', slug: 'bucket-bags' },
                { name: 'Satchels', slug: 'satchels' },
                { name: 'Messenger Bags', slug: 'messenger-bags' }
              ]
            },
            { 
              name: 'Shoes',
              slug: 'shoes',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Sneakers', slug: 'sneakers' },
                { name: 'Heels', slug: 'heels' },
                { name: 'Flats', slug: 'flats' },
                { name: 'Boots', slug: 'boots' },
                { name: 'Sandals', slug: 'sandals' },
                { name: 'Wedges', slug: 'wedges' },
                { name: 'Loafers', slug: 'loafers' },
                { name: 'Pumps', slug: 'pumps' },
                { name: 'Platform Shoes', slug: 'platform-shoes' },
                { name: 'Athletic Shoes', slug: 'athletic-shoes' }
              ]
            },
            { 
              name: 'Watches',
              slug: 'watches',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Digital Watches', slug: 'digital-watches' },
                { name: 'Analog Watches', slug: 'analog-watches' },
                { name: 'Smart Watches', slug: 'smart-watches' },
                { name: 'Gold Watches', slug: 'gold-watches' },
                { name: 'Silver Watches', slug: 'silver-watches' },
                { name: 'Rose Gold Watches', slug: 'rose-gold-watches' },
                { name: 'Leather Strap', slug: 'leather-strap' },
                { name: 'Metal Bracelet', slug: 'metal-bracelet' }
              ]
            },
            { 
              name: 'Sunglasses',
              slug: 'sunglasses',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Aviator', slug: 'aviator' },
                { name: 'Cat Eye', slug: 'cat-eye' },
                { name: 'Oversized', slug: 'oversized' },
                { name: 'Round', slug: 'round' },
                { name: 'Square', slug: 'square' },
                { name: 'Wayfarer', slug: 'wayfarer' }
              ]
            },
            { name: 'Travel & Tech', slug: 'travel-tech' },
            { 
              name: 'Hats & Scarves',
              slug: 'hats-scarves',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Baseball Caps', slug: 'baseball-caps' },
                { name: 'Beanies', slug: 'beanies' },
                { name: 'Wide Brim Hats', slug: 'wide-brim-hats' },
                { name: 'Silk Scarves', slug: 'silk-scarves' },
                { name: 'Winter Scarves', slug: 'winter-scarves' },
                { name: 'Bandanas', slug: 'bandanas' }
              ]
            },
            { 
              name: 'Jewelry',
              slug: 'jewelry',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Necklaces', slug: 'necklaces' },
                { name: 'Earrings', slug: 'earrings' },
                { name: 'Bracelets', slug: 'bracelets' },
                { name: 'Rings', slug: 'rings' },
                { name: 'Anklets', slug: 'anklets' },
                { name: 'Body Jewelry', slug: 'body-jewelry' }
              ]
            },
            { name: 'Fragrance', slug: 'fragrance' },
            { 
              name: 'Belts',
              slug: 'belts',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Leather Belts', slug: 'leather-belts' },
                { name: 'Chain Belts', slug: 'chain-belts' },
                { name: 'Wide Belts', slug: 'wide-belts' },
                { name: 'Skinny Belts', slug: 'skinny-belts' }
              ]
            },
            { name: 'Home', slug: 'home' }
          ]
        },
        {
          title: 'Featured Shops',
          slug: 'featured-shops',
          items: [
            { name: 'What We Love', slug: 'what-we-love' },
            { name: 'Shades of The Season', slug: 'shades-of-the-season' },
            { name: 'Outfitting', slug: 'outfitting' },
            { name: 'Essentials Shop', slug: 'essentials-shop' },
            { name: 'GUESS Eco', slug: 'guess-eco', className: 'text-green-600' },
            { name: 'Matching Sets', slug: 'matching-sets' },
            { name: 'All Collections', slug: 'all-collections' }
          ]
        }
      ],
      images: [
        {
          src: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Global_Dropdown_YC_10774',
          alt: "Women's clothes"
        },
      ]
    }
  },
  {
    name: 'Handbags',
    slug: 'handbags',
    dropdown: {
      sections: [
        {
          title: 'Shop by Style',
          slug: 'shop-by-style',
          items: [
            { 
              name: 'Tote Bags',
              slug: 'tote-bags',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Large Totes', slug: 'large-totes' },
                { name: 'Medium Totes', slug: 'medium-totes' },
                { name: 'Small Totes', slug: 'small-totes' },
                { name: 'Leather Totes', slug: 'leather-totes' },
                { name: 'Canvas Totes', slug: 'canvas-totes' },
                { name: 'Designer Totes', slug: 'designer-totes' }
              ]
            },
            { 
              name: 'Crossbody Bags',
              slug: 'crossbody-bags',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Mini Crossbody', slug: 'mini-crossbody' },
                { name: 'Medium Crossbody', slug: 'medium-crossbody' },
                { name: 'Camera Bags', slug: 'camera-bags' },
                { name: 'Belt Bags', slug: 'belt-bags' },
                { name: 'Phone Crossbody', slug: 'phone-crossbody' }
              ]
            },
            { 
              name: 'Shoulder Bags',
              slug: 'shoulder-bags',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Hobo Bags', slug: 'hobo-bags' },
                { name: 'Bucket Bags', slug: 'bucket-bags' },
                { name: 'Structured Bags', slug: 'structured-bags' },
                { name: 'Slouchy Bags', slug: 'slouchy-bags' }
              ]
            },
            { 
              name: 'Clutches',
              slug: 'clutches',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Evening Clutches', slug: 'evening-clutches' },
                { name: 'Envelope Clutches', slug: 'envelope-clutches' },
                { name: 'Beaded Clutches', slug: 'beaded-clutches' },
                { name: 'Chain Clutches', slug: 'chain-clutches' }
              ]
            },
            { 
              name: 'Backpacks',
              slug: 'backpacks',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Mini Backpacks', slug: 'mini-backpacks' },
                { name: 'Laptop Backpacks', slug: 'laptop-backpacks' },
                { name: 'Travel Backpacks', slug: 'travel-backpacks' },
                { name: 'Leather Backpacks', slug: 'leather-backpacks' }
              ]
            },
            { 
              name: 'Mini Bags',
              slug: 'mini-bags',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Mini Totes', slug: 'mini-totes' },
                { name: 'Mini Crossbody', slug: 'mini-crossbody' },
                { name: 'Top Handle Minis', slug: 'top-handle-minis' }
              ]
            }
          ]
        },
        {
          title: 'Collections',
          slug: 'collections',
          items: [
            { name: 'New Arrivals', slug: 'new-arrivals' },
            { name: 'Best Sellers', slug: 'best-sellers' },
            { name: 'Sale', slug: 'sale' },
            { name: 'Signature Collection', slug: 'signature-collection' },
            { name: 'Limited Edition', slug: 'limited-edition' }
          ]
        }
      ],
      images: [
        {
          src: 'https://img.guess.com/image/upload/f_auto,q_auto,w_730/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Global_Dropdown_Handbag_10774',
          alt: "Handbags Collection"
        }
      ]
    }
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    dropdown: {
      sections: [
        {
          title: 'Shop by Style',
          slug: 'shop-by-style',
          items: [
            { 
              name: 'Sneakers',
              slug: 'sneakers',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Low Top Sneakers', slug: 'low-top-sneakers' },
                { name: 'High Top Sneakers', slug: 'high-top-sneakers' },
                { name: 'Platform Sneakers', slug: 'platform-sneakers' },
                { name: 'Slip-On Sneakers', slug: 'slip-on-sneakers' },
                { name: 'Running Shoes', slug: 'running-shoes' },
                { name: 'Chunky Sneakers', slug: 'chunky-sneakers' }
              ]
            },
            { 
              name: 'Heels',
              slug: 'heels',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Stilettos', slug: 'stilettos' },
                { name: 'Block Heels', slug: 'block-heels' },
                { name: 'Kitten Heels', slug: 'kitten-heels' },
                { name: 'Platform Heels', slug: 'platform-heels' },
                { name: 'Strappy Heels', slug: 'strappy-heels' }
              ]
            },
            { 
              name: 'Flats',
              slug: 'flats',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Ballet Flats', slug: 'ballet-flats' },
                { name: 'Pointed Flats', slug: 'pointed-flats' },
                { name: 'Loafers', slug: 'loafers' },
                { name: 'Slip-On Flats', slug: 'slip-on-flats' }
              ]
            },
            { 
              name: 'Boots',
              slug: 'boots',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Ankle Boots', slug: 'ankle-boots' },
                { name: 'Knee High Boots', slug: 'knee-high-boots' },
                { name: 'Combat Boots', slug: 'combat-boots' },
                { name: 'Chelsea Boots', slug: 'chelsea-boots' },
                { name: 'Cowboy Boots', slug: 'cowboy-boots' },
                { name: 'Winter Boots', slug: 'winter-boots' }
              ]
            },
            { 
              name: 'Sandals',
              slug: 'sandals',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Flat Sandals', slug: 'flat-sandals' },
                { name: 'Heeled Sandals', slug: 'heeled-sandals' },
                { name: 'Gladiator Sandals', slug: 'gladiator-sandals' },
                { name: 'Slide Sandals', slug: 'slide-sandals' },
                { name: 'Espadrilles', slug: 'espadrilles' }
              ]
            }
          ]
        }
      ],
      images: [
        {
          src: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Global_Dropdown_Shoes_10774',
          alt: "Shoes Collection"
        },
      ]
    }
  },
  {
    name: 'Men',
    slug: 'men',
    dropdown: {
      sections: [
        {
          title: 'Apparel',
          slug: 'apparel',
          displayTitle: "Men's",
          items: [
            { name: 'New Arrivals', slug: 'new-arrivals' },
            { 
              name: 'T-Shirts',
              slug: 't-shirts',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Basic Tees', slug: 'basic-tees' },
                { name: 'Graphic Tees', slug: 'graphic-tees' },
                { name: 'V-Neck Tees', slug: 'v-neck-tees' },
                { name: 'Long Sleeve Tees', slug: 'long-sleeve-tees' },
                { name: 'Polo Shirts', slug: 'polo-shirts' }
              ]
            },
            { 
              name: 'Shirts',
              slug: 'shirts',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Dress Shirts', slug: 'dress-shirts' },
                { name: 'Casual Shirts', slug: 'casual-shirts' },
                { name: 'Flannel Shirts', slug: 'flannel-shirts' },
                { name: 'Denim Shirts', slug: 'denim-shirts' },
                { name: 'Button Down Shirts', slug: 'button-down-shirts' }
              ]
            },
            { 
              name: 'Jeans',
              slug: 'jeans',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Skinny Jeans', slug: 'skinny-jeans' },
                { name: 'Straight Jeans', slug: 'straight-jeans' },
                { name: 'Slim Fit Jeans', slug: 'slim-fit-jeans' },
                { name: 'Relaxed Fit Jeans', slug: 'relaxed-fit-jeans' },
                { name: 'Bootcut Jeans', slug: 'bootcut-jeans' },
                { name: 'Distressed Jeans', slug: 'distressed-jeans' },
                { name: 'Dark Wash Jeans', slug: 'dark-wash-jeans' },
                { name: 'Light Wash Jeans', slug: 'light-wash-jeans' }
              ]
            },
            { 
              name: 'Jackets',
              slug: 'jackets',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Leather Jackets', slug: 'leather-jackets' },
                { name: 'Denim Jackets', slug: 'denim-jackets' },
                { name: 'Bomber Jackets', slug: 'bomber-jackets' },
                { name: 'Blazers', slug: 'blazers' },
                { name: 'Winter Coats', slug: 'winter-coats' },
                { name: 'Windbreakers', slug: 'windbreakers' }
              ]
            },
            { 
              name: 'Activewear',
              slug: 'activewear',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Athletic Shorts', slug: 'athletic-shorts' },
                { name: 'Workout Tops', slug: 'workout-tops' },
                { name: 'Track Suits', slug: 'track-suits' },
                { name: 'Gym Hoodies', slug: 'gym-hoodies' },
                { name: 'Running Gear', slug: 'running-gear' }
              ]
            }
          ]
        },
        {
          title: 'Accessories',
          slug: 'accessories',
          items: [
            { name: 'Shoes', slug: 'shoes', subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Sneakers', slug: 'sneakers' },
                { name: 'Dress Shoes', slug: 'dress-shoes' },
                { name: 'Boots', slug: 'boots' },
                { name: 'Casual Shoes', slug: 'casual-shoes' },
                { name: 'Athletic Shoes', slug: 'athletic-shoes' }
              ]
            },
            { name: 'Watches', slug: 'watches', subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Digital Watches', slug: 'digital-watches' },
                { name: 'Analog Watches', slug: 'analog-watches' },
                { name: 'Smart Watches', slug: 'smart-watches' },
                { name: 'Sports Watches', slug: 'sports-watches' }
              ]
            },
            { name: 'Bags', slug: 'bags', subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Backpacks', slug: 'backpacks' },
                { name: 'Messenger Bags', slug: 'messenger-bags' },
                { name: 'Duffle Bags', slug: 'duffle-bags' },
                { name: 'Briefcases', slug: 'briefcases' }
              ]
            },
            { name: 'Belts', slug: 'belts', subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Leather Belts', slug: 'leather-belts' },
                { name: 'Canvas Belts', slug: 'canvas-belts' },
                { name: 'Dress Belts', slug: 'dress-belts' },
                { name: 'Casual Belts', slug: 'casual-belts' }
              ]
            }
          ]
        }
      ],
      images: [
        {
          src: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Global_Dropdown_Men_10774',
          alt: "Men's Collection"
        }
      ]
    }
  },
  {
    name: 'Marciano',
    slug: 'marciano',
    dropdown: {
      sections: [
        {
          title: 'Women',
          slug: 'women',
          items: [
            { name: 'New Arrivals', slug: 'new-arrivals' },
            { 
              name: 'Dresses & Jumpsuits',
              slug: 'dresses-jumpsuits',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Evening Dresses', slug: 'evening-dresses' },
                { name: 'Cocktail Dresses', slug: 'cocktail-dresses' },
                { name: 'Maxi Dresses', slug: 'maxi-dresses' },
                { name: 'Bodycon Dresses', slug: 'bodycon-dresses' },
                { name: 'Jumpsuits', slug: 'jumpsuits' }
              ]
            },
            { 
              name: 'Tops',
              slug: 'tops',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Blouses', slug: 'blouses' },
                { name: 'Silk Tops', slug: 'silk-tops' },
                { name: 'Lace Tops', slug: 'lace-tops' },
                { name: 'Camisoles', slug: 'camisoles' }
              ]
            },
            { 
              name: 'Bottoms',
              slug: 'bottoms',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Dress Pants', slug: 'dress-pants' },
                { name: 'Skirts', slug: 'skirts' },
                { name: 'Shorts', slug: 'shorts' },
                { name: 'Wide Leg Pants', slug: 'wide-leg-pants' }
              ]
            },
            { 
              name: 'Jackets',
              slug: 'jackets',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Blazers', slug: 'blazers' },
                { name: 'Leather Jackets', slug: 'leather-jackets' },
                { name: 'Evening Jackets', slug: 'evening-jackets' }
              ]
            },
            { name: 'Handbags', slug: 'handbags' },
            { name: 'Accessories', slug: 'accessories' },
            { name: 'Shoes', slug: 'shoes' },
          ]
        },
        {
          title: 'Men',
          slug: 'men',
          items: [
            { 
              name: 'Shirts',
              slug: 'shirts',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Dress Shirts', slug: 'dress-shirts' },
                { name: 'Casual Shirts', slug: 'casual-shirts' },
                { name: 'Polo Shirts', slug: 'polo-shirts' }
              ]
            },
            { 
              name: 'Sweaters',
              slug: 'sweaters',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Cashmere Sweaters', slug: 'cashmere-sweaters' },
                { name: 'Wool Sweaters', slug: 'wool-sweaters' },
                { name: 'Cardigans', slug: 'cardigans' }
              ]
            },
            { 
              name: 'Pants & Shorts',
              slug: 'pants-shorts',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Dress Pants', slug: 'dress-pants' },
                { name: 'Chinos', slug: 'chinos' },
                { name: 'Shorts', slug: 'shorts' }
              ]
            },
            { 
              name: 'Jackets & Coats',
              slug: 'jackets-coats',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Blazers', slug: 'blazers' },
                { name: 'Sport Coats', slug: 'sport-coats' },
                { name: 'Outerwear', slug: 'outerwear' }
              ]
            },
          ]
        }
      ],
      images: [
        {
          src: 'https://img.guess.com/image/upload/f_auto,q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Global_Dropdown_Marciano_10774',
          alt: "Marciano collection"
        }
      ]
    }
  },
  {
    name: 'Guess Jeans',
    slug: 'guess-jeans',
    dropdown: {
      sections: [
        {
          title: 'Women',
          slug: 'women',
          items: [
            { 
              name: 'Tops & Tees',
              slug: 'tops-tees',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Logo Tees', slug: 'logo-tees' },
                { name: 'Basic Tees', slug: 'basic-tees' },
                { name: 'Tank Tops', slug: 'tank-tops' },
                { name: 'Crop Tops', slug: 'crop-tops' }
              ]
            },
            { 
              name: 'Hoodies & Sweaters',
              slug: 'hoodies-sweaters',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Logo Hoodies', slug: 'logo-hoodies' },
                { name: 'Zip-Up Hoodies', slug: 'zip-up-hoodies' },
                { name: 'Sweatshirts', slug: 'sweatshirts' },
                { name: 'Crew Necks', slug: 'crew-necks' }
              ]
            },
            { 
              name: 'Jeans & Pants',
              slug: 'jeans-pants',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Vintage Jeans', slug: 'vintage-jeans' },
                { name: 'High Waisted Jeans', slug: 'high-waisted-jeans' },
                { name: 'Mom Jeans', slug: 'mom-jeans' },
                { name: 'Boyfriend Jeans', slug: 'boyfriend-jeans' },
                { name: 'Joggers', slug: 'joggers' },
                { name: 'Track Pants', slug: 'track-pants' }
              ]
            },
            { 
              name: 'Activewear',
              slug: 'activewear',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Sports Bras', slug: 'sports-bras' },
                { name: 'Leggings', slug: 'leggings' },
                { name: 'Athletic Shorts', slug: 'athletic-shorts' },
                { name: 'Workout Tops', slug: 'workout-tops' }
              ]
            },
            { 
              name: 'Jackets & Coats',
              slug: 'jackets-coats',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Denim Jackets', slug: 'denim-jackets' },
                { name: 'Puffer Jackets', slug: 'puffer-jackets' },
                { name: 'Windbreakers', slug: 'windbreakers' },
                { name: 'Track Jackets', slug: 'track-jackets' }
              ]
            },
            { name: 'Accessories', slug: 'accessories' },
            { name: 'Underwear', slug: 'underwear' },
          ]
        },
        {
          title: 'Men',
          slug: 'men',
          items: [
            { 
              name: 'Tops & Tees',
              slug: 'tops-tees',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Logo Tees', slug: 'logo-tees' },
                { name: 'Basic Tees', slug: 'basic-tees' },
                { name: 'Long Sleeve Tees', slug: 'long-sleeve-tees' },
                { name: 'Tank Tops', slug: 'tank-tops' }
              ]
            },
            { 
              name: 'Hoodies & Sweaters',
              slug: 'hoodies-sweaters',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Logo Hoodies', slug: 'logo-hoodies' },
                { name: 'Zip-Up Hoodies', slug: 'zip-up-hoodies' },
                { name: 'Sweatshirts', slug: 'sweatshirts' },
                { name: 'Crew Necks', slug: 'crew-necks' }
              ]
            },
            { 
              name: 'Jeans & Pants',
              slug: 'jeans-pants',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Vintage Jeans', slug: 'vintage-jeans' },
                { name: 'Slim Fit Jeans', slug: 'slim-fit-jeans' },
                { name: 'Regular Fit Jeans', slug: 'regular-fit-jeans' },
                { name: 'Distressed Jeans', slug: 'distressed-jeans' },
                { name: 'Joggers', slug: 'joggers' },
                { name: 'Track Pants', slug: 'track-pants' }
              ]
            },
            { 
              name: 'Activewear',
              slug: 'activewear',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Athletic Shorts', slug: 'athletic-shorts' },
                { name: 'Workout Tops', slug: 'workout-tops' },
                { name: 'Track Suits', slug: 'track-suits' },
                { name: 'Gym Hoodies', slug: 'gym-hoodies' }
              ]
            },
            { 
              name: 'Jackets & Coats',
              slug: 'jackets-coats',
              subcategories: [
                { name: 'View All', slug: 'view-all', isViewAll: true },
                { name: 'Denim Jackets', slug: 'denim-jackets' },
                { name: 'Puffer Jackets', slug: 'puffer-jackets' },
                { name: 'Windbreakers', slug: 'windbreakers' },
                { name: 'Track Jackets', slug: 'track-jackets' }
              ]
            },
            { name: 'Accessories', slug: 'accessories' },
            { name: 'Underwear', slug: 'underwear' },
          ]
        },
        {
          title: 'Discover',
          slug: 'discover',
          items: [
            { name: 'Sustainability', slug: 'sustainability' },
            { name: 'AirWash', slug: 'airwash' },
            { name: 'GUESS Originals', slug: 'guess-originals' },
            { name: 'Festival Shop', slug: 'festival-shop' },
            { name: 'Vintage Collection', slug: 'vintage-collection' },
            { name: 'Limited Edition', slug: 'limited-edition' }
          ]
        }
      ],
      images: [
        {
          src: 'https://img.guess.com/image/upload/q_auto,f_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Global_Dropdown_GJ_10774',
          alt: "Guess Jeans Collection"
        }
      ]
    }
  }
]