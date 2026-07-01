// Validation helpers for the registration form.
// Pure functions only — no side effects — so they're easy to unit test.

/** Removes leading/trailing whitespace and collapses internal double spaces. */
export function cleanText(value) {
  return (value || '').trim().replace(/\s+/g, ' ');
}

/** True if the string contains at least one non-whitespace letter-ish character. */
export function isNonEmptyName(value) {
  const cleaned = cleanText(value);
  if (cleaned.length === 0) return false;
  // Allow letters (incl. accented), spaces, apostrophes and hyphens only.
  return /^[a-zA-Z\u00C0-\u017F'\-\s]+$/.test(cleaned);
}

/** Exactly 10 digits, no letters/symbols. Returns the cleaned digit string or null. */
export function normalizePhone(value) {
  const cleaned = cleanText(value).replace(/[\s-]/g, '');
  if (!/^\d{10}$/.test(cleaned)) return null;
  return cleaned;
}

export const ATTRIBUTE_OPTIONS = ['Bhagat', 'Bowler', 'Batsman', 'All Rounder'];

/**
 * Validates the full registration form.
 * @returns {{ valid: boolean, errors: Object<string,string> }}
 */
export function validateRegistration({ firstName, lastName, attribute, contactNumber }) {
  const errors = {};

  if (!isNonEmptyName(firstName)) {
    errors.firstName = 'Enter a valid first name (letters only).';
  }
  if (!isNonEmptyName(lastName)) {
    errors.lastName = 'Enter a valid last name (letters only).';
  }
  if (!ATTRIBUTE_OPTIONS.includes(attribute)) {
    errors.attribute = 'Select your playing role.';
  }
  const phone = normalizePhone(contactNumber);
  if (!phone) {
    errors.contactNumber = 'Enter a valid 10-digit mobile number (digits only).';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
