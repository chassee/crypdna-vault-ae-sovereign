import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const AUTH_REDIRECT = `${window.location.origin}/#/vault`;
const RESET_REDIRECT = 'https://vault.crypdawgs.com/#/reset';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parse email from URL params (?email=...)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  // If user is already authenticated (session or magic-link), go straight to /vault
  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      if (data.session) navigate('/vault', { replace: true });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (session) navigate('/vault', { replace: true });
    });

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe();
    };
  }, [navigate]);

  // Email + password sign-in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Missing info', description: 'Enter email and password.' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data?.user) {
        toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
        navigate('/vault', { replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign in failed.';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Email + password sign-up (verification email returns to /#/auth)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Missing info', description: 'Enter email and password.' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: AUTH_REDIRECT }
      });

      if (error) throw error;

      if (data?.user && !data.session) {
        toast({
          title: 'Check your email',
          description: 'Please check your email for a verification link.'
        });
      } else if (data?.session) {
        toast({ title: 'Welcome!', description: 'Account created and logged in.' });
        navigate('/vault', { replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed.';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Magic link login (sends email with hash-based redirect)
  const handleMagicLink = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Enter your email for magic link.' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: AUTH_REDIRECT }
      });

      if (error) throw error;

      toast({
        title: 'Magic link sent!',
        description: 'Check your email for the sign-in link.'
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send magic link.';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Password reset (sends email with hash-based redirect)
  const handleReset = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Enter your email to reset password.' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: RESET_REDIRECT
      });

      if (error) throw error;

      toast({
        title: 'Reset email sent!',
        description: 'Check your email for the password reset link.'
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email.';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
        background: 'radial-gradient(ellipse at top, hsl(262, 90%, 4%) 0%, hsl(0, 0%, 1%) 100%)'
      }}>
        {/* Subtle animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-luxury-purple/20 to-luxury-pink/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-luxury-blue/15 to-luxury-cyan/10 rounded-full blur-3xl animate-float" />
        </div>
        
        <div className="w-full max-w-lg p-8 space-y-8 relative z-10">
          {/* Billionaire Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 billionaire-card rounded-2xl flex items-center justify-center group">
                  <svg className="w-12 h-12 text-luxury-platinum" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-luxury-purple/20 via-luxury-pink/10 to-luxury-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 billionaire-card rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black font-billionaire" style={{
                background: 'linear-gradient(135deg, hsl(0, 0%, 98%) 0%, hsl(262, 90%, 75%) 30%, hsl(335, 78%, 70%) 70%, hsl(213, 92%, 70%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                CrypDNA Vault
              </h1>
              <p className="text-luxury-platinum/80 text-lg font-medium tracking-wide">
                Enter the billionaire-class financial ecosystem
              </p>
            </div>

            {/* High-end feature showcase */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="billionaire-card p-6 text-center space-y-3 group">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-luxury-purple/30 to-luxury-pink/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-luxury-purple" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 17H22V19H2V17M1.15 12.15L4 15L1.15 17.85L2.85 19.55L7.4 15L2.85 10.45L1.15 12.15M8 5H10V7H12V9H10V7H8V5Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">Elite Credit</div>
              </div>
              
              <div className="billionaire-card p-6 text-center space-y-3 group">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-luxury-blue/30 to-luxury-cyan/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-luxury-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14L12 9L17 14H7Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">Instant Rewards</div>
              </div>
              
              <div className="billionaire-card p-6 text-center space-y-3 group">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-luxury-gold/30 to-luxury-platinum/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">Military Grade</div>
              </div>
            </div>
          </div>

          {/* Luxury Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            <div className="space-y-3">
              <label className="text-base font-semibold text-luxury-platinum tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-lg luxury-input rounded-xl text-white font-medium tracking-wide"
                placeholder="Enter your exclusive email"
                disabled={loading}
                style={{ fontSize: '16px' }} // Prevent zoom on mobile
              />
            </div>

            <div className="space-y-3">
              <label className="text-base font-semibold text-luxury-platinum tracking-wide">
                Vault Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg luxury-input rounded-xl text-white font-medium tracking-wide"
                placeholder="Enter your secure password"
                disabled={loading}
                style={{ fontSize: '16px' }} // Prevent zoom on mobile
              />
            </div>

            {/* Billionaire Primary Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 luxury-button text-white text-lg font-bold rounded-xl flex items-center justify-center space-x-3 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, hsl(335, 78%, 62%) 0%, hsl(262, 90%, 60%) 50%, hsl(213, 92%, 60%) 100%)'
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
              </svg>
              <span>{loading ? 'Accessing...' : 'Access Billionaire Vault'}</span>
            </button>
          </form>

          {/* Luxury Secondary Actions */}
          <div className="space-y-4">
            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full py-4 ghost-button text-luxury-platinum text-base font-semibold rounded-xl tracking-wide disabled:opacity-50"
            >
              Send Magic Link
            </button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={loading}
              className="w-full py-4 ghost-button text-luxury-platinum text-base font-semibold rounded-xl tracking-wide disabled:opacity-50"
            >
              {isSignUp ? 'Already have access? Sign In' : 'Create Account'}
            </button>

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-3 text-luxury-platinum/70 text-sm hover:text-luxury-platinum transition-colors disabled:opacity-50 tracking-wide"
            >
              Reset Password
            </button>
          </div>

          {/* Exclusive Footer */}
          <div className="text-center">
            <p className="text-sm text-luxury-platinum/60 font-medium tracking-wide">
              Access is restricted to verified billionaire-class members only.
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}