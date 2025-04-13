
import React from 'react';
import { useCourier } from '@/context/CourierContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

export const PackagesList = () => {
  const { packages, updatePackageStatus, assignCourier, couriers } = useCourier();

  // Filter for active packages (pending or in_transit)
  const activePackages = packages.filter(pkg => 
    pkg.status === 'pending' || pkg.status === 'in_transit'
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_transit':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (id: string, status: 'pending' | 'in_transit' | 'delivered' | 'delayed') => {
    try {
      await updatePackageStatus(id, status);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tracking #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Est. Delivery</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activePackages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                No active packages found
              </TableCell>
            </TableRow>
          ) : (
            activePackages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.trackingNumber}</TableCell>
                <TableCell>
                  <div>
                    <p>{pkg.customerName}</p>
                    <p className="text-sm text-gray-500">{pkg.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{pkg.origin}</TableCell>
                <TableCell>{pkg.destination}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(pkg.status)}
                    <Badge className={getStatusColor(pkg.status)}>
                      {pkg.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(pkg.estimatedDelivery), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {pkg.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(pkg.id, 'in_transit')}
                      >
                        Start Delivery
                      </Button>
                    )}
                    {pkg.status === 'in_transit' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(pkg.id, 'delivered')}
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
