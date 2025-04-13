import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCourier } from '@/context/CourierContext';
import { parseISO, isPast } from 'date-fns';

export const AddPackageDialog = () => {
  const { addPackage } = useCourier();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const estimatedDelivery = formData.get('estimatedDelivery') as string;
    if (isPast(parseISO(estimatedDelivery))) {
      alert("Estimated delivery date cannot be in the past");
      return;
    }

    const newPackage = {
      trackingNumber: `PKT${Date.now().toString().slice(-7)}`,
      customerName: formData.get('customerName') as string,
      customerEmail: formData.get('customerEmail') as string,
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      status: 'pending' as const,
      estimatedDelivery,
      weight: Number(formData.get('weight')),
      description: formData.get('description') as string,
    };

    await addPackage(newPackage);
    setOpen(false);
    (e.target as HTMLFormElement).reset();
  };

  // Get tomorrow's date for min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Package
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Package</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* ... existing form fields ... */}
        </form>
      </DialogContent>
    </Dialog>
  );
};