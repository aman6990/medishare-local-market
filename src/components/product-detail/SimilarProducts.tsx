
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SimilarProducts = () => {
  return (
    <div className="mt-4 p-4 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Similar Products</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <img 
              src="https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg" 
              alt="Similar Product" 
              className="h-24 w-24 object-contain mx-auto"
            />
            <h3 className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">Becosules Capsule</h3>
            <p className="text-medishare-green text-sm">Up to 10% off</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <img 
              src="https://storage.googleapis.com/a1aa/image/_wlXESmp3g1kAOv4k64CHcYqjQ8joqMdzxQJ0Ois7L8.jpg" 
              alt="Similar Product" 
              className="h-24 w-24 object-contain mx-auto"
            />
            <h3 className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">B-Complex Tablets</h3>
            <p className="text-medishare-green text-sm">Up to 15% off</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimilarProducts;
