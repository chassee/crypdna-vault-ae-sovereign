// src/pages/Reset.tsx
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabaseClient' // adjust path if yours is different

export default function Reset() {
  return (
    <div className="max-w-md mx-auto py-16">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        view="update_password"   // 👈 forces the Reset Password view
        showLinks={false}
      />
    </div>
  )
}
