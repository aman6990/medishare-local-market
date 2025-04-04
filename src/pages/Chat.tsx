
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Chat = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center p-4 bg-white shadow-sm">
        <Link to="/contact" className="mr-2">
          <ArrowLeft size={20} className="text-gray-700" />
        </Link>
        <h1 className="text-lg font-semibold">Chat Support</h1>
      </div>
      
      <div className="flex-grow p-4 flex flex-col justify-center items-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Welcome to MediShare Support</h2>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to help you with any questions or concerns.
          </p>
          <div className="bg-medishare-blue/10 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              Please note that this is a demonstration of the chat interface. In a production app, this would connect to a live chat service.
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Chat;
