import React from 'react';
import HeroSection from './HeroSection';
import MoreThanFirstRide from './MoreThanFirstRide';
import FindYourPath from './FindYourPath';
import InvestmentSection from './InvestmentSection';
import NakshathDifference from './NakshathDifference';
import RisingBeyond from './RisingBeyond';
import TrialRideCTA from './TrialRideCTA';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <HeroSection />
      <MoreThanFirstRide />
      <FindYourPath />
      <InvestmentSection />
      <NakshathDifference />
      <RisingBeyond />
      <TrialRideCTA />
    </div>
  );
};

export default LandingPage;