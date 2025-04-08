
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

const PromoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<any>(null);
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
      title: "24/7 Medicine Delivery",
      description: "Get your medicines delivered anytime, anywhere",
      discount: "",
      buttonText: "Order now",
      imageUrl: "https://storage.googleapis.com/a1aa/image/photo-1581091226825-a6a2a5aee158.jpg",
      backgroundColor: "bg-medishare-lightblue",
      textColor: "text-gray-800"
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

  // Auto-sliding functionality
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [api]);

  // Update current slide index when slide changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    // Set initial index
    setCurrent(api.selectedScrollSnap());
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-0">
      <div className="relative">
        <Carousel 
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent className="flex">
            {slides.map((slide, index) => (
              <CarouselItem 
                key={index} 
                className="flex-grow basis-full md:basis-1/2 lg:basis-1/2 px-2"
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

      {/* Prescription banner placed below the carousel with no gap */}
      <div className="w-full mt-2">
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
