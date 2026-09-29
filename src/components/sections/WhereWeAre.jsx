// src/components/sections/WhereWeAre.jsx
import { motion } from 'framer-motion';
import { BUSINESS_MAP_URL } from '../../constants/location';
import { EASE_PRIMARY, DURATION } from '../../utils/motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { SplitText, DriftImage } from '../motion';
import AnimatedLocationMap from '../AnimatedLocationMap';

const leftColumnVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
});

const leftItemVariants = (prefersReduced, isMobile, y = 12) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? Math.round(y * 0.6) : y) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY } },
});

const driveTimesContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.06 } },
});

const driveTimeRowVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 5 : 8) },
  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.4, ease: EASE_PRIMARY } },
});

const WhereWeAre = () => {
  const driveTimes = [
    { location: 'Sarjapur', route: 'via Sarjapur Road', time: '12 mins' },
    { location: 'Electronic City', route: 'via Hosur Road', time: '20 mins' },
    { location: 'HSR Layout', route: 'via Sarjapur Road', time: '22 mins' },
    { location: 'Bellandur', route: 'via Outer Ring Road', time: '24 mins' },
    { location: 'Whitefield', route: 'via Outer Ring Road', time: '28 mins' },
  ];

  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [leftRef, leftInView] = useInViewOnce({ amount: 0.15 });
  const [mapRef, mapInView] = useInViewOnce({ amount: 0.2 });

  return (
    <section className="overflow-hidden bg-[#FDFCFA] px-6 py-24 md:px-20">
      <div className="mx-auto flex min-h-[600px] max-w-7xl flex-col gap-12 lg:flex-row lg:gap-16">

        {/* LEFT COLUMN */}
        <motion.div
          ref={leftRef}
          className="flex w-full flex-col justify-between lg:w-[40%]"
          variants={leftColumnVariants(prefersReduced)}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col">
            <motion.h4 className="mb-4 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]" variants={leftItemVariants(prefersReduced, isMobile, 8)}>
              Where We Are
            </motion.h4>

            <SplitText
              as="h2"
              className="type-page-title mb-8 text-[#1A1A1A]"
              wordDelay={0.05}
              startDelay={0.1}
              amount={0.3}
            >
              Sarjapura,<br />Bengaluru.
            </SplitText>

            <motion.div className="mb-8 space-y-6 border-l-2 border-[#C9A227] pl-6" variants={leftItemVariants(prefersReduced, isMobile, 10)}>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 text-[#1A1A1A]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline transition-colors hover:text-[#C9A227]">
                  <h5 className="mb-1 text-xs font-bold uppercase tracking-widest">Address</h5>
                  <p className="text-sm font-normal leading-relaxed text-[#5A5A66]">
                    Inside BEML Cooperative Society<br />S. Medahalli, Sarjapura<br />Bengaluru, Karnataka 562107
                  </p>
                </a>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 text-[#1A1A1A]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-1 text-xs font-bold uppercase tracking-widest">Open</h5>
                  <p className="text-sm font-normal text-[#5A5A66]">Tuesday–Saturday · Monday closed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 text-[#1A1A1A]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.038-1.174.356l-1.08 1.33c-.265.326-.706.422-1.065.236a17.461 17.461 0 0 1-5.931-5.93c-.186-.36-.09-.8.236-1.066l1.33-1.08c.318-.272.465-.733.356-1.174l-1.106-4.423c-.125-.5-.575-.85-1.091-.85H4.5a2.25 2.25 0 0 0-2.25 2.25Z" />
                  </svg>
                </div>
                <div>
                  <h5 className="mb-1 text-xs font-bold uppercase tracking-widest">Contact</h5>
                  <p className="text-sm font-normal text-[#5A5A66]">8460 846 946</p>
                </div>
              </div>
            </motion.div>

            <div className="mb-8">
              <motion.h4 className="mb-4 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]" variants={leftItemVariants(prefersReduced, isMobile, 8)}>
                Getting Here
              </motion.h4>
              <motion.h3 className="mb-6 font-serif text-xl text-[#1A1A1A]" variants={leftItemVariants(prefersReduced, isMobile, 10)}>
                Closer than you think.
              </motion.h3>

              <motion.div className="space-y-4" variants={driveTimesContainerVariants(prefersReduced)}>
                {driveTimes.map((item, idx) => (
                  <motion.div key={idx} className="hover-lift flex items-center justify-between rounded-lg border-b border-[#5A5A66]/20 p-2 pb-3" variants={driveTimeRowVariants(prefersReduced, isMobile)}>
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{item.location}</p>
                      <p className="text-xs font-normal text-[#5A5A66]">{item.route}</p>
                    </div>
                    <span className="font-serif text-lg text-[#1A1A1A]">{item.time}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p className="mt-4 text-xs text-[#5A5A66]/70" variants={leftItemVariants(prefersReduced, isMobile, 6)}>
                Travel times are approximate and may vary depending on traffic conditions.
              </motion.p>
            </div>

            <motion.div variants={leftItemVariants(prefersReduced, isMobile, 8)}>
              <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="link-underline w-max text-xs font-semibold">
                Get directions
              </a>
            </motion.div>
          </div>

          <div className="mt-10 w-full overflow-hidden rounded-xl shadow-lg lg:mt-0">
            <DriftImage
              src="/page 12 gpt.webp"
              alt="Equestrian Facility"
              drift="subtle"
              duration={36}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT COLUMN — Animated node graph with reference map */}
        <motion.div
          ref={mapRef}
          className="flex w-full items-center justify-center lg:w-[60%]"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={mapInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: prefersReduced ? 0 : 0.8,
            delay: prefersReduced ? 0 : 0.1,
            ease: EASE_PRIMARY,
          }}
        >
          <AnimatedLocationMap />
        </motion.div>
      </div>
    </section>
  );
};

export default WhereWeAre;