import React, { useEffect, useState } from 'react';
import '../styles/installPrompt.css';

/**
 * Listens for the browser's install prompt event and shows a small,
 * dismissible banner so users can add the app to their home screen.
 */
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!visible) return null;

  const handleInstall = async () => {
    setVisible(false);
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <div className="install-banner" role="dialog" aria-label="Install app">
      <div className="install-banner__text">
        <strong>Install APL Registration</strong>
        <span>Add it to your home screen for one-tap access.</span>
      </div>
      <div className="install-banner__actions">
        <button className="install-banner__dismiss" onClick={() => setVisible(false)}>Not now</button>
        <button className="install-banner__install" onClick={handleInstall}>Install</button>
      </div>
    </div>
  );
}
