
import React from 'react';
import { Package, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-courier-secondary" />
              <span className="font-bold text-xl">Pakkit</span>
            </div>
            <p className="text-gray-400 mb-4">
              Fast, reliable package delivery services for individuals and businesses.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="h-4 w-4" />
              <span>contact@Pakkit.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <Phone className="h-4 w-4" />
              <span>+91 9876543210</span>
            </div>
          </div>
          
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-courier-secondary">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-courier-secondary">Careers</Link></li>
              <li><Link to="/news" className="hover:text-courier-secondary">News & Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/track" className="hover:text-courier-secondary">Track Package</Link></li>
              <li><Link to="/faq" className="hover:text-courier-secondary">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-courier-secondary">Customer Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2025 Pakkit. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-courier-secondary">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-courier-secondary">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-courier-secondary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
