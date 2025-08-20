// src/components/ResetPassword.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  useEffect(() => {
    // Supabase sends a recovery session when user clicks the email link.
    setReady(true);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password !== password2) {
      alert('Passwords must match.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert('Password updated! You can now sign in.');
      window.location.assign('/auth'); // change if your login path is different
    }
  };

  if (!ready) return null;

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Set a new password</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>
        Enter your new password below.
      </p>
      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8 }}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 12, borderRadius: 8 }}
        >
          {loading ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </div>
  );
}
