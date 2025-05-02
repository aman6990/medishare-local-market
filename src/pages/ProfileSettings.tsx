
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Save, X, Check, Bell, Language } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would come from a user context or API
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+91 9876543210',
    language: 'english',
    notifications: {
      offers: true,
      orderUpdates: true,
      newsletter: false,
    }
  });
  
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [verificationStep, setVerificationStep] = useState("send"); // "send" or "verify"
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleLanguageChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      language: value
    }));
  };

  const handlePhoneChange = () => {
    setNewPhone(formData.phone);
    setVerificationStep("send");
    setShowOtpDialog(true);
  };

  const handleSendOtp = () => {
    // In a real app, this would send an OTP to the user's phone
    setVerificationStep("verify");
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your mobile number",
    });
  };

  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP with an API
    if (otp === "1234") { // Dummy check, in a real app this would be verified with backend
      setFormData(prev => ({
        ...prev,
        phone: newPhone
      }));
      setShowOtpDialog(false);
      toast({
        title: "Phone number verified",
        description: "Your phone number has been updated successfully",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    navigate('/account');
  };

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link to="/account" className="mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">Profile Settings</h1>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handlePhoneChange} size="sm">
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Phone number verification required for changes</p>
              </div>
              
              <Button type="submit" onClick={handleSubmit} className="w-full flex justify-center items-center gap-2">
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="language" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              <div className="flex items-center space-x-4">
                <Language size={24} className="text-medishare-blue" />
                <div className="flex-1">
                  <h3 className="font-medium">Select Language</h3>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                </div>
              </div>
              
              <Select value={formData.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button type="submit" onClick={handleSubmit} className="w-full flex justify-center items-center gap-2">
                <Save size={16} />
                Save Language Preference
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <Bell size={24} className="text-medishare-blue" />
                <div>
                  <h3 className="font-medium">Notification Preferences</h3>
                  <p className="text-sm text-gray-500">Manage your notification settings</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Offers & Promotions</h4>
                    <p className="text-sm text-gray-500">Receive notifications about offers and discounts</p>
                  </div>
                  <Switch 
                    checked={formData.notifications.offers} 
                    onCheckedChange={(checked) => handleNotificationChange('offers', checked)} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Order Updates</h4>
                    <p className="text-sm text-gray-500">Get notified about your order status</p>
                  </div>
                  <Switch 
                    checked={formData.notifications.orderUpdates} 
                    onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Newsletter</h4>
                    <p className="text-sm text-gray-500">Receive our weekly newsletter with health tips</p>
                  </div>
                  <Switch 
                    checked={formData.notifications.newsletter} 
                    onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)} 
                  />
                </div>
              </div>
              
              <Button type="submit" onClick={handleSubmit} className="w-full flex justify-center items-center gap-2">
                <Save size={16} />
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mobile Verification</DialogTitle>
            <DialogDescription>
              {verificationStep === "send" 
                ? "Please confirm your phone number to receive a verification code."
                : "Enter the verification code sent to your mobile."
              }
            </DialogDescription>
          </DialogHeader>
          
          {verificationStep === "send" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="verify-phone">Phone Number</Label>
                <Input 
                  id="verify-phone" 
                  value={newPhone} 
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowOtpDialog(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSendOtp}>
                  Send OTP
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="flex justify-center py-4">
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-center text-sm text-gray-500">
                Didn't receive code? <button onClick={handleSendOtp} className="text-primary hover:underline">Resend</button>
              </p>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowOtpDialog(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleVerifyOtp}>
                  Verify
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </div>
  );
};

export default ProfileSettings;
