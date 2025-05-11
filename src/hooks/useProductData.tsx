
import { useState, useEffect } from 'react';
import { getProductById, getDefaultProduct, Product } from '@/services/productService';
import { supabase } from '@/integrations/supabase/client';

export const useProductData = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // First check if we have a product in our database
    const fetchProductFromSupabase = async () => {
      if (productId) {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();
            
          if (data && !error) {
            // Convert Supabase product to our Product format
            const supabaseProduct: Product = {
              id: data.id,
              name: data.name,
              manufacturer: data.manufacturer || 'Unknown Manufacturer',
              imageUrl: "/lovable-uploads/26049ee2-384f-47bb-991d-d725f365190b.png", // Default image
              packSize: "Pack of 1",
              mrp: data.price || 0,
              discountPercentage: 0,
              discountedPrice: data.price || 0,
              pricePerUnit: data.price || 0,
              description: data.description || 'No description provided.',
              dosage: data.dosage_instructions || 'As directed by physician.',
              mainBenefits: [(data.description || '').split('.')[0] || 'Product benefits'],
              composition: [{ name: data.ingredients || 'Active ingredients', amount: 'As per label' }],
              storage: 'Store in a cool, dry place away from direct sunlight.'
            };
            
            setProduct(supabaseProduct);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error('Error fetching from Supabase:', err);
        }
      }
      
      // Fallback to mock data if not found in database
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
    };
    
    fetchProductFromSupabase();
    
    // Set up a real-time subscription for product updates
    if (productId) {
      const subscription = supabase
        .channel(`product-${productId}`)
        .on('postgres_changes', 
          { event: 'UPDATE', schema: 'public', table: 'products', filter: `id=eq.${productId}` }, 
          (payload) => {
            console.log('Product updated:', payload);
            // Refresh product data when updated
            fetchProductFromSupabase();
          }
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [productId]);
  
  return { product, isLoading };
};
