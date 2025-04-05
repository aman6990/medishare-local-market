
import React from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PromoBanner from '@/components/PromoBanner';
import CategoryItem from '@/components/CategoryItem';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import BottomNav from '@/components/BottomNav';
import { Flower2, Scissors, Baby, Pill, Droplet, Dumbbell } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PromoCarousel from '@/components/PromoCarousel';

const Index = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <SearchBar />
      
      <div className="px-4 mt-4">
        <PromoCarousel />
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
      
      <div className="px-4 mt-6">
        <SectionHeading title="Newly Added" seeAllLink="/new-products" />
        <div className="grid grid-cols-3 gap-3 mt-2">
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
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
