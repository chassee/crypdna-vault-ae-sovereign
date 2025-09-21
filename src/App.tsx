import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Reset from '@/pages/Reset';
import VaultDashboard from '@/pages/VaultDashboard';
import RequirePaid from '@/components/RequirePaid';
import { useUserRegion } from './hooks/useUserRegion';

export default function App() {
  // Pull region and language data
  const { region, languageCode, loading } = useUserRegion();

  // Show a loading screen while fetching region data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HashRouter>
      {/* Temporary test to confirm multilingual works */}
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <p>🌍 Current Language: {languageCode}</p>
        <p>📍 Region: {region?.name || 'No region set'}</p>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reset" element={<Reset />} />
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
