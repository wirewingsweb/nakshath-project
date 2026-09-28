// src/components/sections/OurHorses.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, KenBurnsImage } from '../motion';

const textContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: prefersReduced ? 0 : 0.1 } },
});

const textItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const underlineVariants = (prefersReduced) => ({
  hidden: { scaleX: prefersReduced ? 1 : 0 },
  visible: {
    scaleX: 1,
    transition: { duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY },
  },
});

const OurHorses = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [textRef, textInView] = useInViewOnce({ amount: 0.3 });

  return (
    <section className="w-full bg-[#FDFCFA] px-[1.8vw] py-8 md:py-[2.3vw]">
      <div className="relative h-[32rem] w-full overflow-hidden rounded-[1.5rem] md:h-auto">

        {/* Background image — Ken Burns now */}
        <KenBurnsImage
          src="/page 8 gpt.webp"
          alt="Horse at sunset"
          cinematic={false}
          targetOpacity={1}
          className="h-full w-full md:h-auto"
          imgClassName="block h-full w-full object-cover object-[58%_center] md:h-auto md:object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/55 to-transparent md:from-[#0C0922]/80 md:via-[#0C0922]/25" />

        {/* Text content */}
        <div className="absolute left-7 top-1/2 max-w-[15.5rem] -translate-y-1/2 text-white md:left-[6.8%] md:max-w-[22rem]">
          <motion.div
            ref={textRef}
            variants={textContainerVariants(prefersReduced)}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
          >
            <motion.h4 className="type-eyebrow mb-4 text-[#C9A227]" variants={textItemVariants(prefersReduced, isMobile, 8)}>
              Our Horses
            </motion.h4>

            {/* Heading with SplitText */}
            <SplitText
              as="h2"
              className="type-page-title"
              wordDelay={0.05}
              startDelay={0.15}
              amount={0.3}
            >
              Calm, schooled, and matched to the rider.
            </SplitText>

            <motion.p
              className="mt-4 max-w-[16rem] text-sm leading-[1.55] text-white/85 md:max-w-[25vw] md:text-base"
              variants={textItemVariants(prefersReduced, isMobile, 12)}
            >
              Every horse selected for temperament first, then trained for the level it teaches.
            </motion.p>

            <motion.div className="mt-6 inline-block" variants={textItemVariants(prefersReduced, isMobile, 10)}>
              <Link to="/horses" className="link-underline text-xs font-medium">
                Meet the horses
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurHorses;