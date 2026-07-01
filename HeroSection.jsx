import React, { useEffect, useState } from 'react';
import { generateQrDataUrl, getRegistrationUrl } from '../services/qrService';

/**
 * Renders the QR code that links to the live registration page,
 * for the organizer to display on their phone or print at the venue.
 */
export default function QRCodeDisplay() {
  const [dataUrl, setDataUrl] = useState(null);
  const url = getRegistrationUrl();

  useEffect(() => {
    let cancelled = false;
    generateQrDataUrl(url).then((result) => {
      if (!cancelled) setDataUrl(result);
    });
    return () => { cancelled = true; };
  }, [url]);

  function handleDownload() {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'APL-registration-qr.png';
    link.click();
  }

  return (
    <div className="qr-card">
      {dataUrl ? (
        <img src={dataUrl} alt="QR code linking to the registration page" />
      ) : (
        <div style={{ width: 140, height: 140, background: '#F7F5F0', borderRadius: 10 }} />
      )}
      <div className="qr-card__info">
        <h3>Scan to register</h3>
        <p className="qr-card__url">{url}</p>
        <button className="qr-card__download" onClick={handleDownload} disabled={!dataUrl}>
          Download QR
        </button>
      </div>
    </div>
  );
}
