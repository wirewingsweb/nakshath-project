// src/components/sections/WhoWeAre.jsx
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { DriftImage } from '../motion';

const campusKey = [
  ['1', 'Indoor arena'],
  ['4', 'Dressage arena'],
  ['2', 'Outdoor arena'],
  ['5', 'Stables'],
  ['3', 'Lunging pen'],
  ['6', 'Tack shop'],
];

const cardVariants = (prefersReduced) => ({
  hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : 0.9, ease: EASE_PRIMARY } },
});

const campusKeyContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.06, delayChildren: prefersReduced ? 0 : 0.2 } },
});

const campusKeyItemVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 5 : 8) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.4, ease: EASE_PRIMARY } },
});

const textContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: prefersReduced ? 0 : 0.1 } },
});

const textItemVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 8 : 12) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5, ease: EASE_PRIMARY } },
});

const WhoWeAre = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [cardRef, cardInView] = useInViewOnce({ amount: 0.25 });
  const [textRef, textInView] = useInViewOnce({ amount: 0.25 });

  return (
    <section className="mobile-cta-exclusion w-full bg-[#FDFCFA] py-14 md:py-16">
      <div className="grid min-h-[31.75rem] w-full grid-cols-1 items-center overflow-hidden rounded-r-[2.25rem] bg-[#0C0922] md:min-h-[42rem] md:w-[93.2%] md:grid-cols-[48%_52%]">

        {/* LEFT — Card */}
        <div className="flex justify-center px-5 pt-12 md:justify-end md:py-11 md:pl-10 md:pr-[4.5vw]">
          <motion.div
            ref={cardRef}
            className="hover-lift flex h-auto w-full max-w-[22rem] flex-col rounded-xl bg-[#FDFCFA] px-5 pb-6 pt-5 md:w-[min(31vw,27rem)] md:max-w-none md:px-5 md:pb-6 md:pt-5"
            variants={cardVariants(prefersReduced)}
            initial="hidden"
            animate={cardInView ? 'visible' : 'hidden'}
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <DriftImage
                src="/page 3 gpt.webp"
                alt="Campus Map"
                drift="subtle"
                duration={40}
                className="h-full w-full"
                imgClassName="h-full w-full object-contain"
              />
            </div>

            <motion.div
              className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.04em] text-[#1A1A1A] md:mt-[1vw] md:gap-y-[0.8vw] md:text-xs"
              variants={campusKeyContainerVariants(prefersReduced)}
              initial="hidden"
              animate={cardInView ? 'visible' : 'hidden'}
            >
              {campusKey.map(([number, label]) => (
                <motion.div
                  key={number}
                  className="grid min-w-0 grid-cols-[0.75rem_minmax(0,1fr)] items-start gap-1.5"
                  variants={campusKeyItemVariants(prefersReduced, isMobile)}
                >
                  <span className="text-xs font-bold md:text-sm">{number}</span>
                  <span className="min-w-0">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT — Text */}
        <div className="px-8 py-14 text-white sm:px-12 md:py-12 md:pl-[4.25vw] md:pr-12">
          <div className="max-w-[20rem]">
            <motion.div
              ref={textRef}
              variants={textContainerVariants(prefersReduced)}
              initial="hidden"
              animate={textInView ? 'visible' : 'hidden'}
            >
              <motion.h4 className="type-eyebrow mb-6 text-[#876B18] md:mb-[2.4vw]" variants={textItemVariants(prefersReduced, isMobile)}>
                Who We Are
              </motion.h4>

              <div className="space-y-9 text-base font-normal leading-[1.55] tracking-[0.01em] text-white/90 md:space-y-[4.2vw] md:text-lg">
                <motion.p variants={textItemVariants(prefersReduced, isMobile)}>
                  A working equestrian academy<br />on the edge of Bengaluru.
                </motion.p>
                <motion.p variants={textItemVariants(prefersReduced, isMobile)}>
                  Show jumping and dressage,<br />
                  taught from <span className="text-[#876B18]">first sit</span><br />
                  <span className="text-[#876B18]">to competition entry.</span>
                </motion.p>
                <motion.p variants={textItemVariants(prefersReduced, isMobile)}>
                  Four arenas, stables and cottages<br />across a single campus.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;