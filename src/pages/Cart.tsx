
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        
        <div className="flex flex-col space-y-3 mb-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <img 
                  src={`https://storage.googleapis.com/a1aa/image/${i === 0 ? 'uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc' : 'LnlwQS1ZyTMOjpRlSmrJhnmtKwVhM-SjA1M7b54KSXo'}.jpg`}
                  alt="Product" 
                  className="w-16 h-16 object-contain" 
                />
                <div className="flex-1">
                  <h3 className="font-medium">{i === 0 ? 'Advanced Vitamin C Serum' : 'Natural Herbal Shampoo'}</h3>
                  <p className="text-medishare-green">₹{i === 0 ? '599' : '299'}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md">
                      <button className="px-2 py-1"><Minus size={16} /></button>
                      <span className="px-4">1</span>
                      <button className="px-2 py-1"><Plus size={16} /></button>
                    </div>
                    <button><Trash2 size={18} className="text-gray-400" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>₹898</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Delivery Fee</span>
            <span>₹49</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total</span>
            <span>₹947</span>
          </div>
        </div>
        
        <Button className="w-full bg-medishare-blue hover:bg-medishare-blue/90">Proceed to Checkout</Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Cart;
