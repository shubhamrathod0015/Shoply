import type { Product } from "../types";
import { Link } from "wouter";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden cursor-pointer">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/product/${product.id}`}>
          <CardTitle className="text-lg font-semibold leading-tight h-12 overflow-hidden cursor-pointer hover:text-blue-600">
            {product.title}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold text-gray-800">
          RS- {product.price.toFixed(2)}
        </p>
        <Button onClick={() => addItem(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
