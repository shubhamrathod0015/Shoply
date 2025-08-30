import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const ProductsPage = () => {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortOrder) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        return result;
    }, [products, searchTerm, sortOrder]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold tracking-tight mb-8">All Products</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg border">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-grow p-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor="sortOrder" className="sr-only">
                    Sort products
                </label>
                <select
                    id="sortOrder"
                    className="p-2 border rounded-md bg-white"
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
            </div>

            {loading && <p className="text-center">Loading products...</p>}
            {error && <p className="text-center text-red-500">Error: {error.message}</p>}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;