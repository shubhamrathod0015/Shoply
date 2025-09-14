import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import type { Product } from "../types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [match, paramsRaw] = useRoute("/product/:id");
  const productId = paramsRaw?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuth();

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
    return <p className="text-center py-10">Loading product details...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error: {error.message}</p>
    );
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white p-8 rounded-lg border flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title || product.name}
            className="max-h-96 object-contain"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            {typeof product.category === "object" && product.category !== null
              ? (product.category as { name?: string }).name ?? ""
              : product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold my-2">
            {product.title || product.name}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <span>⭐ {product.rating?.rate ?? product.rating ?? 0}</span>
            <span>({product.rating?.count ?? 0} reviews)</span>
          </div>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="lg"
              onClick={() => {
                if (product && isAuthenticated) {
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
                  });
                }
              }}
              disabled={!isAuthenticated}
            >
              {isAuthenticated ? (
                "Add to Cart"
              ) : (
                <a href="/login" className="text-blue-600 underline">
                  Login to Add to Cart
                </a>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
