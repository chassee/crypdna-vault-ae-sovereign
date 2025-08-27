import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Auth from './Auth';

export default function AuthWrapper() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Auth />
      <Toaster />
    </ThemeProvider>
  );
}