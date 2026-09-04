import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Facilities from './pages/Facilities';
import Horses from './pages/Horses';
import Courses from './pages/Courses';
import Trainers from './pages/Trainers';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundAndCancellation from './pages/RefundAndCancellation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LandingPage from './pages/Landing/LandingPage';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      
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
    </Router>
  );
};

export default App;
