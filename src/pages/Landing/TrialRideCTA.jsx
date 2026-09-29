import { motion } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { viewportOnce } from '../../utils/animations';

const TrialRideCTA = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="relative w-full bg-[#0C0922] overflow-hidden py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-20">

      {/* ============================================================ */}
      {/* Background Image — Ken Burns + Parallax */}
      {/* ============================================================ */}
      <motion.img
        src="/come-and-ride.webp"
        alt="Trial Background"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[72%_center] z-0 brightness-[1.08] contrast-[1.08] saturate-[1.12] md:object-right md:brightness-100 md:contrast-[1.1] md:saturate-[1.14]"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Continuous Ken Burns */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: [1.05, 1.1, 1.05],
          x: ['0%', '-1.5%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0C0922]/76 via-[#0C0922]/46 to-[#0C0922]/14 md:from-[#0C0922]/55 md:via-[#0C0922]/32 md:to-transparent"></div>

      {/* Golden light sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.15) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['-150% 0%', '250% 0%'],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'easeInOut',
        }}
      />

      {/* ============================================================ */}
      {/* FLOATING PARTICLES */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#C9A227]"
            style={{
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 7 + Math.random() * 4,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================================ */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto flex flex-col items-start md:items-start justify-center min-h-[400px] md:min-h-[500px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
        }}
      >
        <div className="flex flex-col max-w-2xl [text-shadow:0_2px_16px_rgba(0,0,0,.76)]">

          {/* Heading */}
          <motion.h2
            className="type-page-title text-white mb-4 leading-tight"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            Come and sit<br/>
            on a horse.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="type-lead text-white/95 mb-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            Ten minutes, no charge, no obligation.
          </motion.p>

          {/* Book Button with Luxury Golden Glow Pulse */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <motion.button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button relative w-max bg-[#C9A227] text-[#0C0922] px-10 py-4 rounded-full hover:bg-white transition-colors shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Your Trial Ride

              {/* Luxury Golden Glow Pulse */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(201,162,39,0)',
                    '0 0 25px 4px rgba(201,162,39,0.6)',
                    '0 0 0 0 rgba(201,162,39,0)',
                  ],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* SCROLL INDICATOR (optional) */}
      {/* ============================================================ */}
      <motion.div
        className="relative z-10 flex justify-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[#C9A227]/70"
        >
          <svg width="12" height="20" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 4V20M8 20L2 14M8 20L14 14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrialRideCTA;