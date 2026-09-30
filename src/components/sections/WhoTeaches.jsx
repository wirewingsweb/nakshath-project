// src/components/sections/WhoTeaches.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, DriftImage } from '../motion';

const coaches = [
  { name: 'Nakshath Venkatesh', role: 'Founder',     image: '/founder.webp',       offset: '', accent: 'Nakshath' },
  { name: 'Bharath Venna',      role: 'Coordinator', image: '/page 10 2 gpt.webp', offset: 'xl:mt-5', accent: 'Bharath' },
  { name: 'Vani',               role: 'Trainer',     image: '/trainer.webp',       offset: 'xl:mt-10', accent: 'Vani' },
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

const gridContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.15, delayChildren: prefersReduced ? 0 : 0.2 } },
});

const coachItemVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 20 : 40) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.7, ease: EASE_PRIMARY } },
});

// ─── 3D Tilt Coach Card ──────────────────────────────────────

const CoachCard3D = ({ coach, prefersReduced, index }) => {
  const cardRef = useRef(null);

  // Normalized mouse position (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth motion
  const spring = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // Card-level tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Image-level tilt
  const imgRotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const imgRotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  const imgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const imgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Spotlight position
  const spotlightLeft = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightTop = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={prefersReduced ? undefined : { perspective: 1000 }}
    >
      <div className="p-2">
        {/* Number badge above name */}
        <div className="mb-3 flex items-center gap-3">
          <motion.span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 text-[10px] font-bold tracking-wider text-[#C9A227] transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#0C0922]"
            whileHover={prefersReduced ? undefined : { rotate: 360 }}
            transition={{ duration: 0.6, ease: EASE_PRIMARY }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/40 to-transparent transition-all duration-500 group-hover:from-[#C9A227]" />
        </div>

        {/* Name — hover pe gold */}
        <h3 className="type-card-title text-white transition-colors duration-300 group-hover:text-[#C9A227]">
          {coach.name}
        </h3>

        {/* Role — accent dot + slide on hover */}
        <div className="mb-3 mt-1 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[#C9A227]/50 transition-all duration-500 group-hover:w-4 group-hover:bg-[#C9A227]" />
          <p className="type-caption font-semibold uppercase tracking-[0.14em] text-white/75 transition-colors duration-300 group-hover:text-[#C9A227]">
            {coach.role}
          </p>
        </div>

        {/* Card with 3D tilt */}
        <motion.div
          className="relative aspect-[3/5] w-full overflow-hidden rounded-t-[1.6rem]"
          style={
            prefersReduced
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }
          }
        >
          {/* Image with its own tilt + translate */}
          <motion.img
            src={coach.image}
            alt={coach.name}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
            style={
              prefersReduced
                ? undefined
                : {
                    rotateX: imgRotateX,
                    rotateY: imgRotateY,
                    x: imgTranslateX,
                    y: imgTranslateY,
                    scale: 1.08,
                  }
            }
          />

          {/* Gold spotlight that follows cursor */}
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

          {/* Bottom vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          />

          {/* Bottom content — slide-up overlay on hover */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A227]">
                View Profile
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                stroke="currentColor"
                className="h-3.5 w-3.5 text-[#C9A227]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Corner brackets — slide in on hover */}
          {!prefersReduced && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:left-4 group-hover:top-4 group-hover:opacity-100"
              >
                <div className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 opacity-0 transition-all duration-500 group-hover:bottom-4 group-hover:right-4 group-hover:opacity-100"
              >
                <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
                <div className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
              </div>
            </>
          )}

          {/* Gold ring on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-t-[1.6rem] ring-0 ring-[#C9A227] transition-all duration-500 group-hover:ring-2 group-hover:ring-inset"
          />
        </motion.div>
      </div>
    </div>
  );
};

// ─── Main Section ────────────────────────────────────────────

const WhoTeaches = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [gridRef, gridInView] = useInViewOnce({ amount: 0.2 });

  const sectionRef = useRef(null);

  // ── Section-wide cursor glow ──
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
      className="relative min-h-[42rem] w-full overflow-hidden bg-[#0C0922] px-6 pb-14 pt-14 md:px-10 md:py-20 xl:aspect-[1920/1327] xl:min-h-0 xl:px-[5.4vw] xl:pb-0 xl:pt-[6.4vw]"
    >
      <div className="absolute inset-0">
        <DriftImage
          src="/blue house.webp"
          alt=""
          targetOpacity={0.75}
          drift="subtle"
          duration={40}
          className="h-full w-full"
          imgClassName="block h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[#0C0922]/35" />

      {/* Section-wide cursor glow */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: sectionGlowLeft,
            top: sectionGlowTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.04) 45%, transparent 70%)',
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      <div className="relative z-10">
        <motion.div
          ref={headerRef}
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          {/* Eyebrow with pulsing dot */}
          <motion.h4
            className="group type-eyebrow mb-4 flex cursor-default items-center gap-3 text-[#C9A227]"
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
            <span className="transition-colors duration-300 group-hover:text-[#FFF8DC]">
              Who Teaches
            </span>
          </motion.h4>

          {/* Heading with word-hover effect */}
          <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
            <SplitText
              as="h2"
              className="type-page-title text-white"
              wordDelay={0.05}
              startDelay={0.15}
              amount={0.3}
            >
              Small batches,<br />named coaches.
            </SplitText>
          </div>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 xl:grid-cols-[1.05fr_1fr_0.95fr_0.55fr] xl:gap-[2.8vw]"
          variants={gridContainerVariants(prefersReduced)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              className={coach.offset}
              variants={coachItemVariants(prefersReduced, isMobile)}
            >
              <CoachCard3D coach={coach} prefersReduced={prefersReduced} index={index} />
            </motion.div>
          ))}

          {/* CTA block — enhanced interactivity */}
          <motion.div
            className="group/cta relative self-end pb-2 text-white/85 xl:mt-[15vw] xl:self-auto xl:pb-0"
            variants={coachItemVariants(prefersReduced, isMobile)}
          >
            <p className="type-small transition-colors duration-500 group-hover/cta:text-white">
              Limited riders<br />per session.
            </p>
            <Link
              to="/trainers"
              className="group/link relative mt-7 inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-[#C9A227] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A227] transition-all duration-300 hover:text-[#0C0922] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0922]"
            >
              {/* Fill that slides in from left on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-[#C9A227] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
              />
              <span className="relative z-10">Meet the team</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.4"
                stroke="currentColor"
                className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoTeaches;