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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: prefersReduced ? 0 : DURATION.normal, ease: EASE_PRIMARY },
  },
});

const driveTimesContainerVariants = (prefersReduced) => ({
  hidden: {},
  visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.06 } },
});

const driveTimeRowVariants = (prefersReduced, isMobile) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : (isMobile ? 5 : 8) },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: prefersReduced ? 0 : 0.4, ease: EASE_PRIMARY },
  },
});

const WhereWeAre = () => {
  const driveTimes = [
    { location: 'Sarjapur',         route: 'via Sarjapur Road',      time: '12 mins', mapsQuery: 'Sarjapur,Bengaluru' },
    { location: 'Electronic City',  route: 'via Hosur Road',          time: '20 mins', mapsQuery: 'Electronic City,Bengaluru' },
    { location: 'HSR Layout',       route: 'via Sarjapur Road',      time: '22 mins', mapsQuery: 'HSR Layout,Bengaluru' },
    { location: 'Bellandur',        route: 'via Outer Ring Road',     time: '24 mins', mapsQuery: 'Bellandur,Bengaluru' },
    { location: 'Whitefield',       route: 'via Outer Ring Road',     time: '28 mins', mapsQuery: 'Whitefield,Bengaluru' },
  ];

  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [leftRef, leftInView] = useInViewOnce({ amount: 0.15 });
  const [mapRef, mapInView] = useInViewOnce({ amount: 0.2 });

  return (
    <section className="overflow-hidden bg-[#FDFCFA] px-6 py-24 md:px-20">
      <div className="mx-auto flex min-h-[600px] max-w-7xl flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-20">

        {/* ═══════════════ LEFT COLUMN ═══════════════ */}
        <motion.div
          ref={leftRef}
          className="flex w-full flex-col justify-between gap-12 lg:w-[42%]"
          variants={leftColumnVariants(prefersReduced)}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col gap-10">
            {/* Eyebrow */}
            <motion.h4
              className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]"
              variants={leftItemVariants(prefersReduced, isMobile, 8)}
            >
              Where We Are
            </motion.h4>

            {/* Heading */}
            <SplitText
              as="h2"
              className="type-page-title text-[#1A1A1A]"
              wordDelay={0.05}
              startDelay={0.1}
              amount={0.3}
            >
              Sarjapura,<br />Bengaluru.
            </SplitText>

            {/* ═══ Contact Information Block ═══ */}
            <motion.div
              className="flex flex-col gap-8 border-l-2 border-[#C9A227] pl-6"
              variants={leftItemVariants(prefersReduced, isMobile, 10)}
            >
              {/* Address — clickable, opens Google Maps */}
              <a
                href={BUSINESS_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 text-inherit no-underline"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227] transition-all duration-300 group-hover:bg-[#C9A227] group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="mb-1 text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-[#C9A227]">
                    Address
                  </h5>
                  <p className="text-sm font-normal leading-relaxed text-[#5A5A66]">
                    Inside BEML Cooperative Society<br />
                    S. Medahalli, Sarjapura<br />
                    Bengaluru, Karnataka 562107
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#C9A227] opacity-0 transition-opacity group-hover:opacity-100">
                    Open in Maps
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </a>

              {/* Hours — non-clickable but styled */}
              <div className="group flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227] transition-all duration-300 group-hover:bg-[#C9A227] group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="mb-1 text-xs font-bold uppercase tracking-widest">Open</h5>
                  <p className="text-sm font-normal text-[#5A5A66]">
                    Tuesday–Saturday · Monday closed
                  </p>
                </div>
              </div>

              {/* Phone — click to call */}
              <a
                href="tel:+918460846946"
                className="group flex items-start gap-4 text-inherit no-underline"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227] transition-all duration-300 group-hover:bg-[#C9A227] group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.038-1.174.356l-1.08 1.33c-.265.326-.706.422-1.065.236a17.461 17.461 0 0 1-5.931-5.93c-.186-.36-.09-.8.236-1.066l1.33-1.08c.318-.272.465-.733.356-1.174l-1.106-4.423c-.125-.5-.575-.85-1.091-.85H4.5a2.25 2.25 0 0 0-2.25 2.25Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="mb-1 text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-[#C9A227]">
                    Contact
                  </h5>
                  <p className="text-sm font-normal text-[#5A5A66] transition-colors group-hover:text-[#C9A227]">
                    8460 846 946
                  </p>
                </div>
              </a>
            </motion.div>

            {/* ═══ Drive Times Block ═══ */}
            <div className="flex flex-col gap-6">
              <motion.h4
                className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]"
                variants={leftItemVariants(prefersReduced, isMobile, 8)}
              >
                Getting Here
              </motion.h4>

              <motion.h3
                className="font-serif text-2xl text-[#1A1A1A]"
                variants={leftItemVariants(prefersReduced, isMobile, 10)}
              >
                Closer than you think.
              </motion.h3>

              <motion.ul
                className="flex flex-col gap-1"
                variants={driveTimesContainerVariants(prefersReduced)}
              >
                {driveTimes.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={driveTimeRowVariants(prefersReduced, isMobile)}
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-lg border border-transparent px-3 py-3 transition-all duration-300 hover:border-[#C9A227]/30 hover:bg-[#C9A227]/5"
                    >
                      {/* Left accent bar */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 bg-[#C9A227] transition-all duration-300 group-hover:h-8"
                      />

                      <div className="flex flex-1 items-center gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#C9A227] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C9A227] group-hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-3 w-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">
                            {item.location}
                          </p>
                          <p className="truncate text-xs font-normal text-[#5A5A66]">
                            {item.route}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="font-serif text-lg font-medium text-[#1A1A1A] transition-colors group-hover:text-[#C9A227]">
                          {item.time}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="h-3.5 w-3.5 text-[#C9A227] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p
                className="text-xs text-[#5A5A66]/70"
                variants={leftItemVariants(prefersReduced, isMobile, 6)}
              >
                Travel times are approximate and may vary depending on traffic conditions.
              </motion.p>
            </div>

            {/* ═══ CTA Button ═══ */}
            <motion.div variants={leftItemVariants(prefersReduced, isMobile, 8)}>
              <a
                href={BUSINESS_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-[#C9A227] bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#C9A227] transition-all duration-300 hover:bg-[#C9A227] hover:text-white"
              >
                Get Directions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Facility Image */}
          <div className="overflow-hidden rounded-2xl border border-[#C9A227]/20 shadow-lg">
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

        {/* ═══════════════ RIGHT COLUMN — Animated node graph ═══════════════ */}
        <motion.div
          ref={mapRef}
          className="flex w-full items-center justify-center lg:w-[58%]"
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