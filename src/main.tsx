// Build/version and boot guards
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const BUILD_VERSION = 'vault-' + String(Date.now());

// Force root to /#/auth before React mounts
if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#') {
  window.location.hash = '/auth';
}

// Unregister any existing service workers to avoid stale bundles
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(reg => reg.unregister()));
}
console.log('Build:', BUILD_VERSION);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
