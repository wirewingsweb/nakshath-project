import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion'; // Removed - not needed

// Import all sections
import Hero from '../components/sections/Hero';
import TheDifference from '../components/sections/TheDifference';
import WhoWeAre from '../components/sections/WhoWeAre';
import WhoLeadsTheAcademy from '../components/sections/WhoLeadsTheAcademy';
import ArenaFeatures from '../components/sections/ArenaFeatures';
import Programs from '../components/sections/Programs';
import HowItProgresses from '../components/sections/HowItProgresses';
// import InternationalClinics from '../components/sections/InternationalClinics';
import TheCampus from '../components/sections/TheCampus';
import OurHorses from '../components/sections/OurHorses';
import WhyRiding from '../components/sections/WhyRiding';
import WhoTeaches from '../components/sections/WhoTeaches';
import OpeningSeason from '../components/sections/OpeningSeason';
import WhereWeAre from '../components/sections/WhereWeAre';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFA] overflow-x-hidden font-sans">
      
      {/* REMOVED: Floating WhatsApp Button - Layout.jsx already provides this globally */}
      
      {/* Sections */}
      <Hero />
      <TheDifference />
      <WhoWeAre />
      <WhoLeadsTheAcademy />
      <ArenaFeatures />
      <Programs />
      <HowItProgresses />
      {/* <InternationalClinics /> */}
      <TheCampus />
      <OurHorses />
      <WhyRiding />
      <WhoTeaches />
      <OpeningSeason />
      <WhereWeAre />
    </div>
  );
};

export default Home;
