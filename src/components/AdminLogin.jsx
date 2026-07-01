import React, { useState } from 'react';

/**
 * Simple password gate for the admin dashboard.
 * NOTE: this is a lightweight deterrent (suitable for keeping casual
 * visitors out of a tournament desk view), not a substitute for real
 * authentication — the password lives in a build-time env variable and
 * is sent to the client. For stronger protection, pair this with
 * Row Level Security policies and/or Supabase Auth.
 */
export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const expected = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!expected) {
      setError('Admin password is not configured. Set VITE_ADMIN_PASSWORD in your environment.');
      return;
    }
    if (password === expected) {
      sessionStorage.setItem('apl_admin_authed', 'true');
      onSuccess();
    } else {
      setError('Incorrect password. Try again.');
    }
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <div className="admin-login-icon" aria-hidden="true">🔒</div>
        <h1>Admin access</h1>
        <p>Enter the tournament desk password to view registrations.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit">Enter dashboard</button>
        </form>
      </div>
    </div>
  );
}
