
import { useState, useEffect } from 'react';
import { getProductById, getDefaultProduct, Product } from '@/services/productService';

export const useProductData = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // For now we're using the mock data
    const fetchedProduct = productId 
      ? getProductById(productId) 
      : getDefaultProduct();
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      // Fallback to default product if ID not found
      setProduct(getDefaultProduct());
    }
    
    setIsLoading(false);
  }, [productId]);
  
  return { product, isLoading };
};
