
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface PromoBannerProps {
  title: string;
  description: string;
  discount: string;
  buttonText: string;
  imageUrl: string;
  backgroundColor: string;
  textColor: string;
  buttonVariant?: 'default' | 'outline';
  icon?: LucideIcon;
}

const PromoBanner = ({
  title,
  description,
  discount,
  buttonText,
  imageUrl,
  backgroundColor,
  textColor,
  buttonVariant = 'default',
  icon: Icon
}: PromoBannerProps) => {
  return (
    <div className={`${backgroundColor} rounded-lg p-4 flex items-center`}>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          {Icon && <Icon size={20} className={textColor} />}
          <h2 className={`${textColor} font-semibold`}>{title}</h2>
        </div>
        <p className="text-gray-600">{description}</p>
        <div className={`${textColor} text-2xl font-bold mt-2`}>{discount}</div>
        <Button 
          variant={buttonVariant} 
          className={buttonVariant === 'outline' ? 'mt-2 border-medishare-blue text-medishare-blue' : 'mt-2 bg-black text-white'}
        >
          {buttonText}
        </Button>
      </div>
      <img src={imageUrl} alt={title} className="w-24 h-24 object-cover" />
    </div>
  );
};

export default PromoBanner;
