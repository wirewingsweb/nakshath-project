import React from 'react';

const TheDifference = () => {
  return (
    <section className="bg-[#FDFCFA] grid grid-cols-1 md:grid-cols-[54%_46%] items-center overflow-hidden md:aspect-[1920/1365]">
      <div className="px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]">
        <div className="max-w-[38rem]">
          <h4 className="text-[#876B18] type-eyebrow mb-8 md:mb-[3vw]">●&nbsp; The Difference</h4>
          <h2 className="type-display mb-10 text-[#1A1A1A]">
            Bengaluru’s equestrian training moves <span className="text-[#876B18]">indoors.</span>
          </h2>
          <div className="w-[6.75rem] md:w-[10vw] h-px bg-[#876B18] mb-9 md:mb-[3.2vw]"></div>
          <p className="type-lead max-w-[27rem] md:max-w-[31rem] text-[#1A1A1A]">
            An all-weather covered arena on international-standard footing. Lessons do not stop for monsoon or summer heat.
          </p>
        </div>
      </div>
      <div className="px-6 pb-10 md:px-0 md:pb-0">
        <img
          src="/page 2 gpt.png"
          alt="Indoor Arena"
          className="w-full h-[28rem] md:h-[57.5vw] object-cover rounded-[2rem] md:rounded-r-none md:rounded-l-[2.25rem]"
        />
      </div>
    </section>
  );
};

export default TheDifference;
