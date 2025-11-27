import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';


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
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Luxury dark background with subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
        
        <div className="w-full max-w-lg p-8 space-y-8 relative z-10">
          {/* Crisp gradient header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-cyan-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                CrypDNA Vault
              </h1>
              <p className="text-gray-300 text-base font-medium">
                Enter the billionaire-class financial ecosystem
              </p>
            </div>

            {/* High-contrast feature cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-5 bg-purple-900/40 border border-purple-500/30 rounded-xl text-center space-y-3 backdrop-blur-sm">
                <div className="w-10 h-10 mx-auto bg-purple-500/30 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 17H22V19H2V17M1.15 12.15L4 15L1.15 17.85L2.85 19.55L7.4 15L2.85 10.45L1.15 12.15M8 5H10V7H12V9H10V7H8V5Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white">Elite Credit</div>
              </div>
              
              <div className="p-5 bg-cyan-900/40 border border-cyan-500/30 rounded-xl text-center space-y-3 backdrop-blur-sm">
                <div className="w-10 h-10 mx-auto bg-cyan-500/30 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14L12 9L17 14H7Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white">Instant Rewards</div>
              </div>
              
              <div className="p-5 bg-yellow-900/40 border border-yellow-500/30 rounded-xl text-center space-y-3 backdrop-blur-sm">
                <div className="w-10 h-10 mx-auto bg-yellow-500/30 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white">Military Grade</div>
              </div>
            </div>
          </div>

          {/* Large, high-contrast form */}
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            <div className="space-y-3">
              <label className="text-base font-bold text-white">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="Enter your exclusive email"
                disabled={loading}
              />
            </div>

            <div className="space-y-3">
              <label className="text-base font-bold text-white">
                Vault Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="Enter your secure password"
                disabled={loading}
              />
            </div>

            {/* Neon gradient button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white text-lg font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/60 hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
              </svg>
              <span>
                {loading ? 'Accessing...' : 'Access Billionaire Vault'}
              </span>
            </button>
          </form>

          {/* Alternative actions with high contrast */}
          <div className="space-y-4">
            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full py-4 border-2 border-gray-600 bg-gray-800/50 rounded-xl text-white text-base font-semibold hover:bg-gray-700/50 hover:border-gray-500 transition-all disabled:opacity-50"
            >
              Send Magic Link
            </button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={loading}
              className="w-full py-4 border-2 border-purple-600 bg-purple-900/30 rounded-xl text-white text-base font-semibold hover:bg-purple-800/40 hover:border-purple-500 transition-all disabled:opacity-50"
            >
              {isSignUp ? 'Already have access? Sign In' : 'Create Account'}
            </button>

            <button
              onClick={() => { window.location.href = '/vault?guest=true'; }}
              disabled={loading}
              className="w-full text-sm text-gray-300 underline hover:text-gray-100 transition-colors disabled:opacity-50 text-center"
            >
              Browse as Guest
            </button>

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-3 text-gray-300 text-sm hover:text-white transition-colors disabled:opacity-50"
            >
              Reset Password
            </button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-400 font-medium">
              Access is restricted to verified billionaire-class members only.
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
