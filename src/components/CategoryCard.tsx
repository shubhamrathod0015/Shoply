// src/components/CategoryCard.tsx
import React from 'react';
import { Link } from 'wouter';
import type { LucideProps } from 'lucide-react';

interface CategoryCardProps {
  href: string;
  name: string;
  Icon: React.ElementType<LucideProps>; 
  colorClasses: {
    bg: string;
    text: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ href, name, Icon, colorClasses }) => {
  return (
    <Link href={href}>
      <div className="bg-gray-100 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-white hover:-translate-y-1">
        <div className="text-center">
          <div 
            className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${colorClasses.bg}`}
          >
            <Icon className={`h-8 w-8 ${colorClasses.text}`} />
          </div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;