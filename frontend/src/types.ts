export type CartItemId = string | number;

export interface Review {
  // reviewer: string;
  // comment: string;
  // rating: number;
  user?: string; // user id or name
  rating: number;
  comment: string;
  // ...other review fields if needed
}

export interface Product {
  brand?: string;
  sku?: string;
  id?: CartItemId;
  _id?: string;
  title?: string;
  name?: string;
  discount?: number;
  oldPrice?: number;
  reviews?: Review[] | number; // can be array or number
  price: number;
  description: string;
  category: string | { _id?: string; name?: string };
  image: string;
  rating?: number | { rate: number; count: number };
  stock?: number; // default: 0 means out of stock
}

export interface CartItem extends Product {
  id: CartItemId; // Ensure id is always string | number for cart items
  quantity: number;
}
