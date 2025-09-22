import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LuxuryThemeProvider } from '@/components/LuxuryThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LuxuryThemeProvider>
      <App />
    </LuxuryThemeProvider>
  </React.StrictMode>
);
