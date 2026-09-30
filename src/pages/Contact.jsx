// src/pages/Contact.jsx
import { useState, useRef, lazy, Suspense } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiPlus, FiMinus, FiLoader } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useEnquiry } from '../context/EnquiryContext';
import { BUSINESS_MAP_URL } from '../constants/location';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import { EASE_PRIMARY } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  Reveal,
  FadeUp,
  Stagger,
  StaggerItem,
  SplitText,
} from '../components/motion';

// Lazy-load the heavy SVG + iframe map component
const AnimatedLocationMap = lazy(() => import('../components/AnimatedLocationMap'));

const CHAPTERS = [
  { id: 'chapter-contact-intro', label: 'Contact' },
  { id: 'chapter-enquiry-form',  label: 'Enquiry' },
  { id: 'chapter-getting-here',  label: 'Getting Here' },
  { id: 'chapter-faq',           label: 'FAQ' },
  { id: 'chapter-groups',        label: 'Groups' },
];

// ═══════════════════════════════════════════════════════════════
// Section wrapper with cursor ambient glow
// ═══════════════════════════════════════════════════════════════

const SectionGlow = ({ children, className = '', tone = 'light' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { damping: 60, stiffness: 60, mass: 0.8 });
  const sy = useSpring(my, { damping: 60, stiffness: 60, mass: 0.8 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  const handleMove = (e) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section ref={ref} onMouseMove={handleMove} className={`relative ${className}`}>
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left,
            top,
            background:
              tone === 'dark'
                ? 'radial-gradient(circle, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)'
                : 'radial-gradient(circle, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.02) 45%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: tone === 'dark' ? 'screen' : 'multiply',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Contact Row — 3D tilt + accent bar
// ═══════════════════════════════════════════════════════════════

const ContactRow = ({ icon: Icon, label, children, href, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 25, stiffness: 180, mass: 0.6 });
  const sy = useSpring(my, { damping: 25, stiffness: 180, mass: 0.6 });
  const rX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX: rX,
              rotateY: rY,
              transformPerspective: 1000,
              transformStyle: 'preserve-3d',
            }
      }
      className="group/row relative"
    >
      <Wrapper
        {...wrapperProps}
        className="relative block rounded-2xl p-4 -m-4 transition-all duration-500 hover:bg-[#C9A227]/[0.04]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[#C9A227] transition-all duration-500 group-hover/row:h-3/4"
        />

        <h4 className="text-[#C9A227] type-eyebrow mb-2 transition-all duration-500 group-hover/row:tracking-[0.25em]">
          {label}
        </h4>

        <div className="flex items-start gap-3 text-lg font-medium leading-relaxed text-[#1A1A1A] transition-all duration-500 group-hover/row:pl-3 group-hover/row:text-[#876B18]">
          <Icon className="mt-1.5 shrink-0 text-[#C9A227] transition-transform duration-500 group-hover/row:scale-110" aria-hidden="true" />
          <div>{children}</div>
        </div>
      </Wrapper>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Social Chip — magnetic + scale
// ═══════════════════════════════════════════════════════════════

const SocialChip = ({ icon: Icon, label, href, prefersReduced }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 20, stiffness: 200, mass: 0.4 });
  const sy = useSpring(my, { damping: 20, stiffness: 200, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const y = useTransform(sy, [-0.5, 0.5], [-4, 4]);

  const handleMove = (e) => {
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
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={prefersReduced ? undefined : { x, y }}
      className="group/chip flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors duration-300 hover:text-[#C9A227]"
    >
      <Icon className="shrink-0 text-[#C9A227] transition-transform duration-500 group-hover/chip:scale-125 group-hover/chip:-rotate-6" aria-hidden="true" />
      <span className="relative">
        {label}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover/chip:w-full"
        />
      </span>
    </motion.a>
  );
};

// ═══════════════════════════════════════════════════════════════
// Interactive Form Field — underline draw + label float
// ═══════════════════════════════════════════════════════════════

const FormField = ({ label, children, prefersReduced, delay = 0 }) => {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className="group/field relative"
    >
      <label className="block text-[#C9A227] type-eyebrow mb-2 transition-all duration-500 group-focus-within/field:tracking-[0.25em]">
        {label}
      </label>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[#C9A227] transition-all duration-500 group-focus-within/field:w-full"
      />
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FAQ Item — accordion with slide + rotate icon
// ═══════════════════════════════════════════════════════════════

const FaqItem = ({ faq, isOpen, onToggle, prefersReduced }) => {
  return (
    <div className="group/faq border-b border-[#5A5A66]/20 transition-colors duration-500 hover:border-[#C9A227]/40">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left transition-colors duration-300"
      >
        <span className="relative text-lg font-medium text-[#1A1A1A] transition-all duration-500 group-hover/faq:pl-4 group-hover/faq:text-[#876B18]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[#C9A227] transition-all duration-500 group-hover/faq:h-3/4"
          />
          {faq.q}
        </span>
        <motion.span
          className="shrink-0 text-[#C9A227] text-xl"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: EASE_PRIMARY }}
        >
          {isOpen ? <FiMinus /> : <FiPlus />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={prefersReduced ? {} : { height: 'auto', opacity: 1 }}
            exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className="overflow-hidden"
          >
            <div className="pb-5 pl-4 text-[#5A5A66] font-normal leading-relaxed">
              <span className="block h-px w-8 bg-[#C9A227] mb-3" />
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

const Contact = () => {
  const prefersReduced = usePrefersReducedMotion();
  const { openEnquiry } = useEnquiry();
  const form = useRef();
  const [activeTab, setActiveTab] = useState('Getting Started');
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus('success');
        setIsSubmitting(false);
        e.target.reset();
        setTimeout(() => setSubmitStatus(null), 3000);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setSubmitStatus('error');
        setIsSubmitting(false);
      });
  };

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        { id: 1, q: 'What is the minimum age to start horse riding?', a: 'Children can begin riding with us from 5 years of age and above. Training is planned according to the rider’s age, confidence and ability.' },
        { id: 2, q: 'Is there an upper age limit for adults?', a: 'No. We do not have a fixed upper age limit for adult riders. Adults can take up horse riding based on their comfort and suitability for the activity.' },
        { id: 3, q: 'Is there a weight limit for horse riding?', a: 'Yes. For the safety and well-being of both the rider and the horse, our current rider weight limit is below 75 kg.' },
        { id: 4, q: 'Do I need previous horse-riding experience to join?', a: 'Not at all. We welcome complete beginners as well as experienced riders. Our training is structured according to each rider’s current ability, confidence and riding goals.' },
        { id: 5, q: 'Can children try horse riding before joining regular classes?', a: 'Yes. Children aged 5 years and above can begin with a Guest Ride or introductory riding experience before deciding on regular training.' },
        { id: 6, q: 'What should I wear for my first riding session?', a: 'We recommend comfortable, fitted clothing and suitable closed footwear. Our team can guide you regarding appropriate riding attire and safety equipment when you book your session.' },
        { id: 7, q: 'Can I visit the club before enrolling?', a: 'Yes. Prospective riders and families are welcome to visit the club to understand our facilities and training environment. We recommend contacting us in advance to arrange your visit.' },
        { id: 8, q: 'How do I know which riding program is suitable for me or my child?', a: 'Our team can help you choose the appropriate program based on the rider’s age, previous riding experience, confidence and goals.' },
      ],
    },
    {
      category: 'Programs and Training',
      questions: [
        { id: 9, q: 'How long does it take to learn horse riding?', a: 'Learning time varies. On average, a rider may require approximately 45-50 classes to develop the basic skills of walk, trot and canter.' },
        { id: 10, q: 'Do you offer Guest Rides or one-time horse-riding experiences?', a: 'Yes. We offer Guest Rides / Horse Experience sessions for individuals and families. Advance booking is recommended.' },
        { id: 11, q: 'Which equestrian disciplines do you offer?', a: 'Our training includes Show Jumping, Dressage, general riding and horsemanship.' },
        { id: 12, q: 'Do you provide competitive equestrian training?', a: 'Yes. We provide structured training for riders interested in progressing towards equestrian competitions.' },
        { id: 13, q: 'Do I need to own a horse to learn riding?', a: 'No. You do not need to own a horse to begin training.' },
        { id: 14, q: 'Can experienced riders join for advanced or competitive training?', a: 'Yes. Experienced riders can join based on their current riding level and goals.' },
      ],
    },
    {
      category: 'Horses and Safety',
      questions: [
        { id: 15, q: 'How are horses assigned to riders?', a: 'Horses are assigned considering the rider’s experience, ability, confidence and training objectives.' },
        { id: 16, q: 'Do you have an indoor riding arena?', a: 'Yes. We have a covered indoor riding arena.' },
      ],
    },
    {
      category: 'Visiting and Booking',
      questions: [
        { id: 17, q: 'How can I book a riding session?', a: 'You can contact us through the enquiry details provided on our website.' },
      ],
    },
  ];

  const driveTimes = [
    { location: 'Sarjapur', route: 'via Sarjapur Road', time: '12 mins' },
    { location: 'Electronic City', route: 'via Hosur Road', time: '20 mins' },
    { location: 'HSR Layout', route: 'via Sarjapur Road', time: '22 mins' },
    { location: 'Bellandur', route: 'via Outer Ring Road', time: '24 mins' },
    { location: 'Whitefield', route: 'via Outer Ring Road', time: '28 mins' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FDFCFA]">
      <SectionDots chapters={CHAPTERS} />

      {/* ═══════════════════════════════════════════════════════
          CHAPTER: Contact Intro (dark)
      ═══════════════════════════════════════════════════════ */}
      <div id="chapter-contact-intro" className="nav-dark-hero min-w-screen bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <SectionGlow tone="dark">
          <div className="max-w-7xl mx-auto px-6 relative">
            {/* Top edge gold line */}
            {!prefersReduced && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-6 right-6 top-20 h-px md:top-32"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 0.3, ease: EASE_PRIMARY }}
                style={{ originX: 0 }}
              >
                <div className="mx-auto h-px w-[min(88%,900px)] bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />
              </motion.div>
            )}

            <Reveal as="div" y={8} duration={0.5}>
              <h4 className="group type-eyebrow mb-4 flex cursor-default items-center gap-3">
                <motion.span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                  animate={
                    prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                  }
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="transition-all duration-500 group-hover:tracking-[0.3em]">
                  <ShinyText
                    text="Get in touch"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </span>
              </h4>
            </Reveal>

            <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
              <h1 className="type-page-title text-white leading-tight mb-4 [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                Come and see{' '}
                <ShinyText
                  text="the place."
                  color="#C9A227"
                  shineColor="#F5F1E8"
                  speed={2.5}
                  spread={120}
                />
              </h1>
            </Reveal>

            <FadeUp as="p" size="text" delay={0.35} className="type-lead text-white/70">
              Open Tuesday to Saturday. Closed Monday. Visits welcome by prior arrangement.
            </FadeUp>
          </div>
        </SectionGlow>
      </div>

      {/* Contact content wrapper */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-15">
        <SectionGlow tone="light">
          <div className="max-w-7xl mx-auto px-6">

            {/* ═══════════════════════════════════════════════════════
                CHAPTER: Enquiry Form — SPLIT-PANEL REVEAL
            ═══════════════════════════════════════════════════════ */}
            <div id="chapter-enquiry-form" className="bg-[#FDFCFA] rounded-[2.5rem] p-10 md:p-16 mb-24 shadow-xl border border-[#5A5A66]/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left: Details */}
                <Stagger gap={0.1} amount={0.15} className="flex flex-col gap-8">
                  <StaggerItem>
                    <ContactRow icon={FaWhatsapp} label="Call" href="tel:+918460846946" prefersReduced={prefersReduced}>
                      8460 846 946
                    </ContactRow>
                  </StaggerItem>

                  <StaggerItem>
                    <ContactRow icon={FiPhone} label="WhatsApp" href="https://wa.me/918460846946" prefersReduced={prefersReduced}>
                      Message us directly
                    </ContactRow>
                  </StaggerItem>

                  <StaggerItem>
                    <ContactRow icon={FiMail} label="Email" href="mailto:enquiry@ngses.in" prefersReduced={prefersReduced}>
                      enquiry@ngses.in
                    </ContactRow>
                  </StaggerItem>

                  <StaggerItem>
                    <ContactRow icon={FiMapPin} label="Visit" href={BUSINESS_MAP_URL} prefersReduced={prefersReduced}>
                      Inside BEML Cooperative Society<br />S. Medahalli, Sarjapura<br />Bengaluru, Karnataka 562107
                    </ContactRow>
                  </StaggerItem>

                  <StaggerItem>
                    <ContactRow icon={FiClock} label="Hours" prefersReduced={prefersReduced}>
                      Tuesday–Saturday: Open<br />Monday: Closed
                    </ContactRow>
                  </StaggerItem>

                  <StaggerItem>
                    <h4 className="text-[#C9A227] type-eyebrow mb-4">Follow</h4>
                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                      <SocialChip icon={FaInstagram} label="Instagram" href="https://www.instagram.com/nakshathglobalsports/" prefersReduced={prefersReduced} />
                      <SocialChip icon={FaFacebookF} label="Facebook" href="https://www.facebook.com/profile.php?id=61590255645938" prefersReduced={prefersReduced} />
                      <SocialChip icon={FaYoutube} label="YouTube" href="https://www.youtube.com/@nakshathglobalsports" prefersReduced={prefersReduced} />
                      <SocialChip icon={FaXTwitter} label="X" href="https://x.com/ngses_" prefersReduced={prefersReduced} />
                      <SocialChip icon={FaPinterestP} label="Pinterest" href="https://in.pinterest.com/ngses/" prefersReduced={prefersReduced} />
                    </div>
                  </StaggerItem>
                </Stagger>

                {/* Right: Form — slides from right + field cascade */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, x: 40 }}
                  whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="flex flex-col"
                >
                  <FadeUp size="text" className="mb-10">
                    <h2 className="type-section-title text-[#1A1A1A] [&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                      Send us an enquiry.
                    </h2>
                  </FadeUp>

                  <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField label="Full Name" prefersReduced={prefersReduced} delay={0.1}>
                        <input type="text" name="firstName" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors" required />
                      </FormField>
                      <FormField label="Phone Number" prefersReduced={prefersReduced} delay={0.2}>
                        <input type="tel" name="phone" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors" required />
                      </FormField>
                    </div>

                    <FormField label="Email" prefersReduced={prefersReduced} delay={0.3}>
                      <input type="email" name="email" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors" required />
                    </FormField>

                    <FormField label="What is this about?" prefersReduced={prefersReduced} delay={0.4}>
                      <div className="relative">
                        <select name="topic" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors appearance-none cursor-pointer">
                          <option value="">Select an option</option>
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
                        <span className="absolute right-0 top-3 text-[#1A1A1A] pointer-events-none text-sm">&#9662;</span>
                      </div>
                    </FormField>

                    <FormField label="Your Message" prefersReduced={prefersReduced} delay={0.5}>
                      <textarea name="message" rows="3" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors resize-none"></textarea>
                    </FormField>

                    <motion.div
                      initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group/btn relative overflow-hidden bg-[#C9A227] text-[#0C0922] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {!prefersReduced && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                          />
                        )}
                        <span className="relative flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <FiLoader className="animate-spin" /> Sending...
                            </>
                          ) : (
                            'Send Enquiry'
                          )}
                        </span>
                      </button>
                      {submitStatus === 'success' && (
                        <motion.p
                          initial={prefersReduced ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-green-600 text-sm font-medium"
                        >
                          Thank you! Your enquiry has been sent successfully.
                        </motion.p>
                      )}
                      {submitStatus === 'error' && (
                        <motion.p
                          initial={prefersReduced ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-red-600 text-sm font-medium"
                        >
                          Failed to send. Please try again or contact us directly.
                        </motion.p>
                      )}
                      <p className="mt-4 text-[#5A5A66] text-sm">We reply within one working day.</p>
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                CHAPTER: Getting Here (dark) — ANIMATED LOCATION MAP + LIST CASCADE
            ═══════════════════════════════════════════════════════ */}
            <div id="chapter-getting-here" className="mb-24 w-full overflow-hidden rounded-3xl bg-[#0C0922]">
              <SectionGlow tone="dark">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                  {/* LEFT: Animated Location Map — curtain reveal L→R */}
                  <motion.div
                    className="relative flex w-full items-center justify-center p-3 md:p-10 xl:p-8"
                    initial={
                      prefersReduced
                        ? false
                        : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.06, opacity: 0 }
                    }
                    whileInView={
                      prefersReduced
                        ? {}
                        : { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, opacity: 1 }
                    }
                    viewport={{ once: true, amount: 0.3 }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : {
                            clipPath: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
                            scale: { duration: 1.6, delay: 0.2, ease: EASE_PRIMARY },
                            opacity: { duration: 0.6, ease: EASE_PRIMARY },
                          }
                    }
                  >
                    {/* Soft gold halo behind the map card */}
                    {!prefersReduced && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-0"
                        style={{
                          background:
                            'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.04) 45%, transparent 70%)',
                          filter: 'blur(40px)',
                        }}
                      />
                    )}

                    <div className="relative z-10 w-full">
                      <Suspense
                        fallback={
                          <div
                            aria-hidden="true"
                            className={`mx-auto aspect-square w-full max-w-[680px] rounded-3xl border border-[#C9A227]/30 bg-[#0C0922]/40 ${
                              prefersReduced ? '' : 'animate-pulse'
                            }`}
                          />
                        }
                      >
                        <AnimatedLocationMap />
                      </Suspense>
                    </div>
                  </motion.div>

                  {/* RIGHT: Drive-time list — cascade */}
                  <Stagger gap={0.08} amount={0.15} className="flex flex-col justify-center p-6 md:p-16 lg:pr-24">
                    <StaggerItem>
                      <h4 className="group/eb text-[#C9A227] type-eyebrow mb-4 inline-flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                        <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">Getting Here</span>
                      </h4>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                        <SplitText
                          as="h2"
                          className="type-section-title text-white mb-12"
                          wordDelay={0.04}
                          startDelay={0}
                          amount={0.4}
                        >
                          Closer than you think.
                        </SplitText>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="mb-4 flex items-center justify-between border-b border-[#C9A227]/35 pb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#C9A227]">
                        <span>Starting point</span>
                        <span className="pl-4 text-right">Approx. drive time</span>
                      </div>
                    </StaggerItem>

                    {driveTimes.map((item, idx) => (
                      <StaggerItem key={idx}>
                        <div className="group/drive relative flex items-center justify-between gap-5 border-b border-white/10 pb-4 transition-all duration-500 hover:border-[#C9A227]/40 hover:pl-3">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-[#C9A227] transition-all duration-500 group-hover/drive:h-3/4"
                          />
                          <div className="min-w-0 relative">
                            <h3 className="text-white font-medium text-lg transition-colors duration-500 group-hover/drive:text-[#C9A227]">{item.location}</h3>
                            <p className="text-white/50 text-sm font-normal transition-colors duration-500 group-hover/drive:text-white/80">{item.route}</p>
                          </div>
                          <span className="shrink-0 text-right text-base font-semibold text-white md:text-lg transition-all duration-500 group-hover/drive:tracking-wider group-hover/drive:text-[#C9A227]">{item.time}</span>
                        </div>
                      </StaggerItem>
                    ))}

                    <StaggerItem>
                      <p className="text-white/40 text-xs mt-8">
                        Travel times are approximate and may vary depending on traffic conditions.
                      </p>
                    </StaggerItem>

                    <StaggerItem>
                      <a
                        href={BUSINESS_MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/maps relative inline-flex items-center gap-2 text-[#C9A227] pb-1 mt-4 w-max transition-colors duration-500 hover:text-white"
                      >
                        Open in Maps
                        <span className="absolute -bottom-0 left-0 h-px w-full bg-[#C9A227] transition-all duration-500 group-hover/maps:w-0" />
                        <span className="absolute -bottom-0 right-0 h-px w-0 bg-white transition-all duration-500 group-hover/maps:w-full" />
                      </a>
                    </StaggerItem>
                  </Stagger>
                </div>
              </SectionGlow>
            </div>

            {/* ═══════════════════════════════════════════════════════
                CHAPTER: FAQ — ACCORDION + TAB UNDERLINE DRAW
            ═══════════════════════════════════════════════════════ */}
            <div id="chapter-faq" className="mb-24">
              <FadeUp size="text" className="mb-4">
                <h4 className="group/eb type-eyebrow text-[#C9A227] inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-current opacity-60 transition-all duration-500 group-hover/eb:w-4 group-hover/eb:opacity-100" />
                  <span className="transition-all duration-500 group-hover/eb:tracking-[0.25em]">Questions</span>
                </h4>
              </FadeUp>

              <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#876B18]">
                <SplitText
                  as="h2"
                  className="type-section-title text-[#1A1A1A] mb-12"
                  wordDelay={0.04}
                  startDelay={0.1}
                  amount={0.3}
                >
                  Before you ride.
                </SplitText>
              </div>

              <Reveal as="div" y={15} duration={0.6} amount={0.15}>
                <div className="faq-tabs-scrollbar mb-10 flex flex-nowrap gap-4 overflow-x-auto border-b border-[#5A5A66]/20 pb-4 md:justify-between md:gap-5 md:overflow-visible">
                  {faqData.map((category, catIdx) => (
                    <button
                      key={catIdx}
                      onClick={() => setActiveTab(category.category)}
                      className={`group/tab relative shrink-0 whitespace-nowrap pb-1 text-[clamp(0.65rem,1.4vw,0.875rem)] font-bold uppercase tracking-[0.08em] transition-all duration-500 md:tracking-[0.12em] ${
                        activeTab === category.category
                          ? 'text-[#C9A227]'
                          : 'text-[#5A5A66]/70 hover:text-[#1A1A1A]'
                      }`}
                    >
                      {category.category}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#C9A227] transition-all duration-500 ${
                          activeTab === category.category ? 'w-full' : 'w-0 group-hover/tab:w-1/2'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </Reveal>

              <Stagger gap={0.05} amount={0.1} className="space-y-6">
                {faqData
                  .filter((cat) => cat.category === activeTab)
                  .flatMap((category) =>
                    category.questions.map((faq) => (
                      <StaggerItem key={faq.id}>
                        <FaqItem
                          faq={faq}
                          isOpen={openFaq === faq.id}
                          onToggle={() => toggleFaq(faq.id)}
                          prefersReduced={prefersReduced}
                        />
                      </StaggerItem>
                    ))
                  )}
              </Stagger>
            </div>

            {/* ═══════════════════════════════════════════════════════
                CHAPTER: Groups (dark) — WORD-HOVER GOLD BUTTONS
            ═══════════════════════════════════════════════════════ */}
            <div id="chapter-groups" className="relative mx-auto w-full rounded-3xl bg-[#0C0922] px-5 py-24 md:px-15 overflow-hidden">
              <SectionGlow tone="dark">
                <div className="mx-auto max-w-7xl">
                  <FadeUp size="text" className="mb-4">
                    <h4 className="group/eb type-eyebrow inline-flex items-center gap-2">
                      <motion.span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A227]"
                        animate={
                          prefersReduced
                            ? { scale: 1, opacity: 1 }
                            : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }
                        }
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <span className="transition-all duration-500 group-hover/eb:tracking-[0.3em]">
                        <ShinyText
                          text="Not Just Lessons"
                          color="#C9A227"
                          shineColor="#F5F1E8"
                          speed={2.5}
                          spread={120}
                        />
                      </span>
                    </h4>
                  </FadeUp>

                  <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <div className="[&_*]:transition-colors [&_*]:duration-500 hover:[&_*]:text-[#C9A227]">
                      <SplitText
                        as="h2"
                        className="type-section-title text-white leading-tight"
                        wordDelay={0.04}
                        startDelay={0.1}
                        amount={0.3}
                      >
                        Bring a group.
                      </SplitText>
                    </div>

                    <FadeUp as="p" size="text" delay={0.25} className="max-w-md text-lg font-normal text-white/70 lg:pt-4">
                      The arenas, the café and the grounds are open to groups as well as individual riders.
                    </FadeUp>
                  </div>

                  <Stagger gap={0.08} amount={0.15} className="mt-16 mb-12 flex flex-wrap gap-x-10 gap-y-6">
                    {['Corporate Days', 'School Visits', 'Group Sessions', 'Photoshoots', 'Guest Rides'].map((item, idx) => (
                      <StaggerItem key={idx}>
                        <button
                          onClick={() => openEnquiry('Group Booking')}
                          className="group/pill relative text-white font-serif text-xl md:text-2xl transition-all duration-500 hover:text-[#C9A227] hover:tracking-wide"
                        >
                          {item}
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover/pill:w-full"
                          />
                        </button>
                      </StaggerItem>
                    ))}
                  </Stagger>

                  <FadeUp size="text" delay={0.3}>
                    <button
                      onClick={() => openEnquiry('Group Booking')}
                      className="group/cta relative inline-block text-white text-sm font-medium transition-colors duration-500 hover:text-[#C9A227] pb-1"
                    >
                      Enquire about group bookings
                      <span className="absolute -bottom-0 left-0 h-[2px] w-full bg-[#C9A227] transition-all duration-500 group-hover/cta:w-0" />
                      <span className="absolute -bottom-0 right-0 h-[2px] w-0 bg-[#C9A227] transition-all duration-500 group-hover/cta:w-full" />
                    </button>
                  </FadeUp>
                </div>
              </SectionGlow>
            </div>

          </div>
        </SectionGlow>
      </div>
    </div>
  );
};

export default Contact;