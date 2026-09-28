// src/components/sections/Programs.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';

const programs = [
  { title: 'Kids Special', description: 'Pony riding, confidence and coordination for children.', image: '/page 4 3 gpt.png', offset: 'xl:mt-0', imageClass: 'object-contain' },
  { title: 'Beginner', description: 'First-time riders. Balance, posture, safety and horse handling.', image: '/page 4 gpt.png', offset: 'xl:mt-[5.5vw]', imageClass: 'object-contain' },
  { title: 'Intermediate', description: 'Riding technique, communication, trotting and cantering.', image: '/page 4 2 gpt.png', offset: 'xl:mt-[0.8vw]', imageClass: 'object-contain' },
  { title: 'Professional Competition', description: 'Show jumping preparation and performance assessment.', image: '/page 4 4 gpt.png', offset: 'xl:mt-[5vw]', imageClass: 'object-cover object-top' },
];

// ─── Variants ────────────────────────────────────────────────

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY },
  },
});

const cardsContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.15, delayChildren: prefersReduced ? 0 : 0.1 } },
});

const cardVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 20 : 40) },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: prefersReduced ? 0 : 0.7, ease: EASE_PRIMARY },
  },
});

const ctaVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 6 : 10) },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.15 },
  },
});

// ─── Component ───────────────────────────────────────────────

const Programs = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [cardsRef, cardsInView] = useInViewOnce({ amount: 0.15 });
  const [ctaRef, ctaInView] = useInViewOnce({ amount: 0.3 });

  return (
    <section className="mobile-cta-exclusion floating-action-exclusion w-full overflow-hidden border-t-[0.45rem] border-[#0C0922] bg-[#FDFCFA] py-16 md:py-24">

      {/* Header */}
      <motion.div
        ref={headerRef}
        className="pl-6 pr-6 sm:pl-10 md:pl-[6.4vw]"
        variants={headerContainerVariants(prefersReduced)}
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
      >
        <motion.h4 className="type-eyebrow mb-4 text-[#876B18]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
          Programs
        </motion.h4>
        <motion.h2 className="type-page-title text-[#1A1A1A]" variants={headerItemVariants(prefersReduced, isMobile, 16)}>
          Four ways in,<br />one path forward.
        </motion.h2>
      </motion.div>

      {/* Carousel */}
      <div className="programs-carousel mt-8 snap-x snap-mandatory scroll-pl-6 overflow-x-auto overscroll-x-contain pl-6 sm:scroll-pl-10 sm:pl-10 md:mt-14 md:scroll-pl-[5.9vw] md:pl-[5.9vw]" aria-label="Programs carousel" tabIndex="0">
        <motion.div
          ref={cardsRef}
          className="flex w-max items-start gap-6 pr-6 md:gap-[1.5vw] md:pr-[4vw]"
          variants={cardsContainerVariants(prefersReduced)}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
        >
          {programs.map((program) => (
            <motion.article
              key={program.title}
              className={`${program.offset} flex w-[84vw] max-w-[21rem] shrink-0 snap-start snap-always flex-col overflow-hidden rounded-xl bg-[#0C0922] sm:w-[42vw] sm:max-w-none lg:w-[30vw] xl:w-[20vw]`}
              variants={cardVariants(prefersReduced, isMobile)}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#0C0922]">
                <motion.img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  decoding="async"
                  className={`block h-full w-full ${program.imageClass}`}
                  whileHover={prefersReduced ? undefined : { scale: 1.03 }}
                  transition={{ duration: 0.4, ease: EASE_PRIMARY }}
                />
              </div>
              <div className="flex min-h-[8rem] flex-1 flex-col px-5 py-5 text-white md:min-h-[9rem] md:px-6 md:py-6">
                <h3 className="mb-2 text-base font-semibold leading-snug md:mb-[0.7vw]">{program.title}</h3>
                <p className="type-small max-w-[17rem] text-white/80">{program.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        ref={ctaRef}
        className="mt-12 pl-6 sm:pl-10 md:mt-[3vw] md:pl-[5.9vw]"
        variants={ctaVariants(prefersReduced, isMobile)}
        initial="hidden"
        animate={ctaInView ? 'visible' : 'hidden'}
      >
        <Link to="/courses" className="inline-block border-b border-[#876B18] pb-1 text-xs font-semibold text-[#1A1A1A] transition-colors hover:text-[#876B18]">
          See all programs
        </Link>
      </motion.div>
    </section>
  );
};

export default Programs;