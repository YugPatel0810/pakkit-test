
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, User, Menu, BarChart, Settings, Truck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCourier } from '@/context/CourierContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { isAdmin, toggleAdminMode } = useCourier();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-courier-primary">
            <Package className="h-6 w-6" />
            <span>Pakkit</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-3 px-4 py-2">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-courier-primary px-4 py-2 rounded-xl hover:bg-white hover:bg-opacity-70 bg-white bg-opacity-50 shadow-sm border border-gray-200">Home</Link>
          <Link to="/track" className="text-sm font-medium transition-colors hover:text-courier-primary px-4 py-2 rounded-xl hover:bg-white hover:bg-opacity-70 bg-white bg-opacity-50 shadow-sm border border-gray-200">Track Package</Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-courier-primary px-4 py-2 rounded-xl hover:bg-white hover:bg-opacity-70 bg-white bg-opacity-50 shadow-sm border border-gray-200">Contact</Link>
          
          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl border border-gray-200 bg-white bg-opacity-70 flex items-center gap-1 px-4 py-2">
                  Admin
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl overflow-hidden">
                <DropdownMenuItem className="rounded-lg my-1 mx-1">
                  <Link to="/admin" className="flex items-center w-full">
                    <BarChart className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg my-1 mx-1">
                  <Link to="/admin/packages" className="flex items-center w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Packages
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg my-1 mx-1">
                  <Link to="/admin/couriers" className="flex items-center w-full">
                    <Truck className="h-4 w-4 mr-2" />
                    Couriers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg my-1 mx-1">
                  <Link to="/admin/analytics" className="flex items-center w-full">
                    <BarChart className="h-4 w-4 mr-2" />
                    Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg my-1 mx-1">
                  <Link to="/admin/settings" className="flex items-center w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
        
        <div className="flex items-center gap-2 px-3 py-1">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleAdminMode}
            className={`rounded-xl border border-gray-200 px-4 py-2 ${isAdmin ? "bg-courier-primary text-white" : "bg-white bg-opacity-70"}`}
          >
            <User className="h-4 w-4 mr-2" />
            {isAdmin ? "Exit Admin" : "Admin Login"}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-xl bg-white bg-opacity-50 border border-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 border border-gray-100" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/track" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 border border-gray-100" onClick={() => setIsMenuOpen(false)}>Track Package</Link>
            <Link to="/contact" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 border border-gray-100" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            {isAdmin && (
              <>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="text-xs font-semibold text-gray-500 px-4 py-1">ADMIN</div>
                <Link to="/admin" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center border border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  <BarChart className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link to="/admin/packages" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center border border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  <Package className="h-4 w-4 mr-2" />
                  Packages
                </Link>
                <Link to="/admin/couriers" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center border border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  <Truck className="h-4 w-4 mr-2" />
                  Couriers
                </Link>
                <Link to="/admin/analytics" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center border border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  <BarChart className="h-4 w-4 mr-2" />
                  Analytics
                </Link>
                <Link to="/admin/settings" className="text-sm font-medium py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center border border-gray-100" onClick={() => setIsMenuOpen(false)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
