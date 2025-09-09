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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) setEmail(emailParam);
  }, []);

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

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Missing info', description: 'Enter email and password.' });
      return;
    }
    setLoading(true);
    try {
      const method = isSignUp ? supabase.auth.signUp : supabase.auth.signInWithPassword;
      const args = isSignUp
        ? { email, password, options: { emailRedirectTo: AUTH_REDIRECT } }
        : { email, password };
      const { data, error } = await method(args);
      if (error) throw error;
      if (data?.user && !data.session) {
        toast({ title: 'Check your email', description: 'Email verification sent.' });
      } else {
        toast({ title: 'Success', description: isSignUp ? 'Account created.' : 'Logged in.' });
        navigate('/vault', { replace: true });
      }
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Authentication failed.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Enter your email.' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: AUTH_REDIRECT } });
      if (error) throw error;
      toast({ title: 'Magic link sent!', description: 'Check your email.' });
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Magic link failed.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) {
      toast({ title: 'Email required', description: 'Enter your email.' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: RESET_REDIRECT });
      if (error) throw error;
      toast({ title: 'Reset email sent!', description: 'Check your inbox.' });
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Reset failed.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <form onSubmit={handleAuth} className="w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-white text-center">CrypDNA Vault</h1>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white" disabled={loading} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white" disabled={loading} />
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded font-bold" disabled={loading}>
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <button type="button" onClick={handleMagicLink} className="w-full text-sm text-purple-300">Send Magic Link</button>
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-sm text-white">
            {isSignUp ? 'Already a member? Sign In' : 'Need an account? Sign Up'}
          </button>
          <button type="button" onClick={handleReset} className="w-full text-xs text-gray-400">Forgot password?</button>
        </form>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
