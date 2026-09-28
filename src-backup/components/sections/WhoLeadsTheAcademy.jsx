// src/components/sections/WhoLeadsTheAcademy.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText } from '../motion';

const carouselWrapperVariants = (prefersReduced) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.9, ease: EASE_PRIMARY } },
});

const textContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08, delayChildren: prefersReduced ? 0 : 0.15 } },
});

const textItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const achievementsContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08, delayChildren: prefersReduced ? 0 : 0.1 } },
});

const WhoLeadsTheAcademy = () => {
  const slides = ['/founder-nakshath-rounded.png', '/founder-nakshath-rounded.png'];
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [carouselRef, carouselInView] = useInViewOnce({ amount: 0.2 });
  const [textRef, textInView] = useInViewOnce({ amount: 0.2 });
  const [achievementsRef, achievementsInView] = useInViewOnce({ amount: 0.3 });
  const [quoteRef, quoteInView] = useInViewOnce({ amount: 0.3 });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#F2F0EB] md:py-16 xl:h-[58.9vw] xl:overflow-visible xl:py-0">

      <motion.div
        ref={carouselRef}
        className="relative z-[1] mx-5 aspect-[9/16] overflow-hidden sm:mx-auto sm:w-[28rem] md:w-[min(42vw,22rem)] xl:absolute xl:left-[6.2%] xl:top-[-6.6%] xl:mx-0 xl:w-[31.5%]"
        role="region"
        aria-label="Founder image carousel"
        aria-roledescription="carousel"
        variants={carouselWrapperVariants(prefersReduced)}
        initial="hidden"
        animate={carouselInView ? 'visible' : 'hidden'}
      >
        <div className={`founder-carousel-track flex h-full transition-transform duration-1000 ease-in-out ${activeSlide === 1 ? 'founder-carousel-track--shifted' : ''}`}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              loading="lazy"
              decoding="async"
              alt={index === 0 ? 'Nakshath Venkatesh show jumping' : ''}
              aria-hidden={index !== activeSlide}
              data-active={index === activeSlide ? 'true' : 'false'}
              className="founder-carousel-slide block h-full shrink-0 object-contain"
            />
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 px-6 pb-16 pt-10 sm:px-10 md:mx-auto md:max-w-[64rem] md:px-10 md:pb-20 md:pt-14 xl:absolute xl:left-[46.4%] xl:top-[11.5%] xl:mx-0 xl:w-[50.5%] xl:max-w-none xl:p-0">
        <div className="w-full xl:max-w-none">
          <motion.div
            ref={textRef}
            variants={textContainerVariants(prefersReduced)}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
          >
            <motion.h4 className="type-eyebrow mb-4 text-[#876B18]" variants={textItemVariants(prefersReduced, isMobile, 8)}>
              Who Leads The Academy
            </motion.h4>

            <SplitText
              as="h2"
              className="type-page-title mb-2 text-[#1A1A1A] xl:whitespace-nowrap"
              wordDelay={0.05}
              startDelay={0.1}
              amount={0.3}
            >
              Nakshath Venkatesh
            </SplitText>

            <motion.p className="type-caption text-[#1A1A1A]" variants={textItemVariants(prefersReduced, isMobile, 8)}>
              Founder
            </motion.p>
          </motion.div>

          <motion.div
            ref={achievementsRef}
            className="mb-12 mt-10 grid max-w-[44rem] grid-cols-1 sm:grid-cols-3 xl:mb-[5vw] xl:mt-[6.8vw] xl:max-w-[47vw]"
            variants={achievementsContainerVariants(prefersReduced)}
            initial="hidden"
            animate={achievementsInView ? 'visible' : 'hidden'}
          >
            <motion.div className="hover-lift flex flex-col rounded-lg p-2 pb-5 sm:pb-0 sm:pr-5" variants={textItemVariants(prefersReduced, isMobile, 12)}>
              <span className="font-serif text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none text-[#1A1A1A]">Silver</span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">CSIO INTERNATIONAL<br />SHOW JUMPING</span>
            </motion.div>
            <motion.div className="hover-lift flex flex-col rounded-lg border-t border-[#5A5A66]/20 p-2 pt-5 sm:border-l sm:border-t-0 sm:px-5 sm:pt-0" variants={textItemVariants(prefersReduced, isMobile, 12)}>
              <span className="font-serif text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none text-[#1A1A1A]">Bronze</span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">JUNIOR NATIONAL<br />CHAMPIONSHIP 2025</span>
            </motion.div>
            <motion.div className="hover-lift mt-5 flex flex-col rounded-lg border-t border-[#5A5A66]/20 p-2 pt-5 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0" variants={textItemVariants(prefersReduced, isMobile, 12)}>
              <span className="whitespace-nowrap font-serif text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none text-[#1A1A1A]">Long-listed</span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A]">TEAM INDIA SHOW JUMPING,<br />2026 ASIAN GAMES</span>
            </motion.div>
          </motion.div>

          <motion.div
            ref={quoteRef}
            variants={textContainerVariants(prefersReduced)}
            initial="hidden"
            animate={quoteInView ? 'visible' : 'hidden'}
          >
            <motion.p className="type-lead mb-8 max-w-[39rem] font-serif text-[#1A1A1A]" variants={textItemVariants(prefersReduced, isMobile, 12)}>
              To build a world-class environment and a gateway to the Olympics, where riders at every level develop the confidence, skill and mindset to compete.
            </motion.p>
            <motion.div variants={textItemVariants(prefersReduced, isMobile, 10)}>
              <Link to="/about" className="link-underline w-max font-serif text-[0.78rem] text-[#1A1A1A]">
                Read his story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoLeadsTheAcademy;