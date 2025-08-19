// src/pages/Product.tsx
import React from "react";
import { useRoute } from "wouter";
import { Button } from "../components/ui/button";
import { products } from "../data/products";
import { Star, ShoppingCart, ChevronLeft, Heart } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const ProductPage: React.FC = () => {
  const [match, params] = useRoute("/product/:id");
  const productId = params ? parseInt(params.id) : null;
  const product = products.find((p) => p.id === productId);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart`,
    });
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-gray-600 mt-2">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button className="mt-4" asChild>
          <a href="/">Back to Home</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button variant="link" className="mb-4 pl-0" asChild>
        <a href="/">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
        </a>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border p-4">
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden w-20 h-20"
              >
                <img
                  src={product.image}
                  alt={`Thumbnail ${i}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-4xl font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-gray-500 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="text-green-600 font-semibold">
                  {product.discount && `${product.discount}% OFF`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <Button className="flex-1 py-6" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1 py-6">
              Buy Now
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-bold text-lg mb-3">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Category:</span>{" "}
                <span className="capitalize">{product.category}</span>
              </li>
              <li>
                <span className="font-medium">Brand:</span> {product.brand}
              </li>
              <li>
                <span className="font-medium">Availability:</span> In Stock
              </li>
              <li>
                <span className="font-medium">SKU:</span> {product.sku}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
