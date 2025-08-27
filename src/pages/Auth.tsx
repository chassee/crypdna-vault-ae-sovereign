import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const AUTH_REDIRECT = `${window.location.origin}/#/vault`;
const RESET_REDIRECT = `${window.location.origin}/#/reset`;

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
        options: { 
          emailRedirectTo: AUTH_REDIRECT,
          data: {
            // Security: No sensitive data in client-side user metadata
          }
        }
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
          emailRedirectTo: AUTH_REDIRECT,
          shouldCreateUser: false // Security: Don't auto-create accounts via magic link
        }
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-black">
        
        <div className="w-full max-w-md relative z-10 p-6">
          <div className="text-center space-y-8">
            {/* Diamond Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                </svg>
                <div className="absolute -top-2 -right-2">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 
                className="text-4xl font-black tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #ffd9a3 0%, #ffb27b 25%, #ff6bcc 50%, #8f7bff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                🔒 CrypDNA Vault
              </h1>
              <p className="text-gray-300 text-sm">
                Enter the billionaire-class financial ecosystem
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-purple-500 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 5h20v14H2V5zm2 2v10h16V7H4z"/>
                    <path d="M6 9h4v2H6V9zm6 0h6v2h-6V9z"/>
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">Elite</div>
                <div className="text-xs font-medium text-white">Credit</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-yellow-500 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">Instant</div>
                <div className="text-xs font-medium text-white">Rewards</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-gray-400 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <div className="text-xs font-medium text-white">Military</div>
                <div className="text-xs font-medium text-white">Grade</div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your exclusive email"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Vault Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your secure password"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-white font-bold text-lg rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #ff6bcc 0%, #7a5cff 50%, #3b3bf5 100%)'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                </svg>
                {loading ? 'Accessing...' : 'Access Billionaire Vault'}
              </button>
            </form>

            {/* Secondary Actions */}
            <div className="space-y-2 text-center">
              <div className="flex justify-center space-x-4 text-sm">
                <button
                  onClick={handleMagicLink}
                  disabled={loading}
                  className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  Send Magic Link
                </button>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={loading}
                  className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </div>
              
              <button
                onClick={handleReset}
                disabled={loading}
                className="text-gray-500 hover:text-gray-300 text-xs transition-colors disabled:opacity-50"
              >
                Reset Password
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-400">
                Access is restricted to verified billionaire-class members only.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}