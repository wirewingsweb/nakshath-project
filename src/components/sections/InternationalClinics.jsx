import { useState } from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// COUNTRIES DATA
// ============================================================
const countries = [
  { name: 'Germany', discipline: 'Show Jumping' },
  { name: 'Netherlands', discipline: 'Dressage' },
  { name: 'France', discipline: 'Eventing' },
  { name: 'United Kingdom', discipline: 'Show Jumping' },
  { name: 'Ireland', discipline: 'Eventing' },
];

const InternationalClinics = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#FDFCFA] px-6 py-16 md:px-12 md:py-24">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#0C0922 1px, transparent 1px), linear-gradient(90deg, #0C0922 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 md:grid-cols-2">
        {/* ============================================================ */}
        {/* LEFT SIDE */}
        {/* ============================================================ */}
        <div className="flex flex-col">
          {/* Eyebrow — slide-in */}
          <motion.h4
            className="type-eyebrow mb-4 text-[#C9A227]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            International Clinics
          </motion.h4>

          {/* Heading — fade-up with stagger */}
          <motion.h2
            className="type-page-title mb-5 text-[#1A1A1A]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              delay: 0.15,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Coaches who
            <br />
            travel to teach
            <br />
            here.
          </motion.h2>

          {/* Paragraph — fade-up */}
          <motion.p
            className="type-small mb-5 max-w-[20rem] text-[#5A5A66]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Ten to fifteen day intensive clinics led by visiting professionals
            from across the equestrian world. Open to members and outside
            riders, with stabling and on-site accommodation.
          </motion.p>

          {/* Map Image — subtle reveal + parallax-like float */}
          <motion.div
            className="relative mb-4 w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{
              delay: 0.45,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.img
              src="/international map.png"
              alt="World Map"
              loading="lazy"
              decoding="async"
              className="h-auto max-h-[180px] w-full object-contain opacity-60 mix-blend-multiply"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            />

            {/* Traveling dotted pulse on map */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                  style={{
                    left: `${15 + i * 20}%`,
                    top: `${40 + (i % 2) * 15}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Link — with hover animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              delay: 0.6,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex w-max items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"
            >
              See clinic details
              <motion.svg
                width="14"
                height="9"
                viewBox="0 0 18 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M0 5H16M16 5L12 1M16 5L12 9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </a>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT SIDE — Country List */}
        {/* ============================================================ */}
        <div className="flex flex-col space-y-7 pt-2 md:pt-10">
          {countries.map((country, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={country.name}
                className="group relative flex cursor-pointer items-center justify-between border-b border-transparent pb-2 transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={{
                  x: isHovered ? 8 : 0,
                }}
              >
                {/* Left golden accent bar */}
                <motion.span
                  className="absolute left-0 top-0 h-full w-[2px] origin-top bg-[#C9A227]"
                  animate={{ scaleY: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'top' }}
                />

                <div className="flex items-center gap-4 pl-2">
                  {/* Country number */}
                  <motion.span
                    className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#C9A227]/60"
                    animate={{
                      color: isHovered
                        ? '#C9A227'
                        : 'rgba(201,162,39,0.6)',
                      x: isHovered ? -2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.span>

                  {/* Country name */}
                  <motion.span
                    className="type-card-title text-[#1A1A1A]"
                    animate={{
                      color: isHovered ? '#C9A227' : '#1A1A1A',
                      x: isHovered ? 4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {country.name}
                  </motion.span>
                </div>

                {/* Discipline */}
                <motion.span
                  className="type-caption font-medium uppercase tracking-[0.14em] text-[#C9A227]"
                  animate={{
                    x: isHovered ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {country.discipline}
                </motion.span>

                {/* Bottom scan line */}
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
                  animate={{ width: isHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            );
          })}

          {/* Bottom note — fade-up */}
          <motion.p
            className="type-caption mt-6 border-t border-[#C9A227]/20 pt-6 font-medium uppercase tracking-[0.14em] text-[#C9A227]/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              delay: 1,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Coaches announced closer to each clinic
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default InternationalClinics;