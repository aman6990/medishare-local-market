
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductImageGalleryProps {
  imageUrl: string;
  name: string;
}

const ProductImageGallery = ({ imageUrl, name }: ProductImageGalleryProps) => {
  return (
    <div className="bg-white p-4">
      <div className="w-full max-w-md mx-auto">
        <AspectRatio ratio={4/3} className="bg-white rounded-lg">
          <img 
            src={imageUrl}
            alt={name}
            className="object-contain w-full h-full"
          />
        </AspectRatio>
        
        {/* Image Navigation Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-8 h-2 bg-medishare-blue rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
