
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Bell, Search, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LogoutButton from './LogoutButton';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check current session
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold text-xl text-teal-600">S2Meds</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/notifications" className="text-gray-600 hover:text-teal-600">
              <Bell size={20} />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-teal-600">
              <ShoppingCart size={20} />
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/account" className="text-gray-600 hover:text-teal-600">
                  <User size={20} />
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <Link to="/auth" className="text-gray-600 hover:text-teal-600">
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
