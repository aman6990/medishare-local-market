
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { 
  Beaker, 
  ThermometerSnowflake, 
  Info, 
  PackageCheck, 
  ShieldCheck 
} from 'lucide-react';

interface CompositionItem {
  name: string;
  amount: string;
}

interface ProductDetailsProps {
  composition: CompositionItem[];
  storage: string;
  description: string;
  dosage: string;
}

const ProductDetails = ({ 
  composition, 
  storage, 
  description, 
  dosage 
}: ProductDetailsProps) => {
  return (
    <div className="mt-2 bg-white">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="composition">
          <AccordionTrigger className="px-4 py-3">
            <div className="flex items-center">
              <Beaker className="h-5 w-5 text-medishare-blue mr-3" />
              <span>Composition</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <div className="space-y-2">
              {composition.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700">
                  <span>{item.name}</span>
                  <span>{item.amount}</span>
                </div>
              ))}
            </div>
            <Button variant="link" className="text-medishare-blue p-0 mt-2">
              Show all
            </Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="storage">
          <AccordionTrigger className="px-4 py-3">
            <div className="flex items-center">
              <ThermometerSnowflake className="h-5 w-5 text-medishare-blue mr-3" />
              <span>Storage</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <p className="text-gray-700">{storage}</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="description">
          <AccordionTrigger className="px-4 py-3">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-medishare-blue mr-3" />
              <span>Description</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <p className="text-gray-700">{description}</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="directions">
          <AccordionTrigger className="px-4 py-3">
            <div className="flex items-center">
              <PackageCheck className="h-5 w-5 text-medishare-blue mr-3" />
              <span>Directions for Use</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <p className="text-gray-700">{dosage}</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="safety">
          <AccordionTrigger className="px-4 py-3">
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-medishare-blue mr-3" />
              <span>Safety Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Keep out of reach of children</li>
              <li>Do not exceed the recommended dosage</li>
              <li>Not recommended for pregnant or nursing women without medical consultation</li>
              <li>Consult your doctor if symptoms persist</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductDetails;
