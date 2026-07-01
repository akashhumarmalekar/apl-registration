import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ATTRIBUTE_OPTIONS, cleanText, validateRegistration, normalizePhone } from '../utils/validation';
import { createRegistration } from '../services/registrationService';
import LoadingSpinner from './LoadingSpinner';
import '../styles/form.css';

const EMPTY_FORM = { firstName: '', lastName: '', attribute: '', contactNumber: '' };

/**
 * The player registration form. Owns its own local state, validates on
 * submit (and re-validates a field once it's been touched), saves to
 * Supabase, and reports success back up via onRegistered.
 */
export default function RegistrationForm({ onRegistered }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [bannerError, setBannerError] = useState('');

  function updateField(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      const { errors: nextErrors } = validateRegistration(next);
      setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
    }
  }

  function markTouched(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const { errors: nextErrors } = validateRegistration(form);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  }

  function handlePhoneChange(value) {
    // Only allow digits to be typed at all, capped at 10.
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    updateField('contactNumber', digitsOnly);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBannerError('');

    const cleaned = {
      firstName: cleanText(form.firstName),
      lastName: cleanText(form.lastName),
      attribute: form.attribute,
      contactNumber: form.contactNumber
    };

    const { valid, errors: validationErrors } = validateRegistration(cleaned);
    setErrors(validationErrors);
    setTouched({ firstName: true, lastName: true, attribute: true, contactNumber: true });

    if (!valid) return;

    setSubmitting(true);
    try {
      const phone = normalizePhone(cleaned.contactNumber);
      await createRegistration({ ...cleaned, contactNumber: phone });
      onRegistered(cleaned.firstName);
      setForm(EMPTY_FORM);
      setErrors({});
      setTouched({});
    } catch (err) {
      setBannerError(err.message || 'Something went wrong while saving your registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-card">
      <div className="form-card__tear" />
      <h2 className="form-card__heading">Player registration</h2>
      <p className="form-card__subheading">All fields are required. Takes less than a minute.</p>

      {bannerError && (
        <div className="form-banner-error" role="alert">
          <span>⚠️</span>
          <span>{bannerError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field__label" htmlFor="firstName">
            First name<span className="required">*</span>
          </label>
          <input
            id="firstName"
            className={`field__input ${errors.firstName ? 'field__input--error' : ''}`}
            type="text"
            placeholder="e.g. Rohit"
            value={form.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            onBlur={() => markTouched('firstName')}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="field__error">⚠ {errors.firstName}</p>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="lastName">
            Last name<span className="required">*</span>
          </label>
          <input
            id="lastName"
            className={`field__input ${errors.lastName ? 'field__input--error' : ''}`}
            type="text"
            placeholder="e.g. Sharma"
            value={form.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            onBlur={() => markTouched('lastName')}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="field__error">⚠ {errors.lastName}</p>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="attribute">
            Playing role<span className="required">*</span>
          </label>
          <div className="field__select-wrap">
            <select
              id="attribute"
              className={`field__select ${errors.attribute ? 'field__select--error' : ''}`}
              value={form.attribute}
              onChange={(e) => updateField('attribute', e.target.value)}
              onBlur={() => markTouched('attribute')}
            >
              <option value="" disabled>Select your role</option>
              {ATTRIBUTE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {errors.attribute && <p className="field__error">⚠ {errors.attribute}</p>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="contactNumber">
            Contact number<span className="required">*</span>
          </label>
          <div className="field__phone-wrap">
            <span className="field__phone-prefix">+91</span>
            <input
              id="contactNumber"
              className={`field__input ${errors.contactNumber ? 'field__input--error' : ''}`}
              type="tel"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              value={form.contactNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => markTouched('contactNumber')}
              maxLength={10}
              autoComplete="tel-national"
            />
          </div>
          {errors.contactNumber ? (
            <p className="field__error">⚠ {errors.contactNumber}</p>
          ) : (
            <p className="field__hint">Digits only — used to confirm your spot, no spam.</p>
          )}
        </div>

        <div className="submit-row">
          <button type="submit" className="btn-register" disabled={submitting}>
            {submitting ? (
              <>
                <LoadingSpinner /> Saving…
              </>
            ) : (
              'Register Me'
            )}
          </button>
        </div>
      </form>

      <p className="form-footer-note">🏏 Anand Premier League · 14 September 2026 · 9 Star Turf</p>
      <Link className="admin-link" to="/admin">·</Link>
    </section>
  );
}
