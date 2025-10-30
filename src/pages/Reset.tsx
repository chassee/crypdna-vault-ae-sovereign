// src/pages/Reset.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

export default function ResetPage() {
  const nav = useNavigate();
  const [stage, setStage] = useState<'waiting'|'ready'|'done'|'email'>('waiting');
  const [email, setEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // 1) Check if we landed here with a reset token session
  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      if (data.session) setStage('ready'); // user has reset session, show password form
      else setStage('email'); // fallback: show request reset email form
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setStage('ready');
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // 2) Fallback: allow sending reset email manually
  const sendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + (window.location.hash ? '/#/reset-password' : '/reset-password'),
    });
    setLoading(false);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else {
      toast({ title: 'Reset link sent', description: 'Check your email.' });
      setStage('waiting');
    }
  };

  // 3) Update the password
  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPwd || !confirmPwd) {
      toast({ title: 'Missing fields', description: 'Enter and confirm your new password.' });
      return;
    }
    if (newPwd !== confirmPwd) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Your password has been updated.' });
      setStage('done');
      // Redirect to login screen (/auth) after successful reset
      setTimeout(() => nav('/auth'), 1500); 
    }
  };

  if (stage === 'waiting') return null;

  if (stage === 'email') {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
          <div className="w-full max-w-lg p-8 space-y-8 relative z-10">
            <h2 className="text-2xl font-bold text-white text-center">Reset Your Password</h2>
            <p className="text-gray-300 text-center">Enter your email to get a reset link.</p>
            <form onSubmit={sendResetEmail} className="space-y-6">
              <input 
                type="email"
                placeholder="Email" 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                className="w-full px-6 py-4 text-lg bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                disabled={loading}
              />
              <button 
                disabled={loading} 
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white text-lg font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/60 hover:scale-[1.02]"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    );
  }

  if (stage === 'ready') {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
          <div className="w-full max-w-lg p-8 space-y-8 relative z-10">
            <h2 className="text-2xl font-bold text-white text-center">Create New Password</h2>
            <p className="text-gray-300 text-center">Enter and confirm your new Vault password.</p>
            <form onSubmit={updatePassword} className="space-y-6">
              <input 
                type="password" 
                placeholder="New password" 
                value={newPwd} 
                onChange={e=>setNewPwd(e.target.value)} 
                className="w-full px-6 py-4 text-lg bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                disabled={loading}
              />
              <input 
                type="password" 
                placeholder="Confirm password" 
                value={confirmPwd} 
                onChange={e=>setConfirmPwd(e.target.value)} 
                className="w-full px-6 py-4 text-lg bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                disabled={loading}
              />
              <button 
                disabled={loading} 
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white text-lg font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/60 hover:scale-[1.02]"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="w-full max-w-lg p-8 space-y-8 relative z-10 text-center">
          <h2 className="text-2xl font-bold text-white">Password Updated</h2>
          <p className="text-gray-300">Redirecting you to the login screen...</p>
        </div>
      </div>
    </ThemeProvider>
  );
}
