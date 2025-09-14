import { Link, useLocation } from "wouter";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const { isAuthenticated, token } = useAuth();
  const [, setLocation] = useLocation();
  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  const [profile, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetch(`${API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setProfile({ name: data.name, email: data.email });
        })
        .catch(() => setProfile(null));
    } else {
      setProfile(null);
    }
  }, [isAuthenticated, token]);

  const getProductId = (product: any) =>
    product.id ?? product._id ?? product.sku ?? product.name;

  // Handler for protected navigation
  const handleProtectedNav = (path: string) => {
    if (!isAuthenticated) {
      setLocation("/login");
    } else {
      setLocation(path);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg">
        <div className="grid md:grid-cols-2 items-center gap-8 p-8 md:p-12">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              Welcome to <span className="text-blue-700">Shoply</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover the latest trends and unbeatable prices. Shop quality
              products delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => handleProtectedNav("/products")}>
                Shop All Products <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleProtectedNav("/cart")}
              >
                View Cart
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <img
              src="https://placehold.co/500x400/E0E7FF/4F46E5?text=Shoply"
              alt="A collection of featured products"
              className="rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section aria-labelledby="featured-products-heading">
        <div className="flex justify-between items-center mb-6">
          <h2
            id="featured-products-heading"
            className="text-3xl font-bold tracking-tight"
          >
            Featured Products
          </h2>
          <Button
            variant="link"
            className="text-base text-blue-600"
            onClick={() => handleProtectedNav("/products")}
          >
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length === 0 ? (
              <p className="text-gray-500 col-span-full">No products found.</p>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={getProductId(product)} product={product} />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
