
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatsCards } from '@/components/admin/StatsCards';
import { PackagesList } from '@/components/admin/PackagesList';
import { useCourier } from '@/context/CourierContext';
import { Navigate } from 'react-router-dom';
import { 
  BarChart3, 
  MapPin, 
  Package, 
  BadgeCheck, 
  BadgeX, 
  Plus 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock component for real-time map
const DeliveryMap = () => (
  <div className="relative h-[300px] rounded-lg overflow-hidden border bg-gray-100">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-10 w-10 text-courier-primary mx-auto animate-pulse" />
        <p className="font-medium mt-2">Real-time delivery map</p>
        <p className="text-sm text-gray-500">Showing 5 active delivery vehicles</p>
      </div>
    </div>
  </div>
);

// Mock component for delivery statistics chart
const DeliveryStats = () => (
  <div className="p-4 h-full">
    <h3 className="font-semibold mb-4">Delivery Statistics</h3>
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>Total Deliveries</span>
          <span className="font-medium">451</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-courier-primary rounded-full h-2" style={{ width: '82%' }}></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>On-Time Delivery</span>
          <span className="font-medium">92%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-courier-success rounded-full h-2" style={{ width: '92%' }}></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>Customer Satisfaction</span>
          <span className="font-medium">97%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-courier-secondary rounded-full h-2" style={{ width: '97%' }}></div>
        </div>
      </div>
    </div>
    
    <div className="mt-6">
      <div className="flex justify-between text-sm font-medium mb-4">
        <span>Delivery Status Breakdown</span>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex-1 h-24 bg-courier-primary rounded-md"></div>
        <div className="flex-1 h-16 mt-8 bg-courier-success rounded-md"></div>
        <div className="flex-1 h-12 mt-12 bg-courier-secondary rounded-md"></div>
        <div className="flex-1 h-8 mt-16 bg-courier-danger rounded-md"></div>
      </div>
      <div className="flex text-xs text-gray-500 justify-between mt-2">
        <span>In Transit</span>
        <span>Delivered</span>
        <span>Pending</span>
        <span>Delayed</span>
      </div>
    </div>
  </div>
);

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      action: 'Package delivered',
      package: 'RSC9876543',
      time: '10 mins ago',
      icon: <BadgeCheck className="h-4 w-4 text-courier-success" />,
    },
    {
      id: 2,
      action: 'New package created',
      package: 'RSC4567890',
      time: '25 mins ago',
      icon: <Plus className="h-4 w-4 text-courier-primary" />,
    },
    {
      id: 3,
      action: 'Package delayed',
      package: 'RSC5555555',
      time: '1 hour ago',
      icon: <BadgeX className="h-4 w-4 text-courier-danger" />,
    },
    {
      id: 4,
      action: 'Courier assigned',
      package: 'RSC1234567',
      time: '2 hours ago',
      icon: <Package className="h-4 w-4 text-courier-secondary" />,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start p-2 hover:bg-gray-50 rounded-md">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.action}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>#{activity.package}</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Add these imports at the top
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

// Add this component before the Admin component
const AddPackageDialog = () => {
  const { addPackage, couriers } = useCourier();
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
      courierId: formData.get('courierId') as string,
      priority: formData.get('priority') as string,
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">Customer Name</Label>
            <Input id="customerName" name="customerName" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">Email</Label>
            <Input id="customerEmail" name="customerEmail" type="email" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">Origin</Label>
            <Input id="origin" name="origin" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-right">Destination</Label>
            <Input id="destination" name="destination" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" step="0.1" min="0" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimatedDelivery" className="text-right">Est. Delivery</Label>
            <Input id="estimatedDelivery" name="estimatedDelivery" type="date" min={minDate} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input id="description" name="description" className="col-span-3" required />
          </div>
          {/* New fields */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courierId" className="text-right">Courier</Label>
            <Select name="courierId" className="col-span-3">
              <SelectTrigger>
                <SelectValue placeholder="Select courier" />
              </SelectTrigger>
              <SelectContent>
                {couriers.map(courier => (
                  <SelectItem key={courier.id} value={courier.id}>
                    {courier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <Select name="priority" className="col-span-3">
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Add Package</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Update the Active Packages card in the Admin component
// Add these imports at the top
import { toast } from 'sonner';
import { parseISO, isPast } from 'date-fns';

// Update the checkAndUpdateDelayedPackages function
const checkAndUpdateDelayedPackages = (
  packages: Array<{
    id: string;
    estimatedDelivery: string;
    status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
  }>, 
  updatePackageStatus: (id: string, status: 'pending' | 'in_transit' | 'delivered' | 'delayed') => void
) => {
  try {
    let delayedCount = 0;
    packages.forEach(pkg => {
      if (!pkg.estimatedDelivery) return;
      const estimatedDate = parseISO(pkg.estimatedDelivery);
      if (isPast(estimatedDate) && pkg.status !== 'delivered' && pkg.status !== 'delayed') {
        updatePackageStatus(pkg.id, 'delayed');
        delayedCount++;
      }
    });
    if (delayedCount > 0) {
      toast.warning(`${delayedCount} package(s) marked as delayed`);
    }
  } catch (error) {
    console.error('Error checking delayed packages:', error);
    toast.error('Failed to update delayed packages');
  }
};

// Update the Admin component with more frequent checks
const Admin = () => {
  const { packages, couriers, isAdmin, updatePackageStatus } = useCourier();
  
  React.useEffect(() => {
    if (!packages || !updatePackageStatus) return;

    // Initial check
    checkAndUpdateDelayedPackages(packages, updatePackageStatus);
    
    // Check every 5 minutes
    const interval = setInterval(() => {
      checkAndUpdateDelayedPackages(packages, updatePackageStatus);
    }, 300000); // 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, [packages, updatePackageStatus]);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <AdminHeader 
            title="Admin Dashboard" 
            subtitle="Overview of all deliveries and courier activities"
          />
          
          <StatsCards packages={packages} couriers={couriers} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold">Delivery Map</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryMap />
              </CardContent>
            </Card>
            
            <RecentActivity />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-md font-semibold">Active Packages</CardTitle>
                  <p className="text-sm text-gray-500">Manage pending and in-transit packages</p>
                </div>
                <AddPackageDialog />
              </CardHeader>
              <CardContent>
                <PackagesList />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold">Delivery Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <DeliveryStats />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
