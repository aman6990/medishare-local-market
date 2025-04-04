
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Phone, MessageCircle, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link to="/account" className="mr-2">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-semibold">Contact Us</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
          <h2 className="text-lg font-medium mb-4">Get in touch with us</h2>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleCall} 
              className="flex items-center justify-start h-14 bg-green-500 hover:bg-green-600"
            >
              <Phone size={20} className="mr-3" />
              <div className="text-left">
                <div className="font-medium">Call us</div>
                <div className="text-xs">9AM - 9PM, All days</div>
              </div>
            </Button>
            
            <Link to="/chat" className="w-full">
              <Button 
                className="flex items-center justify-start h-14 w-full bg-medishare-blue hover:bg-medishare-blue/90"
              >
                <MessageCircle size={20} className="mr-3" />
                <div className="text-left">
                  <div className="font-medium">Chat with us</div>
                  <div className="text-xs">Available 24/7</div>
                </div>
              </Button>
            </Link>
            
            <a href="mailto:support@medishare.com" className="w-full">
              <Button 
                variant="outline" 
                className="flex items-center justify-start h-14 w-full border-gray-300"
              >
                <Mail size={20} className="mr-3 text-gray-700" />
                <div className="text-left text-gray-700">
                  <div className="font-medium">Email us</div>
                  <div className="text-xs">We'll respond within 24 hours</div>
                </div>
              </Button>
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-medium mb-2">Frequently Asked Questions</h2>
          <div className="text-gray-500 text-sm mb-3">
            Find answers to common questions about our services
          </div>
          <Link to="/help" className="text-medishare-blue font-medium text-sm flex items-center">
            View all FAQs <span className="ml-1">›</span>
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Contact;
