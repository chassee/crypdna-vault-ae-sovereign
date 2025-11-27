import React from 'react';
import { User, Vault, FileText, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PawLogo from '@/components/PawLogo';

const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
        window.location.hash = '/auth';
      }
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="luxury-card border-b border-border sticky top-0 z-50 luxury-transition backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold-dark via-luxury-gold to-luxury-gold-light rounded-2xl flex items-center justify-center shadow-xl shadow-luxury-gold/30 transform hover:scale-105 transition-all duration-300">
              <PawLogo className="w-7 h-7 text-luxury-black" size={28} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-luxury-gold via-white to-luxury-gold-light bg-clip-text text-transparent tracking-tight">
                CrypDNA
              </h1>
              <p className="text-xs text-foreground-secondary font-medium tracking-wide">Elite Vault</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-sm font-semibold luxury-transition hover:bg-destructive/90 hover:text-destructive-foreground border-border/50 hover:border-destructive/50 text-foreground-secondary px-4 py-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;