import React from 'react';

const InvestmentSection = () => {
  const levels = [
    { level: 'LEVEL 01', lessons: '10', price: '₹11,999', img: '/level 1.png' },
    { level: 'LEVEL 02', lessons: '20', price: '₹29,999', img: '/level 2.png' },
    { level: 'LEVEL 03', lessons: '20', price: '₹32,999', img: '/level 3.png' }
  ];

  return (
    <div className="relative w-full bg-[#F2F0EB] overflow-hidden">
      
      {/* Main Background Image - Rider on Horse (Left Side, Full Height) */}
      <div className="absolute inset-0">
        <img 
          src="/trial-ride.png" 
          alt="Rider on Horse" 
          className="w-full h-full object-cover object-left"
        />
        {/* Gradient overlay to make right side lighter for content */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2F0EB]/60 to-[#F2F0EB]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* Content is on the RIGHT side */}
        <div className="lg:ml-[40%]">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h4 className="text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.3em] mb-4">The Investment</h4>
            
            {/* "Your Training, Your Progression" - Mixed Color Serif */}
            <h2 className="font-serif text-[1.5rem] md:text-[2rem] leading-tight mb-6">
              <span className="text-[#1A1A1A]">Your Training,</span> <span className="text-[#C9A227]">Your Progression</span>
            </h2>
          </div>

          {/* Level Cards with Background Images - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {levels.map((item, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={item.img} 
                    alt={item.level} 
                    className="w-full h-full object-cover"
                  />
                  {/* Fade Effect Overlay - Light at top and bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0EB]/70 via-transparent to-[#F2F0EB]/70"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 text-center flex flex-col items-center justify-center h-full">
                  <p className="text-[#1A1A1A] text-xs font-bold uppercase tracking-widest mb-3">{item.level}</p>
                  <p className="text-5xl font-serif text-[#1A1A1A] mb-2">{item.lessons}</p>
                  <p className="text-[#1A1A1A]/60 text-sm uppercase tracking-wider mb-5">Lessons</p>
                  <p className="text-3xl font-serif text-[#C9A227]">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trial Ride Subsection */}
          <div className="mt-12">
            <div className="text-center mb-10">
              <h4 className="text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.3em] mb-4">Not Sure Where to Begin?</h4>
              <h2 className="font-serif text-[1.375rem] md:text-[1.875rem]">
                <span className="text-[#1A1A1A]">Begin with a</span> <span className="text-[#C9A227]">Trial Ride.</span>
              </h2>
            </div>

            {/* Two Trial Cards - Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {/* Free Trial Ride */}
              <div className="flex rounded-xl overflow-hidden shadow-lg bg-[#F2F0EB]/90">
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
                  <p className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-1">Free Trial Ride</p>
                  <p className="text-xl font-serif text-[#1A1A1A] mb-1">10 Minutes</p>
                  <p className="text-3xl font-serif text-[#C9A227] mb-2">FREE</p>
                  <p className="text-xs text-[#1A1A1A]/60 font-normal leading-relaxed">An introductory riding experience for new registrations.</p>
                </div>
              </div>

              {/* Paid Trial Ride */}
              <div className="flex rounded-xl overflow-hidden shadow-lg bg-[#F2F0EB]/90">
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
                  <p className="text-[#C9A227] text-xs font-bold uppercase tracking-widest mb-1">Paid Trial Ride</p>
                  <p className="text-xl font-serif text-[#1A1A1A] mb-1">45 Minutes</p>
                  <p className="text-3xl font-serif text-[#C9A227] mb-2">₹1,999</p>
                  <p className="text-xs text-[#1A1A1A]/60 font-normal leading-relaxed">An extended trial riding session.</p>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="text-center">
              <button className="bg-[#0C0922] text-white font-bold px-10 py-4 rounded-full text-xs font-medium uppercase tracking-widest hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors">
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


