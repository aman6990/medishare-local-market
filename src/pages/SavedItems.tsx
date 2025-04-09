
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SavedItems = () => {
  // This would normally pull from a saved items context or API
  const savedItems = [];

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Saved Items</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-lg font-medium mb-2">No saved items yet</h2>
          <p className="text-gray-500 mb-4">Start exploring and save your favorite items</p>
          <Button asChild className="flex items-center">
            <Link to="/">
              Explore Now
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default SavedItems;
