import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCourier } from '@/context/CourierContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Save } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from '@/components/ui/use-toast';
import { saveAs } from 'file-saver';

const Packages = () => {
  const { packages } = useCourier();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setIsDialogOpen(true);
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text('Pakkit - Packages List', 14, 22);
      doc.setFontSize(11);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Define the table columns and rows
      const tableColumn = ["Tracking #", "Customer", "Origin", "Destination", "Status"];
      const tableRows = packages.map(pkg => [
        pkg.trackingNumber,
        pkg.customerName,
        pkg.origin,
        pkg.destination,
        pkg.status
      ]);
      
      // Generate the table
      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `pakkit-packages-list-${timestamp}.pdf`;
      
      // Save the PDF to user's device
      doc.save(filename);
      
      // Convert PDF to blob for server storage
      const pdfBlob = doc.output('blob');
      
      // Save to project directory using fetch API
      const formData = new FormData();
      formData.append('file', pdfBlob, filename);
      
      // Send to server endpoint that handles file storage
      const response = await fetch('/api/save-pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        toast({
          title: "PDF Generated Successfully",
          description: "The PDF has been downloaded and saved to the project directory.",
          variant: "default",
        });
      } else {
        throw new Error('Failed to save PDF to server');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "There was a problem generating or saving the PDF.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1">Packages Management</h1>
              <p className="text-gray-500">Overview of all packages and their statuses.</p>
            </div>
            <Button 
              onClick={handleDownloadPDF} 
              className="bg-courier-primary hover:bg-courier-primary/90"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Save className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-semibold">Packages List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map(pkg => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.trackingNumber}</TableCell>
                      <TableCell>{pkg.customerName}</TableCell>
                      <TableCell>{pkg.origin}</TableCell>
                      <TableCell>{pkg.destination}</TableCell>
                      <TableCell>{pkg.status}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(pkg)}>View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />

      {/* Package Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Package Details</DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <div className="grid gap-4 py-4">
              <div>
                <strong>Tracking Number:</strong> {selectedPackage.trackingNumber}
              </div>
              <div>
                <strong>Customer Name:</strong> {selectedPackage.customerName}
              </div>
              <div>
                <strong>Email:</strong> {selectedPackage.customerEmail}
              </div>
              <div>
                <strong>Origin:</strong> {selectedPackage.origin}
              </div>
              <div>
                <strong>Destination:</strong> {selectedPackage.destination}
              </div>
              <div>
                <strong>Status:</strong> {selectedPackage.status}
              </div>
              <div>
                <strong>Estimated Delivery:</strong> {selectedPackage.estimatedDelivery}
              </div>
              <div>
                <strong>Weight:</strong> {selectedPackage.weight} kg
              </div>
              <div>
                <strong>Description:</strong> {selectedPackage.description}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Packages;