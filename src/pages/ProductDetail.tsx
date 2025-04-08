
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { 
  Beaker, 
  ThermometerSnowflake, 
  Info, 
  PackageCheck, 
  ShieldCheck, 
  PlusCircle, 
  MinusCircle,
  CheckCircle2
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  
  // Hardcoded product information for Neurobion Forte
  const product = {
    id: "neurobion-forte",
    name: "Neurobion Forte Tablet 30",
    manufacturer: "Procter & Gamble Hygiene & Healthcare Ltd.",
    imageUrl: "/lovable-uploads/26049ee2-384f-47bb-991d-d725f365190b.png",
    packSize: "Strip of 30 Units",
    mrp: 46.1,
    discountPercentage: 20,
    discountedPrice: 36.88,
    pricePerUnit: 1.54,
    description: "Neurobion Forte is a vitamin B complex supplement that helps relieve tingling, numbness, and weakness due to vitamin B deficiency.",
    dosage: "2 tablets a day or as directed by your physician.",
    mainBenefits: [
      "Helps relieve tingling sensations",
      "Reduces numbness in extremities",
      "Alleviates weakness caused by vitamin B deficiency",
      "Supports nerve health and function"
    ],
    composition: [
      { name: "Calcium Pantothenate", amount: "50 Mg" },
      { name: "Cyanocobalamin", amount: "15 Mcg" },
      { name: "Nicotinamide", amount: "45 Mg" },
      { name: "Pyridoxine Hydrochloride", amount: "3 Mg" },
      { name: "Riboflavin Sodium Phosphate", amount: "10 Mg" },
      { name: "Thiamine Hydrochloride", amount: "10 Mg" }
    ],
    storage: "Store below 30°C in a cool, dry place away from direct sunlight."
  };
  
  // Calculate the actual selling price
  const sellingPrice = product.discountedPrice;
  
  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Function to decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Calculate total price
  const totalPrice = (sellingPrice * quantity).toFixed(2);
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      
      {/* Product Image Section */}
      <div className="bg-white p-4">
        <div className="w-full max-w-md mx-auto">
          <AspectRatio ratio={4/3} className="bg-white rounded-lg">
            <img 
              src={product.imageUrl}
              alt={product.name}
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
      
      {/* Product Information Section */}
      <div className="p-4 bg-white mt-2">
        <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 mt-1">{product.manufacturer}</p>
        
        {/* Pack Size */}
        <div className="mt-4">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
            {product.packSize}
          </span>
        </div>
        
        {/* Pricing Information */}
        <div className="mt-4 flex items-baseline">
          <span className="text-gray-500 line-through text-sm">MRP ₹{product.mrp}</span>
          <span className="ml-2 text-green-600 font-medium">{product.discountPercentage}% OFF</span>
        </div>
        <div className="flex items-baseline mt-1">
          <span className="text-2xl font-bold">₹{product.discountedPrice}</span>
          <span className="text-sm text-gray-500 ml-2">₹{product.pricePerUnit}/Unit</span>
        </div>
        
        {/* Add to Cart Section */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center border rounded-lg">
            <button 
              onClick={decreaseQuantity}
              className="p-2 text-gray-500 hover:text-medishare-blue"
              disabled={quantity <= 1}
            >
              <MinusCircle size={20} />
            </button>
            <span className="px-4 py-2 text-gray-700">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="p-2 text-gray-500 hover:text-medishare-blue"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          <Button className="px-12 py-6 text-lg" onClick={() => console.log('Added to cart')}>
            Add
          </Button>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="p-4 bg-white mt-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h2>
        <div className="space-y-2">
          {product.mainBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-medishare-green mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Product Details Accordion */}
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
                {product.composition.map((item, index) => (
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
              <p className="text-gray-700">{product.storage}</p>
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
              <p className="text-gray-700">{product.description}</p>
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
              <p className="text-gray-700">{product.dosage}</p>
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
      
      {/* Similar Products Section */}
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
      
      {/* Usage Instructions Section */}
      <div className="mt-4 p-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">When to Use</h2>
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-800">For Nerve Pain Relief</h3>
            <p className="text-gray-600 text-sm mt-1">Take as directed by your physician to alleviate nerve pain related to vitamin B deficiency.</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-800">For Neuropathy</h3>
            <p className="text-gray-600 text-sm mt-1">Regular use as prescribed helps manage symptoms of peripheral neuropathy.</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-medium text-gray-800">For Nutritional Support</h3>
            <p className="text-gray-600 text-sm mt-1">Supplementing daily diet to prevent vitamin B deficiency and support overall nerve health.</p>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ProductDetail;
