// src/components/sections/OpeningSeason.jsx
import { motion } from 'framer-motion';
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

const headerContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const headerItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const offersContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: prefersReduced ? 0 : 0.15 } },
});

const offerItemVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 20 : 40) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: EASE_PRIMARY } },
});

const OpeningSeason = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [headerRef, headerInView] = useInViewOnce({ amount: 0.3 });
  const [offersRef, offersInView] = useInViewOnce({ amount: 0.15 });

  return (
    <section className="overflow-hidden bg-[#FDFCFA] px-6 py-12 md:px-10 md:py-20 xl:aspect-[1920/852] xl:p-0">
      <div className="mx-auto flex h-full w-full flex-col items-start gap-12 bg-[#FDFCFA] xl:flex-row xl:gap-0">
        <div className="flex w-full flex-col xl:w-[71%] xl:pl-[5.9vw] xl:pr-[4.8vw] xl:pt-[4.7vw]">

          <motion.div
            ref={headerRef}
            className="mb-8 pl-0"
            variants={headerContainerVariants(prefersReduced)}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
          >
            <motion.h4 className="type-eyebrow mb-3 text-[#C9A227]" variants={headerItemVariants(prefersReduced, isMobile, 8)}>
              Opening Season
            </motion.h4>

            <SplitText
              as="h2"
              className="type-section-title text-[#1A1A1A]"
              wordDelay={0.05}
              startDelay={0.1}
              amount={0.3}
            >
              Available until we open.
            </SplitText>
          </motion.div>

          <motion.div
            ref={offersRef}
            className="grid grid-cols-1 gap-8 pl-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[2.5vw]"
            variants={offersContainerVariants(prefersReduced)}
            initial="hidden"
            animate={offersInView ? 'visible' : 'hidden'}
          >
            {offers.map((item) => (
              <motion.div
                key={item.num}
                className="hover-lift flex min-w-0 flex-row items-start gap-3 rounded-lg p-2"
                variants={offerItemVariants(prefersReduced, isMobile)}
              >
                <div className="aspect-[0.72] w-28 flex-shrink-0 overflow-hidden xl:w-[clamp(4.75rem,9vw,11rem)]">
                  <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="mb-1 font-serif text-base text-[#C9A227]">{item.num}</span>
                  <h4 className="mb-2 text-sm font-semibold leading-tight text-[#1A1A1A] md:mb-1 md:text-sm">{item.title}</h4>
                  <p className="max-w-[9rem] text-xs font-normal leading-[1.5] text-[#5A5A66] md:max-w-[9rem] md:text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="flex items-end justify-start pb-6 sm:justify-center"
              variants={offerItemVariants(prefersReduced, isMobile)}
            >
              <Link to="/courses" className="link-underline w-max text-xs font-medium text-[#1A1A1A]">
                See all programs
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] xl:aspect-auto xl:h-full xl:w-[29%]">
          <DriftImage
            src="/page 11 1 gpt.webp"
            alt="Equestrian Facility"
            drift="subtle"
            duration={32}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OpeningSeason;