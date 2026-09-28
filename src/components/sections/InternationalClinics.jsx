// src/components/sections/InternationalClinics.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, VIEWPORT } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// ─── Variants ────────────────────────────────────────────────

const leftColumnVariants = (prefersReduced) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.08,
    },
  },
});

const leftItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y),
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : DURATION.normal,
      ease: EASE_PRIMARY,
    },
  },
});

const rightColumnVariants = (prefersReduced) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.07,
      delayChildren: prefersReduced ? 0 : 0.2,
    },
  },
});

const countryRowVariants = (prefersReduced, isMobile) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : (isMobile ? 5 : 8),
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : 0.45,
      ease: EASE_PRIMARY,
    },
  },
});

// ─── Component ───────────────────────────────────────────────

const InternationalClinics = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className="bg-[#FDFCFA] px-6 py-16 md:px-12 md:py-13">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 md:grid-cols-2">

        {/* LEFT COLUMN */}
        <motion.div
          className="flex flex-col"
          variants={leftColumnVariants(prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: VIEWPORT.amount, once: VIEWPORT.once }}
        >
          <motion.h4
            className="type-eyebrow mb-4 text-[#C9A227]"
            variants={leftItemVariants(prefersReduced, isMobile, 8)}
          >
            International Clinics
          </motion.h4>
          <motion.h2
            className="type-page-title mb-5 text-[#1A1A1A]"
            variants={leftItemVariants(prefersReduced, isMobile, 16)}
          >
            Coaches who<br />travel to teach<br />here.
          </motion.h2>
          <motion.p
            className="type-small mb-5 max-w-[20rem] text-[#5A5A66]"
            variants={leftItemVariants(prefersReduced, isMobile, 12)}
          >
            Ten to fifteen day intensive clinics led by visiting professionals from across the equestrian world. Open to members and outside riders, with stabling and on-site accommodation.
          </motion.p>

          <motion.div
            className="relative mb-4 w-full"
            variants={leftItemVariants(prefersReduced, isMobile, 10)}
          >
            <img
              src="/international map.png"
              alt="World Map"
              className="h-auto max-h-[180px] w-full object-contain opacity-60 mix-blend-multiply"
            />
          </motion.div>

          <motion.div variants={leftItemVariants(prefersReduced, isMobile, 10)}>
            <a
              href="#"
              className="w-max border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-[#1A1A1A] transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
            >
              See clinic details
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Country rows */}
        <motion.div
          className="flex flex-col space-y-7 pt-2 md:pt-10"
          variants={rightColumnVariants(prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: VIEWPORT.amount, once: VIEWPORT.once }}
        >
          {[
            { country: 'Germany', discipline: 'Show Jumping' },
            { country: 'Netherlands', discipline: 'Dressage' },
            { country: 'France', discipline: 'Eventing' },
            { country: 'United Kingdom', discipline: 'Show Jumping' },
            { country: 'Ireland', discipline: 'Eventing' },
          ].map((row) => (
            <motion.div
              key={row.country}
              className="group flex cursor-pointer items-center justify-between border-b border-transparent pb-2 transition-colors hover:border-[#C9A227]/30"
              variants={countryRowVariants(prefersReduced, isMobile)}
            >
              <span className="type-card-title text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">
                {row.country}
              </span>
              <span className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]">
                {row.discipline}
              </span>
            </motion.div>
          ))}

          <motion.p
            className="type-caption mt-6 border-t border-[#C9A227]/20 pt-6 font-medium uppercase tracking-[0.14em] text-[#C9A227]/70"
            variants={countryRowVariants(prefersReduced, isMobile)}
          >
            Coaches announced closer to each clinic
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalClinics;