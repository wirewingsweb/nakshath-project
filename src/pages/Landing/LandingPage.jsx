import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import MoreThanFirstRide from './MoreThanFirstRide';
import FindYourPath from './FindYourPath';
import InvestmentSection from './InvestmentSection';
import NakshathDifference from './NakshathDifference';
import RisingBeyond from './RisingBeyond';
import TrialRideCTA from './TrialRideCTA';
import EnquiryModal from '../../components/EnquiryModal';
import { EnquiryProvider } from '../../context/EnquiryContext';

const LandingPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Book Your Trial Ride';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <EnquiryProvider>
      <div className="min-h-screen bg-[#FDFCFA] font-sans">
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
