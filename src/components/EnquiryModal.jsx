// src/components/EnquiryModal.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiX, FiUser, FiPhone, FiMail, FiMapPin,
  FiMessageSquare, FiChevronDown, FiLoader,
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
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const panelVariants = (isMobile, prefersReduced) => ({
  hidden: {
    opacity: 0,
    scale: prefersReduced ? 1 : (isMobile ? 0.98 : 0.96),
    y: prefersReduced ? 0 : 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : DURATION.modal,
      ease: EASE_PRIMARY,
    },
  },
  exit: {
    opacity: 0,
    scale: prefersReduced ? 1 : (isMobile ? 0.98 : 0.96),
    y: prefersReduced ? 0 : 10,
    transition: {
      duration: prefersReduced ? 0 : 0.35,
      ease: EASE_PRIMARY,
    },
  },
});

const imageVariants = {
  hidden:  { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_PRIMARY, delay: 0.1 },
  },
};

// Left column content — stagger children
const leftContentVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const leftItemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PRIMARY },
  },
};

// Right column — heading block + form as two units
const formBlockVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PRIMARY, delay: 0.15 },
  },
};

const formElementVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PRIMARY, delay: 0.25 },
  },
};

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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  // Reset form when modal is closed
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

  // Sync selectedTopic with formData when modal opens
  useEffect(() => {
    if (isModalOpen && selectedTopic) {
      setFormData(prev => ({ ...prev, topic: selectedTopic }));
      setSelectedTopic(''); // Reset context after use
    }
  }, [isModalOpen, selectedTopic, setSelectedTopic]);

  // Escape key to close
  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeEnquiry();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeEnquiry]);

  // Body scroll lock while modal is open
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            variants={backdropVariants}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: EASE_SECONDARY }}
            onMouseDown={closeEnquiry}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 w-[90%] max-w-6xl overflow-hidden rounded-3xl bg-[#FDFCFA] shadow-2xl"
            variants={panelVariants(isMobile, prefersReduced)}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeEnquiry}
              aria-label="Close enquiry form"
              className="absolute top-4 right-4 z-20 rounded-full bg-black/40 p-2 text-white transition-colors hover:text-[#C9A227]"
            >
              <FiX size={24} />
            </button>

            <div className="modal-scrollbar flex max-h-[95vh] flex-col overflow-y-auto md:flex-row md:overflow-hidden">
              {/* LEFT: Image + Logo + Heading */}
              <div className="relative flex w-full flex-col items-center justify-center bg-[#0C0922] px-8 py-12 text-center md:w-[45%] md:py-0">
                {/* Background image — cinematic fade + scale */}
                <motion.img
                  src="/enquiry-bg.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                  className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
                  variants={imageVariants}
                />

                {/* Overlay content — staggered */}
                <motion.div
                  className="relative z-10"
                  variants={leftContentVariants}
                >
                  <motion.img
                    src="/nakshath logo head.png"
                    alt="Nakshath Logo"
                    loading="lazy"
                    decoding="async"
                    className="mx-auto mb-6 h-24 object-contain md:h-32"
                    variants={leftItemVariants}
                  />
                  <motion.h2
                    className="mb-4 font-serif text-[1.75rem] text-white md:text-[2.25rem]"
                    variants={leftItemVariants}
                  >
                    Book a<br />Trial Ride
                  </motion.h2>
                  <motion.div
                    className="mx-auto mb-6 h-1 w-16 bg-[#C9A227]"
                    variants={leftItemVariants}
                  />
                  <motion.p
                    className="text-lg text-white/80"
                    variants={leftItemVariants}
                  >
                    Experience Nakshath Equestrian Club.<br />
                    One ride can change everything.
                  </motion.p>
                </motion.div>
              </div>

              {/* RIGHT: Form */}
              <div className="modal-scrollbar w-full bg-[#FDFCFA] p-8 md:w-[55%] md:overflow-y-auto md:p-12">
                {/* Heading block — one unit */}
                <motion.div
                  className="mb-8"
                  variants={formBlockVariants}
                >
                  <h3 className="type-eyebrow mb-3 text-[#C9A227]">Enquire Now</h3>
                  <h2 className="mb-3 font-serif text-2xl text-[#1A1A1A]">
                    We&apos;ll get in touch with you
                  </h2>
                  <p className="text-sm text-[#5A5A66]">
                    Fill in your details and our team will connect with you to schedule your trial ride.
                  </p>
                </motion.div>

                {/* Form — one unit, per audit */}
                <motion.form
                  ref={form}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  variants={formElementVariants}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-[#C9A227]" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        required
                        className="w-full rounded-lg border border-[#5A5A66]/25 p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:border-[#C9A227] focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-[#C9A227]" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        required
                        className="w-full rounded-lg border border-[#5A5A66]/25 p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:border-[#C9A227] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-[#C9A227]" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      required
                      className="w-full rounded-lg border border-[#5A5A66]/25 p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:border-[#C9A227] focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-[#C9A227]" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      className="w-full rounded-lg border border-[#5A5A66]/25 p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:border-[#C9A227] focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <DatePicker
                      name="date"
                      value={formData.date}
                      onChange={(date) => setFormData((current) => ({ ...current, date }))}
                      ariaLabel="Select preferred date"
                    />
                  </div>

                  <div className="relative">
                    <TimePicker
                      name="time"
                      value={formData.time}
                      onChange={(time) => setFormData((current) => ({ ...current, time }))}
                      ariaLabel="Select preferred time"
                    />
                  </div>

                  {/* Topic dropdown */}
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-[#C9A227]" />
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base focus:border-[#C9A227] focus:outline-none"
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
                    <FiChevronDown className="pointer-events-none absolute right-3 top-4 text-[#C9A227]" />
                  </div>

                  {/* Source dropdown */}
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-[#C9A227]" />
                    <select
                      name="source"
                      className="w-full appearance-none rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 pl-10 text-base focus:border-[#C9A227] focus:outline-none"
                    >
                      <option value="">How did you hear about us?</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Google">Google</option>
                      <option value="Friend">Friend or Family</option>
                      <option value="Other">Other</option>
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-4 text-[#C9A227]" />
                  </div>

                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-[#C9A227]" />
                    <textarea
                      name="message"
                      rows="3"
                      placeholder="Additional Message (Optional)"
                      className="w-full resize-none rounded-lg border border-[#5A5A66]/25 p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:border-[#C9A227] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A227] py-4 text-sm font-bold uppercase tracking-widest text-[#0C0922] transition-colors hover:bg-white disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" /> Sending...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-center text-sm font-medium text-green-600">
                      Thank you! Your enquiry has been sent successfully.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-center text-sm font-medium text-red-600">
                      Failed to send. Please try again or contact us directly.
                    </p>
                  )}

                  <p className="mt-2 flex items-center justify-center gap-1 text-center text-xs text-[#5A5A66]">
                    <FiUser className="h-3 w-3" /> Your information is secure and never shared.
                  </p>
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