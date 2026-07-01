// QR code service: renders a QR code pointing at the deployed app URL,
// so it can be displayed on the organizer's phone for players to scan.

import QRCode from 'qrcode';

/**
 * Resolves the URL the QR code should encode.
 * Prefers an explicit VITE_APP_URL (set this to your Vercel production URL),
 * falling back to the current origin so it still works in local/dev preview.
 */
export function getRegistrationUrl() {
  return import.meta.env.VITE_APP_URL || window.location.origin;
}

/** Returns a PNG data URL of the QR code for the given text. */
export async function generateQrDataUrl(text, options = {}) {
  return QRCode.toDataURL(text, {
    width: options.width || 320,
    margin: 1,
    color: {
      dark: options.dark || '#0B1F3A',
      light: options.light || '#FFFFFF'
    },
    errorCorrectionLevel: 'M'
  });
}
