import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';
import '../styles/admin.css';

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('apl_admin_authed') === 'true');

  function handleLogout() {
    sessionStorage.removeItem('apl_admin_authed');
    setAuthed(false);
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
