// src/components/Navbar.tsx
import React from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

const Navbar: React.FC = () => {
  const categories = ["electronics", "clothing", "books", "home"];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="link" className="text-xl font-bold px-0">
                Shoply
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex space-x-2">
            {categories.map((category) => (
              <Link key={category} href={`/category/${category}`}>
                <Button variant="ghost" className="capitalize">
                  {category}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
