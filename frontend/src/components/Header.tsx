import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, Store, User } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { items } = useCartStore();
  const { isAuthenticated, token, logout } = useAuth();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

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

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Store className="h-7 w-7 text-blue-600" />
          <span>Shoply</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-md font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-blue-600 transition-colors"
          >
            All Products
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <nav>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <button
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition"
                    title="Profile"
                  >
                    <User className="w-6 h-6 text-gray-700" />
                  </button>
                </Link>
                {profile && (
                  <span className="text-sm text-gray-700">
                    {profile.name} ({profile.email})
                  </span>
                )}
                <button onClick={logout} className="text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="ml-4">
                  Login
                </Link>
                <Link href="/signup" className="ml-4">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
