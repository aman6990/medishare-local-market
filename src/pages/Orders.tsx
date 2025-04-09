
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Package, MapPin, Clock, CheckCircle } from 'lucide-react';
import OrderTracking from '@/components/OrderTracking';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DeliveryPersonInfo from '@/components/DeliveryPersonInfo';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const [openTrackingDialog, setOpenTrackingDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);  // Empty orders array

  const handleTrackOrder = (orderIndex: number) => {
    setSelectedOrder(orderIndex);
    setOpenTrackingDialog(true);
  };

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        
        {orders.length > 0 ? (
          <div className="flex flex-col space-y-3">
            {orders.map((order, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-sm">Order #{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' : 
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className={`${
                    order.status === 'Shipping' ? 'text-blue-500' : 
                    order.status === 'Delivered' ? 'text-green-500' : 
                    'text-yellow-500'}`} />
                  <div className="flex-1">
                    <h3 className="font-medium">{order.name}</h3>
                    <p className="text-gray-500 text-sm">Ordered on: {order.date}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-medium">₹{order.price}</p>
                      {order.status === 'Shipping' && (
                        <span className="text-xs text-medishare-green">Delivery in 60 minutes</span>
                      )}
                    </div>
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
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm text-center">
            <div className="animate-[bounce_2s_ease-in-out_infinite] mb-4">
              <Package size={64} className="text-medishare-blue" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link to="/">
              <Button className="bg-medishare-blue hover:bg-medishare-blue/90 text-white flex items-center gap-2">
                <Package size={18} />
                Order Now
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog open={openTrackingDialog} onOpenChange={setOpenTrackingDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
          </DialogHeader>
          {orders.length > 0 && (
            <>
              <OrderTracking 
                status={orders[selectedOrder]?.status || 'Processing'} 
                orderId={orders[selectedOrder]?.id || 0}
                estimatedDelivery={orders[selectedOrder]?.estimatedDelivery || ''}
              />
              
              {orders[selectedOrder]?.status === 'Shipping' && (
                <DeliveryPersonInfo 
                  name="Raj Kumar"
                  phone="+91 98765 43210"
                  gender="Male"
                  age={28}
                  experience="3+ years"
                  photo="https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Gc.jpg"
                  location={{ lat: 25.4159, lng: 78.3399 }}
                  currentDistance="1.5 km away"
                  estimatedArrival="15 minutes"
                  orderId={String(orders[selectedOrder]?.id || 0)}
                />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Orders;
