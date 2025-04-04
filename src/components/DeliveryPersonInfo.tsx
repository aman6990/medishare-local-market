
import React, { useEffect, useRef, useState } from 'react';
import { PhoneCall, User, MapPin, Clock, Calendar, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface DeliveryPersonInfoProps {
  name: string;
  phone: string;
  gender: string;
  photo: string;
  age?: number;
  experience?: string;
  location: {
    lat: number;
    lng: number;
  };
  currentDistance: string;
  estimatedArrival: string;
  orderId?: string;
}

const DeliveryPersonInfo: React.FC<DeliveryPersonInfoProps> = ({
  name,
  phone,
  gender,
  photo,
  age,
  experience,
  location,
  currentDistance,
  estimatedArrival,
  orderId
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  
  // For demo purposes. In a real app, this would be securely loaded from environment or API
  const handleTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  useEffect(() => {
    if (mapRef.current) {
      if (mapboxToken) {
        // If there's a mapbox token, attempt to load the real map
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js';
        script.async = true;
        
        script.onload = () => {
          // @ts-ignore - mapboxgl is loaded from the script
          mapboxgl.accessToken = mapboxToken;
          
          // @ts-ignore
          const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [location.lng, location.lat],
            zoom: 14
          });
          
          // @ts-ignore
          new mapboxgl.Marker({ color: '#2563eb' })
            .setLngLat([location.lng, location.lat])
            .addTo(map);

          // Add the user's location (assuming it's 1.5km away in a north direction)
          const userLat = location.lat + 0.013; // Roughly 1.5km north
          const userLng = location.lng;
          
          // @ts-ignore
          new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([userLng, userLat])
            .addTo(map);
          
          // Add CSS for mapbox
          const mapboxCSS = document.createElement('link');
          mapboxCSS.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
          mapboxCSS.rel = 'stylesheet';
          document.head.appendChild(mapboxCSS);
        };
        
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script);
        };
      } else {
        // Fallback to placeholder map
        const mapDiv = mapRef.current;
        mapDiv.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full bg-gray-200 rounded-lg">
            <div class="text-center p-4">
              <MapPin class="mx-auto text-medishare-red" size={24} />
              <p class="text-sm text-gray-700 font-medium mb-2">Delivery Location</p>
              <p class="text-xs text-gray-600">Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}</p>
              <p class="text-xs text-gray-500 mt-4">For actual map integration, enter your Mapbox token below</p>
            </div>
          </div>
        `;
      }
    }
  }, [location, mapboxToken]);

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Delivery Person</h3>
          {orderId && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Order #{orderId}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-16 w-16 border border-gray-200">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-base">{name}</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
              <div className="flex items-center gap-1">
                <User size={14} className="text-gray-500" />
                <span className="text-sm text-gray-600">{gender}</span>
              </div>
              {age && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-600">{age} years</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <PhoneCall size={14} className="text-gray-500" />
                <span className="text-sm text-gray-600">{phone}</span>
              </div>
              {experience && (
                <div className="flex items-center gap-1">
                  <Shield size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-600">{experience}</span>
                </div>
              )}
            </div>
          </div>
          <Button size="icon" className="ml-auto bg-medishare-blue hover:bg-blue-600 text-white rounded-full">
            <PhoneCall size={18} />
          </Button>
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
        
        <div ref={mapRef} className="h-[200px] w-full rounded-lg overflow-hidden mb-3">
          {/* Map will be rendered here */}
        </div>
        
        <div className="mt-3">
          <label className="text-xs text-gray-500 block">Enter Mapbox token for live map:</label>
          <input 
            type="text" 
            value={mapboxToken} 
            onChange={handleTokenInput}
            placeholder="pk.eyJ1IjoieW91ci1hY2NvdW50IiwiYSI6InlvdXIta2V5In0.123456789"
            className="mt-1 w-full text-xs p-2 border border-gray-300 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            Get your token at <a href="https://mapbox.com/" className="text-blue-500 underline" target="_blank" rel="noreferrer">mapbox.com</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryPersonInfo;
