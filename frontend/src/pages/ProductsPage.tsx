import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const title = product.title || product.name || "";
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStock = !inStockOnly || (product.stock ?? 0) > 0;
      return matchesSearch && matchesStock;
    });

    switch (sortOrder) {
      case "price-asc":
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "name-asc":
        result.sort((a, b) => {
          const aTitle = a.title || a.name || "";
          const bTitle = b.title || b.name || "";
          return aTitle.localeCompare(bTitle);
        });
        break;
      case "name-desc":
        result.sort((a, b) => {
          const aTitle = a.title || a.name || "";
          const bTitle = b.title || b.name || "";
          return bTitle.localeCompare(aTitle);
        });
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, sortOrder, inStockOnly]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">
        All Products
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg border shadow-sm">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="sortOrder" className="sr-only">
          Sort products
        </label>
        <select
          id="sortOrder"
          className="p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort products"
        >
          <option value="default">Default Sort</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-blue-600"
          />
          In Stock Only
        </label>
      </div>

      {loading && <p className="text-center text-lg">Loading products...</p>}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}
      {!loading &&
        !error &&
        (filteredAndSortedProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id ?? product._id ?? product.sku ?? product.name}
                product={product}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default ProductsPage;
