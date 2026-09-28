import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

// ============================================================
// FACILITIES DATA
// ============================================================
const facilities = [
  {
    image: '/page 7 1 gpt.png',
    title: 'Indoor Arena',
    detail: 'All-weather',
    position: '50% 58%',
  },
  {
    image: '/page 7 2 gpt.png',
    title: 'Outdoor Arena',
    detail: 'Sand surface',
    position: '50% 48%',
  },
  {
    image: '/page 7 3 gpt.png',
    title: 'Stables',
    detail: 'Individual stalls',
    position: '50% 55%',
  },
  {
    image: '/page 7 4 gpt.png',
    title: 'Café',
    detail: 'Open to visitors',
    position: '50% 52%',
  },
  {
    image: '/page 7 5 gpt.png',
    title: 'Cottages',
    detail: 'On-site stay',
    position: '50% 55%',
  },
];

const TheCampus = () => {
  // Duplicate for seamless infinite loop
  const doubledFacilities = [...facilities, ...facilities];

  return (
    <section className="w-full overflow-hidden bg-[#FDFCFA] py-14 md:pt-[4.2vw] md:pb-[4vw]">
      {/* ============================================================ */}
      {/* HEADER */}
      {/* ============================================================ */}
      <div className="px-6 sm:px-10 md:px-[5.4vw]">
        <motion.div
          className="mb-3 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="type-eyebrow text-[#876B18]">The Campus</span>
          <motion.span
            className="h-px max-w-[160px] flex-1 origin-left bg-gradient-to-r from-[#876B18]/60 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{
              delay: 0.3,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        <motion.h2
          className="type-page-title text-[#1A1A1A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Everything on
          <br />
          one property.
        </motion.h2>
      </div>

      {/* ============================================================ */}
      {/* CONTINUOUS AUTO-SCROLL CAROUSEL — Smaller Cards */}
      {/* ============================================================ */}
      <div className="mt-8 overflow-hidden md:mt-[3vw]">
        <div className="campus-scroll-track">
          {doubledFacilities.map((facility, index) => (
            <article
              key={`${facility.title}-${index}`}
              className="campus-scroll-card group"
            >
              {/* Image Container — Fixed 4:5 aspect ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                <img
                  src={facility.image}
                  alt={facility.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: facility.position }}
                />

                {/* Hover golden border */}
                <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent transition-colors duration-500 group-hover:border-[#C9A227]/60" />
              </div>

              {/* Text */}
              <div className="px-2 pt-3">
                <h3 className="text-sm font-serif font-semibold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#876B18] md:text-base">
                  {facility.title}
                </h3>
                <p className="type-caption mt-1 uppercase tracking-[0.12em] text-[#5A5A66]">
                  {facility.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* FOOTER — See all link */}
      {/* ============================================================ */}
      <div className="mt-8 px-6 sm:px-10 md:mt-[3.2vw] md:px-[5.4vw]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            to="/facilities"
            className="group inline-flex items-center gap-3 border-b border-[#876B18] pb-1 text-xs font-semibold text-[#1A1A1A] transition-colors hover:text-[#876B18]"
          >
            See all facilities
            <svg
              width="16"
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
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TheCampus;