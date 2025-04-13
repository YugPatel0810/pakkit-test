
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp, 
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
            />
          </div>
          
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-courier-secondary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
        <Link 
          to="/admin" 
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-courier-primary text-white"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/admin/packages" 
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Package className="h-4 w-4" />
          <span>Packages</span>
        </Link>
        
        <Link 
          to="/admin/couriers" 
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Users className="h-4 w-4" />
          <span>Couriers</span>
        </Link>
        
        <Link 
          to="/admin/analytics" 
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <TrendingUp className="h-4 w-4" />
          <span>Analytics</span>
        </Link>
        
        <Link 
          to="/admin/settings" 
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};
