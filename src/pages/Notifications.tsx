
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
        
        <div className="flex flex-col space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Bell className="text-medishare-blue mt-1" size={20} />
                <div>
                  <h3 className="font-medium">Offer Alert!</h3>
                  <p className="text-gray-600 text-sm">Extra 10% off on your favorite products.</p>
                  <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Notifications;
