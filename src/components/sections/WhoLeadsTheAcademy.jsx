import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WhoLeadsTheAcademy = () => {
  const slides = ['/founder-nakshath-rounded.png', '/founder-nakshath-rounded.png'];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#F2F0EB] md:py-16 xl:h-[58.9vw] xl:overflow-visible xl:py-0">
      <div
        className="relative z-[1] mx-5 aspect-[9/16] overflow-hidden sm:mx-auto sm:w-[28rem] md:w-[min(42vw,22rem)] xl:absolute xl:left-[6.2%] xl:top-[-6.6%] xl:mx-0 xl:w-[31.5%]"
        role="region"
        aria-label="Founder image carousel"
        aria-roledescription="carousel"
      >
        <div
          className={`founder-carousel-track flex h-full transition-transform duration-1000 ease-in-out ${
            activeSlide === 1 ? 'founder-carousel-track--shifted' : ''
          }`}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={index === 0 ? 'Nakshath Venkatesh show jumping' : ''}
              aria-hidden={index !== activeSlide}
              data-active={index === activeSlide ? 'true' : 'false'}
              className="founder-carousel-slide block h-full shrink-0 object-contain"
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 px-6 pb-16 pt-10 sm:px-10 md:mx-auto md:max-w-[64rem] md:px-10 md:pb-20 md:pt-14 xl:absolute xl:left-[46.4%] xl:top-[11.5%] xl:mx-0 xl:w-[50.5%] xl:max-w-none xl:p-0">
        <div className="w-full xl:max-w-none">
          <h4 className="text-[#876B18] type-eyebrow mb-4">Who Leads The Academy</h4>
          <h2 className="type-page-title mb-2 text-[#1A1A1A] xl:whitespace-nowrap">Nakshath Venkatesh</h2>
          <p className="type-caption text-[#1A1A1A]">Founder</p>
          
          <div className="mt-10 mb-12 grid max-w-[44rem] grid-cols-1 sm:grid-cols-3 xl:mb-[5vw] xl:mt-[6.8vw] xl:max-w-[47vw]">
            <div className="flex flex-col pb-5 sm:pb-0 sm:pr-5">
              <span className="text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none font-serif text-[#1A1A1A]">Silver</span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">CSIO INTERNATIONAL<br/>SHOW JUMPING</span>
            </div>
            <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-[#5A5A66]/20 pt-5 sm:pt-0 sm:px-5">
              <span className="text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none font-serif text-[#1A1A1A]">Bronze</span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">JUNIOR NATIONAL<br/>CHAMPIONSHIP 2025</span>
            </div>
            <div className="flex flex-col border-t sm:border-t-0 sm:border-l border-[#5A5A66]/20 pt-5 mt-5 sm:mt-0 sm:pt-0 sm:pl-5">
              <span className="text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none font-serif text-[#1A1A1A] whitespace-nowrap">Long-listed</span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">TEAM INDIA SHOW JUMPING,<br/>2026 ASIAN GAMES</span>
            </div>
          </div>
          
          <p className="type-lead mb-8 max-w-[39rem] font-serif text-[#1A1A1A]">
            To build a world-class environment and a gateway to the Olympics, where riders at every level develop the confidence, skill and mindset to compete.
          </p>
          
          <Link 
            to="/about" 
            className="text-[#1A1A1A] border-b border-[#876B18] pb-1 text-[0.78rem] font-serif hover:text-[#876B18] transition-colors w-max"
          >
            Read his story
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhoLeadsTheAcademy;
