import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import LoadingScreen from '../components/LoadingScreen';
import VaultDashboard from '../components/VaultDashboard'; // rename your component to this
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) navigate('/auth');
        setLoading(false);
      }
    );

    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) navigate('/auth');
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Signed out',
        description: 'You have been logged out.',
      });
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!user || !session) return null; // Redirects to /auth

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
      <VaultDashboard /> {/* main vault dashboard here */}
    </div>
  );
};

export default DashboardPage;
