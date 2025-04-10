
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { User, Settings, Heart, MapPin, Phone, HelpCircle, LogOut, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Account = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-medishare-blue/10 p-3 rounded-full">
                <User size={24} className="text-medishare-blue" />
              </div>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-gray-500 text-sm">+91 9876543210</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
              <Link to="/profile-settings">
                <UserCog size={16} className="text-gray-500" />
                <span>Edit Profile</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Link to="/profile-settings" className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <UserCog size={20} className="text-gray-500" />
              <span>Profile Settings</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          
          <Link to="/account/profile" className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-500" />
              <span>Account Settings</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          
          <Link to="/saved-items" className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Heart size={20} className="text-gray-500" />
              <span>Saved Items</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          
          <Link to="/addresses" className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-500" />
              <span>Saved Addresses</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          
          <Link to="/contact" className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-500" />
              <span>Contact Us</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          
          <Link to="/help" className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-500" />
              <span>Help & Support</span>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          
          <button className="w-full flex items-center gap-3 p-4 text-red-500">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Account;
