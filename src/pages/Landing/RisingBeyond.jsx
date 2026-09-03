import React from 'react';

const RisingBeyond = () => {
  return (
    <div className="relative w-full bg-[#F2F0EB] py-24 overflow-hidden">
      
      {/* Background Image - Rider on White Horse (Right Side) */}
      <div className="absolute inset-0">
        <img 
          src="/rising-beyond-bg.png" 
          alt="Rider on White Horse" 
          className="w-full h-full object-cover object-right"
        />
        {/* Gradient overlay to make left side lighter for content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2F0EB] "></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Content is on the LEFT side */}
        <div className="max-w-xl">
          
          {/* Final Booking Label */}
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-[#C9A227] text-xs font-medium uppercase tracking-[0.3em]">Final Booking</h4>
            <div className="h-[1px] w-12 bg-[#C9A227]/40"></div>
          </div>

          {/* Rising Beyond Every Jump - Mixed Color Serif */}
          <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] leading-tight mb-6">
            <span className="text-[#1A1A1A]">Rising Beyond</span><br/>
            <span className="text-[#C9A227]">Every Jump</span>
          </h2>
          
          {/* Divider Line */}
          <div className="w-16 h-[2px] bg-[#C9A227]/40 mb-6"></div>

          {/* Subtitle */}
          <p className="text-[#1A1A1A]/80 text-lg mb-10 font-normal">
            Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
          </p>

          {/* Two Trial Cards - White Background, Side by Side */}
          <div className="flex items-start gap-4 mb-10">
            
            {/* Free Trial Ride Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center">
              {/* Horseshoe Icon */}
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
                  {/* Horseshoe shape */}
                  <path d="M14 10c-4 4-6 10-6 16s4 12 10 14c2 1 4 1 6 0" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 40c4-2 8-8 8-14s-2-12-8-14" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 10c2-2 6-2 8 0" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Horseshoe holes */}
                  <circle cx="10" cy="20" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="8" cy="26" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="10" cy="32" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="14" cy="36" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="20" cy="38" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="26" cy="34" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="28" cy="28" r="1.5" fill="#C9A227" stroke="none"/>
                  <circle cx="28" cy="22" r="1.5" fill="#C9A227" stroke="none"/>
                </svg>
              </div>
              
              <p className="text-[#1A1A1A] text-xs font-bold uppercase tracking-widest mb-2">Free Trial Ride</p>
              
              <div className="text-5xl font-serif text-[#1A1A1A] mb-1">10</div>
              <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-wider mb-4">Minutes</p>
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
                <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
                  {/* Horse and rider silhouette */}
                  <path d="M10 40c0-6 4-12 10-14 2-1 4-1 6 0 2 1 4 2 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M30 30c-1-2-3-4-6-4" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Horse head */}
                  <path d="M24 26c2-2 4-2 6 0s2 4 1 6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 24c1-1 3-1 4 1" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Rider */}
                  <circle cx="22" cy="14" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 17v4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 21c-2 0-4 1-4 3s2 3 4 3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 20l-2 3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M26 20l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Horse legs */}
                  <path d="M12 38v4" strokeLinecap="round"/>
                  <path d="M16 38v4" strokeLinecap="round"/>
                  <path d="M28 38v4" strokeLinecap="round"/>
                  <path d="M32 38v4" strokeLinecap="round"/>
                </svg>
              </div>
              
              <p className="text-[#1A1A1A] text-xs font-bold uppercase tracking-widest mb-2">Trial Ride</p>
              
              <div className="text-5xl font-serif text-[#1A1A1A] mb-1">45</div>
              <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-wider mb-4">Minutes · ₹1,999</p>
            </div>
          </div>

          {/* Book Your Trial Ride Button */}
          <button className="w-full bg-[#0C0922] text-white font-bold py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors mb-8">
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


