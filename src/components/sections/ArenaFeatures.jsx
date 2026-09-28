// src/components/sections/ArenaFeatures.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText } from '../motion';

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
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: prefersReduced ? 0 : 0.15 } },
});

const featureCardVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 40 : 60), scale: prefersReduced ? 1 : 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: prefersReduced ? 0 : 0.8, ease: EASE_PRIMARY },
  },
});

const iconVariants = (prefersReduced) => ({
  hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.7, rotate: prefersReduced ? 0 : -8 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: prefersReduced ? 0 : 0.6, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.25 },
  },
});

const dividerVariants = (prefersReduced) => ({
  hidden: { scaleX: prefersReduced ? 1 : 0 },
  visible: {
    scaleX: 1,
    transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY, delay: prefersReduced ? 0 : 0.4 },
  },
});

const ArenaFeatures = () => {
  const features = [
    { img: '/arena-indoor.webp', title: 'Indoor Arena', desc: 'Training in a safe, controlled, covered environment.' },
    { img: '/arena-weather.webp', title: 'All-Weather Training', desc: 'Sessions run through monsoon and peak summer heat.' },
    { img: '/arena-footing.webp', title: 'International Footing', desc: 'Geotextile surface built for grip, cushioning and safety.' },
    { img: '/arena-batches.webp', title: 'Small Batches', desc: 'Limited riders per session so every rider gets attention.' },
    { img: '/arena-horses.webp', title: 'Schooled Horses', desc: 'Calm, well-trained horses matched to rider level.' },
    { img: '/arena-progression.webp', title: 'Structured Progression', desc: 'Walk, trot, canter, and on to national and international competition.' },
  ];

  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [gridRef, gridInView] = useInViewOnce({ amount: 0.15 });

  return (
    <section className="relative overflow-hidden bg-[#0C0922] px-6 py-16 text-white md:px-[8vw] md:py-24">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,39,0.10), transparent 70%)' }}
        animate={prefersReduced ? { opacity: 0.5 } : { opacity: [0.4, 0.7, 0.4] }}
        transition={prefersReduced ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto w-full max-w-[96rem]">
        <motion.div
          ref={headerRef}
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.h4 className="type-eyebrow mb-5 text-[#C9A227]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
            The Arena
          </motion.h4>

          <SplitText
            as="h2"
            className="type-page-title mb-14 md:mb-16"
            wordDelay={0.05}
            startDelay={0.15}
            amount={0.3}
          >
            Built so the training<br />never stops.
          </SplitText>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-14 xl:grid-cols-3 xl:gap-x-[4vw]"
          variants={gridContainerVariants(prefersReduced)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="hover-lift grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-4 rounded-lg p-2 min-[360px]:grid-cols-[5.7rem_minmax(0,1fr)] min-[360px]:gap-5 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-6"
              variants={featureCardVariants(prefersReduced, isMobile)}
            >
              <motion.div
                className="mt-1 flex aspect-square w-full items-center justify-center overflow-hidden"
                variants={iconVariants(prefersReduced)}
                whileHover={prefersReduced ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.25, ease: EASE_PRIMARY }}
              >
                <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </motion.div>

              <div className="flex flex-col">
                <h3 className="text-base font-semibold uppercase leading-[1.35] tracking-[0.08em] text-white md:min-h-[2.7em]">
                  {item.title}
                </h3>
                <motion.span aria-hidden="true" className="my-3 block h-px w-8 origin-left bg-[#C9A227]/60" variants={dividerVariants(prefersReduced)} />
                <p className="type-small mt-3 max-w-[14rem] text-white/75">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArenaFeatures;