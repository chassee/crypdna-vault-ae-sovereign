import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Reset from './Reset';

export default function ResetWrapper() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Reset />
      <Toaster />
    </ThemeProvider>
  );
}