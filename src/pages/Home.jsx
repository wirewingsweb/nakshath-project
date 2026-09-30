import React from 'react';

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

      {/* Sections — Each wrapped with an id for SectionProgress navigation */}

      <div id="hero">
        <Hero />
      </div>

      <div id="difference">
        <TheDifference />
      </div>

      <div id="whoweare">
        <WhoWeAre />
      </div>

      <div id="founder">
        <WhoLeadsTheAcademy />
      </div>

      <div id="arena">
        <ArenaFeatures />
      </div>

      <div id="programs">
        <Programs />
      </div>

      <div id="progression">
        <HowItProgresses />
      </div>

      {/* <InternationalClinics /> */}

      <div id="campus">
        <TheCampus />
      </div>

      <div id="horses">
        <OurHorses />
      </div>

      <div id="whyriding">
        <WhyRiding />
      </div>

      <div id="whoteaches">
        <WhoTeaches />
      </div>

      <div id="season">
        <OpeningSeason />
      </div>

      <div id="location">
        <WhereWeAre />
      </div>

    </div>
  );
};

export default Home;