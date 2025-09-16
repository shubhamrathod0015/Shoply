import { useState, useEffect } from "react";
import type { Product } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const url = category
          ? `${API_URL}/api/products?category=${encodeURIComponent(category)}`
          : `${API_URL}/api/products`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // If backend returns { products: [...] }
        setProducts(Array.isArray(data.products) ? data.products : data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  return { products, loading, error };
}
