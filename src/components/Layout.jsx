// src/components/Layout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { EnquiryProvider, useEnquiry } from '../context/EnquiryContext';
import EnquiryModal from './EnquiryModal';
import PageTransition from './motion/PageTransition';
import SplashCursor from './SplashCursor';
import ShinyText from './ShinyText';

// Sticky Button Component - WhatsApp only (Book Trial Ride removed from bottom)
const StickyButtons = () => {
  const waLink = "https://wa.me/918460846946?text=Hi%20Nakshath%20Equestrian%20Club!%20I'd%20like%20to%20book%20a%20test%20ride.";
  const [isExcluded, setIsExcluded] = useState(false);

  useEffect(() => {
    const zones = Array.from(document.querySelectorAll('.floating-action-exclusion'));
    if (!zones.length) return undefined;

    const visibleZones = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleZones.add(entry.target);
        else visibleZones.delete(entry.target);
      });
      setIsExcluded(visibleZones.size > 0);
    }, { threshold: 0.08 });

    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: isExcluded ? 0 : 1, scale: isExcluded ? 0.9 : 1, y: isExcluded ? 16 : 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={`fixed right-3 bottom-4 z-[90] flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[transform,opacity] hover:scale-110 hover:shadow-xl md:bottom-6 md:right-5 md:h-12 md:w-12 ${isExcluded ? 'pointer-events-none' : ''}`}
          aria-label="Chat on WhatsApp"
        >
          <svg className="h-5 w-5 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      </AnimatePresence>
    </>
  );
};

// ── SplashCursor wrapper — z-40 so it sits BEHIND the Navigation (z-50) ──
const BrandedSplashCursor = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 40,
      pointerEvents: 'none',
    }}
  >
    <SplashCursor
      RAINBOW_MODE={false}
      COLOR="#C9A227"
      SPLAT_FORCE={4000}
      SPLAT_RADIUS={0.15}
      DENSITY_DISSIPATION={2.5}
      VELOCITY_DISSIPATION={2}
      CURL={3}
      PRESSURE_ITERATIONS={20}
      SHADING={true}
      TRANSPARENT={true}
    />
  </div>
);

const Layout = () => {
  const location = useLocation();

  return (
    <EnquiryProvider>
      <div className="min-h-screen bg-[#FDFCFA] overflow-x-hidden font-sans">

        {/* SplashCursor — mount once, sits behind nav (z-40) */}
        <BrandedSplashCursor />
        

        <Navigation />
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
        <Footer />
        <EnquiryModal />
        <StickyButtons />
      </div>
    </EnquiryProvider>
  );
};

export default Layout;