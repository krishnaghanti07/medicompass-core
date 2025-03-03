
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HospitalsListPage from "./pages/HospitalsListPage";
import HospitalDetailPage from "./pages/HospitalDetailPage";
import CreateHospitalPage from "./pages/CreateHospitalPage";
import EditHospitalPage from "./pages/EditHospitalPage";
import HospitalDetailsPage from "./pages/HospitalDetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hospitals" element={<HospitalsListPage />} />
          <Route path="/hospitals/new" element={<CreateHospitalPage />} />
          <Route path="/hospitals/:id" element={<HospitalDetailPage />} />
          <Route path="/hospitals/edit/:id" element={<EditHospitalPage />} />
          <Route path="/hospitals/details/:id" element={<HospitalDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
