import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Pakkit Expands Service to 10 New Cities",
      date: "June 15, 2025",
      summary: "We're excited to announce our expansion into 10 new cities across India, bringing our fast and reliable delivery services to even more customers.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Expansion"
    },
    {
      id: 2,
      title: "New Same-Day Delivery Option Now Available",
      date: "May 28, 2025",
      summary: "We've launched our new same-day delivery service in select metropolitan areas, allowing customers to receive their packages within hours of shipping.",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Service Update"
    },
    {
      id: 3,
      title: "Pakkit Mobile App Gets Major Update",
      date: "May 10, 2025",
      summary: "Our mobile app has been completely redesigned with new features including live package tracking, delivery time estimates, and easier scheduling.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Technology"
    },
    {
      id: 4,
      title: "Pakkit Partners with Major E-commerce Platforms",
      date: "April 22, 2025",
      summary: "We're proud to announce new partnerships with several major e-commerce platforms, making it easier for online sellers to ship with Pakkit.",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Partnership"
    },
    {
      id: 5,
      title: "Introducing Eco-Friendly Packaging Options",
      date: "April 5, 2025",
      summary: "As part of our commitment to sustainability, we're rolling out new eco-friendly packaging options made from recycled and biodegradable materials.",
      image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Sustainability"
    },
    {
      id: 6,
      title: "Pakkit Achieves 1 Million Deliveries Milestone",
      date: "March 18, 2025",
      summary: "We're thrilled to announce that we've successfully completed our one millionth delivery! Thank you to all our customers for your trust and support.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Milestone"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-courier-primary to-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Stay informed about the latest developments, services, and announcements from Pakkit.
            </p>
          </div>
        </section>
        
        {/* Featured News */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={newsItems[0].image} 
                  alt={newsItems[0].title} 
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-courier-primary">
                  <Calendar className="h-4 w-4" />
                  <span>{newsItems[0].date}</span>
                </div>
                <h2 className="text-3xl font-bold">{newsItems[0].title}</h2>
                <p className="text-gray-600 text-lg">
                  {newsItems[0].summary}
                </p>
                <Button className="mt-4">
                  Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* News Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Recent Updates</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.slice(1).map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-courier-primary">{item.category}</span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.summary}</p>
                    <Link to={`/news/${item.id}`} className="text-courier-primary font-medium hover:underline flex items-center">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Press Releases */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Press Releases</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  title: "Pakkit Secures $10M in Series A Funding",
                  date: "February 10, 2025",
                  summary: "Funding will accelerate expansion and technology development"
                },
                {
                  title: "Pakkit Named 'Delivery Service of the Year'",
                  date: "January 25, 2025",
                  summary: "Industry recognition for excellence in logistics and customer service"
                },
                {
                  title: "Pakkit Launches New Sustainability Initiative",
                  date: "December 12, 2024",
                  summary: "Commitment to carbon-neutral operations by 2027"
                }
              ].map((release, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{release.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                  <p className="text-gray-600">{release.summary}</p>
                  <Link to={`/press/${index + 1}`} className="text-courier-primary font-medium hover:underline inline-block mt-3">
                    Read Press Release
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <section className="py-16 bg-courier-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-courier-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;