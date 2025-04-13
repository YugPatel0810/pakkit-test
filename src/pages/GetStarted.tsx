import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, User, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const GetStarted = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-courier-primary to-blue-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Started with Pakkit</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Follow these simple steps to start shipping with us and experience hassle-free delivery.
            </p>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-courier-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Create an Account</h2>
                    <p className="text-gray-600 mb-4">
                      Sign up for a free Pakkit account to access all our shipping services, track your packages, 
                      and manage your delivery preferences.
                    </p>
                    <Link to="/login">
                      <Button className="gap-2">
                        Create Account <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="w-full border-t border-gray-200 my-2"></div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-courier-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Schedule a Pickup or Drop-off</h2>
                    <p className="text-gray-600 mb-4">
                      Choose between scheduling a convenient pickup from your location or dropping off your package 
                      at one of our many service centers.
                    </p>
                    <Link to="/login">
                      <Button variant="outline" className="gap-2">
                        Schedule Service <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="w-full border-t border-gray-200 my-2"></div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-courier-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Track Your Package</h2>
                    <p className="text-gray-600 mb-4">
                      Once your package is in our system, you can track it in real-time through our website 
                      or mobile app. Receive notifications at every step of the delivery process.
                    </p>
                    <Link to="/track">
                      <Button variant="outline" className="gap-2">
                        Track Package <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Shipping Services</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-courier-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-courier-primary" />
                  </div>
                  <CardTitle>Standard Delivery</CardTitle>
                  <CardDescription>Affordable and reliable shipping</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-courier-primary" />
                      <span>3-5 business days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-courier-primary" />
                      <span>Up to 50 lbs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-courier-primary" />
                      <span>Basic tracking included</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-courier-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-courier-primary" />
                  </div>
                  <CardTitle>Express Delivery</CardTitle>
                  <CardDescription>Fast and guaranteed delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-courier-primary" />
                      <span>1-2 business days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-courier-primary" />
                      <span>Up to 70 lbs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-courier-primary" />
                      <span>Premium tracking & insurance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-courier-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-courier-primary" />
                  </div>
                  <CardTitle>Same-Day Delivery</CardTitle>
                  <CardDescription>Ultra-fast local delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-courier-primary" />
                      <span>Within hours (select areas)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-courier-primary" />
                      <span>Up to 30 lbs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-courier-primary" />
                      <span>Real-time tracking & updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
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
            <Link to="/login">
              <Button size="lg" className="bg-white text-courier-primary hover:bg-gray-100">
                Create an Account
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted;