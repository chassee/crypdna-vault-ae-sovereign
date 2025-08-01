import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LuxuryThemeProvider } from './components/LuxuryThemeProvider'

createRoot(document.getElementById("root")!).render(
  <LuxuryThemeProvider>
    <App />
  </LuxuryThemeProvider>
);
