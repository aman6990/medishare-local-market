
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bot, Package, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-2 z-10">
      <Link to="/" className="text-center">
        <Home className={isActive('/') ? 'mx-auto text-medishare-blue' : 'mx-auto text-gray-500'} size={20} />
        <p className={isActive('/') ? 'text-xs text-medishare-blue' : 'text-xs text-gray-500'}>Home</p>
      </Link>
      <Link to="/assistant" className="text-center">
        <Bot className={isActive('/assistant') ? 'mx-auto text-medishare-blue' : 'mx-auto text-gray-500'} size={20} />
        <p className={isActive('/assistant') ? 'text-xs text-medishare-blue' : 'text-xs text-gray-500'}>AI Assistant</p>
      </Link>
      <Link to="/orders" className="text-center">
        <Package className={isActive('/orders') ? 'mx-auto text-medishare-blue' : 'mx-auto text-gray-500'} size={20} />
        <p className={isActive('/orders') ? 'text-xs text-medishare-blue' : 'text-xs text-gray-500'}>My Orders</p>
      </Link>
      <Link to="/account" className="text-center">
        <User className={isActive('/account') ? 'mx-auto text-medishare-blue' : 'mx-auto text-gray-500'} size={20} />
        <p className={isActive('/account') ? 'text-xs text-medishare-blue' : 'text-xs text-gray-500'}>Account</p>
      </Link>
    </div>
  );
};

export default BottomNav;
