// src/components/sections/TheCampus.jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const DRIFT_SPEED_PX_PER_SEC = 40;
const SCALE_MIN = 0.90;
const SCALE_MAX = 1.00;
const BRIGHTNESS_MIN = 0.60;
const BRIGHTNESS_MAX = 1.00;
const BLUR_MIN = 0;
const BLUR_MAX = 2.5;
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
    <section className="w-full overflow-hidden bg-[#FDFCFA] py-14 md:pb-[4vw] md:pt-[4.2vw]">
      <motion.div
        ref={headerRef}
        className="px-6 sm:px-10 md:px-[5.4vw]"
        variants={headerContainerVariants(prefersReduced)}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        <motion.h4 className="type-eyebrow mb-3 text-[#876B18]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
          The Campus
        </motion.h4>
        <motion.h2 className="type-page-title text-[#1A1A1A]" variants={headerItemVariants(prefersReduced, isMobile, 16)}>
          Everything on<br />one property.
        </motion.h2>
      </motion.div>

      <motion.div
        ref={carouselInViewRef}
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
            <article
              key={`${facility.title}-${index}`}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="campus-carousel-card"
              aria-hidden={Math.abs(index - activeIndex) > 4}
            >
              <div className="facility-image w-full overflow-hidden rounded-lg" style={{ '--facility-ratio': facility.ratio }}>
                <img src={facility.image} alt={facility.title} loading="lazy" decoding="async" className="block h-full w-full object-cover" style={{ objectPosition: facility.position }} />
              </div>
              <div className="px-2 pt-3">
                <h3 className="font-serif text-base font-semibold text-[#1A1A1A]">{facility.title}</h3>
                <p className="type-caption mt-1 uppercase tracking-[0.12em] text-[#5A5A66]">{facility.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={ctaRef}
        className="mt-8 pl-6 sm:pl-10 md:mt-[3.2vw] md:pl-[5.4vw]"
        variants={ctaVariants(prefersReduced, isMobile)}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
      >
        <Link to="/facilities" className="inline-block border-b border-[#876B18] pb-1 text-xs font-semibold text-[#1A1A1A]">
          See all facilities
        </Link>
      </motion.div>
    </section>
  );
};

export default TheCampus;