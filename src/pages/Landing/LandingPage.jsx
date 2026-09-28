// src/pages/Landing/LandingPage.jsx
import { useState } from 'react';
import useLenis from '../../hooks/useLenis';
import {
  LoadingScreen,
  ScrollProgress,
  FixedBackground,
} from '../../components/scrollytelling';
import SplashCursor from '../../components/SplashCursor';
import ParticleField from '../../components/scrollytelling/ParticleField';
import HeroSection from './HeroSection';
import MoreThanFirstRide from './MoreThanFirstRide';
import FindYourPath from './FindYourPath';
import InvestmentSection from './InvestmentSection';
import NakshathDifference from './NakshathDifference';
import RisingBeyond from './RisingBeyond';
import TrialRideCTA from './TrialRideCTA';
import EnquiryModal from '../../components/EnquiryModal';
import { EnquiryProvider } from '../../context/EnquiryContext';

// ── SplashCursor wrapper — sits BEHIND nav but above background ──
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

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Lenis smooth scroll — disabled for reduced motion users automatically
  useLenis({ enabled: !isLoading });

  return (
    <EnquiryProvider>
      {/* SplashCursor — gold fluid trail over the landing page */}
      <BrandedSplashCursor />

      {/* Particle field — ambient gold particles behind everything.
          Mounts only after loading completes to avoid competing with the intro. */}
      {!isLoading && <ParticleField />}

      {/* Single fixed gradient background behind everything */}
      <FixedBackground />

      {/* Loading overlay — 2s branded intro */}
      {isLoading && (
        <LoadingScreen
          duration={2000}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Gold progress bar at top */}
      <ScrollProgress />

      {/* Page body */}
      <div className="relative min-h-screen font-sans text-[#F5F1E8]">
        <HeroSection />
        <MoreThanFirstRide />
        <FindYourPath />
        <InvestmentSection />
        <NakshathDifference />
        <RisingBeyond />
        <TrialRideCTA />
        <EnquiryModal />
      </div>
    </EnquiryProvider>
  );
};

export default LandingPage;