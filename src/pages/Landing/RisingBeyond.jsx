import React from 'react';
import { GiHorseHead, GiHorseshoe } from 'react-icons/gi';
import { useEnquiry } from '../../context/EnquiryContext';

const RisingBeyond = () => {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="relative w-full bg-[#F2F0EB] py-24 overflow-hidden">
      
      {/* Background Image - Rider on White Horse (Right Side) */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:inset-0 sm:h-auto">
        <img 
          src="/rising-beyond-bg.png" 
          alt="Rider on White Horse" 
          className="w-full h-full object-cover object-[76%_center] brightness-[.94] contrast-[1.08] saturate-[1.08] sm:object-right sm:brightness-[.86] sm:contrast-[1.14] sm:saturate-[1.12]"
        />
        {/* Gradient overlay to make left side lighter for content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0EB]/40 via-[#F2F0EB]/62 to-[#F2F0EB] sm:bg-gradient-to-r sm:from-[#F2F0EB]/70 sm:via-[#F2F0EB]/30 sm:to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Content is on the LEFT side */}
        <div className="max-w-xl">
          
          {/* Final Booking Label */}
          <div className="flex items-center gap-3 mb-4">
            <h4 className="type-eyebrow text-[#C9A227]">Final Booking</h4>
            <div className="h-[1px] w-12 bg-[#C9A227]/40"></div>
          </div>

          {/* Rising Beyond Every Jump - Mixed Color Serif */}
          <h2 className="type-page-title mb-6">
            <span className="text-[#1A1A1A]">Rising Beyond</span><br/>
            <span className="text-[#C9A227]">Every Jump</span>
          </h2>
          
          {/* Divider Line */}
          <div className="w-16 h-[2px] bg-[#C9A227]/40 mb-6"></div>

          {/* Subtitle */}
          <p className="type-lead text-[#1A1A1A]/90 mb-10">
            Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
          </p>

          {/* Two Trial Cards - White Background, Side by Side */}
          <div className="flex items-start gap-4 mb-10">
            
            {/* Free Trial Ride Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center">
              {/* Horseshoe Icon */}
              <div className="flex justify-center mb-3">
                <GiHorseshoe aria-hidden="true" className="h-11 w-11 text-[#C9A227]" />
              </div>
              
              <p className="type-eyebrow text-[#1A1A1A] mb-2">Free Trial Ride</p>
              
              <div className="type-page-title text-[#1A1A1A] mb-1">10</div>
              <p className="type-caption text-[#1A1A1A]/70 uppercase tracking-wider mb-4">Minutes</p>
            </div>

            {/* "or" separator */}
            <div className="flex flex-col items-center justify-center pt-8">
              <span className="text-[#C9A227] text-sm font-medium">or</span>
              <div className="h-8 w-[1px] bg-[#C9A227]/30 mt-2"></div>
            </div>

            {/* Paid Trial Ride Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center">
              {/* Rider on Horse Icon */}
              <div className="flex justify-center mb-3">
                <GiHorseHead aria-hidden="true" className="h-11 w-11 text-[#C9A227]" />
              </div>
              
              <p className="type-eyebrow text-[#1A1A1A] mb-2">Trial Ride</p>
              
              <div className="type-page-title text-[#1A1A1A] mb-1">45</div>
              <p className="type-caption text-[#1A1A1A]/70 uppercase tracking-wider mb-4">Minutes · ₹1,999</p>
            </div>
          </div>

          {/* Book Your Trial Ride Button */}
          <button
            type="button"
            onClick={() => openEnquiry('Trial Ride')}
            className="type-button w-full bg-[#0C0922] text-white py-4 rounded-full hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors mb-8"
          >
            → Book Your Trial Ride
          </button>

          {/* Kids • Teens • Adults */}
          <p className="text-center text-[#1A1A1A]/60 text-sm tracking-wider">
            Kids <span className="mx-2 text-[#C9A227]">•</span> Teens <span className="mx-2 text-[#C9A227]">•</span> Adults
          </p>
        </div>
      </div>
    </div>
  );
};

export default RisingBeyond;


