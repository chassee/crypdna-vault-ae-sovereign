import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navigation from "./components/Navigation";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/Dashboard";
import VaultViewerPage from "./pages/VaultViewer";
import ViewerOnboarding from "./pages/ViewerOnboarding";
import VaultSignup from "./pages/VaultSignup";
import VaultLogin from "./pages/VaultLogin";
import VaultDashboard from "./pages/VaultDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Reset from "./pages/Reset";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global nav with theme toggle + logout */}
          <Navigation />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vault-viewer"
              element={
                <ProtectedRoute>
                  <VaultViewerPage />
                </ProtectedRoute>
              }
            />

            <Route path="/viewer-onboarding" element={<ViewerOnboarding />} />
            <Route path="/vault-signup" element={<VaultSignup />} />
            <Route path="/vault-login" element={<VaultLogin />} />

            <Route
              path="/vault-dashboard"
              element={
                <ProtectedRoute>
                  <VaultDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/reset" element={<Reset />} />

            {/* Keep this last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
