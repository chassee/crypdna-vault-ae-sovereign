import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import VaultDashboard from "@/pages/VaultDashboard";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/vault" element={<VaultDashboard />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </HashRouter>
  );
}
