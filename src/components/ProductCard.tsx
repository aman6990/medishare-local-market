
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string;
  discount: string;
}

const ProductCard = ({ id, name, imageUrl, discount }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="bg-white rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-shadow">
        <img src={imageUrl} alt={name} className="mx-auto h-16 w-16 object-contain" />
        <p className="text-gray-800 mt-2 text-sm line-clamp-2">{name}</p>
        <p className="text-medishare-green">{discount}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
