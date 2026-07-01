import React, { useState } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';
import SuccessModal from '../components/SuccessModal.jsx';

export default function Home() {
  const [successName, setSuccessName] = useState(null);

  return (
    <div className="page">
      <HeroSection />
      <div className="page__inner">
        <RegistrationForm onRegistered={(firstName) => setSuccessName(firstName)} />
      </div>

      {successName !== null && (
        <SuccessModal firstName={successName} onClose={() => setSuccessName(null)} />
      )}
    </div>
  );
}
