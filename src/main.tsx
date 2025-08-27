import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BUILD_VERSION } from './version';
import App from './App';

console.log('Build:', BUILD_VERSION);

// Boot guard: always land on /#/auth from root
if (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#') {
  window.location.hash = '/auth';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
