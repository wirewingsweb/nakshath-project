import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const EASE = [0.22, 1, 0.36, 1];

const RefundAndCancellation = () => {
  const sectionRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 0.5, 1], ['-4%', '0%', '4%']);
  const glowY_s = useSpring(glowY, { stiffness: 80, damping: 28, mass: 0.7 });

  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], ['1%', '0%', '-1%']);
  const cardY_s = useSpring(cardY, { stiffness: 95, damping: 28, mass: 0.55 });

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0C0922] pb-16 pt-32 md:pt-44"
    >
      {/* Ambient gold glow — drift on scroll */}
      <motion.div
        style={{
          y: shouldReduce ? 0 : glowY_s,
          willChange: 'transform',
        }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C9A227]/8 blur-[160px]" />
        <div className="absolute -left-40 bottom-40 h-[420px] w-[420px] rounded-full bg-[#C9A227]/6 blur-[160px]" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#C9A227] type-eyebrow mb-4"
        >
          Legal
        </motion.h4>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-page-title text-white mb-12"
        >
          Refund &amp; Cancellation Policy
        </motion.h1>

        <motion.div
          style={{
            y: shouldReduce ? 0 : cardY_s,
            willChange: 'transform',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="prose prose-lg max-w-none text-[#1A1A1A] font-normal leading-relaxed"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-xl md:text-2xl font-serif mb-4">2.1 Booking and Cancellation</h2>
                <p>Once a booking payment has been made, the amount is non-refundable, except where otherwise required by applicable law or expressly stated by NGSES.</p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">2.2 Weather and Safety Cancellations</h2>
                <p>In the event of heavy rain, thunderstorms, unsafe arena conditions or other circumstances that may pose a risk to riders or horses, NGSES / Nakshat Equestrian Club reserves the right to cancel or postpone a session.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="border-t border-[#5A5A66]/20 mt-8 pt-6">
                <h3 className="text-xl font-serif mb-2">Contact for Questions</h3>
                <p>For any questions regarding refunds or cancellations, please contact us at:</p>
                <div className="mt-4 space-y-2">
                  <p><strong>Email:</strong> info@ngses.in</p>
                  <p><strong>Phone:</strong> 8460846946</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-between"
        >
          <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
            <Link to="/" className="text-[#C9A227] hover:text-white transition-colors">← Back to Home</Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link to="/contact" className="text-[#C9A227] hover:text-white transition-colors">Contact Us →</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundAndCancellation;