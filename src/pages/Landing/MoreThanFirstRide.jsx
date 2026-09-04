import React from 'react';

const MoreThanFirstRide = () => {
  return (
    <div className="bg-[#F2F0EB] py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-0 items-stretch overflow-hidden rounded-3xl bg-white/35 shadow-[0_18px_50px_rgba(12,9,34,0.07)]">
          
          {/* Left: Image (50%) */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/page 2 gpt.png" 
              alt="Rider with horse" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content (50%) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-0 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12">
            
            {/* "MORE THAN" with Line */}
            <div className="flex items-center gap-4 mb-6">
              <span className="type-eyebrow text-[#C9A227]">More Than</span>
              <div className="h-[1px] flex-1 bg-[#C9A227]/30 max-w-[100px]"></div>
            </div>

            {/* "A First Ride" - Large Serif with different colors */}
            <h2 className="type-page-title mb-8">
              <span className="text-[#1A1A1A]">A</span> <span className="text-[#C9A227]">First Ride</span>
            </h2>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-[#C9A227]/40 mb-8"></div>

            {/* Description */}
            <p className="type-lead text-[#1A1A1A]/90 mb-8 sm:mb-12 text-left max-w-xl mx-0">
              Equestrian sports bring together athletic skill, partnership
              with horses, discipline and training. At Nakshath,
              your first ride is an introduction to that world.
            </p>

            {/* Three Features with Vertical Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#C9A227]/20 md:border-t-0">
              {/* Professional Coaching */}
              <div className="flex items-start gap-4 px-0 py-6 text-left border-b border-[#C9A227]/20 md:block md:px-6 md:py-0 md:text-center md:border-b-0 md:border-r">
                <div className="flex shrink-0 justify-start md:justify-center mb-0 md:mb-4">
                  <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                </div>
                <div><h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-2 md:mb-3">Professional Coaching</h4>
                <p className="type-small text-[#1A1A1A]/75">
                  Guidance within a structured riding environment.
                </p>
                </div>
              </div>

              {/* Well-Trained Horses */}
              <div className="flex items-start gap-4 px-0 py-6 text-left border-b border-[#C9A227]/20 md:block md:px-6 md:py-0 md:text-center md:border-b-0 md:border-r">
                <div className="flex shrink-0 justify-start md:justify-center mb-0 md:mb-4">
                  <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div><h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-2 md:mb-3">Well-Trained Horses</h4>
                <p className="type-small text-[#1A1A1A]/75">
                  Well-schooled, safe and reliable horses for riders of different levels.
                </p>
                </div>
              </div>

              {/* Structured Progression */}
              <div className="flex items-start gap-4 px-0 py-6 text-left md:block md:px-6 md:py-0 md:text-center">
                <div className="flex shrink-0 justify-start md:justify-center mb-0 md:mb-4">
                  <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                  </svg>
                </div>
                <div><h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-2 md:mb-3">Structured Progression</h4>
                <p className="type-small text-[#1A1A1A]/75">
                  Walk → Trot → Canter → National & International Competitions.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreThanFirstRide;


