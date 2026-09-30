// src/components/sections/WhoLeadsTheAcademy.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText } from '../motion';

const carouselWrapperVariants = (prefersReduced) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.6, ease: EASE_PRIMARY } },
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

// ─── Founder Image Carousel with modern reveal ───────────────

const FounderCarousel = ({ slides, activeSlide, carouselRef, carouselInView, prefersReduced }) => {
  const containerRef = useRef(null);

  // Cursor parallax + tilt on the image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 30, stiffness: 150, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={carouselRef}
      className="relative z-[1] mx-5 aspect-[9/16] overflow-hidden rounded-2xl sm:mx-auto sm:w-[28rem] md:w-[min(42vw,22rem)] xl:absolute xl:left-[6.2%] xl:top-[-6.6%] xl:mx-0 xl:w-[31.5%]"
      role="region"
      aria-label="Founder image carousel"
      aria-roledescription="carousel"
      variants={carouselWrapperVariants(prefersReduced)}
      initial="hidden"
      animate={carouselInView ? 'visible' : 'hidden'}
      style={prefersReduced ? undefined : { perspective: 1000 }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full w-full"
      >
        {/* Modern Reveal: Clip-Path Curtain + Scale Settle */}
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-2xl"
          style={
            prefersReduced
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }
          }
          initial={
            prefersReduced
              ? false
              : {
                  clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                  filter: 'blur(12px)',
                  scale: 1.15,
                  opacity: 0,
                }
          }
          animate={
            carouselInView && !prefersReduced
              ? {
                  clipPath: [
                    'polygon(0 0, 0 0, 0 100%, 0 100%)',
                    'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  ],
                  filter: ['blur(12px)', 'blur(0px)'],
                  scale: [1.15, 1],
                  opacity: [0, 1],
                }
              : {}
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : {
                  clipPath: { duration: 1.4, ease: [0.76, 0, 0.24, 1] },
                  filter: { duration: 1.6, delay: 0.3, ease: EASE_PRIMARY },
                  scale: { duration: 1.6, delay: 0.3, ease: EASE_PRIMARY },
                  opacity: { duration: 0.6, ease: EASE_PRIMARY },
                }
          }
        >
          {/* Image carousel */}
          <motion.div
            className="h-full w-full"
            style={
              prefersReduced
                ? undefined
                : {
                    x: parallaxX,
                    y: parallaxY,
                    scale: 1.05,
                  }
            }
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

          {/* Gold spotlight */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                left: spotlightLeft,
                top: spotlightTop,
                background:
                  'radial-gradient(circle, rgba(245,230,168,0.35) 0%, rgba(201,162,39,0.12) 45%, transparent 75%)',
                filter: 'blur(30px)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Gold ring on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-offset-4 group-hover:ring-offset-[#F2F0EB]"
          />
        </motion.div>

        {/* Slide indicators (dots) */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === i ? 'w-6 bg-[#876B18]' : 'w-1.5 bg-[#876B18]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Section ────────────────────────────────────────────

const WhoLeadsTheAcademy = () => {
  const slides = ['/founder-nakshath-rounded.webp', '/founder-nakshath-rounded.webp'];
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [carouselRef, carouselInView] = useInViewOnce({ amount: 0.2 });
  const [textRef, textInView] = useInViewOnce({ amount: 0.2 });
  const [achievementsRef, achievementsInView] = useInViewOnce({ amount: 0.3 });
  const [quoteRef, quoteInView] = useInViewOnce({ amount: 0.3 });

  const sectionRef = useRef(null);

  // Section-wide cursor glow
  const sectionMouseX = useMotionValue(0.5);
  const sectionMouseY = useMotionValue(0.5);
  const sectionSmoothX = useSpring(sectionMouseX, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionSmoothY = useSpring(sectionMouseY, { damping: 60, stiffness: 60, mass: 0.8 });
  const sectionGlowLeft = useTransform(sectionSmoothX, (v) => `${v * 100}%`);
  const sectionGlowTop = useTransform(sectionSmoothY, (v) => `${v * 100}%`);

  const handleSectionMouseMove = (e) => {
    if (prefersReduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    sectionMouseX.set((e.clientX - rect.left) / rect.width);
    sectionMouseY.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative z-10 w-full overflow-hidden bg-[#F2F0EB] md:py-16 xl:h-[58.9vw] xl:overflow-visible xl:py-0"
    >
      {/* Section-wide cursor glow */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      <FounderCarousel
        slides={slides}
        activeSlide={activeSlide}
        carouselRef={carouselRef}
        carouselInView={carouselInView}
        prefersReduced={prefersReduced}
      />

      <div className="relative z-10 px-6 pb-16 pt-10 sm:px-10 md:mx-auto md:max-w-[64rem] md:px-10 md:pb-20 md:pt-14 xl:absolute xl:left-[46.4%] xl:top-[11.5%] xl:mx-0 xl:w-[50.5%] xl:max-w-none xl:p-0">
        <div className="w-full xl:max-w-none">
          <motion.div
            ref={textRef}
            variants={textContainerVariants(prefersReduced)}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
          >
            {/* Eyebrow with pulsing dot */}
            <motion.h4
              className="group type-eyebrow mb-4 flex cursor-default items-center gap-3 text-[#876B18]"
              variants={textItemVariants(prefersReduced, isMobile, 8)}
            >
              <motion.span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
                animate={
                  prefersReduced
                    ? { scale: 1, opacity: 1 }
                    : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="transition-colors duration-300 group-hover:text-[#C9A227]">
                Who Leads The Academy
              </span>
            </motion.h4>

            {/* Heading with word-hover */}
            <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
              <SplitText
                as="h2"
                className="type-page-title mb-2 text-[#1A1A1A] xl:whitespace-nowrap"
                wordDelay={0.05}
                startDelay={0.1}
                amount={0.3}
              >
                Nakshath Venkatesh
              </SplitText>
            </div>

            {/* Role with accent dot */}
            <motion.div
              className="group/role flex items-center gap-2"
              variants={textItemVariants(prefersReduced, isMobile, 8)}
            >
              <span className="h-1 w-1 rounded-full bg-[#876B18]/60 transition-all duration-500 group-hover/role:w-5 group-hover/role:bg-[#876B18]" />
              <p className="type-caption text-[#1A1A1A] transition-colors duration-300 group-hover/role:text-[#876B18]">
                Founder
              </p>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              ACHIEVEMENTS — consistent alignment, hover interactions
          ═══════════════════════════════════════════════════ */}
          <motion.div
            ref={achievementsRef}
            className="mb-12 mt-10 grid max-w-[44rem] grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 xl:mb-[5vw] xl:mt-[6.8vw] xl:max-w-[47vw]"
            variants={achievementsContainerVariants(prefersReduced)}
            initial="hidden"
            animate={achievementsInView ? 'visible' : 'hidden'}
          >
            {/* Achievement 1 — Silver */}
            <motion.div
              className="group/ach relative flex cursor-default flex-col pl-0 transition-all duration-500 hover:pl-4 sm:pr-5"
              variants={textItemVariants(prefersReduced, isMobile, 12)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.4rem] h-0 w-[2px] bg-[#876B18] transition-all duration-500 group-hover/ach:h-10"
              />
              <span className="font-serif text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none text-[#1A1A1A] transition-colors duration-500 group-hover/ach:text-[#876B18]">
                Silver
              </span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A] transition-colors duration-500 group-hover/ach:text-[#876B18]/80">
                CSIO INTERNATIONAL<br />SHOW JUMPING
              </span>
            </motion.div>

            {/* Achievement 2 — Bronze */}
            <motion.div
             className="group/ach relative flex cursor-default flex-col border-t border-[#5A5A66]/20 pl-0 pt-6 transition-all duration-500 hover:pl-8 sm:border-l sm:border-t-0 sm:pl-8 sm:pr-6 sm:pt-0"
              variants={textItemVariants(prefersReduced, isMobile, 12)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.4rem] h-0 w-[2px] bg-[#876B18] transition-all duration-500 group-hover/ach:h-10 sm:left-5"
              />
              <span className="font-serif text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none text-[#1A1A1A] transition-colors duration-500 group-hover/ach:text-[#876B18]">
                Bronze
              </span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A] transition-colors duration-500 group-hover/ach:text-[#876B18]/80">
                JUNIOR NATIONAL<br />CHAMPIONSHIP 2025
              </span>
            </motion.div>

            {/* Achievement 3 — Long-listed */}
            <motion.div
              className="group/ach relative flex cursor-default flex-col border-t border-[#5A5A66]/20 pl-0 pt-6 transition-all duration-500 hover:pl-8 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0"
              variants={textItemVariants(prefersReduced, isMobile, 12)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.4rem] h-0 w-[2px] bg-[#876B18] transition-all duration-500 group-hover/ach:h-10 sm:left-5"
              />
              <span className="whitespace-nowrap font-serif text-[clamp(1.1rem,2.2vw,1.45rem)] leading-none text-[#1A1A1A] transition-colors duration-500 group-hover/ach:text-[#876B18]">
                Long-listed
              </span>
              <span className="type-caption mt-3 font-semibold uppercase tracking-[0.04em] text-[#1A1A1A] transition-colors duration-500 group-hover/ach:text-[#876B18]/80">
                TEAM INDIA SHOW JUMPING,<br />2026 ASIAN GAMES
              </span>
            </motion.div>
          </motion.div>

          {/* Quote + CTA */}
          <motion.div
            ref={quoteRef}
            variants={textContainerVariants(prefersReduced)}
            initial="hidden"
            animate={quoteInView ? 'visible' : 'hidden'}
          >
            {/* Quote with left accent bar on hover */}
            <motion.div
              className="group/quote relative pl-0 transition-all duration-500 hover:pl-5"
              variants={textItemVariants(prefersReduced, isMobile, 12)}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 h-0 w-[2px] bg-[#876B18] transition-all duration-500 group-hover/quote:h-[calc(100%-1rem)]"
              />
              <p className="type-lead mb-8 max-w-[39rem] font-serif text-[#1A1A1A] transition-colors duration-500 group-hover/quote:text-[#1A1A1A]">
                To build a world-class environment and a gateway to the Olympics, where riders at every level develop the confidence, skill and mindset to compete.
              </p>
            </motion.div>

            {/* CTA link with animated underline + arrow */}
            <motion.div variants={textItemVariants(prefersReduced, isMobile, 10)}>
              <Link
                to="/about"
                className="group/link relative inline-flex items-center gap-2 font-serif text-[0.78rem] text-[#1A1A1A] transition-colors duration-300 hover:text-[#876B18]"
              >
                <span className="relative">
                  Read his story
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#876B18] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
                  />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  stroke="currentColor"
                  className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoLeadsTheAcademy;