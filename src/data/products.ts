import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    category: "electronics",
    image: "/headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    rating: 4.5,
    reviews: 342,
    brand: "SoundMax",
    sku: "HD-2023-BT"
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    category: "clothing",
    image: "/tshirt.jpg",
    description: "Soft, comfortable cotton t-shirt available in multiple colors.",
    rating: 4.2,
    reviews: 187,
    brand: "FashionWear",
    sku: "TS-COT-01"
  },
  {
    id: 3,
    name: "Modern JavaScript Development",
    price: 39.99,
    category: "books",
    image: "/js-book.jpg",
    description: "Comprehensive guide to modern JavaScript, React, and Next.js development.",
    rating: 4.8,
    reviews: 89,
    brand: "TechBooks",
    sku: "BK-JS-2023"
  },
  {
    id: 4,
    name: "Smart Home Assistant",
    price: 79.99,
    category: "electronics",
    image: "/smart-home.jpg",
    description: "Voice-controlled smart home assistant with AI capabilities.",
    rating: 4.3,
    reviews: 231,
    brand: "TechHome",
    sku: "SHA-PRO-2023"
  },
  {
    id: 5,
    name: "Designer Jeans",
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    category: "clothing",
    image: "/jeans.jpg",
    description: "Premium denim jeans with modern fit and style.",
    rating: 4.0,
    reviews: 124,
    brand: "DenimCo",
    sku: "DJ-SLIM-23"
  },
  {
    id: 6,
    name: "Indoor Plant Set",
    price: 49.99,
    category: "home",
    image: "/plants.jpg",
    description: "Set of 3 low-maintenance indoor plants for home decor.",
    rating: 4.6,
    reviews: 76,
    brand: "GreenHome",
    sku: "PL-SET-03"
  },
  {
    id: 7,
    name: "Fitness Tracker Watch",
    price: 99.99,
    category: "electronics",
    image: "/fitness-tracker.jpg",
    description: "Track your steps, heart rate, and sleep patterns with this advanced fitness watch.",
    rating: 4.4,
    reviews: 298,
    brand: "FitTech",
    sku: "FT-ULTRA-2023"
  },
  {
    id: 8,
    name: "Ceramic Cookware Set",
    price: 149.99,
    oldPrice: 199.99,
    discount: 25,
    category: "home",
    image: "/cookware.jpg",
    description: "10-piece ceramic non-stick cookware set for healthy cooking.",
    rating: 4.7,
    reviews: 142,
    brand: "KitchenPro",
    sku: "CK-SET-10"
  }
];