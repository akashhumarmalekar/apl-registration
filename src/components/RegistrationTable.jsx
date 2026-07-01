import React, { useMemo, useState } from 'react';
import { deleteRegistration } from '../services/registrationService';

const COLUMNS = [
  { key: 'sno', label: 'Sr No', sortable: false },
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'attribute', label: 'Attribute', sortable: true },
  { key: 'contactNumber', label: 'Contact', sortable: true },
  { key: 'registeredAt', label: 'Registered', sortable: true },
  { key: 'actions', label: '', sortable: false }
];

function formatTime(date) {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date);
}

export default function RegistrationTable({ registrations, search }) {
  const [sortKey, setSortKey] = useState('registeredAt');
  const [sortDir, setSortDir] = useState('desc');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = registrations;
    if (term) {
      list = list.filter((r) =>
        [r.firstName, r.lastName, r.attribute, r.contactNumber]
          .join(' ')
          .toLowerCase()
          .includes(term)
      );
    }
    const sorted = [...list].sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === 'registeredAt') {
        av = av ? av.getTime() : 0;
        bv = bv ? bv.getTime() : 0;
      } else {
        av = (av || '').toString().toLowerCase();
        bv = (bv || '').toString().toLowerCase();
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [registrations, search, sortKey, sortDir]);

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteRegistration(pendingDelete.id);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  if (registrations.length === 0) {
    return <div className="admin-empty">No registrations yet — they'll appear here as soon as players sign up.</div>;
  }

  if (filtered.length === 0) {
    return <div className="admin-empty">No registrations match "{search}".</div>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col.key} onClick={() => col.sortable && handleSort(col.key)}>
                {col.label}
                {col.sortable && sortKey === col.key && (
                  <span className="sort-arrow">{sortDir === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((reg, index) => (
            <tr key={reg.id}>
              <td className="mono-cell">{index + 1}</td>
              <td>{reg.firstName}</td>
              <td>{reg.lastName}</td>
              <td><span className="role-badge">{reg.attribute}</span></td>
              <td className="mono-cell">{reg.contactNumber}</td>
              <td>{formatTime(reg.registeredAt)}</td>
              <td>
                <button className="row-delete-btn" onClick={() => setPendingDelete(reg)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pendingDelete && (
        <div className="confirm-backdrop" role="dialog" aria-modal="true">
          <div className="confirm-card">
            <h3>Remove this registration?</h3>
            <p>
              {pendingDelete.firstName} {pendingDelete.lastName} ({pendingDelete.contactNumber}) will be permanently
              removed. This can't be undone.
            </p>
            <div className="confirm-actions">
              <button className="confirm-cancel" onClick={() => setPendingDelete(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="confirm-delete" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Removing…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
