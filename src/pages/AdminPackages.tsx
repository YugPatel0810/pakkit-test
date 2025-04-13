import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCourier } from '@/context/CourierContext';
import { Navigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Plus, Edit, Trash2, 
  CheckCircle, XCircle, Clock, Truck, ArrowUpDown,
  Download, Upload
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
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { parseISO, isPast } from 'date-fns';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-3 w-3 mr-1" /> },
    in_transit: { color: "bg-blue-100 text-blue-800", icon: <Truck className="h-3 w-3 mr-1" /> },
    delivered: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
    delayed: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-3 w-3 mr-1" /> },
  };

  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={`flex items-center ${config.color}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </Badge>
  );
};

// Add Package Dialog
const AddPackageDialog = () => {
  const { addPackage } = useCourier();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const estimatedDelivery = formData.get('estimatedDelivery');
    if (isPast(parseISO(estimatedDelivery))) {
      toast.error("Estimated delivery date cannot be in the past");
      return;
    }

    const newPackage = {
      trackingNumber: `PKT${Date.now().toString().slice(-7)}`,
      customerName: formData.get('customerName'),
      customerEmail: formData.get('customerEmail'),
      origin: formData.get('origin'),
      destination: formData.get('destination'),
      status: 'pending',
      estimatedDelivery,
      weight: Number(formData.get('weight')),
      description: formData.get('description'),
    };

    await addPackage(newPackage);
    toast.success(`Package ${newPackage.trackingNumber} created successfully`);
    setOpen(false);
    e.target.reset();
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
            <Input
              id="customerName"
              name="customerName"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">Email</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">Origin</Label>
            <Input
              id="origin"
              name="origin"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-right">Destination</Label>
            <Input
              id="destination"
              name="destination"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              min="0"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimatedDelivery" className="text-right">Est. Delivery</Label>
            <Input
              id="estimatedDelivery"
              name="estimatedDelivery"
              type="date"
              min={minDate}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              name="description"
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Add Package</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main AdminPackages Component
const AdminPackages = () => {
  const { packages, isAdmin, updatePackageStatus, deletePackage } = useCourier();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'createdAt', 
    direction: 'desc' 
  });

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Filter and sort packages
  const filteredPackages = packages
    .filter(pkg => {
      const matchesSearch = 
        pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
      
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

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle bulk status update
  const handleBulkStatusUpdate = (status) => {
    selectedPackages.forEach(id => {
      updatePackageStatus(id, status);
    });
    toast.success(`Updated ${selectedPackages.length} packages to ${status}`);
    setSelectedPackages([]);
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPackages(filteredPackages.map(pkg => pkg.id));
    } else {
      setSelectedPackages([]);
    }
  };

  // Handle individual select
  const handleSelectPackage = (id, checked) => {
    if (checked) {
      setSelectedPackages(prev => [...prev, id]);
    } else {
      setSelectedPackages(prev => prev.filter(pkgId => pkgId !== id));
    }
  };

  // Handle delete package
  const handleDeletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(id);
      toast.success('Package deleted successfully');
    }
  };

  // Export packages as CSV
  const exportPackages = () => {
    const headers = [
      'Tracking Number', 
      'Customer Name', 
      'Email', 
      'Origin', 
      'Destination', 
      'Status', 
      'Est. Delivery', 
      'Weight', 
      'Description'
    ];
    
    const rows = filteredPackages.map(pkg => [
      pkg.trackingNumber,
      pkg.customerName,
      pkg.customerEmail,
      pkg.origin,
      pkg.destination,
      pkg.status,
      pkg.estimatedDelivery.split('T')[0],
      pkg.weight.toString(),
      pkg.description
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pakkit-packages-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Package Management</h1>
              <p className="text-gray-500">View, add, edit, and manage all packages in the system</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportPackages}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <AddPackageDialog />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Packages</p>
                    <h3 className="text-2xl font-bold">{packages.length}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Transit</p>
                    <h3 className="text-2xl font-bold">
                      {packages.filter(p => p.status === 'in_transit').length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivered</p>
                    <h3 className="text-2xl font-bold">
                      {packages.filter(p => p.status === 'delivered').length}
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delayed</p>
                    <h3 className="text-2xl font-bold">
                      {packages.filter(p => p.status === 'delayed').length}
                    </h3>
                  </div>
                  <div className="p-2 bg-red-100 rounded-full">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>All Packages</TabsTrigger>
                <TabsTrigger value="pending" onClick={() => setStatusFilter('pending')}>Pending</TabsTrigger>
                <TabsTrigger value="in_transit" onClick={() => setStatusFilter('in_transit')}>In Transit</TabsTrigger>
                <TabsTrigger value="delivered" onClick={() => setStatusFilter('delivered')}>Delivered</TabsTrigger>
                <TabsTrigger value="delayed" onClick={() => setStatusFilter('delayed')}>Delayed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search packages..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    {selectedPackages.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {selectedPackages.length} selected
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Bulk Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('pending')}>
                              <Clock className="h-4 w-4 mr-2" />
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('in_transit')}>
                              <Truck className="h-4 w-4 mr-2" />
                              Mark as In Transit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('delivered')}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('delayed')}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Mark as Delayed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox 
                              checked={selectedPackages.length === filteredPackages.length && filteredPackages.length > 0}
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all packages"
                            />
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('trackingNumber')}>
                            <div className="flex items-center">
                              Tracking #
                              {sortConfig.key === 'trackingNumber' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('customerName')}>
                            <div className="flex items-center">
                              Customer
                              {sortConfig.key === 'customerName' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>Origin</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                            <div className="flex items-center">
                              Status
                              {sortConfig.key === 'status' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('estimatedDelivery')}>
                            <div className="flex items-center">
                              Est. Delivery
                              {sortConfig.key === 'estimatedDelivery' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPackages.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                              No packages found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredPackages.map((pkg) => (
                            <TableRow key={pkg.id}>
                              <TableCell>
                                <Checkbox 
                                  checked={selectedPackages.includes(pkg.id)}
                                  onCheckedChange={(checked) => handleSelectPackage(pkg.id, checked)}
                                  aria-label={`Select package ${pkg.trackingNumber}`}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{pkg.trackingNumber}</TableCell>
                              <TableCell>
                                <div>
                                  <div>{pkg.customerName}</div>
                                  <div className="text-xs text-gray-500">{pkg.customerEmail}</div>
                                </div>
                              </TableCell>
                              <TableCell>{pkg.origin}</TableCell>
                              <TableCell>{pkg.destination}</TableCell>
                              <TableCell>
                                <StatusBadge status={pkg.status} />
                              </TableCell>
                              <TableCell>{new Date(pkg.estimatedDelivery).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeletePackage(pkg.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPackages;import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCourier } from '@/context/CourierContext';
import { Navigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Plus, Edit, Trash2, 
  CheckCircle, XCircle, Clock, Truck, ArrowUpDown,
  Download, Upload, Eye
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
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { parseISO, isPast, format } from 'date-fns';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-3 w-3 mr-1" /> },
    in_transit: { color: "bg-blue-100 text-blue-800", icon: <Truck className="h-3 w-3 mr-1" /> },
    delivered: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
    delayed: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-3 w-3 mr-1" /> },
  };

  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={`flex items-center ${config.color}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </Badge>
  );
};

// Package Details Dialog
const PackageDetailsDialog = ({ pkg }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Package Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Tracking Number</Label>
            <div className="col-span-2 font-bold">{pkg.trackingNumber}</div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Status</Label>
            <div className="col-span-2"><StatusBadge status={pkg.status} /></div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Customer</Label>
            <div className="col-span-2">
              <div>{pkg.customerName}</div>
              <div className="text-sm text-gray-500">{pkg.customerEmail}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Origin</Label>
            <div className="col-span-2">{pkg.origin}</div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Destination</Label>
            <div className="col-span-2">{pkg.destination}</div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Weight</Label>
            <div className="col-span-2">{pkg.weight} kg</div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Est. Delivery</Label>
            <div className="col-span-2">{format(new Date(pkg.estimatedDelivery), 'PPP')}</div>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right font-medium">Description</Label>
            <div className="col-span-2">{pkg.description}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add Package Dialog
const AddPackageDialog = () => {
  const { addPackage } = useCourier();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const estimatedDelivery = formData.get('estimatedDelivery');
    if (isPast(parseISO(estimatedDelivery))) {
      toast.error("Estimated delivery date cannot be in the past");
      return;
    }

    const newPackage = {
      trackingNumber: `PKT${Date.now().toString().slice(-7)}`,
      customerName: formData.get('customerName'),
      customerEmail: formData.get('customerEmail'),
      origin: formData.get('origin'),
      destination: formData.get('destination'),
      status: 'pending',
      estimatedDelivery,
      weight: Number(formData.get('weight')),
      description: formData.get('description'),
    };

    await addPackage(newPackage);
    toast.success(`Package ${newPackage.trackingNumber} created successfully`);
    setOpen(false);
    e.target.reset();
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
            <Input
              id="customerName"
              name="customerName"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">Email</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">Origin</Label>
            <Input
              id="origin"
              name="origin"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-right">Destination</Label>
            <Input
              id="destination"
              name="destination"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              min="0"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimatedDelivery" className="text-right">Est. Delivery</Label>
            <Input
              id="estimatedDelivery"
              name="estimatedDelivery"
              type="date"
              min={minDate}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              name="description"
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Add Package</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Package Dialog
const EditPackageDialog = ({ pkg, onUpdate }) => {
  const { updatePackage } = useCourier();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const estimatedDelivery = formData.get('estimatedDelivery');

    const updatedPackage = {
      ...pkg,
      customerName: formData.get('customerName'),
      customerEmail: formData.get('customerEmail'),
      origin: formData.get('origin'),
      destination: formData.get('destination'),
      status: formData.get('status'),
      estimatedDelivery,
      weight: Number(formData.get('weight')),
      description: formData.get('description'),
    };

    await updatePackage(updatedPackage);
    toast.success(`Package ${pkg.trackingNumber} updated successfully`);
    setOpen(false);
    if (onUpdate) onUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="trackingNumber" className="text-right">Tracking #</Label>
            <div className="col-span-3 font-medium">{pkg.trackingNumber}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select name="status" defaultValue={pkg.status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              className="col-span-3"
              defaultValue={pkg.customerName}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">Email</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              className="col-span-3"
              defaultValue={pkg.customerEmail}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">Origin</Label>
            <Input
              id="origin"
              name="origin"
              className="col-span-3"
              defaultValue={pkg.origin}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-right">Destination</Label>
            <Input
              id="destination"
              name="destination"
              className="col-span-3"
              defaultValue={pkg.destination}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.1"
              min="0"
              className="col-span-3"
              defaultValue={pkg.weight}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimatedDelivery" className="text-right">Est. Delivery</Label>
            <Input
              id="estimatedDelivery"
              name="estimatedDelivery"
              type="date"
              className="col-span-3"
              defaultValue={pkg.estimatedDelivery.split('T')[0]}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              name="description"
              className="col-span-3"
              defaultValue={pkg.description}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Update Package</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main AdminPackages Component
const AdminPackages = () => {
  const { packages, isAdmin, updatePackageStatus, deletePackage } = useCourier();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'createdAt', 
    direction: 'desc' 
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Refresh the component
  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Filter and sort packages
  const filteredPackages = packages
    .filter(pkg => {
      const matchesSearch = 
        pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
      
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

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle bulk status update
  const handleBulkStatusUpdate = (status) => {
    selectedPackages.forEach(id => {
      updatePackageStatus(id, status);
    });
    toast.success(`Updated ${selectedPackages.length} packages to ${status}`);
    setSelectedPackages([]);
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPackages(filteredPackages.map(pkg => pkg.id));
    } else {
      setSelectedPackages([]);
    }
  };

  // Handle individual select
  const handleSelectPackage = (id, checked) => {
    if (checked) {
      setSelectedPackages(prev => [...prev, id]);
    } else {
      setSelectedPackages(prev => prev.filter(pkgId => pkgId !== id));
    }
  };

  // Handle delete package
  const handleDeletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      deletePackage(id);
      toast.success('Package deleted successfully');
    }
  };

  // Export packages as CSV
  const exportPackages = () => {
    const headers = [
      'Tracking Number', 
      'Customer Name', 
      'Email', 
      'Origin', 
      'Destination', 
      'Status', 
      'Est. Delivery', 
      'Weight', 
      'Description'
    ];
    
    const rows = filteredPackages.map(pkg => [
      pkg.trackingNumber,
      pkg.customerName,
      pkg.customerEmail,
      pkg.origin,
      pkg.destination,
      pkg.status,
      pkg.estimatedDelivery.split('T')[0],
      pkg.weight.toString(),
      pkg.description
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pakkit-packages-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Package Management</h1>
              <p className="text-gray-500">View, add, edit, and manage all packages in the system</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportPackages}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <AddPackageDialog />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Packages</p>
                    <h3 className="text-2xl font-bold">{packages.length}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Transit</p>
                    <h3 className="text-2xl font-bold">
                      {packages.filter(p => p.status === 'in_transit').length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivered</p>
                    <h3 className="text-2xl font-bold">
                      {packages.filter(p => p.status === 'delivered').length}
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delayed</p>
                    <h3 className="text-2xl font-bold">
                      {packages.filter(p => p.status === 'delayed').length}
                    </h3>
                  </div>
                  <div className="p-2 bg-red-100 rounded-full">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>All Packages</TabsTrigger>
                <TabsTrigger value="pending" onClick={() => setStatusFilter('pending')}>Pending</TabsTrigger>
                <TabsTrigger value="in_transit" onClick={() => setStatusFilter('in_transit')}>In Transit</TabsTrigger>
                <TabsTrigger value="delivered" onClick={() => setStatusFilter('delivered')}>Delivered</TabsTrigger>
                <TabsTrigger value="delayed" onClick={() => setStatusFilter('delayed')}>Delayed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search packages..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    {selectedPackages.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {selectedPackages.length} selected
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Bulk Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('pending')}>
                              <Clock className="h-4 w-4 mr-2" />
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('in_transit')}>
                              <Truck className="h-4 w-4 mr-2" />
                              Mark as In Transit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('delivered')}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleBulkStatusUpdate('delayed')}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Mark as Delayed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox 
                              checked={selectedPackages.length === filteredPackages.length && filteredPackages.length > 0}
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all packages"
                            />
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('trackingNumber')}>
                            <div className="flex items-center">
                              Tracking #
                              {sortConfig.key === 'trackingNumber' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('customerName')}>
                            <div className="flex items-center">
                              Customer
                              {sortConfig.key === 'customerName' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>Origin</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                            <div className="flex items-center">
                              Status
                              {sortConfig.key === 'status' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('estimatedDelivery')}>
                            <div className="flex items-center">
                              Est. Delivery
                              {sortConfig.key === 'estimatedDelivery' && (
                                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPackages.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                              No packages found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredPackages.map((pkg) => (
                            <TableRow key={pkg.id}>
                              <TableCell>
                                <Checkbox 
                                  checked={selectedPackages.includes(pkg.id)}
                                  onCheckedChange={(checked) => handleSelectPackage(pkg.id, checked)}
                                  aria-label={`Select package ${pkg.trackingNumber}`}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{pkg.trackingNumber}</TableCell>
                              <TableCell>
                                <div>
                                  <div>{pkg.customerName}</div>
                                  <div className="text-xs text-gray-500">{pkg.customerEmail}</div>
                                </div>
                              </TableCell>
                              <TableCell>{pkg.origin}</TableCell>
                              <TableCell>{pkg.destination}</TableCell>
                              <TableCell>
                                <StatusBadge status={pkg.status} />
                              </TableCell>
                              <TableCell>{new Date(pkg.estimatedDelivery).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <PackageDetailsDialog pkg={pkg} />
                                  <EditPackageDialog pkg={pkg} onUpdate={refreshData} />
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeletePackage(pkg.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody