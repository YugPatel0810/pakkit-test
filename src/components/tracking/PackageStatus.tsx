
import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  MapPin,
  Calendar
} from 'lucide-react';
import { PackageData, PackageStatus as StatusType } from '@/context/CourierContext';

// Helper function to get status details
const getStatusDetails = (status: StatusType) => {
  switch (status) {
    case 'pending':
      return {
        icon: <Clock className="h-6 w-6 text-courier-pending" />,
        label: 'Pending',
        color: 'text-courier-pending',
        bgColor: 'bg-courier-pending/10',
        description: 'Your package has been registered and is awaiting processing.'
      };
    case 'in-transit':
      return {
        icon: <Truck className="h-6 w-6 text-courier-primary" />,
        label: 'In Transit',
        color: 'text-courier-primary',
        bgColor: 'bg-courier-primary/10',
        description: 'Your package is on its way to the destination.'
      };
    case 'delivered':
      return {
        icon: <CheckCircle className="h-6 w-6 text-courier-success" />,
        label: 'Delivered',
        color: 'text-courier-success',
        bgColor: 'bg-courier-success/10',
        description: 'Your package has been delivered successfully.'
      };
    case 'delayed':
      return {
        icon: <AlertTriangle className="h-6 w-6 text-courier-danger" />,
        label: 'Delayed',
        color: 'text-courier-danger',
        bgColor: 'bg-courier-danger/10',
        description: 'Your package delivery is experiencing a delay.'
      };
    default:
      return {
        icon: <Package className="h-6 w-6 text-gray-500" />,
        label: 'Unknown',
        color: 'text-gray-500',
        bgColor: 'bg-gray-100',
        description: 'Unable to determine package status.'
      };
  }
};

// Format date to readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

interface PackageStatusProps {
  packageData: PackageData;
}

export const PackageStatus: React.FC<PackageStatusProps> = ({ packageData }) => {
  const statusDetails = getStatusDetails(packageData.status);
  
  const statusSteps = [
    { id: 'pending', label: 'Processing', completed: true },
    { 
      id: 'in-transit', 
      label: 'In Transit',
      completed: ['in-transit', 'delivered'].includes(packageData.status)
    },
    { 
      id: 'delivered', 
      label: 'Delivered',
      completed: packageData.status === 'delivered'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span>Package Details</span>
        </h2>
        
        <div className={`px-4 py-2 rounded-full font-medium ${statusDetails.bgColor} ${statusDetails.color}`}>
          <div className="flex items-center gap-2">
            {statusDetails.icon}
            <span>{statusDetails.label}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-2">Tracking Number</p>
          <p className="font-semibold">{packageData.trackingNumber}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Last Updated</p>
          <p className="font-semibold">{formatDate(packageData.updatedAt)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">From</p>
          <p className="font-semibold flex items-center gap-1">
            <MapPin className="h-4 w-4 text-courier-primary" /> 
            {packageData.origin}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">To</p>
          <p className="font-semibold flex items-center gap-1">
            <MapPin className="h-4 w-4 text-courier-secondary" /> 
            {packageData.destination}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Package Weight</p>
          <p className="font-semibold">{packageData.weight} kg</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Estimated Delivery</p>
          <p className="font-semibold flex items-center gap-1">
            <Calendar className="h-4 w-4" /> 
            {new Date(packageData.estimatedDelivery).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-4">Delivery Progress</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
          
          <div className="space-y-8 relative">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${step.completed ? 'bg-courier-success text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step.completed ? 
                    <CheckCircle className="h-5 w-5" /> : 
                    <span>{index + 1}</span>
                  }
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{step.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
        <p className="font-medium mb-2">Current Status</p>
        <p className="text-gray-600">
          {statusDetails.description}
          {packageData.status === 'delayed' && (
            <span className="block mt-2 text-courier-danger">
              We're experiencing some delays with your delivery. Our team is working to resolve this issue as quickly as possible.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
