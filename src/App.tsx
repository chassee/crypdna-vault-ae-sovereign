import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VaultDashboard from '@/components/VaultDashboard'; // make sure this path matches your file

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  if (!user) {
    return <Auth />; // your login/signup page
  }

  return <VaultDashboard />; // 🚀 this forces login → Vault directly
}

export default App;
