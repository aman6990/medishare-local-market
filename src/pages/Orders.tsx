
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Package, MapPin, Clock, CheckCircle } from 'lucide-react';
import OrderTracking from '@/components/OrderTracking';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DeliveryPersonInfo from '@/components/DeliveryPersonInfo';

const Orders = () => {
  const [openTrackingDialog, setOpenTrackingDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(0);

  const handleTrackOrder = (orderIndex: number) => {
    setSelectedOrder(orderIndex);
    setOpenTrackingDialog(true);
  };

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
                <div className="flex-1">
                  <h3 className="font-medium">{i === 0 ? 'Advanced Vitamin C Serum' : i === 1 ? 'Natural Herbal Shampoo' : 'Health Supplements Bundle'}</h3>
                  <p className="text-gray-500 text-sm">Ordered on: {i === 0 ? 'April 1, 2025' : i === 1 ? 'March 25, 2025' : 'March 30, 2025'}</p>
                  <p className="font-medium">₹{i === 0 ? '599' : i === 1 ? '299' : '1,299'}</p>
                </div>
                <button
                  onClick={() => handleTrackOrder(i)}
                  className="ml-auto px-3 py-1.5 text-sm bg-medishare-blue text-white rounded-md flex items-center gap-1"
                >
                  <MapPin size={14} /> Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={openTrackingDialog} onOpenChange={setOpenTrackingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
          </DialogHeader>
          <OrderTracking 
            status={selectedOrder === 0 ? 'Shipping' : selectedOrder === 1 ? 'Delivered' : 'Processing'} 
            orderId={1000 + selectedOrder}
            estimatedDelivery={selectedOrder === 0 ? 'April 5, 2025' : selectedOrder === 1 ? 'March 27, 2025' : 'April 6, 2025'}
          />
          
          {selectedOrder === 0 && (
            <DeliveryPersonInfo 
              name="Raj Kumar"
              phone="+91 98765 43210"
              gender="Male"
              photo="https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg"
              location={{ lat: 25.4159, lng: 78.3399 }}
              currentDistance="1.5 km away"
              estimatedArrival="15 minutes"
            />
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Orders;
