import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEnquiry } from '../context/EnquiryContext';

const Enquiry = () => {
  const { openEnquiry, isModalOpen } = useEnquiry();
  const navigate = useNavigate();
  const wasOpenRef = useRef(false);

  /* ============================================================
     Open the modal on mount
     ============================================================ */
  useEffect(() => {
    openEnquiry();
  }, [openEnquiry]);

  /* ============================================================
     Auto-navigate home when the modal closes.

     Why the `wasOpenRef` gate:
     - On first render, isModalOpen is false (modal hasn't opened yet).
     - We don't want to navigate away before it ever appears.
     - We only navigate when the modal transitions open → closed
       during this page's lifetime.
     - `replace: true` keeps `/enquiry` out of history so the back
       button works naturally.
     ============================================================ */
  useEffect(() => {
    if (wasOpenRef.current && !isModalOpen) {
      navigate('/', { replace: true });
    }
    wasOpenRef.current = isModalOpen;
  }, [isModalOpen, navigate]);

  return (
    <div className="pt-32 pb-16 bg-[#FDFCFA] min-h-screen text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="type-page-title text-[#1A1A1A] mb-6"
      >
        Enquire Now
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-[#5A5A66] text-lg inline-flex items-center gap-3"
      >
        <motion.span
          animate={{ opacity: [1, 0.35, 1], scale: [1, 1.25, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
        />
        Loading enquiry form…
      </motion.p>
    </div>
  );
};

export default Enquiry;