const mobileProducts = [

  {
    id: "MOB001",
    name: "iPhone 16 Pro",
    brand: "iPhone",
    category: "mobiles",
    condition: "Seal Pack",
    price: 99999,
    oldPrice: 109999,
    discount: "9% OFF",
    rating: 4.8,
    reviews: 126,
    images: [
      "images/iphone.png",
      "images/iphone.png",
      "images/iphone.png"
    ],
    storage: "256GB",
    ram: "8GB",
    warranty: "1 Year",
    description: "Premium seal-pack iPhone with powerful performance and advanced camera system.",
    variants: [
      { label: '8GB + 128GB', price: 89999, oldPrice: 99999, storage: '128GB', ram: '8GB' },
      { label: '8GB + 256GB', price: 99999, oldPrice: 109999, storage: '256GB', ram: '8GB' },
      { label: '8GB + 512GB', price: 119999, oldPrice: 129999, storage: '512GB', ram: '8GB' }
    ]
  },

  {
    id: "MOB002",
    name: "iPhone 15",
    brand: "iPhone",
    category: "mobiles",
    condition: "Seal Pack",
    price: 59999,
    oldPrice: 72999,
    discount: "18% OFF",
    rating: 4.7,
    reviews: 220,
    image: "images/iphone.png",
    storage: "128GB",
    ram: "6GB",
    warranty: "1 Year",
    description: "Powerful Apple smartphone with premium design and excellent camera.",
    variants: [
      { label: '6GB + 128GB', price: 59999, oldPrice: 72999, storage: '128GB', ram: '6GB' },
      { label: '6GB + 256GB', price: 67999, oldPrice: 80999, storage: '256GB', ram: '6GB' },
      { label: '6GB + 512GB', price: 79999, oldPrice: 92999, storage: '512GB', ram: '6GB' }
    ]
  },

  {
    id: "MOB003",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    category: "mobiles",
    condition: "Seal Pack",
    price: 72999,
    oldPrice: 89999,
    discount: "19% OFF",
    rating: 4.8,
    reviews: 188,
    image: "images/samsung.png",
    storage: "256GB",
    ram: "12GB",
    warranty: "1 Year",
    description: "Samsung flagship smartphone with S Pen and professional camera system.",
    variants: [
      { label: '12GB + 256GB', price: 72999, oldPrice: 89999, storage: '256GB', ram: '12GB' },
      { label: '12GB + 512GB', price: 82999, oldPrice: 99999, storage: '512GB', ram: '12GB' },
      { label: '12GB + 1TB', price: 99999, oldPrice: 119999, storage: '1TB', ram: '12GB' }
    ]
  },

  {
    id: "MOB004",
    name: "Galaxy S24",
    brand: "Samsung",
    category: "mobiles",
    condition: "2nd Hand",
    price: 49999,
    oldPrice: 63999,
    discount: "22% OFF",
    rating: 4.7,
    reviews: 142,
    image: "images/samsung.png",
    storage: "256GB",
    ram: "8GB",
    warranty: "Store Warranty",
    description: "Clean and carefully tested second-hand Samsung smartphone.",
    variants: [
      { label: '8GB + 128GB', price: 44999, oldPrice: 58999, storage: '128GB', ram: '8GB' },
      { label: '8GB + 256GB', price: 49999, oldPrice: 63999, storage: '256GB', ram: '8GB' },
      { label: '8GB + 512GB', price: 59999, oldPrice: 73999, storage: '512GB', ram: '8GB' }
    ]
  },

  {
    id: "MOB005",
    name: "OnePlus 13",
    brand: "OnePlus",
    category: "mobiles",
    condition: "Seal Pack",
    price: 69999,
    oldPrice: 74999,
    discount: "7% OFF",
    rating: 4.7,
    reviews: 98,
    image: "images/oneplus.png",
    storage: "256GB",
    ram: "12GB",
    warranty: "1 Year",
    description: "High-performance OnePlus flagship with premium display and fast charging.",
    variants: [
      { label: '12GB + 256GB', price: 69999, oldPrice: 74999, storage: '256GB', ram: '12GB' },
      { label: '16GB + 512GB', price: 79999, oldPrice: 84999, storage: '512GB', ram: '16GB' },
      { label: '16GB + 1TB', price: 92999, oldPrice: 98999, storage: '1TB', ram: '16GB' }
    ]
  },

  {
    id: "MOB006",
    name: "Google Pixel 9",
    brand: "Google Pixel",
    category: "mobiles",
    condition: "Seal Pack",
    price: 64999,
    oldPrice: 79999,
    discount: "19% OFF",
    rating: 4.6,
    reviews: 76,
    image: "images/pixel.png",
    storage: "128GB",
    ram: "12GB",
    warranty: "1 Year",
    description: "Google Pixel with advanced AI features and excellent computational photography.",
    variants: [
      { label: '12GB + 128GB', price: 64999, oldPrice: 79999, storage: '128GB', ram: '12GB' },
      { label: '12GB + 256GB', price: 71999, oldPrice: 86999, storage: '256GB', ram: '12GB' },
      { label: '12GB + 512GB', price: 82999, oldPrice: 97999, storage: '512GB', ram: '12GB' }
    ]
  },

  {
    id: "MOB007",
    name: "Vivo X100",
    brand: "Vivo",
    category: "mobiles",
    condition: "2nd Hand",
    price: 38999,
    oldPrice: 54999,
    discount: "29% OFF",
    rating: 4.5,
    reviews: 64,
    image: "images/vivo.png",
    storage: "256GB",
    ram: "12GB",
    warranty: "Store Warranty",
    description: "Professionally tested second-hand Vivo smartphone in excellent condition.",
    variants: [
      { label: '12GB + 256GB', price: 38999, oldPrice: 54999, storage: '256GB', ram: '12GB' },
      { label: '12GB + 512GB', price: 43999, oldPrice: 59999, storage: '512GB', ram: '12GB' },
      { label: '12GB + 1TB', price: 51999, oldPrice: 67999, storage: '1TB', ram: '12GB' }
    ]
  },

  {
    id: "MOB008",
    name: "OPPO Find X8",
    brand: "OPPO",
    category: "mobiles",
    condition: "Seal Pack",
    price: 59999,
    oldPrice: 69999,
    discount: "14% OFF",
    rating: 4.6,
    reviews: 51,
    image: "images/oppo.png",
    storage: "256GB",
    ram: "12GB",
    warranty: "1 Year",
    description: "Premium OPPO smartphone with powerful hardware and advanced cameras.",
    variants: [
      { label: '12GB + 256GB', price: 59999, oldPrice: 69999, storage: '256GB', ram: '12GB' },
      { label: '12GB + 512GB', price: 66999, oldPrice: 76999, storage: '512GB', ram: '12GB' },
      { label: '16GB + 512GB', price: 74999, oldPrice: 84999, storage: '512GB', ram: '16GB' }
    ]
  }

];
