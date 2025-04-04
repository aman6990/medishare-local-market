
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Plus, Check, MapPin, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

type Address = {
  id: string;
  type: string;
  fullAddress: string;
  isActive: boolean;
};

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'Home',
      fullAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      isActive: true,
    },
    {
      id: '2',
      type: 'Work',
      fullAddress: '456 Business Ave, Suite 200, New York, NY 10022',
      isActive: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      type: '',
      fullAddress: '',
    },
  });

  const openAddDialog = () => {
    form.reset({ type: '', fullAddress: '' });
    setEditingAddress(null);
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (address: Address) => {
    form.reset({
      type: address.type,
      fullAddress: address.fullAddress,
    });
    setEditingAddress(address);
    setIsAddDialogOpen(true);
  };

  const handleSubmit = form.handleSubmit((data) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addr, ...data } : addr
      ));
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      });
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        type: data.type,
        fullAddress: data.fullAddress,
        isActive: addresses.length === 0, // First address is active by default
      };
      setAddresses([...addresses, newAddress]);
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      });
    }
    setIsAddDialogOpen(false);
  });

  const setAsActive = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isActive: addr.id === id,
    })));
    toast({
      title: "Active address updated",
      description: "Your active address has been updated.",
    });
  };

  const deleteAddress = (id: string) => {
    // If deleting active address, make the first remaining address active
    const isActive = addresses.find(addr => addr.id === id)?.isActive || false;
    const filteredAddresses = addresses.filter(addr => addr.id !== id);
    
    if (isActive && filteredAddresses.length > 0) {
      filteredAddresses[0].isActive = true;
    }
    
    setAddresses(filteredAddresses);
    toast({
      title: "Address deleted",
      description: "Your address has been removed.",
    });
  };

  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link to="/account" className="mr-2">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-semibold">Saved Addresses</h1>
        </div>

        <Button 
          onClick={openAddDialog}
          className="w-full mb-4 bg-medishare-blue hover:bg-medishare-blue/90"
        >
          <Plus size={18} className="mr-2" />
          Add New Address
        </Button>

        {addresses.length > 0 ? (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${address.isActive ? 'border-l-green-500' : 'border-l-gray-200'}`}
              >
                <div className="flex justify-between mb-1">
                  <div className="font-semibold flex items-center">
                    {address.type}
                    {address.isActive && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                        <Check size={12} className="mr-1" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openEditDialog(address)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteAddress(address.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="text-gray-600 text-sm flex">
                  <MapPin size={16} className="mr-2 shrink-0 mt-0.5" />
                  <span>{address.fullAddress}</span>
                </div>
                {!address.isActive && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs"
                    onClick={() => setAsActive(address.id)}
                  >
                    Set as Active
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <MapPin size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">You haven't saved any addresses yet</p>
          </div>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Address Type</Label>
              <Input 
                id="type"
                placeholder="Home, Work, etc."
                {...form.register('type', { required: true })}
              />
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">Address type is required</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Input 
                id="fullAddress"
                placeholder="Street address, city, state, zip code"
                {...form.register('fullAddress', { required: true })}
              />
              {form.formState.errors.fullAddress && (
                <p className="text-sm text-red-500">Address is required</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-medishare-blue hover:bg-medishare-blue/90">
                {editingAddress ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <BottomNav />
    </div>
  );
};

export default Addresses;
