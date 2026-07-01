import React, { useEffect, useState } from 'react';
import { subscribeToRegistrations } from '../services/registrationService';
import { exportRegistrationsToExcel } from '../services/exportService';
import RegistrationTable from './RegistrationTable.jsx';
import QRCodeDisplay from './QRCodeDisplay.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const ROLE_KEYS = ['Bhagat', 'Bowler', 'Batsman', 'All Rounder'];

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [exporting, setExporting] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToRegistrations(
      (data) => {
        setRegistrations(data);
        setLoading(false);
      },
      (err) => {
        setLoadError('Could not load live registrations: ' + err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  async function handleExport() {
    setExporting(true);
    try {
      await exportRegistrationsToExcel(registrations);
    } finally {
      setExporting(false);
    }
  }

  const roleCounts = ROLE_KEYS.map((role) => ({
    role,
    count: registrations.filter((r) => r.attribute === role).length
  }));

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar__row">
          <div>
            <p className="admin-topbar__subtitle">🏏 Tournament desk</p>
            <h1 className="admin-topbar__title">Anand Premier League — Admin</h1>
          </div>
          <button className="admin-logout" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="admin-body">
        <section className="admin-stats">
          <div className="stat-card">
            <p className="stat-card__value">{loading ? '—' : registrations.length}</p>
            <p className="stat-card__label">Total registrations</p>
          </div>
          {roleCounts.map(({ role, count }) => (
            <div className="stat-card" key={role}>
              <p className="stat-card__value">{loading ? '—' : count}</p>
              <p className="stat-card__label">{role}</p>
            </div>
          ))}
        </section>

        <QRCodeDisplay />

        <section className="admin-panel">
          <div className="admin-panel__header">
            <div className="admin-search">
              <input
                type="text"
                placeholder="Search by name, role or number…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="admin-export-btn" onClick={handleExport} disabled={exporting || registrations.length === 0}>
              {exporting ? <LoadingSpinner size={14} /> : '⬇'} Export to Excel
            </button>
          </div>

          {loading && (
            <div className="admin-empty">
              <LoadingSpinner /> Loading registrations…
            </div>
          )}
          {!loading && loadError && <div className="admin-empty">{loadError}</div>}
          {!loading && !loadError && <RegistrationTable registrations={registrations} search={search} />}
        </section>
      </main>
    </div>
  );
}
