
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Package {
  id: string;
  trackingNumber: string;
  customerName: string;
  customerEmail: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed';
  estimatedDelivery: string;
  weight: number;
  description: string;
  courierId?: string;
}

interface Courier {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  currentLocation?: { lat: number; lng: number };
  assignedPackages: string[];
}

interface Activity {
  id: string;
  action: string;
  package: string;
  time: Date;
  type: 'success' | 'warning' | 'info' | 'error';
}

interface CourierContextType {
  isAdmin: boolean;
  toggleAdminMode: () => void;
  packages: Package[];
  couriers: Courier[];
  activities: Activity[];
  addPackage: (pkg: Omit<Package, 'id'>) => Promise<void>;
  updatePackageStatus: (id: string, status: Package['status']) => Promise<void>;
  assignCourier: (packageId: string, courierId: string) => Promise<void>;
  addCourier: (courier: Omit<Courier, 'id' | 'assignedPackages'>) => Promise<void>;
  updateCourierLocation: (courierId: string, location: { lat: number; lng: number }) => Promise<void>;
  getDeliveryStats: () => {
    totalDeliveries: number;
    onTimeRate: number;
    satisfactionRate: number;
    statusBreakdown: Record<Package['status'], number>;
  };
  getPackageByTrackingNumber: (trackingNumber: string) => Package | undefined;
}

export const CourierContext = createContext<CourierContextType | undefined>(undefined);

export const CourierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Omit<Activity, 'id' | 'time'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      time: new Date(),
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50));
  };

  const addPackage = async (pkg: Omit<Package, 'id'>) => {
    try {
      const newPackage = {
        ...pkg,
        id: Date.now().toString(),
      };
      setPackages(prev => [...prev, newPackage]);
      addActivity({
        action: 'New package created',
        package: newPackage.trackingNumber,
        type: 'success',
      });
      toast.success('Package added successfully');
    } catch (error) {
      toast.error('Failed to add package');
      throw error;
    }
  };

  const updatePackageStatus = async (id: string, status: Package['status']) => {
    try {
      setPackages(prev =>
        prev.map(pkg =>
          pkg.id === id ? { ...pkg, status } : pkg
        )
      );
      const pkg = packages.find(p => p.id === id);
      if (pkg) {
        addActivity({
          action: `Package ${status}`,
          package: pkg.trackingNumber,
          type: status === 'delivered' ? 'success' : status === 'delayed' ? 'error' : 'info',
        });
      }
      toast.success(`Package status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update package status');
      throw error;
    }
  };

  const assignCourier = async (packageId: string, courierId: string) => {
    try {
      setPackages(prev =>
        prev.map(pkg =>
          pkg.id === packageId ? { ...pkg, courierId, status: 'in_transit' } : pkg
        )
      );
      setCouriers(prev =>
        prev.map(courier =>
          courier.id === courierId
            ? { ...courier, assignedPackages: [...courier.assignedPackages, packageId] }
            : courier
        )
      );
      const pkg = packages.find(p => p.id === packageId);
      if (pkg) {
        addActivity({
          action: 'Courier assigned',
          package: pkg.trackingNumber,
          type: 'info',
        });
      }
      toast.success('Courier assigned successfully');
    } catch (error) {
      toast.error('Failed to assign courier');
      throw error;
    }
  };

  const addCourier = async (courier: Omit<Courier, 'id' | 'assignedPackages'>) => {
    try {
      const newCourier = {
        ...courier,
        id: Date.now().toString(),
        assignedPackages: [],
      };
      setCouriers(prev => [...prev, newCourier]);
      toast.success('Courier added successfully');
    } catch (error) {
      toast.error('Failed to add courier');
      throw error;
    }
  };

  const updateCourierLocation = async (courierId: string, location: { lat: number; lng: number }) => {
    setCouriers(prev =>
      prev.map(courier =>
        courier.id === courierId ? { ...courier, currentLocation: location } : courier
      )
    );
  };

  const getDeliveryStats = () => {
    const totalDeliveries = packages.length;
    const deliveredOnTime = packages.filter(
      pkg => pkg.status === 'delivered' && new Date() < new Date(pkg.estimatedDelivery)
    ).length;
    const totalDelivered = packages.filter(pkg => pkg.status === 'delivered').length;

    return {
      totalDeliveries,
      onTimeRate: totalDelivered ? (deliveredOnTime / totalDelivered) * 100 : 0,
      satisfactionRate: 97, // Mock data - implement real feedback system
      statusBreakdown: {
        pending: packages.filter(pkg => pkg.status === 'pending').length,
        in_transit: packages.filter(pkg => pkg.status === 'in_transit').length,
        delivered: packages.filter(pkg => pkg.status === 'delivered').length,
        delayed: packages.filter(pkg => pkg.status === 'delayed').length,
      },
    };
  };

  const toggleAdminMode = () => {
    setIsAdmin(prev => !prev);
    toast.success(isAdmin ? 'Exited admin mode' : 'Entered admin mode');
  };

  const getPackageByTrackingNumber = (trackingNumber: string): Package | undefined => {
    return packages.find(pkg => pkg.trackingNumber === trackingNumber);
  };

  return (
    <CourierContext.Provider
      value={{
        isAdmin,
        toggleAdminMode,
        packages,
        couriers,
        activities,
        addPackage,
        updatePackageStatus,
        assignCourier,
        addCourier,
        updateCourierLocation,
        getDeliveryStats,
        getPackageByTrackingNumber,
      }}
    >
      {children}
    </CourierContext.Provider>
  );
};

export const useCourier = () => {
  const context = useContext(CourierContext);
  if (context === undefined) {
    throw new Error('useCourier must be used within a CourierProvider');
  }
  return context;
};
