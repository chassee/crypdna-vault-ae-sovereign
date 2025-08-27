import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Because we use HashRouter, redirects MUST include `#/`
const AUTH_REDIRECT  = 'https://vault.crypdawgs.com/#/auth';
const RESET_REDIRECT = 'https://vault.crypdawgs.com/#/reset';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Sign up for CrypDNA Vault' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="space-y-3">
          <button
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            Send Magic Link
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            Reset Password
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:text-primary/80"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}