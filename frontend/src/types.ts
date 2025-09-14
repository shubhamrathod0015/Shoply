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
  id?: string | number;
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
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
