import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import VaultDashboard from './VaultDashboard';

export default function VaultWrapper() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <VaultDashboard />
      <Toaster />
    </ThemeProvider>
  );
}