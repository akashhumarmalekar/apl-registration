import React from 'react';
import '../styles/spinner.css';

/** Small inline spinner used inside buttons while a save is in progress. */
export default function LoadingSpinner({ size = 18 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
