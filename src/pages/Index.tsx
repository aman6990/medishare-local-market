
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryItem from '@/components/CategoryItem';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import BottomNav from '@/components/BottomNav';
import { Flower2, Scissors, Baby, Pill, Droplet, Dumbbell } from 'lucide-react';
import PromoCarousel from '@/components/PromoCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  manufacturer?: string;
  imageUrl?: string;
  discount?: string;
}

const Index = () => {
  const [newlyAddedProducts, setNewlyAddedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch newly added products (last 7 days)
  useEffect(() => {
    const fetchNewlyAddedProducts = async () => {
      setIsLoading(true);
      // Calculate date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category, description, manufacturer')
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error('Error fetching newly added products:', error);
      } else {
        // Map database products to UI format
        const formattedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          description: product.description,
          manufacturer: product.manufacturer,
          // Use a placeholder image if none provided
          imageUrl: "https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg",
          discount: "New"
        }));
        
        setNewlyAddedProducts(formattedProducts);
      }
      
      setIsLoading(false);
    };

    fetchNewlyAddedProducts();

    // Set up real-time subscription for new products
    const subscription = supabase
      .channel('products-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'products' }, 
        (payload) => {
          console.log('New product added:', payload);
          // Add newly inserted product to the list
          const newProduct = payload.new as any;
          setNewlyAddedProducts(prev => [{
            id: newProduct.id,
            name: newProduct.name,
            category: newProduct.category || 'General',
            description: newProduct.description,
            manufacturer: newProduct.manufacturer,
            imageUrl: "https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg",
            discount: "New"
          }, ...prev.slice(0, 2)]); // Keep only the 3 newest
        }
      )
      .subscribe();

    return () => {
      // Clean up the subscription
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="pt-4 px-4">
        <SearchBar />
      </div>
      
      <div className="px-4 mt-4">
        <PromoCarousel />
      </div>
      
      {/* Featured Product */}
      <div className="px-4 mt-4">
        <SectionHeading title="Featured Product" />
        <Link to="/product/neurobion-forte">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/26049ee2-384f-47bb-991d-d725f365190b.png"
                  alt="Neurobion Forte"
                  className="w-20 h-20 object-contain"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Neurobion Forte Tablet 30</h3>
                  <p className="text-sm text-gray-600">Vitamin B Complex</p>
                  <p className="text-medishare-green mt-1">20% OFF</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="px-4 mt-4">
        <SectionHeading title="Categories" seeAllLink="/categories" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-2">
          <CategoryItem icon={Flower2} name="Skin Care" discount="Up to 50% off" />
          <CategoryItem icon={Scissors} name="Hair Care" discount="Up to 50% off" />
          <CategoryItem icon={Baby} name="Baby and Mom Care" discount="Up to 50% off" />
          <CategoryItem icon={Pill} name="Health Supplements" discount="Up to 30% off" />
          <CategoryItem icon={Droplet} name="Personal Hygiene" discount="Up to 40% off" />
          <CategoryItem icon={Dumbbell} name="Fitness Equipment" discount="Up to 20% off" />
        </div>
      </div>
      
      {/* Newly Added Products Section */}
      <div className="px-4 mt-6">
        <SectionHeading title="Newly Added" seeAllLink="/new-products" />
        <div className="grid grid-cols-3 gap-3 mt-2">
          {isLoading ? (
            <>
              <div className="bg-white rounded-lg p-3 animate-pulse h-32"></div>
              <div className="bg-white rounded-lg p-3 animate-pulse h-32"></div>
              <div className="bg-white rounded-lg p-3 animate-pulse h-32"></div>
            </>
          ) : newlyAddedProducts.length > 0 ? (
            newlyAddedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.imageUrl || "https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg"}
                discount={product.discount || "New"}
              />
            ))
          ) : (
            <>
              <ProductCard
                id="new-product-1"
                name="Advanced Vitamin C Serum"
                imageUrl="https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg"
                discount="Up to 10% off"
              />
              <ProductCard
                id="new-product-2"
                name="Natural Herbal Shampoo"
                imageUrl="https://storage.googleapis.com/a1aa/image/_wlXESmp3g1kAOv4k64CHcYqjQ8joqMdzxQJ0Ois7L8.jpg"
                discount="Up to 15% off"
              />
              <ProductCard
                id="new-product-3"
                name="Baby Care Essentials"
                imageUrl="https://storage.googleapis.com/a1aa/image/G6MocX4gXORoT55bT4ebty3P1i6n8t8PJwOMC0FOY-o.jpg"
                discount="Up to 20% off"
              />
            </>
          )}
        </div>
      </div>
      
      <div className="px-4 mt-6">
        <SectionHeading title="Personal Care" />
        <div className="grid grid-cols-3 gap-3 mt-2">
          <ProductCard
            id="skin-care"
            name="Skin Care Products"
            imageUrl="https://storage.googleapis.com/a1aa/image/yYHCNMi3HT_g0O0ARYXB4TH7zLqusPEsVIvxnHGl9mE.jpg"
            discount="Up to 50% off"
          />
          <ProductCard
            id="hair-care"
            name="Hair Care Products"
            imageUrl="https://storage.googleapis.com/a1aa/image/LnlwQS1ZyTMOjpRlSmrJhnmtKwVhM-SjA1M7b54KSXo.jpg"
            discount="Up to 50% off"
          />
          <ProductCard
            id="baby-care"
            name="Baby and Mom Care"
            imageUrl="https://storage.googleapis.com/a1aa/image/ufwsw1MUzpbNFmrf6WN1Hk0bZ4J_3u5peGfhAmo6Vf8.jpg"
            discount="Up to 50% off"
          />
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
