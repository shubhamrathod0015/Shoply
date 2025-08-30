import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import type { Product } from '../types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

const ProductDetailPage = () => {
    const [match, params] = useRoute("/product/:id");
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const { addItem } = useCartStore();

    useEffect(() => {
        if (params?.id) {
            async function fetchProduct() {
                try {
                    setLoading(true);
                    const response = await fetch(`https://fakestoreapi.com/products/${params!.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch product');
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (err) {
                    setError(err instanceof Error ? err : new Error('An unknown error occurred'));
                } finally {
                    setLoading(false);
                }
            }
            fetchProduct();
        }
    }, [params?.id]);

    if (loading) return <p className="text-center py-10">Loading product details...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;
    if (!product) return <p className="text-center py-10">Product not found.</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white p-8 rounded-lg border flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{product.category}</span>
                    <h1 className="text-3xl md:text-4xl font-bold my-2">{product.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <span>⭐ {product.rating.rate}</span>
                        <span>({product.rating.count} reviews)</span>
                    </div>
                    <p className="text-gray-700 text-lg mb-6">{product.description}</p>
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                        <Button size="lg" onClick={() => addItem(product)}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;