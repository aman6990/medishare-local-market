
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  
  // Calculate delivery fee
  const deliveryFee = cart.length > 0 ? 49 : 0;
  const total = totalPrice + deliveryFee;

  // Handle quantity changes
  const increaseQuantity = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/">
              <Button className="bg-medishare-blue hover:bg-medishare-blue/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.imageUrl}
                      alt={item.name} 
                      className="w-16 h-16 object-contain" 
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-medishare-green">₹{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <button 
                            className="px-2 py-1"
                            onClick={() => decreaseQuantity(item.id, item.quantity)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            className="px-2 py-1"
                            onClick={() => increaseQuantity(item.id, item.quantity)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}>
                          <Trash2 size={18} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full bg-medishare-blue hover:bg-medishare-blue/90">Proceed to Checkout</Button>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Cart;
