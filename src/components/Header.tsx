
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const { totalItems } = useCart();
  
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/87ad8b52-6905-433d-ba0d-877a9c3eb033.png" 
            alt="s2meds" 
            className="h-8 object-contain"
          />
        </Link>
        <div className="flex items-center space-x-2">
          <MapPin className="text-medishare-red" size={20} />
          <div className="font-semibold">Begusarai</div>
        </div>
      </div>
      <div className="flex space-x-4">
        <Link to="/notifications">
          <Bell size={20} />
        </Link>
        <Link to="/cart" className="relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-medishare-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
