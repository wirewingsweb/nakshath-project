// src/components/sections/WhoTeaches.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, DriftImage } from '../motion';

const coaches = [
  { name: 'Nakshath Venkatesh', role: 'Founder', image: '/founder.png', offset: '' },
  { name: 'Bharath Venna', role: 'Coordinator', image: '/page 10 2 gpt.png', offset: 'xl:mt-5' },
  { name: 'Vani', role: 'Trainer', image: '/trainer.png', offset: 'xl:mt-10' },
];

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

const WhoTeaches = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [gridRef, gridInView] = useInViewOnce({ amount: 0.2 });

  return (
    <section className="relative min-h-[42rem] w-full overflow-hidden bg-[#0C0922] px-6 pb-14 pt-14 md:px-10 md:py-20 xl:aspect-[1920/1327] xl:min-h-0 xl:px-[5.4vw] xl:pb-0 xl:pt-[6.4vw]">

      <div className="absolute inset-0">
        <DriftImage
          src="/blue house.png"
          alt=""
          targetOpacity={0.75}
          drift="subtle"
          duration={40}
          className="h-full w-full"
          imgClassName="block h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[#0C0922]/35" />

      <div className="relative z-10">
        <motion.div
          ref={headerRef}
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.h4 className="type-eyebrow mb-4 text-[#C9A227]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
            Who Teaches
          </motion.h4>

          <SplitText
            as="h2"
            className="type-page-title text-white"
            wordDelay={0.05}
            startDelay={0.15}
            amount={0.3}
          >
            Small batches,<br />named coaches.
          </SplitText>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 xl:grid-cols-[1.05fr_1fr_0.95fr_0.55fr] xl:gap-[2.8vw]"
          variants={gridContainerVariants(prefersReduced)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {coaches.map((coach) => (
            <motion.article key={coach.name} className={`hover-lift rounded-lg ${coach.offset}`} variants={coachItemVariants(prefersReduced, isMobile)}>
              <div className="p-2">
                <h3 className="type-card-title text-white">{coach.name}</h3>
                <p className="type-caption mb-3 mt-1 font-semibold uppercase tracking-[0.14em] text-white/75">
                  {coach.role}
                </p>
                <motion.div
                  className="aspect-[3/5] w-full overflow-hidden rounded-t-[1.6rem]"
                  whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                  transition={{ duration: 0.4, ease: EASE_PRIMARY }}
                >
                  <img src={coach.image} alt={coach.name} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
                </motion.div>
              </div>
            </motion.article>
          ))}

          <motion.div
            className="self-end pb-2 text-white/85 xl:mt-[15vw] xl:self-auto xl:pb-0"
            variants={coachItemVariants(prefersReduced, isMobile)}
          >
            <p className="type-small">Limited riders<br />per session.</p>
            <Link
              to="/trainers"
              className="mt-7 inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#C9A227] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A227] transition-colors duration-300 hover:bg-[#C9A227] hover:text-[#0C0922] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0922]"
            >
              Meet the team
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoTeaches;