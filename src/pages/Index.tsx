
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, ShieldCheck, Globe, Search, Loader2 } from 'lucide-react';
import { useCourier } from '@/context/CourierContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { getPackageByTrackingNumber } = useCourier();
  const navigate = useNavigate();

  const handleTrackPackage = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');
    setPackageDetails(null);

    try {
      const details = await getPackageByTrackingNumber(trackingNumber.trim());
      if (details) {
        setPackageDetails(details);
      } else {
        setError(`No package found with tracking number: ${trackingNumber}`);
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
      setError('Failed to retrieve package information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewFullDetails = () => {
    if (packageDetails?.trackingNumber) {
      navigate(`/track/${packageDetails.trackingNumber}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-courier-primary to-blue-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Fast & Reliable Package Delivery Solutions
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  Track your packages in real-time and get them delivered on time, every time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/get-started">
                    <Button size="lg" className="bg-white text-courier-primary hover:bg-gray-100 w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/faq">
                    <Button size="lg" variant="outline" className="bg-white text-courier-primary hover:bg-gray-100 w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  {/* 3D-like delivery truck */}
                  <div className="relative w-full h-72 perspective-1000">
                    {/* Truck body - main container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Cargo section */}
                      <div className="relative w-72 h-44 bg-white/90 rounded-md shadow-lg transform -rotate-y-6 translate-z-10" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Side panel details */}
                        <div className="absolute inset-0 border-2 border-white/50 rounded-md"></div>
                        <div className="absolute top-8 left-4 right-4 h-1 bg-blue-500/30 rounded-full"></div>
                        <div className="absolute top-16 left-4 right-4 h-1 bg-blue-500/30 rounded-full"></div>
                        
                        {/* Pakkit logo on side */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-courier-primary font-bold text-2xl">
                          PAKKIT
                        </div>
                        
                        {/* Cargo door lines */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40"></div>
                      </div>
                      
                      {/* Cabin section */}
                      <div className="relative w-32 h-36 bg-white/95 rounded-md shadow-lg -ml-8 transform -rotate-y-6" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Windshield */}
                        <div className="absolute top-5 left-2 right-2 h-14 bg-blue-400/30 rounded-sm"></div>
                        
                        {/* Cabin details */}
                        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/90 border-t border-white/50"></div>
                      </div>
                    </div>
                    
                    {/* Wheels - bigger size */}
                    <div className="absolute bottom-0 left-24 w-20 h-20 bg-gray-800/90 rounded-full border-4 border-gray-300/80"></div>
                    <div className="absolute bottom-0 right-28 w-20 h-20 bg-gray-800/90 rounded-full border-4 border-gray-300/80"></div>
                    
                    {/* Wheel details - hub caps properly centered */}
                    <div className="absolute bottom-[26px] left-[120px] w-10 h-10 bg-gray-300/60 rounded-full"></div>
                    <div className="absolute bottom-[26px] right-[136px] w-10 h-10 bg-gray-300/60 rounded-full"></div>
                    
                    {/* Road/shadow effect */}
                    <div className="absolute bottom-0 left-10 right-10 h-3 bg-gray-800/20 rounded-full blur-md"></div>
                    
                    {/* Floating package */}
                    <div className="absolute top-10 right-16 animate-bounce">
                      <div className="w-16 h-16 bg-courier-primary/90 rounded-md flex items-center justify-center shadow-lg">
                        <Package className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tracking Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Track Your Package</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enter your tracking number to get real-time updates on your package's location and status.
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto mb-8 shadow-md">
              <CardContent className="pt-6">
                <form onSubmit={handleTrackPackage} className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Enter tracking number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="pl-10 py-6"
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-courier-primary hover:bg-courier-primary/90 text-white" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      'Track Package'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {error && (
              <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-200 text-center max-w-2xl mx-auto mb-8">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {packageDetails && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <h3 className="font-bold text-xl mb-4 text-center">Package Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Tracking Number</p>
                    <p className="font-medium">{packageDetails.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className="font-medium">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        packageDetails.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        packageDetails.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                        packageDetails.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {packageDetails.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Origin</p>
                    <p className="font-medium">{packageDetails.origin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Destination</p>
                    <p className="font-medium">{packageDetails.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Estimated Delivery</p>
                    <p className="font-medium">{packageDetails.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Weight</p>
                    <p className="font-medium">{packageDetails.weight} kg</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button onClick={handleViewFullDetails} variant="outline">
                    View Full Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Pakkit?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer industry-leading delivery services with a focus on speed, reliability, and customer satisfaction.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-courier-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
                <p className="text-gray-600">
                  Our efficient logistics network ensures your packages reach their destination quickly.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-courier-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-courier-success" />
                </div>
                <h3 className="font-bold text-xl mb-3">Reliable Service</h3>
                <p className="text-gray-600">
                  With a 99.8% on-time delivery rate, you can count on us for consistency.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-courier-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-6 w-6 text-courier-secondary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Secure Handling</h3>
                <p className="text-gray-600">
                  Your packages are handled with care and insured for extra peace of mind.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-courier-pending/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-courier-pending" />
                </div>
                <h3 className="font-bold text-xl mb-3">Global Coverage</h3>
                <p className="text-gray-600">
                  We deliver to over 200 countries with competitive international rates.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-courier-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Ship Your Package?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Join thousands of satisfied customers who trust Pakkit for their shipping needs.
            </p>
            <Link to="/get-started">
              <Button size="lg" className="bg-white text-courier-primary hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
