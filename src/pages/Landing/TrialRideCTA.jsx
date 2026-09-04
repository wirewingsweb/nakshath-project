import React from 'react';
import { useEnquiry } from '../../context/EnquiryContext';

const TrialRideCTA = () => {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="relative w-full bg-[#0C0922] overflow-hidden py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-20">
      <img 
        src="/come and ride.png" 
        alt="Trial Background" 
        className="absolute inset-0 w-full h-full object-cover object-[72%_center] z-0 brightness-[1.08] contrast-[1.08] saturate-[1.12] md:object-right md:brightness-100 md:contrast-[1.1] md:saturate-[1.14]"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0C0922]/76 via-[#0C0922]/46 to-[#0C0922]/14 md:from-[#0C0922]/55 md:via-[#0C0922]/32 md:to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start md:items-start justify-center min-h-[400px] md:min-h-[500px]">
        <div className="flex flex-col max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,.76)]">
          <h2 className="type-page-title text-white mb-4 leading-tight">
            Come and sit<br/>
            on a horse.
          </h2>
          <p className="type-lead text-white/95 mb-10">
            Ten minutes, no charge, no obligation.
          </p>
          <button
            type="button"
            onClick={() => openEnquiry('Trial Ride')}
            className="type-button bg-[#C9A227] text-[#0C0922] px-10 py-4 rounded-full hover:bg-white transition-colors shadow-lg w-max"
          >
            Book Your Trial Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialRideCTA;


