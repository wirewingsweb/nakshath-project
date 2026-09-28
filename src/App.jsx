import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Horses = lazy(() => import('./pages/Horses'));
const Courses = lazy(() => import('./pages/Courses'));
const Trainers = lazy(() => import('./pages/Trainers'));
const Contact = lazy(() => import('./pages/Contact'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const RefundAndCancellation = lazy(() => import('./pages/RefundAndCancellation'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));

const PageFallback = () => (
  <div className="min-h-screen bg-[#0C0922]" role="status" aria-live="polite">
    <span className="sr-only">Loading page</span>
  </div>
);

const App = () => {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={300}>
      <Router>
        <ScrollToTop />
        <SEO />

        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Trial-ride campaign page - No Layout */}
            <Route path="/book-your-trial-ride" element={<LandingPage />} />
            <Route path="/landing" element={<Navigate to="/book-your-trial-ride" replace />} />

            {/* All other pages - With Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/horses" element={<Horses />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/refund-and-cancellation" element={<RefundAndCancellation />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Preserve existing bookmarks and previously shared legal-page links. */}
              <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
              <Route path="/refund" element={<Navigate to="/refund-and-cancellation" replace />} />
              <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>

      {/* Global toast notifications — Sonner */}
      <Toaster
        position="bottom-right"
        theme="light"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: '#0C0922',
            color: '#FDFCFA',
            border: '1px solid rgba(201,162,39,0.3)',
            fontFamily: 'Montserrat, sans-serif',
          },
          className: 'font-sans',
        }}
      />
    </TooltipProvider>
  );
};

export default App;