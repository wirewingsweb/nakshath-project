import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

const OurHorses = () => {
  return (
    <section className="w-full bg-[#FDFCFA] px-[1.8vw] py-8 md:py-[2.3vw]">
      {/* ============================================================ */}
      {/* MAIN IMAGE CARD — with cinematic reveal */}
      {/* ============================================================ */}
      <motion.div
        className="relative h-[32rem] w-full overflow-hidden rounded-[1.5rem] md:h-auto"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image with subtle zoom */}
        <motion.img
          src="/page 8 gpt.png"
          alt="Horse at sunset at Nakshath Equestrian Club"
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover object-[58%_center] md:h-auto md:object-center"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Gradient overlay — left side dark for text */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/55 to-transparent md:from-[#0C0922]/80 md:via-[#0C0922]/25" />

        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Bottom edge gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0922]/70 to-transparent" />

        {/* ============================================================ */}
        {/* TEXT CONTENT — left side, staggered reveal */}
        {/* ============================================================ */}
        <motion.div
          className="absolute left-7 top-1/2 max-w-[15.5rem] -translate-y-1/2 text-white md:left-[6.8%] md:max-w-[22rem]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.4 },
            },
          }}
        >
          {/* Eyebrow with line */}
          <motion.div
            className="mb-4 flex items-center gap-3"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <span className="type-eyebrow text-[#C9A227]">Our Horses</span>
            <motion.span
              className="block h-px w-12 origin-left bg-[#C9A227]/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="type-page-title"
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            Calm, schooled, and matched to the rider.
          </motion.h2>

          {/* Divider */}
          <motion.div
            className="my-5 h-px w-16 origin-left bg-[#C9A227]/50"
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />

          {/* Paragraph */}
          <motion.p
            className="max-w-[16rem] text-sm leading-[1.55] text-white/85 md:max-w-[25vw] md:text-base"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            Every horse selected for temperament first, then trained for the level it teaches.
          </motion.p>

          {/* CTA Link */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Link
              to="/horses"
              className="group mt-6 inline-flex items-center gap-2 border-b border-[#C9A227] pb-1 text-xs font-medium text-white transition-colors hover:text-[#C9A227]"
            >
              Meet the horses
              <motion.svg
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
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ============================================================ */}
        {/* Decorative corner accents */}
        {/* ============================================================ */}
        <motion.div
          className="pointer-events-none absolute right-6 top-6 h-6 w-6 border-r border-t border-[#C9A227]/40"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 1, duration: 0.6 }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#C9A227]/40"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 1.1, duration: 0.6 }}
        />

        {/* Golden shimmer sweep on load */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.15) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
          initial={{ backgroundPosition: '-100% 0%' }}
          whileInView={{ backgroundPosition: '200% 0%' }}
          viewport={viewportOnce}
          transition={{ delay: 0.5, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default OurHorses;