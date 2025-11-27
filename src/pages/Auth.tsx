import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import PawLogo from '@/components/PawLogo';


const AUTH_REDIRECT = `${window.location.origin}/#/vault`;
const RESET_REDIRECT = 'https://vault.crypdawgs.com/#/reset-password';

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
        options: {
          emailRedirectTo: AUTH_REDIRECT
        }
      });

      if (error) throw error;

      toast({
        title: 'Magic link sent!',
        description: 'Check your inbox.'
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

      // Show confirmation: "If this email is registered, a reset link has been sent."
      toast({
        title: 'Reset link sent',
        description: 'If this email is registered, a reset link has been sent.'
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
      <div className="min-h-screen flex items-center justify-center bg-luxury-black relative overflow-hidden">
        {/* Premium Dubai luxury background with deep blacks and gold accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/20 via-luxury-black to-luxury-gold/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,158,46,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent_50%)]" />
        
        <div className="w-full max-w-lg p-8 space-y-8 relative z-10">
          {/* Premium logo with gold paw */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-luxury-gold-dark via-luxury-gold to-luxury-gold-light rounded-3xl flex items-center justify-center shadow-2xl shadow-luxury-gold/40 transform group-hover:scale-105 transition-all duration-500">
                  <PawLogo className="w-12 h-12 text-luxury-black" size={48} />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-luxury-purple to-luxury-purple-light rounded-full flex items-center justify-center shadow-xl shadow-luxury-purple/50 animate-pulse">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black bg-gradient-to-r from-luxury-gold via-white to-luxury-gold-light bg-clip-text text-transparent tracking-tight">
                CrypDNA Vault
              </h1>
              <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-md mx-auto">
                Enter the elite financial ecosystem reserved for the world's most distinguished members
              </p>
            </div>

            {/* Premium feature cards with better spacing */}
            <div className="grid grid-cols-3 gap-5 mt-10">
              <div className="p-6 bg-luxury-purple/20 border border-luxury-purple/30 rounded-2xl text-center space-y-4 backdrop-blur-sm hover:bg-luxury-purple/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-luxury-purple/40 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-purple-light" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 17H22V19H2V17M1.15 12.15L4 15L1.15 17.85L2.85 19.55L7.4 15L2.85 10.45L1.15 12.15M8 5H10V7H12V9H10V7H8V5Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">Elite Credit</div>
              </div>
              
              <div className="p-6 bg-luxury-gold/20 border border-luxury-gold/40 rounded-2xl text-center space-y-4 backdrop-blur-sm hover:bg-luxury-gold/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-luxury-gold/40 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-gold-light" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14L12 9L17 14H7Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">Instant Rewards</div>
              </div>
              
              <div className="p-6 bg-luxury-purple/20 border border-luxury-purple/30 rounded-2xl text-center space-y-4 backdrop-blur-sm hover:bg-luxury-purple/30 transition-all duration-300">
                <div className="w-12 h-12 mx-auto bg-luxury-purple/40 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-luxury-purple-light" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white tracking-wide">Military Grade</div>
              </div>
            </div>
          </div>

          {/* Premium form with enhanced spacing */}
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-7">
            <div className="space-y-4">
              <label className="text-base font-bold text-white tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-7 py-5 text-lg bg-luxury-charcoal/80 border-2 border-gray-700/50 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all"
                placeholder="Enter your exclusive email"
                disabled={loading}
              />
            </div>

            <div className="space-y-4">
              <label className="text-base font-bold text-white tracking-wide">
                Vault Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-7 py-5 text-lg bg-luxury-charcoal/80 border-2 border-gray-700/50 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all"
                placeholder="Enter your secure password"
                disabled={loading}
              />
            </div>

            {/* Premium gold gradient button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:from-luxury-gold hover:via-luxury-gold-light hover:to-luxury-gold text-luxury-black text-lg font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-luxury-gold/40 hover:shadow-luxury-gold/60 hover:scale-[1.02] transform"
            >
              <PawLogo className="w-6 h-6 text-luxury-black" size={24} />
              <span>
                {loading ? 'Accessing Vault...' : 'Enter Elite Vault'}
              </span>
            </button>
          </form>

          {/* Alternative actions with refined styling */}
          <div className="space-y-5">
            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full py-5 border-2 border-gray-600/50 bg-luxury-charcoal/50 rounded-2xl text-white text-base font-semibold hover:bg-luxury-charcoal/70 hover:border-luxury-gold/30 transition-all disabled:opacity-50 backdrop-blur-sm"
            >
              Send Magic Link
            </button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={loading}
              className="w-full py-5 border-2 border-luxury-purple/50 bg-luxury-purple/10 rounded-2xl text-white text-base font-semibold hover:bg-luxury-purple/20 hover:border-luxury-purple transition-all disabled:opacity-50 backdrop-blur-sm"
            >
              {isSignUp ? 'Already have access? Sign In' : 'Create Elite Account'}
            </button>

            <button
              onClick={() => { window.location.href = '/vault?guest=true'; }}
              disabled={loading}
              className="w-full text-base text-gray-400 hover:text-luxury-gold transition-colors disabled:opacity-50 text-center py-2 font-medium"
            >
              Browse as Guest →
            </button>

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-4 text-gray-400 text-sm hover:text-white transition-colors disabled:opacity-50 font-medium"
            >
              Reset Password
            </button>
          </div>

          {/* Premium footer */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Exclusive access for verified elite members worldwide
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
