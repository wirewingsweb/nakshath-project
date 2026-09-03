import React from 'react';

const NakshathDifference = () => {
  const features = [
    { 
      title: 'INTERNATIONAL-STANDARD INDOOR ARENA', 
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          {/* Building/Horse Arena Icon */}
          <path d="M6 42h36" strokeLinecap="round"/>
          <path d="M10 42V14l14-8 14 8v28" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 18h4M22 18h4M30 18h4" strokeLinecap="round"/>
          <path d="M14 24h4M22 24h4M30 24h4" strokeLinecap="round"/>
          <path d="M14 30h4M22 30h4M30 30h4" strokeLinecap="round"/>
          <path d="M24 42v-8h4v8" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Horse silhouette */}
          <path d="M24 34c0-2 1-4 3-5s5-2 7-1 3 2 3 3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M37 31c1 0 2-1 2-2s-1-2-2-2-2 1-2 2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 28c-1-2 0-4 2-5" strokeLinecap="round"/>
          <path d="M24 34c0-2 1-4 3-5" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      title: 'PROFESSIONAL COACHING', 
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          {/* Coach/Person Icon */}
          <circle cx="24" cy="14" r="6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 20v8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 28c-6 0-10 4-10 10v4h20v-4c0-6-4-10-10-10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 32h16" strokeLinecap="round"/>
          <path d="M14 36h20" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      title: 'WELL-TRAINED HORSES', 
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          {/* Horse Head Icon */}
          <path d="M16 40c0-4 2-8 6-10s10-4 14-2 6 5 4 8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M40 36c2 0 4-2 4-4s-2-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M36 32c-2-4-4-8-8-10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M28 22c1-2 3-3 5-2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 28c-2-2-2-5 0-7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 40v4" strokeLinecap="round"/>
          <path d="M20 40v4" strokeLinecap="round"/>
          <path d="M24 40v4" strokeLinecap="round"/>
          <path d="M30 40v4" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      title: 'LIMITED RIDERS PER BATCH', 
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          {/* Group of People Icon */}
          <circle cx="18" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="30" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 32c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 32c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 32c0-4 2-6 6-6s6 2 6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full  py-24 overflow-hidden">
      
      {/* Background Image - Indoor Arena with Rider */}
      <div className="absolute inset-0">
        <img 
          src="/find difference.png" 
          alt="Indoor Arena Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-16">
          <h4 className="text-[#C9A227] text-xs font-medium uppercase tracking-[0.3em] mb-4">The Nakshath Difference</h4>
          
          <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] leading-tight mb-6">
            <span className="text-white">Where Passion</span><br/>
            <span className="text-[#C9A227]">Meets Prestige</span>
          </h2>
          
          {/* Divider Line */}
          <div className="w-16 h-[2px] bg-[#C9A227]/60 mb-8"></div>
          
          <p className="text-white/80 text-lg leading-relaxed font-normal max-w-xl">
            Nakshath Equestrian Club is a premium equestrian sports
            destination designed to inspire discipline, strength and
            excellence through world-class equestrian training and
            sporting experiences.
          </p>
        </div>

        {/* Feature Cards - 4 Cards in a Row, Slightly Left */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:mr-[20%]">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-[#0C0922]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center hover:border-[#C9A227]/50 transition-colors duration-300 min-h-[200px]">
              {/* Icon */}
              <div className="mb-4">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h4 className="text-[#C9A227] font-serif text-sm font-medium uppercase tracking-wide leading-relaxed text-center">
                {feature.title}
              </h4>
              
              {/* Bottom Decorative Line */}
              <div className="w-8 h-[1px] bg-[#C9A227]/40 mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NakshathDifference;


