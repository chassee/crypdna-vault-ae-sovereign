// Build/version and boot guards
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const BUILD_VERSION = 'vault-' + String(Date.now());
console.log('Build:', BUILD_VERSION);

// If opening the app without a hash, land on /auth before React mounts
const hasMagicParams =
  window.location.search.includes('type=') ||
  window.location.search.includes('access_token') ||
  window.location.hash.includes('type=') ||
  window.location.hash.includes('access_token');

if (!hasMagicParams && (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#')) {
  window.location.hash = '/auth';
}

// Unregister any existing service workers to avoid stale cached UI
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
