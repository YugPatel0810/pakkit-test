import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Package, Award, Users, Globe, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-courier-primary to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About Pakkit</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're on a mission to revolutionize package delivery with speed, reliability, and exceptional customer service.
            </p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Package className="h-12 w-12 text-courier-primary" />
              </div>
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Founded in 2020, Pakkit began with a simple idea: make package delivery more efficient, transparent, and customer-friendly. 
                  Our founders, experienced logistics professionals, saw the frustrations people faced with traditional shipping services and 
                  decided to create a solution that leverages technology to provide a better experience.
                </p>
                <p>
                  What started as a small operation serving a single city has now grown into a nationwide network with international shipping capabilities. 
                  Throughout our growth, we've remained committed to our core values of reliability, transparency, and customer satisfaction.
                </p>
                <p>
                  Today, Pakkit handles millions of packages annually, serving both individual customers and businesses of all sizes. 
                  We continue to innovate and expand our services, always with the goal of making shipping as seamless as possible.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from the technology we develop to the customer support we provide.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Customer First</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We continuously listen to feedback and improve our services accordingly.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We embrace technology and innovative solutions to make package delivery faster, more reliable, and more convenient.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-courier-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">5M+</div>
                <div className="text-white/80">Packages Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-white/80">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-white/80">On-Time Delivery</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Customer Support</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Jane Doe</h3>
                <p className="text-courier-primary">CEO & Co-Founder</p>
                <p className="text-gray-600 mt-2">
                  15+ years in logistics and supply chain management
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">John Smith</h3>
                <p className="text-courier-primary">CTO & Co-Founder</p>
                <p className="text-gray-600 mt-2">
                  Former tech lead at major e-commerce platforms
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-courier-primary">COO</p>
                <p className="text-gray-600 mt-2">
                  Expert in operational excellence and customer experience
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;