// src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'wouter';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
          <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`}>
            <Button size="sm" className="mt-2">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;