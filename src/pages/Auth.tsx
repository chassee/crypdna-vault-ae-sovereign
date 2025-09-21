// 📁 File: src/pages/Auth.tsx (FULL FILE DROP w/ security fix)

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus('Sending magic link...');

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setStatus('Check your email for the magic link.');
    setLoading(false);
  };

  useEffect(() => {
    const checkUserAccess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: userData, error } = await supabase
        .from('paid_customers')
        .select('*')
        .eq('email', session.user.email.toLowerCase())
        .single();

      if (error || !userData) {
        await supabase.auth.signOut();
        alert('Access denied. Contact support for Vault access.');
      } else {
        navigate('/vault');
      }
    };

    checkUserAccess();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-4">Access CrypDNA Vault</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 font-bold shadow-lg"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
        {status && <p className="text-green-400 text-sm">{status}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
