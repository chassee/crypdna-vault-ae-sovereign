
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import LoadingScreen from '../components/LoadingScreen';
import Dashboard from '../components/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Shield, Database } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Check authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If user is authenticated, show the dashboard
  if (user && session) {
    return <Dashboard />;
  }

  // If not authenticated, show landing page with login option
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10 opacity-20"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CrypDNA Vault</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your secure gateway to the future of digital identity and cryptocurrency management. 
            Access your vault, manage your assets, and unlock exclusive benefits.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              <Lock className="w-5 h-5 mr-2" />
              Access Vault
            </Button>
            <Button 
              onClick={() => navigate('/viewer-onboarding')}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <CardTitle className="text-lg">Secure Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Military-grade encryption protects your digital assets and identity data.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <CardTitle className="text-lg">CrypDNA Files</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Unique digital DNA for identity verification and vault access.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Lock className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
              <CardTitle className="text-lg">Tier Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Unlock exclusive rewards and features based on your vault tier.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
