import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCourier } from '@/context/CourierContext';
import { Navigate } from 'react-router-dom';
import { 
  Truck, User, Search, Plus, Edit, Trash2, 
  MapPin, Phone, Mail, ArrowUpDown, Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogTrigger, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Courier type definition
type CourierStatus = 'active' | 'inactive' | 'on_leave';

type Courier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  area: string;
  status: CourierStatus;
  avatar?: string;
  deliveredPackages: number;
  activePackages: number;
  rating: number;
  joinedDate: string;
};

// Status Badge Component
const StatusBadge = ({ status }: { status: CourierStatus }) => {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800" },
    inactive: { color: "bg-gray-100 text-gray-800" },
    on_leave: { color: "bg-yellow-100 text-yellow-800" },
  };

  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={`${config.color}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </Badge>
  );
};

// Main AdminCouriers Component
const AdminCouriers = () => {
  const { couriers, isAdmin, addCourier, updateCourier, deleteCourier } = useCourier();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Courier; direction: 'asc' | 'desc' }>({ 
    key: 'name', 
    direction: 'asc' 
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCourier, setCurrentCourier] = useState<Courier | null>(null);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Filter and sort couriers
  const filteredCouriers = couriers
    .filter(courier => {
      const matchesSearch = 
        courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        courier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        courier.phone.includes(searchTerm) ||
        courier.area.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || courier.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleAddCourier = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCourier = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      vehicleType: formData.get('vehicleType') as string,
      vehicleNumber: formData.get('vehicleNumber') as string,
      area: formData.get('area') as string,
      status: formData.get('status') as CourierStatus,
      deliveredPackages: 0,
      activePackages: 0,
      rating: 0,
      joinedDate: new Date().toISOString(),
    };

    try {
      await addCourier(newCourier);
      toast.success('Courier added successfully');
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add courier');
    }
  };

  const handleEditCourier = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentCourier) return;

    const formData = new FormData(e.currentTarget);
    const updatedCourier = {
      ...currentCourier,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      vehicleType: formData.get('vehicleType') as string,
      vehicleNumber: formData.get('vehicleNumber') as string,
      area: formData.get('area') as string,
      status: formData.get('status') as CourierStatus,
    };

    try {
      await updateCourier(updatedCourier);
      toast.success('Courier updated successfully');
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update courier');
    }
  };

  const handleDeleteCourier = async (courierId: string) => {
    try {
      await deleteCourier(courierId);
      toast.success('Courier deleted successfully');
    } catch (error) {
      toast.error('Failed to delete courier');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-semibold">Couriers Management</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Courier
              </Button>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder="Search couriers..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="mb-4"
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCouriers.map(courier => (
                    <TableRow key={courier.id}>
                      <TableCell>{courier.name}</TableCell>
                      <TableCell>{courier.email}</TableCell>
                      <TableCell>{courier.phone}</TableCell>
                      <TableCell>{courier.area}</TableCell>
                      <TableCell>
                        <StatusBadge status={courier.status} />
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => { setCurrentCourier(courier); setIsEditDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteCourier(courier.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />

      {/* Add Courier Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Courier</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCourier} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" name="phone" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicleType" className="text-right">Vehicle Type</Label>
              <Input id="vehicleType" name="vehicleType" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicleNumber" className="text-right">Vehicle Number</Label>
              <Input id="vehicleNumber" name="vehicleNumber" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">Area</Label>
              <Input id="area" name="area" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select name="status" defaultValue="active" className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit">Add Courier</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Courier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Courier</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditCourier} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" defaultValue={currentCourier?.name} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={currentCourier?.email} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" name="phone" defaultValue={currentCourier?.phone} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicleType" className="text-right">Vehicle Type</Label>
              <Input id="vehicleType" name="vehicleType" defaultValue={currentCourier?.vehicleType} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicleNumber" className="text-right">Vehicle Number</Label>
              <Input id="vehicleNumber" name="vehicleNumber" defaultValue={currentCourier?.vehicleNumber} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">Area</Label>
              <Input id="area" name="area" defaultValue={currentCourier?.area} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select name="status" defaultValue={currentCourier?.status} className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCouriers;