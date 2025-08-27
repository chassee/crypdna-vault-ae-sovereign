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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Billionaire Email-Matching Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #2d1b69 50%, #1e293b 75%, #000000 100%)'
          }}
        />
        
        {/* Subtle Ambient Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, rgba(219, 39, 119, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20" style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(120px)'
          }} />
        </div>
        
        <div className="w-full max-w-md relative z-10">
          {/* Luxury Glassmorphism Card */}
          <div 
            className="p-8 rounded-3xl border relative overflow-hidden"
            style={{
              background: 'rgba(15, 15, 15, 0.7)',
              backdropFilter: 'blur(30px)',
              borderColor: 'rgba(139, 92, 246, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Subtle Inner Glow */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(219, 39, 119, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)'
              }}
            />
            
            <div className="relative space-y-8">
              {/* Billionaire Header */}
              <div className="text-center space-y-6">
                {/* Diamond Logo */}
                <div className="flex justify-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(219, 39, 119, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)',
                      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Email-Matching Gradient Title */}
                <div className="space-y-2">
                  <h1 
                    className="text-3xl font-black tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, #db2777 0%, #8b5cf6 50%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))'
                    }}
                  >
                    CrypDNA Vault
                  </h1>
                  <p className="text-gray-400 text-sm font-medium">
                    Billionaire-class financial ecosystem
                  </p>
                </div>
              </div>

              {/* Premium Form */}
              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 text-white placeholder-gray-500 border-0 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0"
                      style={{
                        background: 'rgba(30, 30, 30, 0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                        fontSize: '16px'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(139, 92, 246, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.3)';
                      }}
                      placeholder="Email address"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 text-white placeholder-gray-500 border-0 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0"
                      style={{
                        background: 'rgba(30, 30, 30, 0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                        fontSize: '16px'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(139, 92, 246, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.3)';
                      }}
                      placeholder="Password"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email-Matching Primary CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #db2777 0%, #8b5cf6 50%, #3b82f6 100%)',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4), 0 0 20px rgba(219, 39, 119, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.6), 0 0 30px rgba(219, 39, 119, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.4), 0 0 20px rgba(219, 39, 119, 0.3)';
                  }}
                >
                  <span className="relative z-10">
                    {loading ? 'Accessing...' : 'Access Billionaire Vault'}
                  </span>
                  {/* Subtle shimmer effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transform: 'translateX(-100%)',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </button>
              </form>

              {/* Minimalist Secondary Actions */}
              <div className="space-y-3 text-center">
                <div className="flex justify-center space-x-6 text-sm">
                  <button
                    onClick={handleMagicLink}
                    disabled={loading}
                    className="text-gray-400 hover:text-white transition-colors duration-300 disabled:opacity-50"
                  >
                    Send Magic Link
                  </button>
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={loading}
                    className="text-gray-400 hover:text-white transition-colors duration-300 disabled:opacity-50"
                  >
                    {isSignUp ? 'Sign In' : 'Create Account'}
                  </button>
                </div>
                
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="text-gray-500 hover:text-gray-400 text-xs transition-colors duration-300 disabled:opacity-50"
                >
                  Reset Password
                </button>
              </div>

              {/* Discreet Footer */}
              <div className="text-center pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-600 font-medium">
                  Access is restricted to verified billionaire-class members only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}