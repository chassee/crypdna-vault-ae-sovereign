// src/pages/Auth.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// 🔗 Because you’re using HashRouter, redirects must include `#/`
const AUTH_REDIRECT  = 'https://vault.crypdawgs.com/#/auth';
const RESET_REDIRECT = 'https://vault.crypdawgs.com/#/reset';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 🔁 If the user arrives already authenticated (magic link), skip to /vault
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
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  // 🔐 Password sign-in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data?.user) {
        toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
        navigate('/vault', { replace: true });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Sign in failed.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // ✳️ Email + password sign-up (verification email returns to /auth)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: AUTH_REDIRECT, // IMPORTANT
        },
      });
      if (error) throw error;

      toast({
        title: 'Account created!',
        description: 'Check your email to verify, then log in.',
      });
      setIsSignUp(false);
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Sign up failed.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // 🪄 Magic link (passwordless) → email returns to /auth
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: AUTH_REDIRECT,
        },
      });
      if (error) throw error;

      toast({ title: 'Magic link sent', description: 'Check your email.' });
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Could not send magic link.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Forgot password → reset email returns to /reset
  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) return toast({ title: 'Enter your email first.' });

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: RESET_REDIRECT,
      });
      if (error) throw error;

      toast({ title: 'Reset link sent', description: 'Check your email.' });
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Could not send reset link.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // === UI ===
  return (
    <div className="min-h-screen relative overflow-hidden page-transition" style={{ background: '#121212' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-800/30" />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/40 rounded-full sparkle-animation" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full sparkle-animation" style={{ animationDelay: '10s' }} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full sparkle-animation" style={{ animationDelay: '20s' }} />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="glassmorphism-auth w-full max-w-lg p-8 rounded-3xl">
          <div className="text-center pb-6">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600/30 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 vault-logo-pulse">
              <div className="diamond-logo">
                <div className="h-10 w-10 rotate-45 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-2xl" />
              </div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
              CrypDNA Vault
            </h1>
            <p className="text-gray-400 text-lg">Access your billionaire-class financial ecosystem</p>
          </div>

          {/* AUTH FORMS */}
          <form className="space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 px-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                required
              />
              {!isSignUp && (
                <div className="text-right">
                  <a href="#" onClick={handleForgotPassword} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 amex-cta"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="luxury-spinner w-5 h-5" />
                  Processing...
                </div>
              ) : (
                isSignUp ? 'Create Billionaire Account' : 'Access Vault'
              )}
            </button>
          </form>

          {/* Magic link option */}
          {!isSignUp && (
            <form onSubmit={handleMagicLink} className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 border border-purple-600/60 hover:border-purple-500/80 text-purple-200 hover:text-white rounded-xl transition-all"
              >
                Send Magic Link
              </button>
            </form>
          )}

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
