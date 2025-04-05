
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import PromoBanner from './PromoBanner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Clock } from 'lucide-react';

const PromoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  
  const slides = [
    {
      title: "Boost vitality naturally",
      description: "Homeopathy brings gentle and effective care",
      discount: "up to 25% OFF",
      buttonText: "Order now",
      imageUrl: "https://storage.googleapis.com/a1aa/image/8AJiSqF25PyV3ZMzaB_IKgB8F0_3aTZi4xa2LaGHZRw.jpg",
      backgroundColor: "bg-medishare-pink",
      textColor: "text-medishare-red"
    },
    {
      title: "Order with prescription",
      description: "Upload prescription to place your order",
      discount: "",
      buttonText: "Order now",
      imageUrl: "https://storage.googleapis.com/a1aa/image/X-s0oj3Em7ZDn8C42DCbdGGbQtxwe_ORchi2dOJrxi4.jpg",
      backgroundColor: "bg-medishare-lightblue",
      textColor: "text-gray-800",
      buttonVariant: "outline"
    },
    {
      title: "24/7 Medicine Delivery",
      description: "Fast & reliable, anytime you need it",
      discount: "FREE delivery on orders above ₹299",
      buttonText: "Order now",
      imageUrl: "https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg",
      backgroundColor: "bg-medishare-green",
      textColor: "text-gray-800",
      icon: Clock
    }
  ];

  return (
    <div className="relative">
      <Carousel 
        className="w-full" 
        opts={{
          align: "start",
          loop: true,
        }}
        onSelect={(index) => {
          setCurrent(index);
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <PromoBanner
                title={slide.title}
                description={slide.description}
                discount={slide.discount}
                buttonText={slide.buttonText}
                imageUrl={slide.imageUrl}
                backgroundColor={slide.backgroundColor}
                textColor={slide.textColor}
                buttonVariant={slide.buttonVariant as "default" | "outline" | undefined}
                icon={slide.icon}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {!isMobile && (
          <>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </>
        )}
      </Carousel>
      
      {/* Slide indicator */}
      <div className="flex justify-center mt-2 gap-1">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`h-1.5 rounded-full transition-all ${
              index === current % slides.length ? 'w-6 bg-medishare-blue' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
