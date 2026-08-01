import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Static Customer Portal Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Results } from './pages/Results';
import { CertificateVerification } from './pages/CertificateVerification';
import { Contact } from './pages/Contact';
import { HelpCenter } from './pages/HelpCenter';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';

// Dedicated Admin Portal
import { AdminPortal } from './pages/admin/AdminPortal';

// Error Page
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Customer Portal Routes (No Admin Components or Logic) */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetails />} />
            <Route path="/results" element={<Results />} />
            <Route path="/verify" element={<CertificateVerification />} />
            <Route path="/verify/:id" element={<CertificateVerification />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Dedicated Admin Portal Route */}
            <Route path="/admin-portal" element={<AdminPortal />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
