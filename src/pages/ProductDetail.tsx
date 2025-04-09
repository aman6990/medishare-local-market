
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductBenefits from '@/components/product-detail/ProductBenefits';
import ProductDetails from '@/components/product-detail/ProductDetails';
import SimilarProducts from '@/components/product-detail/SimilarProducts';
import UsageInstructions from '@/components/product-detail/UsageInstructions';
import { useProductData } from '@/hooks/useProductData';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, isLoading } = useProductData(id);
  
  // Show loading state if product data isn't ready
  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medishare-blue"></div>
      </div>
    );
  }
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      
      <ProductImageGallery imageUrl={product.imageUrl} name={product.name} />
      
      <ProductInfo
        id={product.id}
        name={product.name}
        manufacturer={product.manufacturer}
        packSize={product.packSize}
        mrp={product.mrp}
        discountPercentage={product.discountPercentage}
        discountedPrice={product.discountedPrice}
        pricePerUnit={product.pricePerUnit}
        imageUrl={product.imageUrl}
      />
      
      <ProductBenefits benefits={product.mainBenefits} />
      
      <ProductDetails
        composition={product.composition}
        storage={product.storage}
        description={product.description}
        dosage={product.dosage}
      />
      
      <SimilarProducts />
      
      <UsageInstructions />
      
      <BottomNav />
    </div>
  );
};

export default ProductDetail;
