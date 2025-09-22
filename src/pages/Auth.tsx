// 📁 File: src/pages/Auth.tsx (FULL FILE DROP w/ security fix)

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // User will be redirected by the useEffect
    setLoading(false);
  };

  useEffect(() => {
    const checkUserAccess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      // Check if user exists in vault_members
      const { data: userData, error } = await supabase
        .from('vault_members')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', true)
        .maybeSingle();

      if (error || !userData) {
        await supabase.auth.signOut();
        alert('Access denied. Contact support for Vault access.');
      } else {
        navigate('/vault');
      }
    };

    checkUserAccess();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold glow-text mb-2">CrypDNA Vault</h1>
          <p className="text-purple-300">Secure Access Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-lg bg-white/10 border border-purple-500/30 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-lg bg-white/10 border border-purple-500/30 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 font-bold shadow-lg transition-all duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Accessing Vault...' : 'Access Vault'}
          </button>
          
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/30">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
