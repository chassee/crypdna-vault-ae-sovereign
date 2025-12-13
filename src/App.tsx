export default function App() {
  return (
    <RegionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VaultDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/vault" element={<VaultDashboard />} />
          <Route path="/vault/*" element={<VaultDashboard />} />
          <Route path="*" element={<VaultDashboard />} />
        </Routes>
      </BrowserRouter>
    </RegionProvider>
  );
}
