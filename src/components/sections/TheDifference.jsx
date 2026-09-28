import { motion } from 'framer-motion';
import { fadeLeft, fadeRight, viewportOnce } from '../../utils/animations';

const TheDifference = () => {
  return (
    <section className="grid grid-cols-1 items-center overflow-hidden bg-[#FDFCFA] md:aspect-[1920/1365] md:grid-cols-[54%_46%]">
      {/* ============================================================ */}
      {/* LEFT SIDE: TEXT */}
      {/* ============================================================ */}
      <motion.div
        className="px-6 py-16 sm:px-10 md:py-0 md:pl-[clamp(3rem,7.1vw,10rem)] md:pr-[3vw]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeLeft}
      >
        <div className="max-w-[38rem]">
          <motion.h4
            className="type-eyebrow mb-8 text-[#876B18] md:mb-[3vw]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            ●&nbsp; The Difference
          </motion.h4>

          <motion.h2
            className="type-display mb-10 text-[#1A1A1A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Bengaluru's equestrian training moves{' '}
            <span className="text-[#876B18]">indoors.</span>
          </motion.h2>

          <motion.div
            className="mb-9 h-px w-[6.75rem] bg-[#876B18] md:mb-[3.2vw] md:w-[10vw]"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="type-lead max-w-[27rem] text-[#1A1A1A] md:max-w-[31rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            An all-weather covered arena on international-standard footing. Lessons do not stop for monsoon or summer heat.
          </motion.p>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* RIGHT SIDE: IMAGE */}
      {/* ============================================================ */}
      <motion.div
        className="overflow-hidden px-6 pb-10 md:px-0 md:pb-0"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeRight}
      >
        <motion.img
          src="/page 2 gpt.png"
          alt="Indoor Arena at Nakshath Equestrian Club"
          loading="lazy"
          decoding="async"
          className="h-[28rem] w-full rounded-[2rem] object-cover md:h-[57.5vw] md:rounded-l-[2.25rem] md:rounded-r-none"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </section>
  );
};

export default TheDifference;