import { motion } from 'framer-motion';
import { EASE } from '../../utils/landing-motion';

/* ============================================================
   REVEAL FILL — left-to-right clip wipe (slow, deliberate)
   ============================================================ */
const RevealFill = ({ children, delay = 0, className = '', duration = 2.4 }) => (
  <span className={`relative inline-block ${className}`}>
    {/* Base layer — muted version, always visible */}
    <span className="opacity-[0.18]">{children}</span>

    {/* Fill layer — full colors, reveals left → right */}
    <motion.span
      aria-hidden="true"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none absolute inset-0"
    >
      {children}
    </motion.span>

    {/* Vertical shine riding the fill edge */}
    <motion.span
      aria-hidden="true"
      initial={{ left: '0%', opacity: 0 }}
      whileInView={{ left: '100%', opacity: [0, 0.9, 0.9, 0] }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.1, 0.9, 1],
      }}
      className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A227] to-transparent"
    />
  </span>
);

/* ============================================================
   THE DIFFERENCE
   ============================================================ */
const TheDifference = () => {
  return (
    <section className="bg-[#FDFCFA] grid grid-cols-1 md:grid-cols-[54%_46%] items-center overflow-hidden md:aspect-[1920/1365]">

      {/* ==================================================
          LEFT — Text
          ================================================== */}
      <div className="px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]">
        <div className="max-w-[38rem]">

          {/* Eyebrow */}
          <motion.h4
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mb-8 flex items-center gap-3 text-[#876B18] type-eyebrow md:mb-[3vw]"
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#876B18]"
            />
            The Difference
          </motion.h4>

          {/* Title — slow fill, left → right */}
          <h2 className="type-display mb-10 text-[#1A1A1A]">
            <span className="block">
              <RevealFill delay={0.6} duration={2.4}>
                Bengaluru's equestrian
              </RevealFill>
            </span>
            <span className="block">
              <RevealFill delay={2.4} duration={2.8}>
                training moves{' '}
                <span className="text-[#876B18]">indoors.</span>
              </RevealFill>
            </span>
          </h2>

          {/* Gold rule — draws in from left, after the title */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.6, delay: 5.2, ease: EASE }}
            className="mb-9 h-px w-[6.75rem] origin-left bg-[#876B18] md:mb-[3.2vw] md:w-[10vw]"
          />

          {/* Paragraph — slow fill */}
          <p className="type-lead max-w-[27rem] text-[#1A1A1A] md:max-w-[31rem]">
            <RevealFill delay={5.6} duration={3}>
              An all-weather covered arena on international-standard footing.
              Lessons do not stop for monsoon or summer heat.
            </RevealFill>
          </p>
        </div>
      </div>

      {/* ==================================================
          RIGHT — Image with clip-path curtain from right
          ================================================== */}
      <div className="px-6 pb-10 md:px-0 md:pb-0">
        <motion.div
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 2.4, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="group relative overflow-hidden rounded-[2rem] md:rounded-r-none md:rounded-l-[2.25rem]"
        >
          <motion.img
            src="/page 2 gpt.webp"
            alt="Indoor Arena"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 2.6, ease: EASE }}
            className="h-[28rem] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] md:h-[57.5vw]"
          />

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, delay: 3.4, ease: EASE }}
            className="pointer-events-none absolute left-5 top-5 h-[2px] w-16 origin-left bg-[#C9A227]/70"
          />
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1.2, delay: 3.8, ease: EASE }}
            className="pointer-events-none absolute left-5 top-5 h-16 w-[2px] origin-top bg-[#C9A227]/70"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TheDifference;