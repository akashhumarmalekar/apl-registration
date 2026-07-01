import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker for offline support + installability.
// Uses import.meta.env.BASE_URL so this works whether the app is served
// from a domain root (Vercel) or a subpath like /apl-registration/ (GitHub Pages).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = import.meta.env.BASE_URL;
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}
