import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-courier-primary to-blue-700 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Find answers to common questions about our delivery services and processes.
            </p>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">How do I track my package?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  You can track your package by entering your tracking number in the tracking form on our homepage or track page. 
                  The tracking number is provided to you via email when your package is dispatched. You can also track your package 
                  through your account dashboard if you have an account with us.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">What are your delivery hours?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  Our standard delivery hours are from 8:00 AM to 8:00 PM, Monday through Saturday. 
                  Sunday deliveries are available in select areas for an additional fee. You can specify 
                  delivery preferences when scheduling your shipment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">How much does shipping cost?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  Shipping costs vary based on package weight, dimensions, destination, and selected service level. 
                  You can get an instant quote by using our shipping calculator on the website or by contacting our 
                  customer service team. We offer competitive rates and volume discounts for business customers.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">What if my package is lost or damaged?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  All packages are automatically insured up to $100. If your package is lost or damaged, please 
                  contact our customer service within 7 days of the expected delivery date. We'll investigate the 
                  issue and process a claim. Additional insurance coverage is available for purchase for high-value items.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">Do you ship internationally?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  Yes, we ship to over 200 countries worldwide. International shipping times vary by destination, 
                  typically ranging from 3-14 business days. All international shipments include tracking and 
                  insurance. Please note that customs duties and taxes may apply and are the responsibility of the recipient.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">Can I change the delivery address after shipping?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  Yes, you can request an address change for packages that haven't been delivered yet. There may be 
                  an additional fee for this service, depending on when the request is made. Please contact our 
                  customer service as soon as possible to request an address change.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">What packaging should I use?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  We recommend using sturdy packaging appropriate for your item's size and fragility. We offer a 
                  range of packaging materials for purchase at our locations, or you can use your own. Make sure 
                  items are well-protected with appropriate cushioning and that boxes are securely sealed.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">How do I schedule a pickup?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  You can schedule a pickup through your account dashboard, our mobile app, or by calling customer 
                  service. Pickups can be scheduled same-day if requested before noon, or in advance. Regular pickup 
                  schedules can also be arranged for business customers.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-9" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">What items are prohibited from shipping?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  Prohibited items include but are not limited to: hazardous materials, illegal substances, firearms, 
                  ammunition, live animals, perishable foods without proper packaging, and certain valuables. Please 
                  check our complete prohibited items list on our website or contact customer service if you're unsure.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-10" className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium px-4">Do you offer express delivery options?</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600">
                  Yes, we offer several express delivery options including same-day delivery (in select urban areas), 
                  next-day delivery, and 2-day delivery. Express options are available for both domestic and international 
                  shipments, though service availability varies by location.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Our customer support team is here to help you with any other questions you might have.
              </p>
              <a href="/contact" className="text-courier-primary font-medium hover:underline">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;