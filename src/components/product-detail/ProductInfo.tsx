
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductInfoProps {
  id: string;
  name: string;
  manufacturer: string;
  packSize: string;
  mrp: number;
  discountPercentage: number;
  discountedPrice: number;
  pricePerUnit: number;
  imageUrl: string;
}

const ProductInfo = ({ 
  id,
  name, 
  manufacturer, 
  packSize, 
  mrp, 
  discountPercentage, 
  discountedPrice, 
  pricePerUnit,
  imageUrl
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Function to decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to add product to cart
  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      imageUrl,
      price: discountedPrice,
      quantity
    });

    toast({
      title: "Added to Cart",
      description: `${quantity} × ${name} added to your cart`,
      duration: 3000,
    });
  };
  
  return (
    <div className="p-4 bg-white mt-2">
      <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
      <p className="text-gray-600 mt-1">{manufacturer}</p>
      
      {/* Pack Size */}
      <div className="mt-4">
        <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
          {packSize}
        </span>
      </div>
      
      {/* Pricing Information */}
      <div className="mt-4 flex items-baseline">
        <span className="text-gray-500 line-through text-sm">MRP ₹{mrp}</span>
        <span className="ml-2 text-green-600 font-medium">{discountPercentage}% OFF</span>
      </div>
      <div className="flex items-baseline mt-1">
        <span className="text-2xl font-bold">₹{discountedPrice}</span>
        <span className="text-sm text-gray-500 ml-2">₹{pricePerUnit}/Unit</span>
      </div>
      
      {/* Add to Cart Section */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center border rounded-lg">
          <button 
            onClick={decreaseQuantity}
            className="p-2 text-gray-500 hover:text-medishare-blue"
            disabled={quantity <= 1}
          >
            <MinusCircle size={20} />
          </button>
          <span className="px-4 py-2 text-gray-700">{quantity}</span>
          <button 
            onClick={increaseQuantity}
            className="p-2 text-gray-500 hover:text-medishare-blue"
          >
            <PlusCircle size={20} />
          </button>
        </div>
        <Button 
          className="px-12 py-6 text-lg flex items-center gap-2" 
          onClick={handleAddToCart}
        >
          <ShoppingCart size={20} />
          Add
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
