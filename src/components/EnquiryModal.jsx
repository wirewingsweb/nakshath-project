import { useState, useEffect, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiChevronDown,
  FiLoader,
  FiX,
  FiArrowRight,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useEnquiry } from '../context/EnquiryContext';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { isBookableDate } from '../utils/dateInput';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/* ============================================================
   LETTER CASCADE
   ============================================================ */
const CascadeText = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
};

/* ============================================================
   FORM SECTION HEADER
   ============================================================ */
const FormSection = ({ number, title, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="mb-5 flex items-center gap-3"
  >
    <span className="font-serif text-xs italic tabular-nums text-[#C9A227]">
      {number}
    </span>
    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#876B18]">
      {title}
    </span>
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-px flex-1 origin-left bg-[#C9A227]/40"
    />
  </motion.div>
);

/* ============================================================
   FLOATING GOLD PARTICLES
   ============================================================ */
const GoldParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 20 + Math.random() * 80,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [-10, -120],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-[#C9A227]"
        />
      ))}
    </div>
  );
};

/* ============================================================
   SUCCESS STATE
   ============================================================ */
const SuccessState = () => (
  <motion.div
    key="success"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex h-full min-h-[420px] flex-col items-center justify-center py-12 text-center"
  >
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      className="relative mb-7 flex h-24 w-24 items-center justify-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-full bg-[#C9A227]/15"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-3 rounded-full bg-[#C9A227]/25"
      />
      <svg
        viewBox="0 0 24 24"
        className="relative h-12 w-12 text-[#C9A227]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M20 6L9 17l-5-5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </motion.div>

    <motion.h3
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-3 font-serif text-2xl text-[#1A1A1A]"
    >
      Thank you
    </motion.h3>

    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-sm text-sm leading-relaxed text-[#5A5A66]"
    >
      Your enquiry has reached us. Our team will connect with you within one
      working day to schedule your visit.
    </motion.p>
  </motion.div>
);

/* ============================================================
   FIELD WRAPPER
   ============================================================ */
const Field = ({ label, children }) => (
  <div className="group/field">
    <label className="mb-2 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#876B18]">
      <motion.span
        className="inline-block h-px w-3 bg-[#C9A227]/60 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/field:w-6 group-focus-within/field:bg-[#C9A227]"
        aria-hidden="true"
      />
      {label}
    </label>
    {children}
  </div>
);

const inputBaseClass =
  'w-full rounded-lg border border-[#5A5A66]/25 bg-transparent p-3 text-base text-[#1A1A1A] placeholder:text-[#5A5A66]/50 focus:border-[#C9A227] focus:outline-none transition-colors duration-300';

const iconClass =
  'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A227]';

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const EnquiryModal = () => {
  const { isModalOpen, closeEnquiry, selectedTopic, setSelectedTopic } =
    useEnquiry();
  const form = useRef();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    topic: '',
    source: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const topicOptions = [
    'Trial Ride',
    'Riding Classes',
    'Kids Programme',
    'Competition Training',
    'Group Booking',
    'School Visit',
    'Corporate Event',
    'Photoshoot',
    'Facility Enquiry',
    'Other',
  ];

  useEffect(() => {
    if (!isModalOpen) {
      const t = setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          topic: '',
          source: '',
          message: '',
        });
        setSubmitStatus(null);
        setIsSubmitting(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && selectedTopic) {
      setFormData((prev) => ({ ...prev, topic: selectedTopic }));
      setSelectedTopic('');
    }
  }, [isModalOpen, selectedTopic, setSelectedTopic]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const setTopic = (topic) => setFormData((prev) => ({ ...prev, topic }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.topic) {
      toast.error('Please choose what this enquiry is about');
      return;
    }

    if (!isBookableDate(formData.date)) {
      toast.error('Please select a valid date');
      return;
    }

    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitting(false);
        setSubmitStatus('success');
        e.target.reset();
        setTimeout(() => closeEnquiry(), 3200);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setIsSubmitting(false);
        toast.error('Failed to send', {
          description: 'Please try again or contact us directly.',
        });
      });
  };

  const isSuccess = submitStatus === 'success';

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeEnquiry()}>
      <DialogContent
        showCloseButton={false}
        style={{ maxWidth: '1140px' }}
        className="!w-[92%] !max-w-[1140px] gap-0 overflow-hidden !border-0 !bg-transparent !p-0 !shadow-none sm:!max-w-[1140px] sm:!rounded-3xl"
      >
        <DialogTitle className="sr-only">Book a Trial Ride</DialogTitle>
        <DialogDescription className="sr-only">
          Fill in your details to schedule your trial ride
        </DialogDescription>

        {/* ============ MODAL BODY ============ */}
        <div className="modal-scrollbar relative flex max-h-[95vh] flex-col overflow-y-auto rounded-3xl bg-[#FDFCFA] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] md:flex-row md:overflow-hidden">
          {/* Soft gold rim glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-3xl ring-1 ring-inset ring-[#C9A227]/15"
          />

          {/* Custom close button */}
          <motion.button
            type="button"
            onClick={closeEnquiry}
            aria-label="Close enquiry form"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:text-[#C9A227]"
          >
            <FiX size={20} />
          </motion.button>

          {/* ==================================================
              LEFT PANEL
              ================================================== */}
          <div className="relative w-full shrink-0 overflow-hidden bg-[#0C0922] md:w-[45%]">
            {/* Background image */}
            <motion.img
              src="/enquiry-bg.webp"
              alt=""
              aria-hidden="true"
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Vignette gradient */}
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C0922]/30 via-[#0C0922]/45 to-[#0C0922]/75"
            />

            {/* Floating particles */}
            <GoldParticles />

            {/* Corner accents */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-6 top-6 z-10 h-px w-10 origin-left bg-[#C9A227]/60"
            />
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-6 top-6 z-10 h-10 w-px origin-top bg-[#C9A227]/60"
            />

            {/* Content — no translateZ, keeps text crisp */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-12 text-center md:py-0">
              <motion.img
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                src="/nakshath logo head.webp"
                alt="Nakshath Logo"
                className="mb-6 h-24 object-contain md:h-32"
              />

              <h2 className="mb-4 font-serif text-[1.75rem] leading-tight text-white md:text-[2.25rem]">
                <CascadeText text="Book a" delay={0.45} />
                <br />
                <CascadeText text="Trial Ride" delay={0.85} />
              </h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 h-1 w-16 origin-center bg-[#C9A227]"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xs text-lg leading-relaxed text-white/90"
              >
                Experience Nakshath Equestrian Club.
                <br />
                One ride can change everything.
              </motion.p>
            </div>
          </div>

          {/* ==================================================
              RIGHT PANEL
              ================================================== */}
          <div className="modal-scrollbar w-full bg-[#FDFCFA] p-8 md:w-[55%] md:overflow-y-auto md:p-12">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <SuccessState key="success" />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 0.9,
                          delay: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block h-px w-6 origin-left bg-[#C9A227]"
                      />
                      <span className="text-[#C9A227] type-eyebrow">
                        Enquire Now
                      </span>
                    </div>
                    <h3 className="mb-3 font-serif text-2xl text-[#1A1A1A]">
                      We&apos;ll get in touch with you
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5A5A66]">
                      Fill in your details and our team will connect with you to
                      schedule your trial ride.
                    </p>
                  </motion.div>

                  <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    {/* SECTION 01 */}
                    <FormSection number="01" title="About You" delay={0.35} />

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >
                      <Field label="First Name">
                        <input
                          type="text"
                          name="firstName"
                          required
                          placeholder="First name *"
                          className={inputBaseClass}
                        />
                      </Field>
                      <Field label="Last Name">
                        <input
                          type="text"
                          name="lastName"
                          required
                          placeholder="Last name *"
                          className={inputBaseClass}
                        />
                      </Field>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Field label="Phone Number">
                        <div className="relative">
                          <FiPhone className={iconClass} />
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Phone number *"
                            className={`${inputBaseClass} pl-10`}
                          />
                        </div>
                      </Field>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Field label="Email Address">
                        <div className="relative">
                          <FiMail className={iconClass} />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email address *"
                            className={`${inputBaseClass} pl-10`}
                          />
                        </div>
                      </Field>
                    </motion.div>

                    {/* SECTION 02 */}
                    <div className="pt-2">
                      <FormSection number="02" title="Your Visit" delay={0.75} />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.85,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >
                      <Field label="Preferred Date">
                        <DatePicker
                          name="date"
                          value={formData.date}
                          onChange={(date) =>
                            setFormData((c) => ({ ...c, date }))
                          }
                          ariaLabel="Select preferred date"
                        />
                      </Field>
                      <Field label="Preferred Time">
                        <TimePicker
                          name="time"
                          value={formData.time}
                          onChange={(time) =>
                            setFormData((c) => ({ ...c, time }))
                          }
                          ariaLabel="Select preferred time"
                        />
                      </Field>
                    </motion.div>

                    {/* SECTION 03 */}
                    <div className="pt-2">
                      <FormSection number="03" title="Details" delay={0.95} />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <label className="mb-3 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#876B18]">
                        <span className="inline-block h-px w-3 bg-[#C9A227]/60" />
                        What is this about? *
                      </label>
                      <input
                        type="hidden"
                        name="topic"
                        value={formData.topic}
                        required
                      />
                      <div className="flex flex-wrap gap-2">
                        {topicOptions.map((topic, i) => {
                          const isSelected = formData.topic === topic;
                          return (
                            <motion.button
                              key={topic}
                              type="button"
                              onClick={() => setTopic(topic)}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 1.1 + i * 0.03,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`rounded-full border px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                                isSelected
                                  ? 'border-[#C9A227] bg-[#C9A227] text-[#0C0922]'
                                  : 'border-[#C9A227]/35 bg-transparent text-[#1A1A1A]/70 hover:border-[#C9A227] hover:text-[#876B18]'
                              }`}
                            >
                              {topic}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Field label="How did you hear about us?">
                        <div className="relative">
                          <FiMapPin className={iconClass} />
                          <select
                            name="source"
                            onChange={handleChange}
                            className={`${inputBaseClass} appearance-none pl-10 pr-9`}
                          >
                            <option value="">Select</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Google">Google</option>
                            <option value="Friend">Friend or Family</option>
                            <option value="Other">Other</option>
                          </select>
                          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A227]" />
                        </div>
                      </Field>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Field label="Additional Message (Optional)">
                        <div className="relative">
                          <FiMessageSquare className="pointer-events-none absolute left-3 top-3 text-[#C9A227]" />
                          <textarea
                            name="message"
                            rows="3"
                            placeholder="Anything we should know?"
                            className={`${inputBaseClass} resize-none pl-10`}
                          ></textarea>
                        </div>
                      </Field>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="group/btn h-auto w-full rounded-full bg-[#C9A227] py-4 text-sm font-bold uppercase tracking-widest text-[#0C0922] transition-colors duration-300 hover:bg-[#0C0922] hover:text-[#C9A227] disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <FiLoader className="animate-spin" /> Sending…
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Submit Enquiry
                            <FiArrowRight className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                          </span>
                        )}
                      </Button>

                      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#5A5A66]">
                        <span className="h-1 w-1 rounded-full bg-[#C9A227]" />
                        Your information is secure and never shared
                      </p>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;