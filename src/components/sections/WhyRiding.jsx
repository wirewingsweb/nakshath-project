// src/components/sections/WhyRiding.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, DriftImage } from '../motion';

const benefits = [
  { image: '/page 9 physical.webp', title: 'Physical', items: ['Balance and coordination', 'Flexibility and posture', 'Core strength'] },
  { image: '/page 9 mentals.webp', title: 'Mental', items: ['Confidence', 'Focus and discipline', 'Calm under pressure'] },
  { image: '/page 9 lifestyle.webp', title: 'Lifestyle', items: ['Responsibility', 'Leadership', 'Sportsmanship'] },
];

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const benefitsContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: prefersReduced ? 0 : 0.15 } },
});

const benefitGroupVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 8 : 12) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY } },
});

const Benefit = ({ benefit, compact = false }) => (
  <article className={compact ? 'grid grid-cols-[6.5rem_1fr] items-center gap-5' : 'grid grid-cols-[13.8vw_1fr] items-start gap-[1.8vw]'}>
    <img src={benefit.image} alt="" loading="lazy" decoding="async" className={`block w-full mix-blend-multiply ${compact ? 'opacity-70' : 'opacity-75'}`} />
    <div className={compact ? 'py-4' : 'pt-[3.2vw]'}>
      <h3 className="type-eyebrow text-[#876B18]">{benefit.title}</h3>
      <span className={`block border-t border-[#876B18] ${compact ? 'mb-5 mt-3 w-8' : 'mb-[2vw] mt-[1.15vw] w-[2vw]'}`} />
      <ul className={compact ? 'space-y-4 text-sm leading-[1.45] text-[#1A1A1A]' : 'space-y-[2vw] text-sm leading-[1.45] text-[#1A1A1A]'}>
        {benefit.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  </article>
);

const WhyRiding = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [desktopHeaderRef, desktopHeaderInView] = useInViewOnce({ amount: 0.3 });
  const [desktopBenefitsRef, desktopBenefitsInView] = useInViewOnce({ amount: 0.15 });
  const [mobileHeaderRef, mobileHeaderInView] = useInViewOnce({ amount: 0.3 });
  const [mobileBenefitsRef, mobileBenefitsInView] = useInViewOnce({ amount: 0.15 });

  return (
    <section className="w-full overflow-hidden bg-[#FDFCFA]">

      {/* DESKTOP */}
      <div className="relative hidden aspect-[1672/941] w-full lg:block">
        <div className="absolute right-0 top-0 h-[62%] w-[70%] overflow-hidden">
          <DriftImage
            src="/page 9 gpt.webp"
            alt="A child riding a white horse at sunset"
            drift="subtle"
            duration={30}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover object-[63%_48%]"
          />
          <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#FDFCFA] via-[#FDFCFA]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#FDFCFA] via-[#FDFCFA]/65 to-transparent" />
        </div>

        <motion.header
          ref={desktopHeaderRef}
          className="absolute left-[6.8%] top-[15.5%] z-10 w-[48%]"
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={desktopHeaderInView ? 'visible' : 'hidden'}
        >
          <motion.h4 className="type-eyebrow mb-[2.1vw] text-[#876B18]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
            Why Riding
          </motion.h4>

          <SplitText
            as="h2"
            className="type-display text-[#1A1A1A]"
            wordDelay={0.05}
            startDelay={0.15}
            amount={0.3}
          >
            What a child takes<br />home from the arena.
          </SplitText>

          <motion.p className="mt-[1.6vw] text-base text-[#5A5A66]" variants={headerItemVariants(prefersReduced, isMobile, 12)}>
            Riding builds more than riding.
          </motion.p>
        </motion.header>

        <motion.div
          ref={desktopBenefitsRef}
          className="absolute inset-x-[3.5%] bottom-[7.2%] z-10 grid grid-cols-3 gap-[2.2vw]"
          variants={benefitsContainerVariants(prefersReduced)}
          initial="hidden"
          animate={desktopBenefitsInView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit) => (
            <motion.div key={benefit.title} variants={benefitGroupVariants(prefersReduced, isMobile)}>
              <Benefit benefit={benefit} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden">
        <motion.header
          ref={mobileHeaderRef}
          className="px-6 pb-7 pt-14 sm:px-10"
          variants={headerContainerVariants(prefersReduced)}
          initial="hidden"
          animate={mobileHeaderInView ? 'visible' : 'hidden'}
        >
          <motion.h4 className="type-eyebrow mb-4 text-[#876B18]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
            Why Riding
          </motion.h4>

          <SplitText
            as="h2"
            className="type-page-title text-[#1A1A1A]"
            wordDelay={0.05}
            startDelay={0.15}
            amount={0.3}
          >
            What a child takes<br />home from the arena.
          </SplitText>

          <motion.p className="mt-4 text-base leading-relaxed text-[#5A5A66]" variants={headerItemVariants(prefersReduced, isMobile, 12)}>
            Riding builds more than riding.
          </motion.p>
        </motion.header>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <DriftImage
            src="/page 9 gpt.webp"
            alt="A child riding a white horse at sunset"
            drift="subtle"
            duration={30}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover object-[72%_center]"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FDFCFA]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#FDFCFA] to-transparent" />
        </div>

        <motion.div
          ref={mobileBenefitsRef}
          className="space-y-3 px-6 pb-16 sm:px-10"
          variants={benefitsContainerVariants(prefersReduced)}
          initial="hidden"
          animate={mobileBenefitsInView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit) => (
            <motion.div key={benefit.title} variants={benefitGroupVariants(prefersReduced, isMobile)}>
              <Benefit benefit={benefit} compact />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRiding;