
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CourierProvider } from "./context/CourierContext";
import Index from "./pages/Index";
import Track from "./pages/Track";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import GetStarted from "./pages/GetStarted";
import Careers from "./pages/Careers";
import News from "./pages/News";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import AdminSettings from "./pages/AdminSettings";
import AdminCouriers from "./pages/AdminCouriers";
import Analytics from './pages/Analytics';
import Packages from './pages/Packages';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CourierProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/track" element={<Track />} />
            <Route path="/track/:trackingNumber" element={<Track />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/news" element={<News />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/admin/couriers" element={<AdminCouriers />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/packages" element={<Packages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CourierProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
