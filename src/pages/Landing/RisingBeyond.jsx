import { motion } from 'framer-motion';
import { GiHorseHead, GiHorseshoe } from 'react-icons/gi';
import { useEnquiry } from '../../context/EnquiryContext';
import { viewportOnce } from '../../utils/animations';

const RisingBeyond = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="relative w-full bg-[#F2F0EB] py-24 overflow-hidden">

      {/* ============================================================ */}
      {/* Background Image — Ken Burns */}
      {/* ============================================================ */}
      <div className="absolute inset-x-0 top-0 h-[640px] sm:inset-0 sm:h-auto overflow-hidden">
        <motion.img
          src="/rising-beyond-bg.webp"
          alt="Rider on White Horse"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-[76%_center] brightness-[.94] contrast-[1.08] saturate-[1.08] sm:object-right sm:brightness-[.86] sm:contrast-[1.14] sm:saturate-[1.12]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Continuous Ken Burns */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F0EB]/40 via-[#F2F0EB]/62 to-[#F2F0EB] sm:bg-gradient-to-r sm:from-[#F2F0EB]/70 sm:via-[#F2F0EB]/30 sm:to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">

        {/* Content is on the LEFT side */}
        <div className="max-w-xl">

          {/* ============================================================ */}
          {/* Final Booking Label */}
          {/* ============================================================ */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="type-eyebrow text-[#C9A227]">Final Booking</h4>
            <motion.div
              className="h-[1px] w-12 bg-[#C9A227]/40"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="type-page-title mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#1A1A1A]">Rising Beyond</span><br/>
            <span className="text-[#C9A227]">Every Jump</span>
          </motion.h2>

          {/* Divider Line */}
          <motion.div
            className="w-16 h-[2px] bg-[#C9A227]/40 mb-6"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Subtitle */}
          <motion.p
            className="type-lead text-[#1A1A1A]/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Begin Your Journey at <span className="text-[#C9A227]">Nakshath.</span>
          </motion.p>

          {/* ============================================================ */}
          {/* Two Trial Cards — Side by Side */}
          {/* ============================================================ */}
          <motion.div
            className="flex items-start gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delayChildren: 0.7, staggerChildren: 0.2 } },
            }}
          >

            {/* Free Trial Ride Card */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C9A227]/60 border-2 border-transparent"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {/* Horseshoe Icon */}
              <motion.div
                className="flex justify-center mb-3"
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.4 }}
              >
                <GiHorseshoe aria-hidden="true" className="h-11 w-11 text-[#C9A227]" />
              </motion.div>

              <p className="type-eyebrow text-[#1A1A1A] mb-2">Free Trial Ride</p>

              <motion.div
                className="type-page-title text-[#1A1A1A] mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 1, duration: 0.7, type: 'spring', stiffness: 200 }}
              >
                10
              </motion.div>
              <p className="type-caption text-[#1A1A1A]/70 uppercase tracking-wider mb-4">Minutes</p>
            </motion.div>

            {/* "or" separator */}
            <motion.div
              className="flex flex-col items-center justify-center pt-8"
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } },
              }}
            >
              <span className="text-[#C9A227] text-sm font-medium">or</span>
              <div className="h-8 w-[1px] bg-[#C9A227]/30 mt-2"></div>
            </motion.div>

            {/* Paid Trial Ride Card */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg flex-1 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C9A227]/60 border-2 border-transparent"
              variants={{
                hidden: { opacity: 0, x: 40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {/* Rider on Horse Icon */}
              <motion.div
                className="flex justify-center mb-3"
                whileHover={{ scale: 1.15, rotate: -10 }}
                transition={{ duration: 0.4 }}
              >
                <GiHorseHead aria-hidden="true" className="h-11 w-11 text-[#C9A227]" />
              </motion.div>

              <p className="type-eyebrow text-[#1A1A1A] mb-2">Trial Ride</p>

              <motion.div
                className="type-page-title text-[#1A1A1A] mb-1"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 1.2, duration: 0.7, type: 'spring', stiffness: 200 }}
              >
                45
              </motion.div>
              <p className="type-caption text-[#1A1A1A]/70 uppercase tracking-wider mb-4">Minutes · ₹1,999</p>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* Book Your Trial Ride Button */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button relative w-full bg-[#0C0922] text-white py-4 rounded-full hover:bg-[#C9A227] hover:text-[#0C0922] transition-colors mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              → Book Your Trial Ride

              {/* Luxury Golden Glow Pulse */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(201,162,39,0)',
                    '0 0 22px 3px rgba(201,162,39,0.5)',
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

          {/* ============================================================ */}
          {/* Kids • Teens • Adults */}
          {/* ============================================================ */}
          <motion.p
            className="text-center text-[#1A1A1A]/60 text-sm tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            Kids <span className="mx-2 text-[#C9A227]">•</span> Teens <span className="mx-2 text-[#C9A227]">•</span> Adults
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default RisingBeyond;