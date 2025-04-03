
import React from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, User } from 'lucide-react';

const Assistant = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="p-4 flex-1 flex flex-col">
        <h1 className="text-2xl font-semibold mb-4">AI Assistant</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-1 overflow-y-auto">
          <div className="flex gap-3 mb-4">
            <div className="bg-medishare-blue text-white p-2 rounded-full">
              <Bot size={20} />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p>Hello! I'm your MediShare assistant. How can I help you today?</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mb-4">
            <div className="bg-medishare-blue/10 p-3 rounded-lg max-w-[80%]">
              <p>I need help finding vitamins for immunity.</p>
            </div>
            <div className="bg-gray-200 p-2 rounded-full">
              <User size={20} />
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="bg-medishare-blue text-white p-2 rounded-full">
              <Bot size={20} />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p>I'd recommend Vitamin C, Vitamin D, and Zinc supplements for immunity. Would you like me to show you some options we have available?</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button>
            <Send size={18} />
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Assistant;
