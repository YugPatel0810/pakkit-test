
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCourier } from '@/context/CourierContext';
import { toast } from 'sonner';

export const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const { getPackageByTracking } = useCourier();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber) {
      toast.error('Please enter a tracking number');
      return;
    }
    
    const pkg = getPackageByTracking(trackingNumber);
    
    if (pkg) {
      navigate(`/track/${trackingNumber}`);
    } else {
      toast.error('Package not found. Please check the tracking number and try again.');
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute -top-3 left-4 bg-white px-2 text-courier-primary font-semibold text-sm flex items-center">
        <Package className="h-4 w-4 mr-1" />
        <span>Track Your Package</span>
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col md:flex-row gap-2 p-6 border-2 border-courier-primary rounded-lg"
      >
        <Input
          type="text"
          placeholder="Enter your tracking number (e.g., RSC1234567)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="bg-courier-primary hover:bg-courier-primary/90">
          <span>Track</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="mt-3 text-center text-sm text-gray-500">
        <p>For testing, use these sample tracking numbers: RSC1234567, RSC7654321, RSC9876543</p>
      </div>
    </div>
  );
};
