import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden page-transition" style={{ background: '#121212' }}>
      {/* Premium Dark Background with Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-800/30"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/40 rounded-full sparkle-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full sparkle-animation" style={{animationDelay: '10s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full sparkle-animation" style={{animationDelay: '20s'}}></div>
      </div>
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="glassmorphism-auth w-full max-w-lg p-8 rounded-3xl">
          <div className="text-center pb-6">
            {/* Animated Vault Logo */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 vault-logo-pulse">
              <div className="diamond-logo">
                <div className="h-10 w-10 rotate-45 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-2xl"></div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
              CrypDNA Vault
            </h1>
            <p className="text-gray-400 text-lg">
              Access your billionaire-class crypto portfolio
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                required
              />
            </div>
            
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 amex-cta"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="luxury-spinner w-5 h-5"></div>
                  Processing...
                </div>
              ) : (
                isSignUp ? 'Create Billionaire Account' : 'Access Vault'
              )}
            </button>
          </div>

          <div className="pt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;