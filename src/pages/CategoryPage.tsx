import { useRoute } from 'wouter';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const CategoryPage = () => {
    const [match, params] = useRoute("/category/:name");
    const categoryName = params?.name || '';
    const { products, loading, error } = useProducts(categoryName);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold tracking-tight mb-8 capitalize">{categoryName}</h1>

            {loading && <p className="text-center">Loading products...</p>}
            {error && <p className="text-center text-red-500">Error: {error.message}</p>}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                id: Number(product.id),
                                reviews: Array.isArray(product.reviews) ? product.reviews.length : (product.reviews ?? 0),
                                brand: product.brand ?? '',
                                sku: product.sku ?? ''
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;