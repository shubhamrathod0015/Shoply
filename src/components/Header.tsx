import { Link } from "wouter";
import { ShoppingCart, Store } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const Header = () => {
    const { items } = useCartStore();
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <Store className="h-7 w-7 text-blue-600" />
                    <span>Shoply</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-md font-medium text-gray-600">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-blue-600 transition-colors">All Products</Link>
                </nav>
                <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="h-6 w-6 text-gray-700" />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
};

export default Header;