import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportOnce } from '../utils/animations';

const RefundAndCancellation = () => {
  return (
    <div className="min-h-screen bg-[#0C0922] pb-16 pt-32 md:pt-44">
      <div className="mx-auto max-w-4xl px-6">

        {/* Header */}
        <motion.div
          className="mb-12 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-px w-12 bg-[#C9A227]" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
            Legal
          </span>
        </motion.div>

        <motion.h1
          className="type-page-title mb-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Refund & Cancellation Policy
        </motion.h1>

        {/* Content Card */}
        <motion.div
          className="rounded-2xl bg-white p-8 shadow-xl md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="prose prose-lg max-w-none font-normal leading-relaxed text-[#1A1A1A]">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7 }}
            >
              <h2 className="mb-4 font-serif text-xl md:text-2xl">
                2.1 Booking and Cancellation
              </h2>
              <p>
                Once a booking payment has been made, the amount is non-refundable, except where otherwise required by applicable law or expressly stated by NGSES.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <h2 className="mb-4 mt-8 font-serif text-xl md:text-2xl">
                2.2 Weather and Safety Cancellations
              </h2>
              <p>
                In the event of heavy rain, thunderstorms, unsafe arena conditions or other circumstances that may pose a risk to riders or horses, NGSES / Nakshat Equestrian Club reserves the right to cancel or postpone a session.
              </p>
            </motion.div>

            {/* Contact Box */}
            <motion.div
              className="mt-8 border-t border-[#5A5A66]/20 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h3 className="mb-4 font-serif text-xl">Contact for Questions</h3>
              <p className="mb-4">For any questions regarding refunds or cancellations, please contact us at:</p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> info@ngses.in
                </p>
                <p>
                  <strong>Phone:</strong> 8460846946
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-8 flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[#C9A227] transition-colors hover:text-white"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.3 }}
            >
              ←
            </motion.span>
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-[#C9A227] transition-colors hover:text-white"
          >
            Contact Us
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundAndCancellation;