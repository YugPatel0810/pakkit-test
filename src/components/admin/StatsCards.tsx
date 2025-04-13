
import React from 'react';
import { PackageData, CourierData } from '@/context/CourierContext';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  BarChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  packages: PackageData[];
  couriers: CourierData[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ packages, couriers }) => {
  // Calculate statistics
  const totalPackages = packages.length;
  const deliveredPackages = packages.filter(pkg => pkg.status === 'delivered').length;
  const inTransitPackages = packages.filter(pkg => pkg.status === 'in-transit').length;
  const delayedPackages = packages.filter(pkg => pkg.status === 'delayed').length;
  const activeCouriers = couriers.filter(courier => courier.status === 'active').length;
  
  // Calculate delivery rate
  const deliveryRate = totalPackages > 0 
    ? Math.round((deliveredPackages / totalPackages) * 100) 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
          <Package className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPackages}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {inTransitPackages} in transit
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deliveryRate}%</div>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div 
              className="h-2 rounded-full bg-courier-success" 
              style={{ width: `${deliveryRate}%` }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Couriers</CardTitle>
          <Truck className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCouriers}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {couriers.length} total couriers
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Delivered Packages</CardTitle>
          <CheckCircle className="h-4 w-4 text-courier-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deliveredPackages}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((deliveredPackages / totalPackages) * 100)}% of total packages
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Delayed Packages</CardTitle>
          <AlertTriangle className="h-4 w-4 text-courier-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{delayedPackages}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((delayedPackages / totalPackages) * 100)}% of total packages
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
          <BarChart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.3 days</div>
          <p className="text-xs text-muted-foreground mt-1">
            14% faster than last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
