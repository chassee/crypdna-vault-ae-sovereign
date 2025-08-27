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
        {/* Email-Exact Background: Deep Black to Violet */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(219, 39, 119, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%),
              linear-gradient(135deg, #000000 0%, #1a0033 30%, #2d1b69 60%, #0f0f23 100%)
            `
          }}
        />
        
        {/* Subtle Neon Ambient Glows - Email Style */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Pink glow - left side */}
          <div 
            className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(219, 39, 119, 0.4) 0%, rgba(219, 39, 119, 0.1) 40%, transparent 70%)',
              filter: 'blur(80px)'
            }} 
          />
          {/* Blue/Purple glow - right side */}
          <div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)',
              filter: 'blur(80px)'
            }} 
          />
        </div>
        
        <div className="w-full max-w-md relative z-10">
          {/* Premium Digital Credit Card Style Glassmorphism */}
          <div 
            className="p-10 rounded-3xl border relative overflow-hidden"
            style={{
              background: `
                rgba(10, 10, 15, 0.75),
                linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(219, 39, 119, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%)
              `,
              backdropFilter: 'blur(40px) saturate(150%)',
              borderImage: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(219, 39, 119, 0.2), rgba(59, 130, 246, 0.3)) 1',
              boxShadow: `
                0 32px 64px -12px rgba(0, 0, 0, 0.9),
                0 0 0 1px rgba(139, 92, 246, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 60px rgba(139, 92, 246, 0.2)
              `
            }}
          >
            {/* Subtle Premium Inner Glow */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(219, 39, 119, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(219, 39, 119, 0.06) 50%, rgba(59, 130, 246, 0.08) 100%)
                `
              }}
            />
            
            <div className="relative space-y-10">
              {/* Oversized Luxury Header - Email Style */}
              <div className="text-center space-y-8">
                {/* Premium Diamond Logo */}
                <div className="flex justify-center">
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
                    style={{
                      background: `
                        linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(219, 39, 119, 0.25) 50%, rgba(59, 130, 246, 0.25) 100%)
                      `,
                      boxShadow: `
                        0 12px 40px rgba(139, 92, 246, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                  >
                    <svg className="w-10 h-10 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Oversized Email-Exact Gradient Title */}
                <div className="space-y-4">
                  <h1 
                    className="text-5xl font-black tracking-tight leading-tight"
                    style={{
                      background: 'linear-gradient(135deg, #db2777 0%, #8b5cf6 50%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))',
                      textShadow: '0 0 60px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    CrypDNA Vault
                  </h1>
                  <p className="text-gray-300 text-base font-medium tracking-wide">
                    Billionaire-class financial ecosystem
                  </p>
                </div>
              </div>

              {/* Premium Form */}
              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-8">
                <div className="space-y-5">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 text-white placeholder-gray-400 border-0 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0"
                      style={{
                        background: 'rgba(20, 20, 25, 0.7)',
                        backdropFilter: 'blur(15px)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)';
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
                      className="w-full px-6 py-4 text-white placeholder-gray-400 border-0 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0"
                      style={{
                        background: 'rgba(20, 20, 25, 0.7)',
                        backdropFilter: 'blur(15px)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05)';
                      }}
                      placeholder="Password"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email-Identical Primary CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 text-white font-bold text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #db2777 0%, #8b5cf6 50%, #3b82f6 100%)',
                    boxShadow: `
                      0 12px 40px rgba(139, 92, 246, 0.5), 
                      0 0 30px rgba(219, 39, 119, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `
                      0 20px 60px rgba(139, 92, 246, 0.7), 
                      0 0 40px rgba(219, 39, 119, 0.5),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `
                      0 12px 40px rgba(139, 92, 246, 0.5), 
                      0 0 30px rgba(219, 39, 119, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `;
                  }}
                >
                  <span className="relative z-10">
                    {loading ? 'Accessing...' : 'Access Billionaire Vault'}
                  </span>
                  {/* Enhanced shimmer effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      transform: 'translateX(-100%)',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </button>
              </form>

              {/* Slim Minimalist Secondary Ghost Links */}
              <div className="space-y-4 text-center">
                <div className="flex justify-center space-x-8 text-sm">
                  <button
                    onClick={handleMagicLink}
                    disabled={loading}
                    className="text-gray-400 hover:text-white transition-all duration-300 disabled:opacity-50 relative group font-medium"
                    style={{
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 10px rgba(139, 92, 246, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    Send Magic Link
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={loading}
                    className="text-gray-400 hover:text-white transition-all duration-300 disabled:opacity-50 relative group font-medium"
                    style={{
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 10px rgba(139, 92, 246, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {isSignUp ? 'Sign In' : 'Create Account'}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </div>
                
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="text-gray-500 hover:text-gray-300 text-xs transition-all duration-300 disabled:opacity-50 relative group"
                  style={{
                    letterSpacing: '0.2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = '0 0 8px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  Reset Password
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-pink-400/50 to-blue-400/50 group-hover:w-full transition-all duration-300"></span>
                </button>
              </div>

              {/* Discreet Micro-Footer */}
              <div className="text-center pt-6 border-t border-gray-800/50">
                <p 
                  className="text-xs font-medium"
                  style={{
                    color: 'rgba(156, 163, 175, 0.7)',
                    letterSpacing: '0.5px'
                  }}
                >
                  Secure entry for billionaire-class members only.
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