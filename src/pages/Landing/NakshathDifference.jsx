import { motion } from 'framer-motion';
import { viewportOnce } from '../../utils/animations';

const NakshathDifference = () => {
  const features = [
    {
      title: 'INTERNATIONAL-STANDARD INDOOR ARENA',
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <path d="M6 42h36" strokeLinecap="round"/>
          <path d="M10 42V14l14-8 14 8v28" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 18h4M22 18h4M30 18h4" strokeLinecap="round"/>
          <path d="M14 24h4M22 24h4M30 24h4" strokeLinecap="round"/>
          <path d="M14 30h4M22 30h4M30 30h4" strokeLinecap="round"/>
          <path d="M24 42v-8h4v8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 34c0-2 1-4 3-5s5-2 7-1 3 2 3 3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M37 31c1 0 2-1 2-2s-1-2-2-2-2 1-2 2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 28c-1-2 0-4 2-5" strokeLinecap="round"/>
          <path d="M24 34c0-2 1-4 3-5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'PROFESSIONAL COACHING',
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <circle cx="24" cy="14" r="6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 20v8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 28c-6 0-10 4-10 10v4h20v-4c0-6-4-10-10-10z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 32h16" strokeLinecap="round"/>
          <path d="M14 36h20" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'WELL-TRAINED HORSES',
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <path d="M16 40c0-4 2-8 6-10s10-4 14-2 6 5 4 8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M40 36c2 0 4-2 4-4s-2-4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M36 32c-2-4-4-8-8-10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M28 22c1-2 3-3 5-2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 28c-2-2-2-5 0-7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 40v4" strokeLinecap="round"/>
          <path d="M20 40v4" strokeLinecap="round"/>
          <path d="M24 40v4" strokeLinecap="round"/>
          <path d="M30 40v4" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'LIMITED RIDERS PER BATCH',
      icon: (
        <svg className="w-12 h-12 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 48 48" strokeWidth="1.5">
          <circle cx="18" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="30" cy="16" r="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 32c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 32c0-4 3-7 6-7s6 3 6 7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 32c0-4 2-6 6-6s6 2 6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="relative w-full bg-[#0C0922] py-16 sm:py-24 overflow-hidden">

      {/* ============================================================ */}
      {/* Background Image — Ken Burns */}
      {/* ============================================================ */}
      <div className="absolute inset-x-0 top-0 h-[720px] sm:inset-0 sm:h-auto overflow-hidden">
        <motion.img
          src="/find-difference.webp"
          alt="Indoor Arena Background"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-[78%_center] brightness-[1.06] contrast-[1.08] saturate-[1.1] sm:object-center sm:brightness-100 sm:contrast-[1.1] sm:saturate-[1.14]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Continuous Ken Burns */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.05, 1],
            x: ['0%', '-1%', '0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/34 via-[#0C0922]/56 to-[#0C0922] sm:bg-[#0C0922]/45 lg:bg-gradient-to-r lg:from-[#0C0922]/58 lg:via-[#0C0922]/38 lg:to-[#0C0922]/16"></div>
      </div>

      {/* ============================================================ */}
      {/* FLOATING PARTICLES */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
        {Array.from({ length: 10 }).map((_, i) => (
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
              y: [0, -40, 0],
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

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">

        {/* ============================================================ */}
        {/* Header Section */}
        {/* ============================================================ */}
        <motion.div
          className="max-w-2xl mb-16 [text-shadow:0_2px_16px_rgba(0,0,0,.72)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h4
            className="type-eyebrow text-[#C9A227] mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            The Nakshath Difference
          </motion.h4>

          <motion.h2
            className="type-page-title mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-white">Where Passion</span><br/>
            <span className="text-[#C9A227]">Meets Prestige</span>
          </motion.h2>

          {/* Divider Line */}
          <motion.div
            className="w-16 h-[2px] bg-[#C9A227]/60 mb-8"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="type-lead text-white/90 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Nakshath Equestrian Club is a premium equestrian sports
            destination designed to inspire discipline, strength and
            excellence through world-class equestrian training and
            sporting experiences.
          </motion.p>
        </motion.div>

        {/* ============================================================ */}
        {/* Feature Cards — 4 Cards */}
        {/* ============================================================ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:mr-[20%]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delayChildren: 0.7, staggerChildren: 0.15 } },
          }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="group bg-[#0C0922]/50 backdrop-blur-[2px] border border-white/25 rounded-2xl p-6 text-left md:text-center flex flex-col items-start md:items-center justify-center min-h-[200px] transition-colors duration-300 hover:border-[#C9A227]/60 hover:bg-[#0C0922]/70"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h4 className="type-card-title text-[#C9A227] text-left md:text-center group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h4>

              {/* Bottom Decorative Line */}
              <motion.div
                className="w-8 h-[1px] bg-[#C9A227]/40 mt-4 group-hover:w-16 group-hover:bg-[#C9A227] transition-all duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NakshathDifference;