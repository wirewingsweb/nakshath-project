import React from 'react';
import { Link } from 'react-router-dom';

const OurHorses = () => {
  return (
    <section className="w-full bg-[#FDFCFA] px-[1.8vw] py-8 md:py-[2.3vw]">
      <div className="relative h-[32rem] w-full overflow-hidden rounded-[1.5rem] md:h-auto">
        <img src="/page 8 gpt.png" alt="Horse at sunset" className="block h-full w-full object-cover object-[58%_center] md:h-auto md:object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/55 to-transparent md:from-[#0C0922]/80 md:via-[#0C0922]/25"></div>
        <div className="absolute left-7 top-1/2 max-w-[15.5rem] -translate-y-1/2 text-white md:left-[6.8%] md:max-w-[22rem]">
          <h4 className="text-[#C9A227] type-eyebrow mb-4">Our Horses</h4>
          <h2 className="type-page-title">
            Calm, schooled, and matched to the rider.
          </h2>
          <p className="mt-4 max-w-[16rem] md:max-w-[25vw] text-sm md:text-base leading-[1.55] text-white/85">
            Every horse selected for temperament first, then trained for the level it teaches.
          </p>
          <Link to="/horses" className="inline-block mt-6 text-xs font-medium border-b border-[#C9A227] pb-1">Meet the horses</Link>
        </div>
      </div>
    </section>
  );
};

export default OurHorses;
