
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import PromoBanner from './PromoBanner';
import { useIsMobile } from '@/hooks/use-mobile';

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
    }
  ];

  const prescriptionBanner = {
    title: "Order with prescription",
    description: "Upload prescription to place your order",
    discount: "",
    buttonText: "Order now",
    imageUrl: "https://storage.googleapis.com/a1aa/image/X-s0oj3Em7ZDn8C42DCbdGGbQtxwe_ORchi2dOJrxi4.jpg",
    backgroundColor: "bg-medishare-lightblue",
    textColor: "text-gray-800",
    buttonVariant: "outline" as const
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Carousel 
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
          }}
          onSelect={(api) => {
            if (api) {
              setCurrent(api.selectedScrollSnap());
            }
          }}
        >
          <CarouselContent className="flex">
            {slides.map((slide, index) => (
              <CarouselItem 
                key={index} 
                className="flex-grow basis-full md:basis-full lg:basis-full px-2"
              >
                <div className="h-full">
                  <PromoBanner
                    title={slide.title}
                    description={slide.description}
                    discount={slide.discount}
                    buttonText={slide.buttonText}
                    imageUrl={slide.imageUrl}
                    backgroundColor={slide.backgroundColor}
                    textColor={slide.textColor}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {!isMobile && slides.length > 1 && (
            <>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </>
          )}
        </Carousel>
        
        {/* Slide indicator - only show if there are multiple slides */}
        {slides.length > 1 && (
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
        )}
      </div>

      {/* Prescription banner placed below the carousel */}
      <div className="w-full">
        <PromoBanner
          title={prescriptionBanner.title}
          description={prescriptionBanner.description}
          discount={prescriptionBanner.discount}
          buttonText={prescriptionBanner.buttonText}
          imageUrl={prescriptionBanner.imageUrl}
          backgroundColor={prescriptionBanner.backgroundColor}
          textColor={prescriptionBanner.textColor}
          buttonVariant={prescriptionBanner.buttonVariant}
        />
      </div>
    </div>
  );
};

export default PromoCarousel;
