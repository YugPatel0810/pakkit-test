import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Clock, DollarSign, Heart, Users, TrendingUp, Coffee } from 'lucide-react';

const Careers = () => {
  const openPositions = [
    {
      title: "Delivery Driver",
      location: "Multiple Locations",
      type: "Full-time",
      department: "Operations",
      description: "Join our team of delivery professionals to ensure packages reach customers safely and on time."
    },
    {
      title: "Customer Service Representative",
      location: "Remote",
      type: "Full-time / Part-time",
      department: "Customer Support",
      description: "Help our customers track packages, resolve issues, and provide exceptional service."
    },
    {
      title: "Logistics Coordinator",
      location: "Mumbai, India",
      type: "Full-time",
      department: "Operations",
      description: "Optimize delivery routes and ensure efficient package handling across our network."
    },
    {
      title: "Software Engineer",
      location: "Bangalore, India",
      type: "Full-time",
      department: "Technology",
      description: "Build and maintain the technology that powers our delivery platform."
    },
    {
      title: "Marketing Specialist",
      location: "Delhi, India",
      type: "Full-time",
      department: "Marketing",
      description: "Create and execute marketing strategies to grow our customer base."
    },
    {
      title: "Warehouse Associate",
      location: "Multiple Locations",
      type: "Full-time / Part-time",
      department: "Operations",
      description: "Sort, scan, and prepare packages for delivery in our distribution centers."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-courier-primary to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Build your career with Pakkit and help us revolutionize the delivery industry.
            </p>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Pakkit?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                <p className="text-gray-600">
                  We're growing rapidly, creating plenty of opportunities for career advancement.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Benefits</h3>
                <p className="text-gray-600">
                  Health insurance, retirement plans, and other benefits to support your wellbeing.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inclusive Culture</h3>
                <p className="text-gray-600">
                  We celebrate diversity and create an environment where everyone can thrive.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-courier-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-8 w-8 text-courier-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Work-Life Balance</h3>
                <p className="text-gray-600">
                  Flexible schedules and policies that respect your time outside of work.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-courier-primary" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-courier-primary" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4 text-courier-primary" />
                          <span>{position.department}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-2">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Application Process</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="relative pl-20 pb-12">
                  <div className="absolute left-0 w-16 h-16 bg-courier-primary text-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Apply Online</h3>
                  <p className="text-gray-600">
                    Browse our open positions and submit your application through our careers portal.
                  </p>
                </div>
                
                <div className="relative pl-20 pb-12">
                  <div className="absolute left-0 w-16 h-16 bg-courier-primary text-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Initial Screening</h3>
                  <p className="text-gray-600">
                    Our recruitment team will review your application and reach out if there's a good match.
                  </p>
                </div>
                
                <div className="relative pl-20 pb-12">
                  <div className="absolute left-0 w-16 h-16 bg-courier-primary text-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interviews</h3>
                  <p className="text-gray-600">
                    Depending on the role, you'll participate in 1-3 interviews with team members and managers.
                  </p>
                </div>
                
                <div className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 bg-courier-primary text-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Welcome to Pakkit!</h3>
                  <p className="text-gray-600">
                    If selected, you'll receive an offer and begin your onboarding journey with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-courier-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Explore our open positions and take the first step toward a rewarding career at Pakkit.
            </p>
            <Button size="lg" className="bg-white text-courier-primary hover:bg-gray-100">
              View All Positions
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;