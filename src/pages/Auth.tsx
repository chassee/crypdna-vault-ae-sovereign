import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // App.tsx listens to auth state and swaps to <VaultDashboard /> on success.
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    // no navigate here; App.tsx onAuthStateChange will render the dashboard
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // after email confirmation, send them back to your site
        emailRedirectTo: ${window.location.origin},
      },
    });
    setLoading(false);
    if (error) alert(error.message);
    else alert('Check your email to confirm your account, then sign in.');
  }

  async function handleForgot() {
    if (!email) return alert('Enter your email first.');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: ${window.location.origin},
    });
    setLoading(false);
    if (error) alert(error.message);
    else alert('Password reset link sent. Check your email.');
  }

  return (
    <div style={{ maxWidth: 420, margin: '64px auto', padding: 24 }}>
      <h1>CRYPDNA Vault Access</h1>

      <form onSubmit={handleSignIn}>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
          required
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
          required
        />
        <button type="submit" disabled={loading} style={{ width: '100%', marginBottom: 8 }}>
          {loading ? '…' : 'Sign in'}
        </button>
      </form>

      <button onClick={handleSignUp} disabled={loading} style={{ width: '100%', marginBottom: 8 }}>
        Create account
      </button>

      <button onClick={handleForgot} disabled={loading} style={{ width: '100%' }}>
        Forgot password
      </button>
    </div>
  );
}
