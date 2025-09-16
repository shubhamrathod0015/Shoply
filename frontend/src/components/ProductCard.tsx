import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import type { Product } from "../types";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
}

const getProductId = (product: Product) =>
  product.id ?? (product as any)._id ?? product.sku ?? product.name;

const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCartStore();
  const [, setLocation] = useLocation();

  // Extend Product with quantity for cart items
  type CartItem = Product & { quantity: number };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }
    const item: CartItem = {
      ...product,
      id: getProductId(product),
      title: product.title || product.name || "",
      quantity: 1,
    };
    addItem(item);
  };

  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const isNew =
    !product.reviews ||
    (Array.isArray(product.reviews) && product.reviews.length === 0);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center p-5 border border-gray-100 relative">
      {isNew && (
        <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">
          New
        </span>
      )}
      <Link href={`/product/${getProductId(product)}`}>
        <img
          src={product.image}
          alt={product.title || product.name}
          className="w-32 h-32 object-contain mb-3 rounded-lg hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>
      <Link href={`/product/${getProductId(product)}`}>
        <h3 className="font-semibold text-center text-lg mb-1 hover:text-blue-600 transition-colors cursor-pointer">
          {product.title || product.name}
        </h3>
      </Link>
      <p className="text-gray-500 text-sm mb-2 line-clamp-2 h-10">
        {product.description}
      </p>
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="font-bold text-xl text-blue-700">
          RS- {product.price?.toFixed(2)}
        </span>
        <span
          className={`ml-2 text-xs px-2 py-1 rounded ${
            outOfStock ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
          }`}
        >
          {outOfStock ? "Out of Stock" : `Stock: ${product.stock ?? "N/A"}`}
        </span>
        <Button
          className="ml-2"
          onClick={handleAddToCart}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
