import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const OurHorses = () => {
  return (
    <section className="w-full bg-[#FDFCFA] px-[1.8vw] py-8 md:py-[2.3vw]">
      <div className="relative h-[32rem] w-full overflow-hidden rounded-[1.5rem] md:h-auto">
        <motion.img
          src="/page 8 gpt.webp"
          alt="Horse at sunset"
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="block h-full w-full object-cover object-[58%_center] md:h-auto md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/55 to-transparent md:from-[#0C0922]/80 md:via-[#0C0922]/25"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="absolute left-7 top-1/2 max-w-[15.5rem] -translate-y-1/2 text-white md:left-[6.8%] md:max-w-[22rem]"
        >
          <motion.h4 variants={fadeInUp} className="text-[#C9A227] type-eyebrow mb-4">Our Horses</motion.h4>
          <motion.h2 variants={fadeInUp} className="type-page-title">
            Calm, schooled, and matched to the rider.
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 max-w-[16rem] md:max-w-[25vw] text-sm md:text-base leading-[1.55] text-white/85">
            Every horse selected for temperament first, then trained for the level it teaches.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link to="/horses" className="inline-block mt-6 text-xs font-medium border-b border-[#C9A227] pb-1">Meet the horses</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurHorses;