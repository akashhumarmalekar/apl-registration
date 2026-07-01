import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import InstallPrompt from './components/InstallPrompt.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

const Admin = lazy(() => import('./pages/Admin.jsx'));

/**
 * Root application component.
 * Uses BrowserRouter so /admin is a clean URL. vercel.json includes a
 * catch-all rewrite to index.html so deep links and refreshes work on Vercel.
 * The admin dashboard (and its heavier dependencies like the Excel export
 * library) is code-split so players loading the public form never pay for it.
 */
export default function App() {
  return (
    <BrowserRouter>
      <InstallPrompt />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div className="page-loading"><LoadingSpinner /></div>}>
              <Admin />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
