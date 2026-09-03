import React from 'react';
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../../constants/location';

const WhereWeAre = () => {
  // Drive Times Data from Contact page
  const driveTimes = [
    { location: 'Sarjapur', route: 'via Sarjapur Road', time: '12 mins' },
    { location: 'Electronic City', route: 'via Hosur Road', time: '20 mins' },
    { location: 'HSR Layout', route: 'via Sarjapur Road', time: '22 mins' },
    { location: 'Bellandur', route: 'via Outer Ring Road', time: '24 mins' },
    { location: 'Whitefield', route: 'via Outer Ring Road', time: '28 mins' },
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#FDFCFA] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 min-h-[600px]">
        <div className="w-full lg:w-[40%] flex flex-col justify-between">
          <div className="flex flex-col">
            <h4 className="text-[#C9A227] text-[0.625rem] font-medium uppercase tracking-[0.2em] mb-4 font-bold">Where We Are</h4>
            <h2 className="type-page-title mb-8 text-[#1A1A1A]">Sarjapura,<br/>Bengaluru.</h2>
            <div className="space-y-6 border-l-2 border-[#C9A227] pl-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="text-[#1A1A1A] mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline transition-colors hover:text-[#C9A227]">
                  <h5 className="text-xs font-medium uppercase tracking-widest font-bold mb-1">Address</h5>
                  <p className="text-sm text-[#5A5A66] font-normal leading-relaxed">Inside BEML Cooperative Society<br/>S. Medahalli, Sarjapura<br/>Bengaluru, Karnataka 562107</p>
                </a>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-[#1A1A1A] mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-xs font-medium uppercase tracking-widest font-bold mb-1">Open</h5>
                  <p className="text-sm text-[#5A5A66] font-normal">Tuesday–Saturday · Monday closed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-[#1A1A1A] mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.038-1.174.356l-1.08 1.33c-.265.326-.706.422-1.065.236a17.461 17.461 0 0 1-5.931-5.93c-.186-.36-.09-.8.236-1.066l1.33-1.08c.318-.272.465-.733.356-1.174l-1.106-4.423c-.125-.5-.575-.85-1.091-.85H4.5a2.25 2.25 0 0 0-2.25 2.25Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-xs font-medium uppercase tracking-widest font-bold mb-1">Contact</h5>
                  <p className="text-sm text-[#5A5A66] font-normal">8460 846 946</p>
                </div>
              </div>
            </div>
            
            {/* Getting Here Section - Data from Contact Page */}
            <div className="mb-8">
              <h4 className="text-[#C9A227] text-[0.625rem] font-bold uppercase tracking-[0.2em] mb-4">Getting Here</h4>
              <h3 className="text-xl font-serif text-[#1A1A1A] mb-6">Closer than you think.</h3>
              <div className="space-y-4">
                {driveTimes.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-[#5A5A66]/20 pb-3">
                    <div>
                      <p className="text-[#1A1A1A] font-medium text-sm">{item.location}</p>
                      <p className="text-[#5A5A66] text-xs font-normal">{item.route}</p>
                    </div>
                    <span className="text-[#1A1A1A] font-serif text-lg">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#5A5A66]/70 text-xs mt-4">
                Travel times are approximate and may vary depending on traffic conditions.
              </p>
            </div>

            <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="w-max border-b border-black pb-1 text-xs font-semibold transition-colors hover:border-[#C9A227] hover:text-[#C9A227]">
              Get directions
            </a>
          </div>
          <div className="mt-10 lg:mt-0 w-full rounded-xl overflow-hidden shadow-lg">
            <img src="/page 12 gpt.png" alt="Equestrian Facility" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-full lg:w-[60%] h-[500px] md:h-[600px] lg:h-auto rounded-2xl overflow-hidden shadow-lg bg-[#FDFCFA] border border-[#5A5A66]/20">
          <iframe 
            src={BUSINESS_MAP_EMBED_URL}
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Nakshath Equestrian Club Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default WhereWeAre;
