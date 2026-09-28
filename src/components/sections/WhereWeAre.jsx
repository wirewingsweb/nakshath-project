import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../../constants/location';

const driveTimes = [
  { location: 'Sarjapur', route: 'via Sarjapur Road', time: '12 mins' },
  { location: 'Electronic City', route: 'via Hosur Road', time: '20 mins' },
  { location: 'HSR Layout', route: 'via Sarjapur Road', time: '22 mins' },
  { location: 'Bellandur', route: 'via Outer Ring Road', time: '24 mins' },
  { location: 'Whitefield', route: 'via Outer Ring Road', time: '28 mins' },
];

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   TITLE LINE — 3D flip down from above
   ============================================================ */
const FlippedLine = ({ children, delay = 0 }) => (
  <span
    className="block overflow-hidden"
    style={{ perspective: '1000px' }}
  >
    <motion.span
      initial={{ rotateX: 90, y: -30, opacity: 0 }}
      whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: EASE }}
      style={{ transformOrigin: 'center top', display: 'block' }}
    >
      {children}
    </motion.span>
  </span>
);

/* ============================================================
   INFO ROW — icon drops, text slides from right
   ============================================================ */
const InfoRow = ({ icon, label, children, delay = 0, href }) => {
  const content = (
    <div className="flex items-start gap-4">
      {/* Icon drops in from above with a bounce */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{
          duration: 0.9,
          delay: delay + 0.1,
          ease: [0.34, 1.4, 0.64, 1],
        }}
        className="mt-1 flex-shrink-0 text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#C9A227]"
      >
        {icon}
      </motion.div>

      {/* Text slides in from the right */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.85, delay: delay + 0.25, ease: EASE }}
      >
        <h5 className="mb-1 text-xs font-bold uppercase tracking-widest">
          {label}
        </h5>
        {children}
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block text-inherit no-underline transition-colors"
      >
        {content}
      </a>
    );
  }
  return <div className="group">{content}</div>;
};

/* ============================================================
   DRIVE ROW — slides in from the right, gold time on hover
   ============================================================ */
const DriveRow = ({ item, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0 }}
    transition={{
      duration: 0.85,
      delay: 0.3 + idx * 0.12,
      ease: EASE,
    }}
    className="group/row flex items-center justify-between border-b border-[#5A5A66]/20 pb-3"
  >
    <div className="min-w-0">
      <p className="text-sm font-medium text-[#1A1A1A] transition-colors duration-300 group-hover/row:text-[#876B18]">
        {item.location}
      </p>
      <p className="text-xs font-normal text-[#5A5A66]">{item.route}</p>
    </div>
    <motion.span
      className="font-serif text-lg tabular-nums text-[#1A1A1A] transition-colors duration-300 group-hover/row:text-[#876B18]"
      initial={false}
    >
      {item.time}
    </motion.span>
  </motion.div>
);

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const WhereWeAre = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMapLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="overflow-hidden bg-[#FDFCFA] px-6 py-24 md:px-20">
      <div className="mx-auto flex min-h-[600px] max-w-7xl flex-col gap-12 lg:flex-row lg:gap-16">

        {/* ==================================================
            LEFT COLUMN
            ================================================== */}
        <div className="flex w-full flex-col justify-between lg:w-[40%]">
          <div className="flex flex-col">

            {/* Eyebrow */}
            <motion.h4
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
              className="mb-4 text-[0.625rem] font-bold uppercase text-[#C9A227]"
            >
              Where We Are
            </motion.h4>

            {/* Title — 3D flip down, line by line */}
            <h2 className="type-page-title mb-8 text-[#1A1A1A]">
              <FlippedLine delay={0.25}>Sarjapura,</FlippedLine>
              <FlippedLine delay={0.45}>Bengaluru.</FlippedLine>
            </h2>

            {/* Info block — no rail, just the rows */}
            <div className="mb-8 space-y-6">
              <InfoRow
                delay={0.55}
                href={BUSINESS_MAP_URL}
                label="Address"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                }
              >
                <p className="text-sm font-normal leading-relaxed text-[#5A5A66]">
                  Inside BEML Cooperative Society<br />
                  S. Medahalli, Sarjapura<br />
                  Bengaluru, Karnataka 562107
                </p>
              </InfoRow>

              <InfoRow
                delay={0.7}
                label="Open"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                }
              >
                <p className="text-sm font-normal text-[#5A5A66]">
                  Tuesday–Saturday · Monday closed
                </p>
              </InfoRow>

              <InfoRow
                delay={0.85}
                label="Contact"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.038-1.174.356l-1.08 1.33c-.265.326-.706.422-1.065.236a17.461 17.461 0 0 1-5.931-5.93c-.186-.36-.09-.8.236-1.066l1.33-1.08c.318-.272.465-.733.356-1.174l-1.106-4.423c-.125-.5-.575-.85-1.091-.85H4.5a2.25 2.25 0 0 0-2.25 2.25Z" />
                  </svg>
                }
              >
                <p className="text-sm font-normal text-[#5A5A66]">8460 846 946</p>
              </InfoRow>
            </div>

            {/* ==================================================
                GETTING HERE
                ================================================== */}
            <div className="mb-8">
              <motion.h4
                initial={{ opacity: 0, letterSpacing: '0.05em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
                className="mb-4 text-[0.625rem] font-bold uppercase text-[#C9A227]"
              >
                Getting Here
              </motion.h4>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
                className="mb-6 font-serif text-xl text-[#1A1A1A]"
              >
                Closer than you think.
              </motion.h3>

              {/* Drive rows — all slide from right, staggered */}
              <div className="space-y-4">
                {driveTimes.map((item, idx) => (
                  <DriveRow key={idx} item={item} idx={idx} />
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
                className="mt-4 text-xs text-[#5A5A66]/70"
              >
                Travel times are approximate and may vary depending on traffic conditions.
              </motion.p>
            </div>

            {/* Get directions */}
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
              whileHover={{ x: 4 }}
              href={BUSINESS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-max items-center gap-2 border-b border-black pb-1 text-xs font-semibold transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
            >
              <span>Get directions</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </div>

          {/* ==================================================
              BOTTOM IMAGE — horizontal curtain reveal from left
              ================================================== */}
          <div className="mt-10 w-full overflow-hidden rounded-xl shadow-lg lg:mt-0">
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
              className="relative"
            >
              <motion.img
                src="/page 12 gpt.png"
                alt="Equestrian Facility"
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1.8, delay: 1, ease: EASE }}
                className="block h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* ==================================================
            RIGHT COLUMN: MAP — horizontal curtain from right
            ================================================== */}
        <motion.div
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="group/map relative h-[500px] w-full overflow-hidden rounded-2xl border border-[#5A5A66]/20 bg-[#FDFCFA] shadow-lg md:h-[600px] lg:h-auto lg:w-[60%]"
        >
          {/* Loading shimmer — fades after map settles */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: mapLoaded ? 0 : 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden bg-[#FDFCFA]"
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#C9A227]/12 to-transparent"
            />
          </motion.div>

          <iframe
            src={BUSINESS_MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nakshath Equestrian Club Location Map"
            className="relative z-[1]"
          />

          {/* Gold rim on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-700 group-hover/map:border-[#C9A227]/40" />
        </motion.div>

      </div>
    </section>
  );
};

export default WhereWeAre;