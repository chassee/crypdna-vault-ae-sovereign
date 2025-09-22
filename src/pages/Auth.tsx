// 📁 File: src/pages/Auth.tsx
// 🔹 Cleaned version — NO magic link, NO login screen

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  // Auto-redirect straight to the Vault
  useEffect(() => {
    navigate('/vault');
  }, [navigate]);

  return null; // Nothing renders on this page
}
