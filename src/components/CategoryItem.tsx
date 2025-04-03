
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryItemProps {
  icon: LucideIcon;
  name: string;
  discount: string;
}

const CategoryItem = ({ icon: Icon, name, discount }: CategoryItemProps) => {
  return (
    <div className="bg-white rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-shadow">
      <Icon className="mx-auto text-3xl text-gray-800" size={28} />
      <p className="text-gray-800 mt-2 text-sm">{name}</p>
      <p className="text-medishare-green text-xs">{discount}</p>
    </div>
  );
};

export default CategoryItem;
