// src/pages/Home.jsx
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
import SectionDots from '../components/SectionDots';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFA] overflow-x-hidden font-sans">

      {/* Section dots — right edge, appears after Hero */}
      <SectionDots />

      {/* ── CHAPTER 1: Story ── */}
      <div id="chapter-story">
        <Hero />
        <TheDifference />
      </div>

      {/* ── CHAPTER 2: About ── */}
      <div id="chapter-about">
        <WhoWeAre />
        <WhoLeadsTheAcademy />
      </div>

      {/* ── CHAPTER 3: Facility ── */}
      <div id="chapter-facility">
        <ArenaFeatures />
      </div>

      {/* ── CHAPTER 4: Programs ── */}
      <div id="chapter-programs">
        <Programs />
        <HowItProgresses />
      </div>

      {/* ── CHAPTER 5: Campus ── */}
      <div id="chapter-campus">
        <TheCampus />
      </div>

      {/* ── CHAPTER 6: Horses ── */}
      <div id="chapter-horses">
        <OurHorses />
        <WhyRiding />
      </div>

      {/* ── CHAPTER 7: Team ── */}
      <div id="chapter-team">
        <WhoTeaches />
      </div>

      {/* ── CHAPTER 8: Visit ── */}
      <div id="chapter-visit">
        <OpeningSeason />
        <WhereWeAre />
      </div>

    </div>
  );
};

export default Home;