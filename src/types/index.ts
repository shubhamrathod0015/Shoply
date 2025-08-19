// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  brand: string;
  sku: string;
}