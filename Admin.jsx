/* ============================================================
   Registration form card
   ============================================================ */

.form-card {
  background: var(--white);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  margin-top: -28px;
  position: relative;
  padding: var(--space-6) var(--space-5) var(--space-7);
  box-shadow: var(--shadow-md);
}

.form-card__tear {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent 10px,
    var(--cream-100) 10px,
    var(--cream-100) 11px
  );
  opacity: 0;
}

.form-card__heading {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 26px;
  letter-spacing: 0.01em;
  color: var(--ink);
  margin: 0 0 var(--space-1);
}

.form-card__subheading {
  font-size: 14px;
  color: var(--ink-muted);
  margin: 0 0 var(--space-6);
}

.field {
  margin-bottom: var(--space-5);
}

.field__label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: var(--space-2);
  letter-spacing: 0.01em;
}

.field__label .required {
  color: var(--green-500);
  margin-left: 2px;
}

.field__input,
.field__select {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--cream-100);
  border: 1.5px solid transparent;
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.18s ease, background 0.18s ease;
  appearance: none;
}

.field__input::placeholder {
  color: rgba(11, 31, 58, 0.38);
}

.field__input:focus,
.field__select:focus {
  border-color: var(--navy-700);
  background: var(--white);
  box-shadow: 0 0 0 4px rgba(11, 31, 58, 0.08);
}

.field__input--error,
.field__select--error {
  border-color: var(--danger);
  background: var(--danger-bg);
}

.field__select-wrap {
  position: relative;
}

.field__select-wrap::after {
  content: '▾';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-muted);
  pointer-events: none;
  font-size: 13px;
}

.field__error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: var(--danger);
  margin-top: var(--space-2);
  font-weight: 600;
}

.field__hint {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: var(--space-2);
}

.field__phone-wrap {
  display: flex;
  align-items: stretch;
  gap: 8px;
}

.field__phone-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  background: var(--cream-100);
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--ink-muted);
  font-size: 15px;
}

.submit-row {
  margin-top: var(--space-6);
}

.btn-register {
  width: 100%;
  padding: 18px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--navy-900);
  background: linear-gradient(135deg, var(--gold-400), var(--gold-500));
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(212, 175, 55, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

.btn-register:active {
  transform: scale(0.98);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-footer-note {
  text-align: center;
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: var(--space-4);
}

.form-banner-error {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--danger-bg);
  border: 1px solid rgba(194, 69, 69, 0.25);
  color: var(--danger);
  font-size: 13.5px;
  font-weight: 600;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-5);
}

.admin-link {
  display: block;
  text-align: center;
  margin-top: var(--space-6);
  font-size: 11px;
  color: rgba(11, 31, 58, 0.25);
  text-decoration: none;
}
