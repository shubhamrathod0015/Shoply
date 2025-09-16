import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import type { Product } from "../types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [, paramsRaw] = useRoute("/product/:id");
  const productId = paramsRaw?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!productId || productId === "undefined") {
      setError(new Error("Invalid product id"));
      setLoading(false);
      return;
    }
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/api/products/${encodeURIComponent(productId ?? "")}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <p className="text-center py-10 text-lg">Loading product details...</p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error: {error.message}</p>
    );
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  // Helper for rating
  const getRating = (rating: Product["rating"]) => {
    if (typeof rating === "object" && rating !== null) return rating.rate;
    if (typeof rating === "number") return rating;
    return 0;
  };
  const getReviewCount = (rating: Product["rating"]) => {
    if (typeof rating === "object" && rating !== null) return rating.count;
    return Array.isArray(product.reviews) ? product.reviews.length : 0;
  };
  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const isNew =
    !product.reviews ||
    (Array.isArray(product.reviews) && product.reviews.length === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white p-8 rounded-lg border flex items-center justify-center shadow">
          <img
            src={product.image}
            alt={product.title || product.name}
            className="max-h-96 object-contain rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          {isNew && (
            <span className="mb-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">
              New
            </span>
          )}
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
            {typeof product.category === "object" && product.category !== null
              ? (product.category as { name?: string }).name ?? ""
              : product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold my-2">
            {product.title || product.name}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span>⭐ {getRating(product.rating)}</span>
            <span>({getReviewCount(product.rating)} reviews)</span>
            <span
              className={`ml-2 text-xs px-2 py-1 rounded ${
                outOfStock
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {outOfStock ? "Out of Stock" : `Stock: ${product.stock ?? "N/A"}`}
            </span>
          </div>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-700">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="lg"
              className="shadow"
              onClick={() => {
                if (!isAuthenticated) {
                  setLocation("/login");
                  return;
                }
                addItem({
                  id:
                    product.id ??
                    (product as any)._id ??
                    product.sku ??
                    product.name,
                  title: product.title || product.name || "",
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                } as any);
              }}
              disabled={outOfStock}
            >
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
