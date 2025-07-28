
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/Dashboard";
import VaultViewerPage from "./pages/VaultViewer";
import ViewerOnboarding from "./pages/ViewerOnboarding";
import VaultSignup from "./pages/VaultSignup";
import VaultLogin from "./pages/VaultLogin";
import VaultDashboard from "./pages/VaultDashboard";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vault-viewer" element={<VaultViewerPage />} />
          <Route path="/viewer-onboarding" element={<ViewerOnboarding />} />
        <Route path="/vault-signup" element={<VaultSignup />} />
        <Route path="/vault-login" element={<VaultLogin />} />
        <Route path="/vault-dashboard" element={<VaultDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
