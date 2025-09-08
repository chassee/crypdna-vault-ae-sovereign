import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';
import RequirePaid from '@/components/RequirePaid'; // <-- add this

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset" element={<Reset />} />

        {/* Only allow paid members into /vault */}
        <Route
          path="/vault"
          element={
            <RequirePaid>
              <VaultDashboard />
            </RequirePaid>
          }
        />

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
