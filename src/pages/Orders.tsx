
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Package } from 'lucide-react';

const Orders = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        
        <div className="flex flex-col space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Order #{1000 + i}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${i === 0 ? 'bg-blue-100 text-blue-800' : i === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {i === 0 ? 'Shipping' : i === 1 ? 'Delivered' : 'Processing'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Package className={`${i === 0 ? 'text-blue-500' : i === 1 ? 'text-green-500' : 'text-yellow-500'}`} />
                <div>
                  <h3 className="font-medium">{i === 0 ? 'Advanced Vitamin C Serum' : i === 1 ? 'Natural Herbal Shampoo' : 'Health Supplements Bundle'}</h3>
                  <p className="text-gray-500 text-sm">Ordered on: {i === 0 ? 'April 1, 2025' : i === 1 ? 'March 25, 2025' : 'March 30, 2025'}</p>
                  <p className="font-medium">₹{i === 0 ? '599' : i === 1 ? '299' : '1,299'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Orders;
