import React, { useMemo } from 'react';
import '../styles/modal.css';

const CONFETTI_COLORS = ['#D4AF37', '#F2C94C', '#1F7A4D', '#FFFFFF'];

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 1.1 + Math.random() * 0.6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360
      })),
    []
  );

  return (
    <div
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`
          }}
        />
      ))}
    </div>
  );
}

/**
 * Success popup shown after a registration is saved.
 * Calling onClose() also signals the caller to clear the form.
 */
export default function SuccessModal({ firstName, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <div className="modal-card">
        <ConfettiBurst />
        <div className="modal-ball" aria-hidden="true" />
        <h2 className="modal-title" id="success-title">🎉 Congratulations!</h2>
        <p className="modal-message">
          {firstName ? <strong>{firstName}</strong> : 'You'} has been registered for the{' '}
          <strong>Anand Premier League</strong> 🎉🎉
        </p>
        <button className="modal-ok-btn" onClick={onClose} autoFocus>
          OK
        </button>
      </div>
    </div>
  );
}
