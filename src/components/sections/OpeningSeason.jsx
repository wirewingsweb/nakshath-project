// src/components/sections/OpeningSeason.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, DriftImage } from '../motion';

const offers = [
  { img: '/page 11 2 gpt.webp', num: '01', title: 'Free trial ride', desc: 'Ten minutes on a schooled horse. No charge, no obligation.' },
  { img: '/page 11 3 gpt.webp', num: '02', title: '10% off the first month', desc: 'Applied to any programme at enrolment.' },
  { img: '/page 11 4 gpt.webp', num: '03', title: 'Weekend batches', desc: 'Saturday and Sunday sessions for working schedules.' },
  { img: '/page 11 5 gpt.webp', num: '04', title: 'Kids summer camp', desc: 'A structured holiday programme for children.' },
  { img: '/page 11 6 gpt.webp', num: '05', title: 'Early registration', desc: 'Priority slots for riders who enrol before opening.' },
];

// ─── Variants ────────────────────────────────────────────────

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

// Slightly faster stagger so ink-drop cascades feel connected
const offersContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.14,
      delayChildren: prefersReduced ? 0 : 0.15,
    },
  },
});

// ── Ink Drop reveal: card expands radially from top-left ──
const offerItemVariants = (prefersReduced) => ({
  hidden: {
    opacity: prefersReduced ? 1 : 0,
    // Circle starts at 0% from top-left → fully expands
    clipPath: prefersReduced ? 'circle(150% at 0% 0%)' : 'circle(0% at 0% 0%)',
  },
  visible: {
    opacity: 1,
    clipPath: 'circle(150% at 0% 0%)',
    transition: {
      opacity: { duration: prefersReduced ? 0 : 0.15, ease: 'easeOut' },
      clipPath: {
        duration: prefersReduced ? 0 : 1.0,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
});

// ─── Offer Card Component ────────────────────────────────────

const OfferCard = ({ item, prefersReduced }) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      variants={offerItemVariants(prefersReduced)}
      style={
        prefersReduced
          ? undefined
          : {
              willChange: 'clip-path, opacity',
            }
      }
    >
      {/* Inner wrapper — holds the interactive 3D + spotlight (separate from ink drop) */}
      <motion.div
        className="relative flex min-w-0 flex-row items-start gap-3 rounded-lg p-2"
        style={
          prefersReduced
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 1200,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }
        }
        whileHover={
          prefersReduced
            ? undefined
            : {
                y: -6,
                transition: { duration: 0.4, ease: EASE_PRIMARY },
              }
        }
      >
        {/* Cursor spotlight */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              left: spotlightLeft,
              top: spotlightTop,
              background:
                'radial-gradient(circle at center, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.03) 45%, transparent 75%)',
              filter: 'blur(25px)',
            }}
          />
        )}

        {/* Left accent bar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-2 h-0 w-[2px] bg-[#C9A227] transition-all duration-500 group-hover:h-[calc(100%-1rem)]"
        />

        {/* Image */}
        <div className="relative aspect-[0.72] w-28 flex-shrink-0 overflow-hidden rounded-md xl:w-[clamp(4.75rem,9vw,11rem)]">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
          />

          {!prefersReduced && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
          )}
        </div>

        {/* Content */}
        <div className="relative flex flex-col pt-1">
          <span className="mb-1 inline-block font-serif text-base text-[#C9A227] transition-all duration-500 group-hover:tracking-widest">
            {item.num}
          </span>

          <h4 className="mb-2 text-sm font-semibold leading-tight text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#876B18] md:mb-1 md:text-sm">
            {item.title}
          </h4>

          <p className="max-w-[9rem] text-xs font-normal leading-[1.5] text-[#5A5A66] transition-colors duration-300 group-hover:text-[#1A1A1A] md:max-w-[9rem] md:text-xs">
            {item.desc}
          </p>

          <span
            aria-hidden="true"
            className="mt-2 block h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-12"
          />
        </div>

        {/* Outer gold ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-[#C9A227]/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-[#C9A227]/30"
        />
      </motion.div>

      {/* Ink-drop ripple ring — emerges with the reveal */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 h-[2px] w-[2px] rounded-full border border-[#C9A227]"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: [0, 8, 16, 22],
              opacity: [0, 0.6, 0.2, 0],
              transition: {
                duration: 1.4,
                times: [0, 0.3, 0.7, 1],
                ease: 'easeOut',
              },
            },
          }}
          style={{ transformOrigin: 'top left' }}
        />
      )}
    </motion.div>
  );
};

// ─── Main Section ────────────────────────────────────────────

const OpeningSeason = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [offersRef, offersInView] = useInViewOnce({ amount: 0.15 });
  const [imageRef, imageInView] = useInViewOnce({ amount: 0.2 });

  const sectionRef = useRef(null);
  const imageAreaRef = useRef(null);

  const imageMouseX = useMotionValue(0);
  const imageMouseY = useMotionValue(0);
  const imageSpring = { damping: 30, stiffness: 150, mass: 0.6 };
  const imageSmoothX = useSpring(imageMouseX, imageSpring);
  const imageSmoothY = useSpring(imageMouseY, imageSpring);

  const imageParallaxX = useTransform(imageSmoothX, [-0.5, 0.5], [10, -10]);
  const imageParallaxY = useTransform(imageSmoothY, [-0.5, 0.5], [8, -8]);

  const imageSpotlightLeft = useTransform(imageSmoothX, [-0.5, 0.5], ['0%', '100%']);
  const imageSpotlightTop = useTransform(imageSmoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleImageMouseMove = (e) => {
    const rect = imageAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    imageMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    imageMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleImageMouseLeave = () => {
    imageMouseX.set(0);
    imageMouseY.set(0);
  };

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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative overflow-hidden bg-[#FDFCFA] px-6 py-12 md:px-10 md:py-20 xl:aspect-[1920/852] xl:p-0"
    >
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full xl:block"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      <div className="relative z-10 mx-auto flex h-full w-full flex-col items-start gap-12 xl:flex-row xl:gap-0">
        <div className="flex w-full flex-col xl:w-[71%] xl:pl-[5.9vw] xl:pr-[4.8vw] xl:pt-[4.7vw]">

          <motion.div
            ref={headerRef}
            className="mb-8 pl-0"
            variants={headerContainerVariants(prefersReduced)}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
          >
            <motion.h4
              className="group/eyebrow type-eyebrow mb-3 flex cursor-default items-center gap-3 text-[#C9A227]"
              variants={headerItemVariants(prefersReduced, isMobile, 8)}
            >
              <motion.span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                animate={
                  prefersReduced
                    ? { scale: 1, opacity: 1 }
                    : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="transition-colors duration-300 group-hover/eyebrow:text-[#876B18]">
                Opening Season
              </span>
            </motion.h4>

            <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
              <SplitText
                as="h2"
                className="type-section-title text-[#1A1A1A]"
                wordDelay={0.05}
                startDelay={0.1}
                amount={0.3}
              >
                Available until we open.
              </SplitText>
            </div>

            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                className="mt-4 h-px w-16 bg-[#C9A227]"
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_PRIMARY }}
                style={{ originX: 0 }}
              />
            )}
          </motion.div>

          <motion.div
            ref={offersRef}
            className="grid grid-cols-1 gap-8 pl-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[2.5vw]"
            variants={offersContainerVariants(prefersReduced)}
            initial="hidden"
            animate={offersInView ? 'visible' : 'hidden'}
          >
            {offers.map((item) => (
              <OfferCard key={item.num} item={item} prefersReduced={prefersReduced} />
            ))}

            {/* CTA */}
            <motion.div
              className="flex items-end justify-start pb-6 sm:justify-center"
              variants={offerItemVariants(prefersReduced)}
            >
              <Link
                to="/courses"
                className="group/link relative inline-flex items-center gap-2 text-xs font-medium text-[#1A1A1A] transition-colors duration-300 hover:text-[#C9A227]"
              >
                <span className="relative pb-1">
                  See all programs
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full bg-[#1A1A1A]/40"
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
          </motion.div>
        </div>

        {/* SIDE IMAGE */}
        <div
          ref={imageAreaRef}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageMouseLeave}
          className="group/image relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/9] xl:aspect-auto xl:h-full xl:w-[29%] xl:rounded-none"
        >
          <motion.div
            className="h-full w-full"
            initial={
              prefersReduced
                ? false
                : {
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                    scale: 1.1,
                    opacity: 0,
                  }
            }
            animate={
              imageInView && !prefersReduced
                ? {
                    clipPath: [
                      'polygon(0 0, 0 0, 0 100%, 0 100%)',
                      'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    ],
                    scale: 1,
                    opacity: 1,
                  }
                : {}
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    clipPath: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
                    scale: { duration: 1.6, delay: 0.2, ease: EASE_PRIMARY },
                    opacity: { duration: 0.6, ease: EASE_PRIMARY },
                  }
            }
            style={
              prefersReduced
                ? undefined
                : { x: imageParallaxX, y: imageParallaxY }
            }
          >
            <DriftImage
              src="/page 11 1 gpt.webp"
              alt="Equestrian Facility"
              drift="subtle"
              duration={32}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </motion.div>

          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/image:opacity-100"
              style={{
                left: imageSpotlightLeft,
                top: imageSpotlightTop,
                background:
                  'radial-gradient(circle, rgba(245,230,168,0.30) 0%, rgba(201,162,39,0.10) 45%, transparent 75%)',
                filter: 'blur(40px)',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {!prefersReduced && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-4 z-20 h-8 w-8 opacity-0 transition-all duration-500 group-hover/image:left-6 group-hover/image:top-6 group-hover:opacity-100"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 z-20 h-8 w-8 opacity-0 transition-all duration-500 group-hover/image:bottom-6 group-hover/image:right-6 group-hover:opacity-100"
              >
                <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
              </div>
            </>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl ring-0 ring-[#C9A227] transition-all duration-500 group-hover/image:ring-2 group-hover/image:ring-inset xl:rounded-none"
          />
        </div>
      </div>
    </section>
  );
};

export default OpeningSeason;