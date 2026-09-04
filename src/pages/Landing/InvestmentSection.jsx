import React from 'react';
import { useEnquiry } from '../../context/EnquiryContext';

const InvestmentSection = () => {
  const { openEnquiry } = useEnquiry();
  const levels = [
    { level: 'LEVEL 01', lessons: '10', price: '₹11,999', img: '/level 1.png', tone: 'light' },
    { level: 'LEVEL 02', lessons: '20', price: '₹29,999', img: '/level 2.png', tone: 'light' },
    { level: 'LEVEL 03', lessons: '20', price: '₹32,999', img: '/level 3.png', tone: 'dark' }
  ];

  return (
    <div className="relative w-full bg-[#F2F0EB] overflow-hidden">
      
      {/* Main Background Image - Rider on Horse (Left Side, Full Height) */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:inset-0 sm:h-auto">
        <img 
          src="/trial-ride.png" 
          alt="Rider on Horse" 
          className="w-full h-full object-cover object-left brightness-[.94] contrast-[1.08] saturate-[1.1] sm:brightness-[.88] sm:contrast-[1.12] sm:saturate-[1.14]"
        />
        {/* On phones the image becomes an opening scene, then fades into the cards. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0EB]/18 via-[#F2F0EB]/52 to-[#F2F0EB] sm:bg-gradient-to-r sm:from-transparent sm:via-[#F2F0EB]/25 sm:to-[#F2F0EB]/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-24">
        
        {/* Content is on the RIGHT side */}
        <div className="lg:ml-[40%]">
          
          {/* Header Section */}
          <div className="text-left md:text-center mb-9 sm:mb-12">
            <h4 className="type-eyebrow text-[#1A1A1A] mb-4">The Investment</h4>
            
            {/* "Your Training, Your Progression" - Mixed Color Serif */}
            <h2 className="type-section-title mb-6">
              <span className="text-[#1A1A1A]">Your Training,</span> <span className="text-[#C9A227]">Your Progression</span>
            </h2>
          </div>

          {/* Level Cards with Background Images - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {levels.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-[1324/1188] overflow-hidden rounded-2xl bg-[#F2F0EB] shadow-lg"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={item.img} 
                    alt={item.level} 
                    className={`w-full h-full object-contain ${idx === 0 ? 'scale-[1.06]' : ''}`}
                  />
                </div>
                
                {/* Content */}
                <div className={`relative z-10 p-6 text-center flex flex-col items-center justify-center h-full ${item.tone === 'dark' ? '[text-shadow:0_2px_14px_rgba(0,0,0,.9)]' : ''}`}>
                  <p className={`type-eyebrow mb-3 ${item.tone === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>{item.level}</p>
                  <p className={`type-page-title mb-2 ${item.tone === 'dark' ? 'text-white' : 'text-[#1A1A1A]'}`}>{item.lessons}</p>
                  <p className={`type-small uppercase tracking-wider mb-5 ${item.tone === 'dark' ? 'text-white/80' : 'text-[#1A1A1A]/65'}`}>Lessons</p>
                  <p className="type-section-title text-[#C9A227]">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trial Ride Subsection */}
          <div className="mt-12">
            <div className="text-left md:text-center mb-8 sm:mb-10">
              <h4 className="type-eyebrow text-[#1A1A1A] mb-4">Not Sure Where to Begin?</h4>
              <h2 className="type-section-title">
                <span className="text-[#1A1A1A]">Begin with a</span> <span className="text-[#C9A227]">Trial Ride.</span>
              </h2>
            </div>

            {/* Two Trial Cards - Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {/* Free Trial Ride */}
              <div className="flex rounded-2xl overflow-hidden shadow-lg bg-[#F2F0EB]/90">
                {/* Left: Image */}
                <div className="w-[35%] min-h-[180px]">
                  <img 
                    src="/free ride.png" 
                    alt="Free Trial Ride" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right: Text */}
                <div className="w-[65%] p-6 flex flex-col justify-center">
                  <p className="type-eyebrow text-[#C9A227] mb-1">Free Trial Ride</p>
                  <p className="type-card-title text-[#1A1A1A] mb-1">10 Minutes</p>
                  <p className="type-section-title text-[#C9A227] mb-2">Free</p>
                  <p className="type-caption text-[#1A1A1A]/75">An introductory riding experience for new registrations.</p>
                </div>
              </div>

              {/* Paid Trial Ride */}
              <div className="flex rounded-2xl overflow-hidden shadow-lg bg-[#F2F0EB]/90">
                {/* Left: Image */}
                <div className="w-[35%] min-h-[180px]">
                  <img 
                    src="/paid ride.png" 
                    alt="Paid Trial Ride" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right: Text */}
                <div className="w-[65%] p-6 flex flex-col justify-center">
                  <p className="type-eyebrow text-[#C9A227] mb-1">Paid Trial Ride</p>
                  <p className="type-card-title text-[#1A1A1A] mb-1">45 Minutes</p>
                  <p className="type-section-title text-[#C9A227] mb-2">₹1,999</p>
                  <p className="type-caption text-[#1A1A1A]/75">An extended trial riding session.</p>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => openEnquiry('Trial Ride')}
                className="type-button bg-[#0C0922] text-white px-10 py-4 rounded-full hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors"
              >
                Book Your Trial Ride →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSection;


