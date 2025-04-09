
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ProductBenefitsProps {
  benefits: string[];
}

const ProductBenefits = ({ benefits }: ProductBenefitsProps) => {
  return (
    <div className="p-4 bg-white mt-2 rounded-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h2>
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-medishare-green mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBenefits;
