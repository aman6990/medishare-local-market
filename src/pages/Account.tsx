
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import LogoutButton from '@/components/LogoutButton';
import { User, Heart, MapPin, Phone, HelpCircle, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Account = () => {
  const { user } = useAuth();
  const email = user?.email || '';
  const name = email.split('@')[0] || 'User';

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4 pt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-medishare-blue/10 p-3 rounded-full">
                <User size={24} className="text-medishare-blue" />
              </div>
              <div>
                <h2 className="font-semibold">{name}</h2>
                <p className="text-gray-500 text-sm">{email}</p>
              </div>
            </div>
            <Link to="/profile-settings">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit size={16} />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          
          <div className="w-full p-4">
            <LogoutButton />
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Account;
