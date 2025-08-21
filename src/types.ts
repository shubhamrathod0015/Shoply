export interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}

export interface Product {
  brand: string;
  sku: string;

  id: string;
  title: string;
  name: string;
  discount?: number;
  oldPrice?: number;
  reviews: Review[];
    price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
