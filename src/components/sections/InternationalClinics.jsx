import React from 'react';

const InternationalClinics = () => {
  return (
    <section className="py-16 px-6 md:py-13 md:px-12 bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <div className="flex flex-col">
          <h4 className="type-eyebrow mb-4 text-[#C9A227]">International Clinics</h4>
          <h2 className="type-page-title mb-5 text-[#1A1A1A]">Coaches who<br/>travel to teach<br/>here.</h2>
          <p className="type-small mb-5 max-w-[20rem] text-[#5A5A66]">Ten to fifteen day intensive clinics led by visiting professionals from across the equestrian world. Open to members and outside riders, with stabling and on-site accommodation.</p>
          <div className="w-full mb-4 relative">
            <img src="/international map.webp" alt="World Map" className="w-full h-auto object-contain max-h-[180px] opacity-60 mix-blend-multiply" />
          </div>
          <a href="#" className="text-[#1A1A1A] border-b-2 border-[#C9A227] pb-1 text-sm font-medium hover:text-[#C9A227] hover:border-[#C9A227] transition-colors w-max">See clinic details</a>
        </div>
        <div className="flex flex-col space-y-7 pt-2 md:pt-10">
          <div className="flex justify-between items-center border-b border-transparent hover:border-[#C9A227]/30 transition-colors pb-2 cursor-pointer group">
            <span className="type-card-title text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">Germany</span>
            <span className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]">Show Jumping</span>
          </div>
          <div className="flex justify-between items-center border-b border-transparent hover:border-[#C9A227]/30 transition-colors pb-2 cursor-pointer group">
            <span className="type-card-title text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">Netherlands</span>
            <span className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]">Dressage</span>
          </div>
          <div className="flex justify-between items-center border-b border-transparent hover:border-[#C9A227]/30 transition-colors pb-2 cursor-pointer group">
            <span className="type-card-title text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">France</span>
            <span className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]">Eventing</span>
          </div>
          <div className="flex justify-between items-center border-b border-transparent hover:border-[#C9A227]/30 transition-colors pb-2 cursor-pointer group">
            <span className="type-card-title text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">United Kingdom</span>
            <span className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]">Show Jumping</span>
          </div>
          <div className="flex justify-between items-center border-b border-transparent hover:border-[#C9A227]/30 transition-colors pb-2 cursor-pointer group">
            <span className="type-card-title text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">Ireland</span>
            <span className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]">Eventing</span>
          </div>
          <p className="type-caption mt-6 border-t border-[#C9A227]/20 pt-6 font-medium uppercase tracking-[0.14em] text-[#C9A227]/70">Coaches announced closer to each clinic</p>
        </div>
      </div>
    </section>
  );
};

export default InternationalClinics;
