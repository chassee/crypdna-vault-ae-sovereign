import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function Reset() {
  const [ready, setReady] = useState(false);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    // When user clicks the email link, Supabase sets a recovery session.
    const sub = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true);
    });

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setReady(true);
    })();

    return () => sub.data.subscription.unsubscribe();
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (pw1.length < 8) return alert('Password must be at least 8 characters.');
    if (pw1 !== pw2) return alert('Passwords do not match.');

    const { error } = await supabase.auth.updateUser({ password: pw1 });
    if (error) alert(error.message);
    else {
      alert('Password updated.');
      nav('/dashboard', { replace: true });
    }
  }

  if (!ready)
    return <div style={{ padding: 24 }}>Open the reset link from your email to continue…</div>;

  return (
    <div style={{ maxWidth: 420, margin: '64px auto', padding: 24 }}>
      <h1>Set a new password</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="new password"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
        />
        <input
          type="password"
          placeholder="repeat new password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: 12 }}
        />
        <button type="submit" style={{ width: '100%' }}>Update password</button>
      </form>
    </div>
  );
}
