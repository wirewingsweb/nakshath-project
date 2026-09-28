import { motion } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { EASE, EASE_SNAP } from '../../utils/landing-motion';

/* ============================================================
   WORD MASK — each word slides up
   ============================================================ */
const WordMask = ({ text, delay = 0, className = '' }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: '0.25em' }}
        >
          <motion.span
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.1,
              ease: EASE,
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const TrialRideCTA = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative w-full overflow-hidden bg-[#0C0922]">

      {/* ==================================================
          FULL BACKGROUND IMAGE — completely visible
          ================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Iris reveal + Ken Burns zoom */}
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 55%)' }}
          whileInView={{ clipPath: 'circle(130% at 50% 55%)' }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.8, ease: EASE_SNAP }}
          className="absolute inset-0"
        >
          <motion.img
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            src="/come and ride.png"
            alt="Rider at Nakshath Equestrian Club"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Barely-there wash — keeps photo bright */}
        <div className="absolute inset-0 bg-[#0C0922]/[0.18]" />

        {/* Bottom gradient ONLY where the text sits — helps readability without dimming the whole photo */}
        <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#0C0922]/80 via-[#0C0922]/40 to-transparent" />

        {/* Top + bottom blend bands — smooth into neighbouring sections */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0C0922]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C0922]/70 to-transparent" />
      </div>

      {/* ==================================================
          CONTENT — anchored to the bottom of the photo
          ================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 md:min-h-[720px] md:pb-24 md:pt-48">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-5 flex items-center gap-4"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="inline-block h-px w-10 origin-left bg-[#C9A227]"
          />
          <span className="text-[#C9A227] type-eyebrow [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            Free Trial · 10 Minutes
          </span>
        </motion.div>

        {/* Title with word mask + strong text-shadow for readability over the photo */}
        <h2 className="type-page-title mb-6 max-w-4xl leading-[1.02] text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.85),0_2px_8px_rgba(0,0,0,0.6)]">
          <span className="block">
            <WordMask text="Come and sit" delay={0.4} />
          </span>
          <span className="block">
            <WordMask text="on a horse." delay={0.8} />
          </span>
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
          className="type-lead mb-10 max-w-md text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.75)]"
        >
          Ten minutes, no charge, no obligation.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: EASE }}
          className="flex flex-wrap items-center gap-6"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => openEnquiry('Trial Ride')}
            className="group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#C9A227] px-10 py-5 text-[#0C0922] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] transition-colors duration-500 hover:bg-white"
          >
            <motion.span
              initial={{ x: '-150%' }}
              animate={{ x: '250%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2,
              }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />

            <span className="type-button relative font-bold">
              Book Your Trial Ride
            </span>

            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative inline-block text-lg"
            >
              →
            </motion.span>
          </motion.button>

          {/* Secondary link */}
          <motion.a
            href="https://wa.me/918460846946"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
            className="group/wa inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#0C0922]/40 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors duration-500 hover:border-[#C9A227] hover:text-[#C9A227]"
          >
            Or WhatsApp us
            <span className="inline-block transition-transform duration-500 group-hover/wa:translate-x-1">
              ↗
            </span>
          </motion.a>
        </motion.div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: EASE }}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-6 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]"
        >
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
            />
            Sarjapura · Bengaluru
          </span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span>Open Tuesday–Saturday</span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span>All ages · 5+</span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span>enquiry@ngses.in</span>
        </motion.div>
      </div>
    </section>
  );
};

export default TrialRideCTA;