// src/components/EnquiryModal.jsx
import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiX, FiUser, FiPhone, FiMail, FiMapPin,
  FiMessageSquare, FiChevronDown, FiLoader, FiCheck,
} from 'react-icons/fi';
import { useEnquiry } from '../context/EnquiryContext';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { isBookableDate } from '../utils/dateInput';
import { EASE_PRIMARY, EASE_SECONDARY, DURATION } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../hooks/useIsMobile';


// ─── Variants ────────────────────────────────────────────────

const backdropVariants = {
  hidden:  { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(6px)',
    transition: { duration: 0.35, ease: EASE_SECONDARY },
  },
  exit:    {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.25, ease: EASE_SECONDARY },
  },
};

const panelVariants = (isMobile, prefersReduced) => ({
  hidden: {
    opacity: 0,
    scale: prefersReduced ? 1 : (isMobile ? 0.98 : 0.94),
    y: prefersReduced ? 0 : 20,
    rotateX: prefersReduced ? 0 : 6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: prefersReduced ? 0 : 0.7,
      ease: EASE_PRIMARY,
    },
  },
  exit: {
    opacity: 0,
    scale: prefersReduced ? 1 : (isMobile ? 0.98 : 0.96),
    y: prefersReduced ? 0 : 12,
    rotateX: prefersReduced ? 0 : 3,
    transition: {
      duration: prefersReduced ? 0 : 0.3,
      ease: EASE_PRIMARY,
    },
  },
});

const imageVariants = {
  hidden:  { opacity: 0, scale: 1.12 },
  visible: {
    opacity: 0.5,
    scale: 1,
    transition: { duration: 1.6, ease: EASE_PRIMARY, delay: 0.1 },
  },
};

const leftContentVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const leftItemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_PRIMARY },
  },
};

const logoVariants = {
  hidden:  { opacity: 0, y: -20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 180, damping: 18, delay: 0.35 },
  },
};

const dividerVariants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_PRIMARY, delay: 0.5 },
  },
};

const formBlockVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_PRIMARY, delay: 0.2 },
  },
};

const formVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.35 },
  },
};

const fieldVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_PRIMARY },
  },
};

// ═══════════════════════════════════════════════════════════════
// Interactive Left Panel — cursor spotlight + parallax tilt + hover glow
// ═══════════════════════════════════════════════════════════════

const InteractiveLeftPanel = ({ prefersReduced, children }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { damping: 30, stiffness: 80, mass: 0.9 });
  const sy = useSpring(my, { damping: 30, stiffness: 80, mass: 0.9 });

  // Parallax tilt for the image
  const imgX = useTransform(sx, [0, 1], ['-3%', '3%']);
  const imgY = useTransform(sy, [0, 1], ['-3%', '3%']);

  // Spotlight position
  const spotLeft = useTransform(sx, (v) => `${v * 100}%`);
  const spotTop  = useTransform(sy, (v) => `${v * 100}%`);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/left relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0C0922] px-8 py-12 text-center md:w-[45%] md:py-0"
    >
      {/* Background image with parallax */}
      <motion.img
        src="/enquiry-bg.webp"
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover scale-110"
        variants={imageVariants}
        style={
          prefersReduced
            ? undefined
            : { x: imgX, y: imgY }
        }
      />

      {/* Gold gradient sweep — re-triggers on hover */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover/left:opacity-100"
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{ duration: 2.2, delay: 0.5, ease: EASE_PRIMARY }}
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(201,162,39,0.22) 50%, transparent 60%)',
          }}
        />
      )}

      {/* Cursor spotlight — gold radial follow */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-[3] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover/left:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.35) 0%, rgba(201,162,39,0.10) 45%, transparent 75%)',
            filter: 'blur(50px)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Dark overlay for contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-[#0C0922]/40"
      />

      {/* Content */}
      <motion.div
        className="relative z-10"
        variants={leftContentVariants}
      >
        {/* Logo — hover glow + scale */}
        <motion.img
          src="/nakshath logo head.webp"
          alt="Nakshath Logo"
          loading="lazy"
          decoding="async"
          className="mx-auto mb-6 h-24 cursor-pointer object-contain transition-all duration-500 group-hover/left:scale-105 group-hover/left:drop-shadow-[0_0_25px_rgba(201,162,39,0.6)] md:h-32"
          variants={logoVariants}
          whileHover={prefersReduced ? undefined : { scale: 1.08, y: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />

        {/* Heading — hover letter-spacing + gold */}
        <motion.h2
          className="group/heading mb-4 cursor-default font-serif text-[1.75rem] text-white transition-all duration-500 group-hover/left:tracking-wider group-hover/left:text-[#F5E6A8] md:text-[2.25rem]"
          variants={leftItemVariants}
        >
          Book a<br />
          <span className="inline-block transition-all duration-500 group-hover/heading:tracking-[0.08em] group-hover/heading:text-[#C9A227]">
            Trial Ride
          </span>
        </motion.h2>

        {/* Divider — hover expand */}
        <motion.div
          className="mx-auto mb-6 h-1 w-16 origin-center bg-[#C9A227] transition-all duration-500 group-hover/left:w-24 group-hover/left:shadow-[0_0_15px_rgba(201,162,39,0.8)]"
          variants={dividerVariants}
        />

        {/* Paragraph — hover color shift */}
        <motion.p
          className="cursor-default text-lg text-white/80 transition-colors duration-500 group-hover/left:text-white"
          variants={leftItemVariants}
        >
          Experience Nakshath Equestrian Club.<br />
          One ride can change everything.
        </motion.p>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Field Shell
// ═══════════════════════════════════════════════════════════════

const FieldShell = ({ children, className = '', prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { damping: 20, stiffness: 220, mass: 0.5 });
  const sy = useSpring(my, { damping: 20, stiffness: 220, mass: 0.5 });

  const spotLeft = useTransform(sx, (v) => `${v * 100}%`);
  const spotTop  = useTransform(sy, (v) => `${v * 100}%`);

  const rX = useTransform(sy, [0, 1], [2.5, -2.5]);
  const rY = useTransform(sx, [0, 1], [-2.5, 2.5]);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      variants={fieldVariants}
      whileHover={prefersReduced ? undefined : { scale: 1.01 }}
      whileTap={prefersReduced ? undefined : { scale: 0.995 }}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX: rX,
              rotateY: rY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }
      }
      transition={{ duration: 0.3, ease: EASE_PRIMARY }}
      className={`group/field relative ${className}`}
    >
      {!prefersReduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/field:opacity-100"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(201,162,39,0.35) 0%, rgba(201,162,39,0.10) 50%, transparent 78%)',
            filter: 'blur(22px)',
          }}
        />
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] rounded-lg bg-[#C9A227]/0 transition-colors duration-400 group-hover/field:bg-[#C9A227]/[0.04]"
      />

      <div className="relative z-10">{children}</div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-lg ring-0 ring-[#C9A227]/0 transition-all duration-500 group-focus-within/field:ring-2 group-focus-within/field:ring-[#C9A227]/50"
      />

      {!prefersReduced && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1.5 top-1.5 z-20 h-2.5 w-2.5 opacity-0 transition-opacity duration-400 group-hover/field:opacity-70 group-focus-within/field:opacity-100"
          >
            <span className="absolute left-0 top-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute left-0 top-0 h-px w-full bg-[#C9A227]" />
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 right-1.5 z-20 h-2.5 w-2.5 opacity-0 transition-opacity duration-400 group-hover/field:opacity-70 group-focus-within/field:opacity-100"
          >
            <span className="absolute bottom-0 right-0 h-full w-px bg-[#C9A227]" />
            <span className="absolute bottom-0 right-0 h-px w-full bg-[#C9A227]" />
          </span>
        </>
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Input Shell
// ═══════════════════════════════════════════════════════════════

const InputShell = ({ icon: Icon, children }) => (
  <>
    {Icon && (
      <Icon className="pointer-events-none absolute left-3 top-3 z-10 text-[#C9A227] transition-all duration-400 group-focus-within/field:scale-125 group-focus-within/field:-rotate-6 group-hover/field:scale-110" />
    )}
    {children}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-[#C9A227] transition-all duration-500 group-focus-within/field:w-full"
    />
  </>
);

// ═══════════════════════════════════════════════════════════════
// Magnetic Submit Button
// ═══════════════════════════════════════════════════════════════

const MagneticSubmit = ({ isSubmitting, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 15, stiffness: 220, mass: 0.4 });
  const sy = useSpring(my, { damping: 15, stiffness: 220, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const y = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const textX = useTransform(sx, [-0.5, 0.5], [3, -3]);
  const textY = useTransform(sy, [-0.5, 0.5], [2, -2]);

  const spotLeft = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const spotTop  = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={prefersReduced ? undefined : { x, y }}
      whileHover={prefersReduced ? undefined : { scale: 1.02 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.25, ease: EASE_PRIMARY }}
      className="relative"
    >
      <button
        type="submit"
        disabled={isSubmitting}
        className="group/btn relative w-full overflow-hidden rounded-full bg-[#C9A227] py-4 text-sm font-bold uppercase tracking-widest text-[#0C0922] shadow-lg transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_-8px_rgba(201,162,39,0.7)] disabled:opacity-50"
      >
        {!prefersReduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-400 group-hover/btn:opacity-100"
            style={{
              left: spotLeft,
              top: spotTop,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 45%, transparent 78%)',
              filter: 'blur(22px)',
            }}
          />
        )}

        {!prefersReduced && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
          />
        )}

        <motion.span
          className="relative flex items-center justify-center gap-2"
          style={prefersReduced ? undefined : { x: textX, y: textY }}
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin" /> Sending...
            </>
          ) : (
            'Submit Enquiry'
          )}
        </motion.span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-white transition-all duration-500 group-hover/btn:w-3/4"
        />
      </button>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Close Button
// ═══════════════════════════════════════════════════════════════

const CloseButton = ({ onClick, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 18, stiffness: 200, mass: 0.4 });
  const sy = useSpring(my, { damping: 18, stiffness: 200, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const y = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label="Close enquiry form"
      style={prefersReduced ? undefined : { x, y }}
      className="group/close absolute top-4 right-4 z-30 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#C9A227] hover:text-[#0C0922] hover:shadow-[0_4px_20px_-4px_rgba(201,162,39,0.8)]"
      whileHover={prefersReduced ? undefined : { scale: 1.15, rotate: 90 }}
      whileTap={prefersReduced ? undefined : { scale: 0.9 }}
      transition={{ duration: 0.3, ease: EASE_PRIMARY }}
    >
      <FiX size={24} />
    </motion.button>
  );
};

// ═══════════════════════════════════════════════════════════════
// Success Badge
// ═══════════════════════════════════════════════════════════════

const SuccessBadge = ({ prefersReduced }) => (
  <motion.div
    initial={prefersReduced ? false : { opacity: 0, y: -6, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4, ease: EASE_PRIMARY }}
    className="flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-2 text-center text-sm font-medium text-green-700"
  >
    <motion.span
      initial={prefersReduced ? false : { scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
      className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white"
    >
      <FiCheck className="h-3 w-3" />
    </motion.span>
    Thank you! Your enquiry has been sent successfully.
  </motion.div>
);

// ─── Component ───────────────────────────────────────────────

const EnquiryModal = () => {
  const { isModalOpen, closeEnquiry, selectedTopic, setSelectedTopic } = useEnquiry();
  const form = useRef();
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    date: '', time: '', topic: '', source: '', message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({
        firstName: '', lastName: '', phone: '', email: '',
        date: '', time: '', topic: '', source: '', message: '',
      });
      setSubmitStatus(null);
      setIsSubmitting(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && selectedTopic) {
      setFormData(prev => ({ ...prev, topic: selectedTopic }));
      setSelectedTopic('');
    }
  }, [isModalOpen, selectedTopic, setSelectedTopic]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeEnquiry();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeEnquiry]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isBookableDate(formData.date)) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitStatus('success');
      setIsSubmitting(false);

      setFormData({
        firstName: '', lastName: '', phone: '', email: '',
        date: '', time: '', topic: '', source: '', message: '',
      });

      e.target.reset();

      setTimeout(() => {
        closeEnquiry();
      }, 2500);
    })
    .catch((err) => {
      console.log('FAILED...', err);
      setSubmitStatus('error');
      setIsSubmitting(false);
    });
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Book a trial ride"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-black/80"
            variants={backdropVariants}
            onMouseDown={closeEnquiry}
            aria-hidden="true"
          />

          <motion.div
            className="relative z-10 w-[90%] max-w-6xl overflow-hidden rounded-3xl bg-[#FDFCFA] shadow-2xl"
            variants={panelVariants(isMobile, prefersReduced)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <CloseButton onClick={closeEnquiry} prefersReduced={prefersReduced} />

            <div className="modal-scrollbar flex max-h-[95vh] flex-col overflow-y-auto md:flex-row md:overflow-hidden">
              {/* LEFT — Interactive */}
              <InteractiveLeftPanel prefersReduced={prefersReduced}>
                {/* children not used, but kept for API clarity */}
              </InteractiveLeftPanel>

              {/* RIGHT */}
              <div className="modal-scrollbar w-full bg-[#FDFCFA] p-8 md:w-[55%] md:overflow-y-auto md:p-12">
                <motion.div className="mb-8" variants={formBlockVariants}>
                  <h3 className="group/eb type-eyebrow mb-3 inline-flex items-center gap-2 text-[#C9A227]">
                    <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                    <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">
                      Enquire Now
                    </span>
                  </h3>
                  <h2 className="mb-3 font-serif text-2xl text-[#1A1A1A] [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                    We&apos;ll get in touch with you
                  </h2>
                  <p className="text-sm text-[#5A5A66]">
                    Fill in your details and our team will connect with you to schedule your trial ride.
                  </p>
                </motion.div>

                <motion.form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  variants={formVariants}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FieldShell prefersReduced={prefersReduced}>
                      <InputShell icon={FiUser}>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name *"
                          required
                          className="relative w-full rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base placeholder:text-[#5A5A66] transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                        />
                      </InputShell>
                    </FieldShell>
                    <FieldShell prefersReduced={prefersReduced}>
                      <InputShell icon={FiUser}>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name *"
                          required
                          className="relative w-full rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base placeholder:text-[#5A5A66] transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                        />
                      </InputShell>
                    </FieldShell>
                  </div>

                  <FieldShell prefersReduced={prefersReduced}>
                    <InputShell icon={FiPhone}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        required
                        className="relative w-full rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base placeholder:text-[#5A5A66] transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                      />
                    </InputShell>
                  </FieldShell>

                  <FieldShell prefersReduced={prefersReduced}>
                    <InputShell icon={FiMail}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        className="relative w-full rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base placeholder:text-[#5A5A66] transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                      />
                    </InputShell>
                  </FieldShell>

                  <FieldShell prefersReduced={prefersReduced}>
                    <DatePicker
                      name="date"
                      value={formData.date}
                      onChange={(date) => setFormData((current) => ({ ...current, date }))}
                      ariaLabel="Select preferred date"
                    />
                  </FieldShell>

                  <FieldShell prefersReduced={prefersReduced}>
                    <TimePicker
                      name="time"
                      value={formData.time}
                      onChange={(time) => setFormData((current) => ({ ...current, time }))}
                      ariaLabel="Select preferred time"
                    />
                  </FieldShell>

                  <FieldShell prefersReduced={prefersReduced}>
                    <InputShell icon={FiMapPin}>
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="relative w-full cursor-pointer appearance-none rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                      >
                        <option value="">What is this about?</option>
                        <option value="Trial Ride">Trial Ride</option>
                        <option value="Riding Classes">Riding Classes</option>
                        <option value="Kids Programme">Kids Programme</option>
                        <option value="Competition Training">Competition Training</option>
                        <option value="Group Booking">Group Booking</option>
                        <option value="School Visit">School Visit</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Photoshoot">Photoshoot</option>
                        <option value="Facility Enquiry">Facility Enquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </InputShell>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-4 z-10 text-[#C9A227] transition-transform duration-500 group-hover/field:translate-y-0.5 group-focus-within/field:rotate-180" />
                  </FieldShell>

                  <FieldShell prefersReduced={prefersReduced}>
                    <InputShell icon={FiMapPin}>
                      <select
                        name="source"
                        className="relative w-full cursor-pointer appearance-none rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                      >
                        <option value="">How did you hear about us?</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Google">Google</option>
                        <option value="Friend">Friend or Family</option>
                        <option value="Other">Other</option>
                      </select>
                    </InputShell>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-4 z-10 text-[#C9A227] transition-transform duration-500 group-hover/field:translate-y-0.5 group-focus-within/field:rotate-180" />
                  </FieldShell>

                  <FieldShell prefersReduced={prefersReduced}>
                    <InputShell icon={FiMessageSquare}>
                      <textarea
                        name="message"
                        rows="3"
                        placeholder="Additional Message (Optional)"
                        className="relative w-full resize-none rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base placeholder:text-[#5A5A66] transition-all duration-300 hover:border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none"
                      />
                    </InputShell>
                  </FieldShell>

                  <motion.div variants={fieldVariants}>
                    <MagneticSubmit
                      isSubmitting={isSubmitting}
                      prefersReduced={prefersReduced}
                    />
                  </motion.div>

                  {submitStatus === 'success' && (
                    <motion.div variants={fieldVariants}>
                      <SuccessBadge prefersReduced={prefersReduced} />
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.p
                      initial={prefersReduced ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-sm font-medium text-red-600"
                    >
                      Failed to send. Please try again or contact us directly.
                    </motion.p>
                  )}

                  <motion.p
                    variants={fieldVariants}
                    className="mt-2 flex items-center justify-center gap-1 text-center text-xs text-[#5A5A66]"
                  >
                    <FiUser className="h-3 w-3" /> Your information is secure and never shared.
                  </motion.p>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;