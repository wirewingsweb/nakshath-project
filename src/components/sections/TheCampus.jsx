// src/components/sections/TheCampus.jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const facilities = [
  { image: '/page 7 1 gpt.webp', title: 'Indoor Arena', detail: 'All-weather', ratio: '0.91', position: '50% 58%' },
  { image: '/page 7 2 gpt.webp', title: 'Outdoor Arena', detail: 'Sand surface', ratio: '0.86', position: '50% 48%' },
  { image: '/page 7 3 gpt.webp', title: 'Stables', detail: 'Individual stalls', ratio: '0.79', position: '50% 55%' },
  { image: '/page 7 4 gpt.webp', title: 'Café', detail: 'Open to visitors', ratio: '0.78', position: '50% 52%' },
  { image: '/page 7 5 gpt.webp', title: 'Cottages', detail: 'On-site stay', ratio: '0.93', position: '50% 55%' },
];

const carouselFacilities = [...facilities, ...facilities, ...facilities];

const DRIFT_SPEED_PX_PER_SEC = 95;
const SCALE_MIN = 0.82;
const SCALE_MAX = 1.12;
const BRIGHTNESS_MIN = 0.60;
const BRIGHTNESS_MAX = 1.00;
const BLUR_MIN = 0;
const BLUR_MAX = 1.5;
const SCALE_FALLOFF_PX = 500;

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const carouselWrapperVariants = (prefersReduced) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.9, delay: prefersReduced ? 0 : 0.15, ease: EASE_PRIMARY } },
});

const ctaVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 6 : 10) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.2, ease: EASE_PRIMARY } },
});

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// ─── Interactive Carousel Card ───────────────────────────────
// The card keeps its existing transform (scale from carousel logic)
// but adds hover overlay effects on top — no conflict because they
// are separate elements.

const CarouselCard = ({ facility, index, activeIndex, cardRefs, prefersReduced }) => {
  const cardInnerRef = useRef(null);

  // Cursor tracking for spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.6 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.6 });
  const spotlightLeft = useTransform(smoothX, (v) => `${v * 100}%`);
  const spotlightTop = useTransform(smoothY, (v) => `${v * 100}%`);

  const handleMouseMove = (e) => {
    const rect = cardInnerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const isCenterCard = Math.abs(index - activeIndex) < 1;

  return (
    <article
      ref={(el) => { cardRefs.current[index] = el; }}
      className="campus-carousel-card"
      aria-hidden={Math.abs(index - activeIndex) > 4}
    >
      <div
        ref={cardInnerRef}
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col transition-transform duration-500 hover:-translate-y-1"
      >
        {/* Image wrapper */}
        <div
          className="facility-image relative w-full overflow-hidden rounded-lg"
          style={{ '--facility-ratio': facility.ratio }}
        >
          <img
            src={facility.image}
            alt={facility.title}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: facility.position }}
          />

          {/* Cursor-tracked gold spotlight */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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

          {/* Top edge gold line — draws in on hover */}
          {!prefersReduced && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent transition-transform duration-500 group-hover:scale-x-100"
            />
          )}

          {/* Corner brackets — slide in on hover */}
          {!prefersReduced && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3 h-5 w-5 opacity-0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:opacity-100"
              >
                <span className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                <span className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 opacity-0 transition-all duration-500 group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100"
              >
                <span className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                <span className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
              </span>
            </>
          )}

          {/* Gold ring on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
          />
        </div>

        {/* Card body — text content */}
        <div className="relative px-2 pt-3">
          {/* Left accent bar on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-3 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-1rem)]"
          />

          <h3 className="font-serif text-base font-semibold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#876B18]">
            {facility.title}
          </h3>
          <p className="type-caption mt-1 uppercase tracking-[0.12em] text-[#5A5A66] transition-colors duration-300 group-hover:text-[#876B18]">
            {facility.detail}
          </p>

          {/* Explore hint — slides in on hover */}
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#876B18] opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span>View</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.4"
              stroke="currentColor"
              className="h-2.5 w-2.5 transition-transform duration-500 group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Main Section ────────────────────────────────────────────

const TheCampus = () => {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const autoplayResumeTimerRef = useRef(null);
  const autoplayPausedRef = useRef(false);
  const rafRef = useRef(null);
  const lastFrameRef = useRef(0);
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(facilities.length);
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [carouselInViewRef, carouselInView] = useInViewOnce({ amount: 0.15 });
  const [ctaRef, ctaInView] = useInViewOnce({ amount: 0.3 });

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

  const pauseAutoplay = () => {
    autoplayPausedRef.current = true;
    window.clearTimeout(autoplayResumeTimerRef.current);
    autoplayResumeTimerRef.current = window.setTimeout(() => {
      autoplayPausedRef.current = false;
    }, 1800);
  };

  const handleMouseEnter = () => {
    autoplayPausedRef.current = true;
    window.clearTimeout(autoplayResumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    autoplayPausedRef.current = false;
  };

  const moveToCard = useCallback((index, behavior = 'smooth') => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index];
    if (!carousel || !card) return;
    carousel.scrollTo({
      left: card.offsetLeft - (carousel.clientWidth - card.clientWidth) / 2,
      behavior,
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const reduceMotion = prefersReduced;
    const facilitiesCount = facilities.length;

    moveToCard(facilitiesCount, 'auto');
    lastFrameRef.current = performance.now();

    const tick = (now) => {
      const deltaMs = now - lastFrameRef.current;
      lastFrameRef.current = now;
      const deltaSec = Math.min(deltaMs, 100) / 1000;

      if (!autoplayPausedRef.current && !reduceMotion) {
        carousel.scrollLeft += DRIFT_SPEED_PX_PER_SEC * deltaSec;
      }

      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      const cards = carousel.children;
      const totalCount = cards.length;
      let nearestIndex = 0;
      let nearestDistance = Infinity;

      for (let i = 0; i < totalCount; i += 1) {
        const card = cards[i];
        if (!card) continue;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distancePx = Math.abs(cardCenter - carouselCenter);

        if (distancePx < nearestDistance) {
          nearestDistance = distancePx;
          nearestIndex = i;
        }

        const el = cardRefs.current[i];
        if (!el) continue;

        if (distancePx > SCALE_FALLOFF_PX * 1.6) {
          el.style.transform = `scale(${SCALE_MIN})`;
          el.style.filter = `brightness(${BRIGHTNESS_MIN}) blur(${BLUR_MAX}px)`;
          el.style.zIndex = '1';
          continue;
        }

        const t = clamp01(distancePx / SCALE_FALLOFF_PX);
        const scale = lerp(SCALE_MAX, SCALE_MIN, t);
        const brightness = lerp(BRIGHTNESS_MAX, BRIGHTNESS_MIN, t);
        const blur = lerp(BLUR_MIN, BLUR_MAX, t);
        const z = Math.round(lerp(30, 1, t));

        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.filter = blur > 0.05
          ? `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`
          : `brightness(${brightness.toFixed(3)})`;
        el.style.zIndex = String(z);
      }

      setActiveIndex((prev) => (prev === nearestIndex ? prev : nearestIndex));

      const middleStartIndex = facilitiesCount;
      const middleEndIndex = facilitiesCount * 2;
      const firstMiddleCard = cards[middleStartIndex];
      const nextSetFirstCard = cards[middleEndIndex];

      if (firstMiddleCard && nextSetFirstCard) {
        const setWidth = nextSetFirstCard.offsetLeft - firstMiddleCard.offsetLeft;
        const firstMiddleCardLeft = firstMiddleCard.offsetLeft;
        const driftPastStart = carousel.scrollLeft - firstMiddleCardLeft;

        if (driftPastStart >= setWidth) {
          carousel.scrollLeft -= setWidth;
        } else if (driftPastStart < 0) {
          carousel.scrollLeft += setWidth;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const applyInitialScales = () => {
      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      const cards = carousel.children;
      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i];
        const el = cardRefs.current[i];
        if (!card || !el) continue;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distancePx = Math.abs(cardCenter - carouselCenter);
        const t = clamp01(distancePx / SCALE_FALLOFF_PX);
        const scale = lerp(SCALE_MAX, SCALE_MIN, t);
        const brightness = lerp(BRIGHTNESS_MAX, BRIGHTNESS_MIN, t);
        const blur = lerp(BLUR_MIN, BLUR_MAX, t);
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.filter = blur > 0.05
          ? `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`
          : `brightness(${brightness.toFixed(3)})`;
      }
    };
    applyInitialScales();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(autoplayResumeTimerRef.current);
    };
  }, [moveToCard, prefersReduced]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;
    const onResize = () => moveToCard(facilities.length, 'auto');
    const ro = new ResizeObserver(onResize);
    ro.observe(carousel);
    return () => ro.disconnect();
  }, [moveToCard]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative w-full overflow-hidden bg-[#FDFCFA] py-14 md:pb-[4vw] md:pt-[4.2vw]"
    >
      {/* Section-wide cursor glow */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* Header */}
      <motion.div
        ref={headerRef}
        className="relative z-10 px-6 sm:px-10 md:px-[5.4vw]"
        variants={headerContainerVariants(prefersReduced)}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        {/* Eyebrow with pulsing dot */}
        <motion.h4
          className="group type-eyebrow mb-3 flex cursor-default items-center gap-3 text-[#876B18]"
          variants={headerItemVariants(prefersReduced, isMobile, 8)}
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
            The Campus
          </span>
        </motion.h4>

        {/* Heading with hover color shift */}
        <motion.h2
          className="type-page-title cursor-default text-[#1A1A1A] transition-colors duration-500 hover:text-[#876B18]"
          variants={headerItemVariants(prefersReduced, isMobile, 16)}
        >
          Everything on<br />one property.
        </motion.h2>
      </motion.div>

      {/* Carousel */}
      <motion.div
        ref={carouselInViewRef}
        className="relative z-10"
        variants={carouselWrapperVariants(prefersReduced)}
        initial="hidden"
        animate={carouselInView ? 'visible' : 'hidden'}
      >
        <div
          ref={carouselRef}
          className="campus-carousel mt-8 md:mt-[3vw]"
          aria-label="Campus facilities carousel"
          onPointerDown={pauseAutoplay}
          onTouchStart={pauseAutoplay}
          onWheel={pauseAutoplay}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {carouselFacilities.map((facility, index) => (
            <CarouselCard
              key={`${facility.title}-${index}`}
              facility={facility}
              index={index}
              activeIndex={activeIndex}
              cardRefs={cardRefs}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        ref={ctaRef}
        className="relative z-10 mt-8 pl-6 sm:pl-10 md:mt-[3.2vw] md:pl-[5.4vw]"
        variants={ctaVariants(prefersReduced, isMobile)}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
      >
        <Link
          to="/facilities"
          className="group/link relative inline-flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] transition-colors duration-300 hover:text-[#876B18]"
        >
          <span className="relative pb-1">
            See all facilities
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full bg-[#876B18]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
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
    </section>
  );
};

export default TheCampus;