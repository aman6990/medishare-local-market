
import React from 'react';
import { CheckCircle, Clock, Package, Truck, Home } from 'lucide-react';

interface OrderTrackingProps {
  status: 'Processing' | 'Shipping' | 'Delivered';
  orderId: number;
  estimatedDelivery: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ status, orderId, estimatedDelivery }) => {
  const isProcessing = status === 'Processing';
  const isShipping = status === 'Shipping';
  const isDelivered = status === 'Delivered';

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500">Order #{orderId}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isProcessing ? 'bg-yellow-100 text-yellow-800' : 
          isShipping ? 'bg-blue-100 text-blue-800' : 
          'bg-green-100 text-green-800'
        }`}>
          {status}
        </span>
      </div>

      <div className="my-4">
        <p className="text-sm text-gray-600">
          {isDelivered ? 'Delivered on:' : 'Estimated delivery by:'} 
          <span className="font-medium"> {estimatedDelivery}</span>
        </p>
      </div>

      <div className="relative pt-2">
        {/* Timeline track */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200 -translate-x-1/2"></div>

        {/* Order placed */}
        <div className="flex mb-6 relative z-10">
          <div className="bg-green-500 text-white rounded-full p-1.5">
            <CheckCircle size={16} />
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium">Order Placed</h4>
            <p className="text-xs text-gray-500">Your order has been placed</p>
          </div>
        </div>

        {/* Processing */}
        <div className="flex mb-6 relative z-10">
          <div className={`${isProcessing ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded-full p-1.5`}>
            {isProcessing ? <Clock size={16} /> : <CheckCircle size={16} />}
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium">Processing Order</h4>
            <p className="text-xs text-gray-500">Your order is being processed</p>
          </div>
        </div>

        {/* Shipped */}
        <div className="flex mb-6 relative z-10">
          <div className={`${isDelivered || isShipping ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full p-1.5`}>
            {isShipping ? <Truck size={16} /> : isDelivered ? <CheckCircle size={16} /> : <Package size={16} />}
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium">Shipped</h4>
            <p className="text-xs text-gray-500">Your order is on the way</p>
          </div>
        </div>

        {/* Delivered */}
        <div className="flex relative z-10">
          <div className={`${isDelivered ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full p-1.5`}>
            {isDelivered ? <CheckCircle size={16} /> : <Home size={16} />}
          </div>
          <div className="ml-4">
            <h4 className="text-sm font-medium">Delivered</h4>
            <p className="text-xs text-gray-500">
              {isDelivered ? 'Your order has been delivered' : 'Waiting for delivery'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
