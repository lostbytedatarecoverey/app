import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EnquiryProvider } from './components/EnquiryContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PickupAndDropPage } from './pages/PickupAndDropPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LocationPage } from './pages/LocationPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <EnquiryProvider>
        <Layout>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesHubPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pickup-and-drop" element={<PickupAndDropPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Legal & Policy Pages */}
            <Route path="/privacy-policy" element={<LegalPage docKey="privacy-policy" />} />
            <Route
              path="/terms-and-conditions"
              element={<LegalPage docKey="terms-and-conditions" />}
            />
            <Route path="/service-policy" element={<LegalPage docKey="service-policy" />} />
            <Route
              path="/data-handling-policy"
              element={<LegalPage docKey="data-handling-policy" />}
            />

            {/* Location Pages */}
            <Route
              path="/data-recovery-delhi"
              element={<LocationPage locationKey="data-recovery-delhi" />}
            />
            <Route
              path="/data-recovery-delhi-ncr"
              element={<LocationPage locationKey="data-recovery-delhi-ncr" />}
            />
            <Route
              path="/data-recovery-burari"
              element={<LocationPage locationKey="data-recovery-burari" />}
            />

            {/* All 17 Dedicated Service Pages */}
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </EnquiryProvider>
    </BrowserRouter>
  );
}
