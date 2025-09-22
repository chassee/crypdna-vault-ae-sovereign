// src/pages/Reset.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function ResetPage() {
  const nav = useNavigate();
  const [stage, setStage] = useState<'waiting'|'ready'|'done'|'email'>('waiting');
  const [email, setEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
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
      redirectTo: window.location.origin + (window.location.hash ? '/#/reset' : '/reset'),
    });
    setLoading(false);
    if (error) alert(error.message);
    else {
      alert('Reset link sent. Check your email.');
      setStage('waiting');
    }
  };

  // 3) Update the password
  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPwd) return alert('Enter a new password.');
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPwd });
    setLoading(false);
    if (error) alert(error.message);
    else {
      setStage('done');
      setTimeout(() => nav('/vault'), 800);
    }
  };

  if (stage === 'waiting') return null;

  if (stage === 'email') {
    return (
      <div style={{maxWidth:420, margin:'64px auto', padding:24}}>
        <h2>Reset Your Password</h2>
        <p>Enter your email to get a reset link.</p>
        <form onSubmit={sendResetEmail} style={{display:'grid', gap:12}}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button disabled={loading} type="submit">Send Reset Link</button>
        </form>
      </div>
    );
  }

  if (stage === 'ready') {
    return (
      <div style={{maxWidth:420, margin:'64px auto', padding:24}}>
        <h2>Create New Password</h2>
        <form onSubmit={updatePassword} style={{display:'grid', gap:12}}>
          <input type="password" placeholder="New password" value={newPwd} onChange={e=>setNewPwd(e.target.value)} />
          <button disabled={loading} type="submit">Update Password</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{maxWidth:420, margin:'64px auto', padding:24}}>
      <h2>Password Updated</h2>
      <p>Taking you to your Vault…</p>
    </div>
  );
}
