import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// FACILITIES DATA
// ============================================================
const facilities = [
  {
    num: '01',
    image: '/page-7-1-gpt.webp',
    title: 'Indoor Arena',
    detail: 'All-weather',
    position: '50% 58%',
  },
  {
    num: '02',
    image: '/page-7-2-gpt.webp',
    title: 'Outdoor Arena',
    detail: 'Sand surface',
    position: '50% 48%',
  },
  {
    num: '03',
    image: '/page-7-3-gpt.webp',
    title: 'Stables',
    detail: 'Individual stalls',
    position: '50% 55%',
  },
  {
    num: '04',
    image: '/page-7-4-gpt.webp',
    title: 'Café',
    detail: 'Open to visitors',
    position: '50% 52%',
  },
  {
    num: '05',
    image: '/page-7-5-gpt.webp',
    title: 'Cottages',
    detail: 'On-site stay',
    position: '50% 55%',
  },
];

// Duplicate for seamless infinite loop
const loopedFacilities = [...facilities, ...facilities, ...facilities];

const TheCampus = () => {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const singleSetWidthRef = useRef(0);

  const SPEED = 0.6; // px per frame

  // ============================================================
  // MEASURE WIDTH + START ANIMATION
  // ============================================================
  useEffect(() => {
    let mounted = true;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      const cards = track.querySelectorAll('article');
      if (cards.length < facilities.length) return;

      // Width from start to end of first set
      const firstCard = cards[0];
      const lastCardOfFirstSet = cards[facilities.length - 1];

      const width =
        lastCardOfFirstSet.offsetLeft +
        lastCardOfFirstSet.offsetWidth -
        firstCard.offsetLeft;

      singleSetWidthRef.current = width;
    };

    // Wait for images/layout to settle
    const timeoutId = setTimeout(() => {
      if (!mounted) return;
      measure();

      const animate = () => {
        const track = trackRef.current;
        if (!track) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        const speedMultiplier = isPausedRef.current ? 0.25 : 1;
        scrollPosRef.current += SPEED * speedMultiplier;

        // Loop when one full set has scrolled
        if (
          singleSetWidthRef.current > 0 &&
          scrollPosRef.current >= singleSetWidthRef.current
        ) {
          scrollPosRef.current -= singleSetWidthRef.current;
        }

        track.style.transform = `translate3d(-${scrollPosRef.current}px, 0, 0)`;

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    }, 300);

    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFCFA] py-14 md:pt-[4.2vw] md:pb-[4vw]">

      {/* ============================================================ */}
      {/* HEADER */}
      {/* ============================================================ */}
      <div className="relative z-10 px-6 sm:px-10 md:px-[5.4vw]">
        <motion.div
          className="mb-3 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="type-eyebrow text-[#876B18]">The Campus</span>
          <motion.span
            className="h-px max-w-[160px] flex-1 origin-left bg-gradient-to-r from-[#876B18]/60 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <motion.h2
          className="type-page-title text-[#1A1A1A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Everything on
          <br />
          one property.
        </motion.h2>
      </div>

      {/* ============================================================ */}
      {/* INFINITE MARQUEE */}
      {/* ============================================================ */}
      <div
        className="relative z-10 mt-8 w-full md:mt-[3vw]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#FDFCFA] to-transparent md:w-32" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#FDFCFA] to-transparent md:w-32" />

        {/* Overflow mask — vertical padding so shadows don't clip */}
        <div className="overflow-hidden py-4">
          <div
            ref={trackRef}
            className="flex w-max gap-4 will-change-transform md:gap-6"
            style={{ paddingLeft: '1.5rem' }}
          >
            {loopedFacilities.map((facility, index) => (
              <FacilityCard
                key={`${facility.num}-${index}`}
                facility={facility}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <div className="relative z-10 mt-8 px-6 sm:px-10 md:mt-[3.2vw] md:px-[5.4vw]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/facilities"
            className="group inline-flex items-center gap-3 border-b border-[#876B18] pb-1 text-xs font-semibold text-[#1A1A1A] transition-colors hover:text-[#876B18]"
          >
            See all facilities
            <svg
              width="16"
              height="9"
              viewBox="0 0 18 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M0 5H16M16 5L12 1M16 5L12 9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================
// FACILITY CARD (independent component so animation is not tied
// to parent variants — avoids invisible cards)
// ============================================================
const FacilityCard = ({ facility }) => {
  return (
    <article className="group relative w-[78vw] shrink-0 sm:w-[46vw] md:w-[26vw] lg:w-[22vw] xl:w-[19vw]">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
        <img
          src={facility.image}
          alt={facility.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: facility.position }}
        />

        {/* Number Badge */}
        <div className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#0C0922]/70 backdrop-blur-md transition-all duration-300 group-hover:border-[#C9A227] group-hover:bg-[#C9A227]">
          <span className="font-serif text-[0.7rem] font-bold text-[#C9A227] transition-colors duration-300 group-hover:text-[#0C0922]">
            {facility.num}
          </span>
        </div>

        {/* Golden border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/60" />
      </div>

      {/* Text */}
      <div className="px-2 pt-3">
        <h3 className="text-sm font-serif font-semibold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#876B18] md:text-base">
          {facility.title}
        </h3>
        <p className="type-caption mt-1 uppercase tracking-[0.12em] text-[#5A5A66]">
          {facility.detail}
        </p>
      </div>
    </article>
  );
};

export default TheCampus;