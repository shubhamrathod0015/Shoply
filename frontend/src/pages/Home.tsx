import { Link } from "wouter";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
// import type { Product } from "../types";

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 4); 

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <section
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl"
        aria-labelledby="hero-heading"
      >
        <div className="grid md:grid-cols-2 items-center gap-8 p-8 md:p-12">
          <div className="max-w-xl">
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight"
            >
              Discover Your Next Favorite Thing
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Shop the latest trends. Quality products, unbeatable prices,
              delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">
                  Shop All Products <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <img
              src="https://placehold.co/500x400/E0E7FF/4F46E5?text=Shoply"
              alt="A collection of featured products"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-products-heading">
        <div className="flex justify-between items-center mb-6">
          <h2
            id="featured-products-heading"
            className="text-3xl font-bold tracking-tight"
          >
            Featured Products
          </h2>
          <Link href="/products">
            <Button variant="link" className="text-base text-blue-600">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
