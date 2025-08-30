// src/data/categories.ts
import { MonitorSmartphone, Shirt, BookOpen, Home } from 'lucide-react';

export const categories = [
  {
    name: 'Electronics',
    href: '/category/electronics',
    icon: MonitorSmartphone,
    colorClasses: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
  },
  {
    name: 'Clothing',
    href: '/category/clothing',
    icon: Shirt,
    colorClasses: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
  },
  {
    name: 'Books',
    href: '/category/books',
    icon: BookOpen,
    colorClasses: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
    },
  },
  {
    name: 'Home & Garden',
    href: '/category/home',
    icon: Home,
    colorClasses: {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
  },
];