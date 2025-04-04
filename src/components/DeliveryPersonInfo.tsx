
import React, { useEffect, useRef } from 'react';
import { PhoneCall, User, MapPin, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface DeliveryPersonInfoProps {
  name: string;
  phone: string;
  gender: string;
  photo: string;
  location: {
    lat: number;
    lng: number;
  };
  currentDistance: string;
  estimatedArrival: string;
}

const DeliveryPersonInfo: React.FC<DeliveryPersonInfoProps> = ({
  name,
  phone,
  gender,
  photo,
  location,
  currentDistance,
  estimatedArrival
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (mapRef.current) {
      // Here would be the map integration code
      // For now, we're just showing a placeholder map with delivery location
      const mapDiv = mapRef.current;
      mapDiv.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gray-200 rounded-lg">
          <div class="text-center">
            <MapPin class="mx-auto text-medishare-red" size={24} />
            <p class="text-sm text-gray-700">Map showing delivery location at coordinates:</p>
            <p class="text-xs text-gray-500">Lat: ${location.lat}, Lng: ${location.lng}</p>
          </div>
        </div>
      `;
    }
  }, [location]);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-3">Delivery Person</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-14 w-14 border border-gray-200">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{name}</h4>
            <div className="flex items-center gap-2">
              <User size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">{gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">{phone}</span>
            </div>
          </div>
          <button className="ml-auto bg-medishare-blue text-white rounded-full p-2">
            <PhoneCall size={18} />
          </button>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-medishare-blue" />
            <span className="text-sm">{currentDistance}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-medishare-blue" />
            <span className="text-sm">Arrives in {estimatedArrival}</span>
          </div>
        </div>
        
        <div ref={mapRef} className="h-[150px] w-full rounded-lg overflow-hidden">
          {/* Map will be rendered here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryPersonInfo;
