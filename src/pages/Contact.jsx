import { useState, useRef, useCallback, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowUpRight,
  FiArrowRight,
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { toast } from 'sonner';
import { useEnquiry } from '../context/EnquiryContext';
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../constants/location';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

/* ============================================================
   SECTION 1 — HEADER: Letter cascade with gold shimmer sweep
   ============================================================ */
const CascadeText = ({ text, delay = 0, className = '' }) => {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.04,
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
   SECTION 2 — CONTACT LINKS: Hover accordion rows
   ============================================================ */
const ContactLink = ({ label, href, Icon, value, external, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block overflow-hidden rounded-xl py-3 pr-4"
    >
      <motion.span
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 left-0 w-full origin-left rounded-xl bg-[#C9A227]/[0.07]"
      />

      <div className="relative flex items-center gap-4">
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-xs italic tabular-nums text-[#C9A227]/60"
        >
          ·
        </motion.span>

        <motion.span
          animate={{
            rotate: hovered ? -12 : 0,
            scale: hovered ? 1.15 : 1,
            color: hovered ? '#C9A227' : '#C9A227',
          }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="inline-flex shrink-0 text-lg text-[#C9A227]"
        >
          <Icon />
        </motion.span>

        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#876B18]">
            {label}
          </p>
          <p className="text-base font-medium leading-snug text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#876B18]">
            {value}
          </p>
        </div>

        <motion.span
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : -8,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-[#C9A227]"
        >
          <FiArrowRight />
        </motion.span>
      </div>
    </motion.a>
  );
};

/* ============================================================
   SECTION 3 — FORM: Underline draws, label floats up, icon reacts
   ============================================================ */
const Field = ({ label, children }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="relative"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="mb-2 flex items-center gap-2">
        <motion.span
          animate={{
            width: focused ? 20 : 6,
            backgroundColor: focused ? '#C9A227' : 'rgba(201,162,39,0.4)',
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block h-px"
        />
        <label className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#876B18]">
          {label}
        </label>
      </div>
      {children}
      <div className="relative mt-0 h-px w-full bg-[#1A1A1A]/25">
        <motion.span
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 origin-left bg-[#C9A227]"
        />
      </div>
    </div>
  );
};

/* ============================================================
   SECTION 4 — DRIVE TIMES: New animation
   Row slides in from right with a scale-settle; each row has a
   large italic serif time that scales + glows on hover; gold
   underline expands full width; a vertical accent grows beside
   the location name.
   ============================================================ */
const DriveRow = ({ item, idx }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 1,
        delay: 0.15 + idx * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-5 py-6 pl-6"
    >
      {/* Vertical gold rail — grows on hover */}
      <motion.span
        initial={false}
        animate={{ height: hovered ? '70%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-1/2 w-[2px] -translate-y-1/2 rounded-full bg-[#C9A227]"
      />

      {/* Number */}
      <motion.span
        animate={{
          x: hovered ? 4 : 0,
          color: hovered ? '#C9A227' : 'rgba(201,162,39,0.35)',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 font-serif text-xs italic tabular-nums"
      >
        {String(idx + 1).padStart(2, '0')}
      </motion.span>

      {/* Location + route */}
      <div className="min-w-0 flex-1">
        <h3
          className={`text-lg font-medium transition-colors duration-500 md:text-xl ${
            hovered ? 'text-[#C9A227]' : 'text-white'
          }`}
        >
          {item.location}
        </h3>
        <p className="text-sm font-normal text-white/45">{item.route}</p>
      </div>

      {/* Time — large italic serif, scales + glows on hover */}
      <motion.span
        animate={{
          scale: hovered ? 1.15 : 1,
          textShadow: hovered
            ? '0 0 20px rgba(201,162,39,0.6)'
            : '0 0 0px rgba(201,162,39,0)',
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 font-serif text-xl italic tabular-nums text-[#C9A227] md:text-2xl"
      >
        {item.time}
      </motion.span>

      {/* Gold hairline that draws on hover */}
      <motion.span
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-0 left-6 right-0 h-px origin-left bg-gradient-to-r from-[#C9A227] to-[#C9A227]/20"
      />
    </motion.div>
  );
};

/* ============================================================
   SECTION 5 — FAQ: Vertical category rail + accordion
   ============================================================ */
const FaqRail = ({ categories, active, onChange }) => (
  <div className="flex flex-col gap-1 md:gap-2">
    {categories.map((cat, i) => {
      const isActive = active === cat.category;
      return (
        <motion.button
          key={cat.category}
          type="button"
          onClick={() => onChange(cat.category)}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative flex items-center gap-4 rounded-lg py-3 pl-5 pr-4 text-left transition-colors duration-500"
        >
          <motion.span
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.9,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 rounded-lg bg-[#0C0922]"
          />

          {isActive && (
            <motion.span
              layoutId="faq-rail-bar"
              className="absolute -left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#C9A227]"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}

          <span
            className={`relative font-serif text-xs italic tabular-nums transition-colors duration-500 ${
              isActive ? 'text-[#C9A227]' : 'text-[#5A5A66]'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          <span
            className={`relative text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 md:text-sm ${
              isActive
                ? 'text-white'
                : 'text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]'
            }`}
          >
            {cat.category}
          </span>
        </motion.button>
      );
    })}
  </div>
);

/* ============================================================
   SECTION 6 — GROUP PILLS: Bubble-in with hover expand
   ============================================================ */
const GroupPill = ({ label, onClick, idx }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0 }}
    transition={{
      duration: 0.65,
      delay: 0.1 + idx * 0.1,
      ease: [0.34, 1.56, 0.64, 1],
    }}
    whileHover="hover"
    className="group/pill relative overflow-hidden rounded-full border border-[#C9A227]/40 bg-transparent px-5 py-2.5"
  >
    <motion.span
      variants={{
        hover: { scaleX: 1 },
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-0 origin-left bg-[#C9A227]"
    />

    <span className="relative flex items-center gap-2 font-serif text-lg text-white transition-colors duration-500 group-hover/pill:text-[#0C0922] md:text-xl">
      {label}
      <motion.span
        variants={{ hover: { x: 4, opacity: 1 } }}
        initial={{ x: 0, opacity: 0 }}
        className="inline-flex"
      >
        <FiArrowRight size={16} />
      </motion.span>
    </span>
  </motion.button>
);

/* ============================================================
   MAIN PAGE
   ============================================================ */
const Contact = () => {
  const { openEnquiry } = useEnquiry();
  const form = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('Getting Started');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        toast.success('Enquiry sent', {
          description: "We'll be in touch within one working day.",
        });
        setIsSubmitting(false);
        e.target.reset();
      })
      .catch((err) => {
        console.log('FAILED...', err);
        toast.error('Failed to send', {
          description: 'Please try again or contact us directly.',
        });
        setIsSubmitting(false);
      });
  };

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        { id: 1, q: 'What is the minimum age to start horse riding?', a: "Children can begin riding with us from 5 years of age and above. Training is planned according to the rider's age, confidence and ability." },
        { id: 2, q: 'Is there an upper age limit for adults?', a: 'No. We do not have a fixed upper age limit for adult riders. Adults can take up horse riding based on their comfort and suitability for the activity.' },
        { id: 3, q: 'Is there a weight limit for horse riding?', a: 'Yes. For the safety and well-being of both the rider and the horse, our current rider weight limit is below 75 kg.' },
        { id: 4, q: 'Do I need previous horse-riding experience to join?', a: "Not at all. We welcome complete beginners as well as experienced riders. Our training is structured according to each rider's current ability, confidence and riding goals." },
        { id: 5, q: 'Can children try horse riding before joining regular classes?', a: 'Yes. Children aged 5 years and above can begin with a Guest Ride or introductory riding experience before deciding on regular training.' },
        { id: 6, q: 'What should I wear for my first riding session?', a: 'We recommend comfortable, fitted clothing and suitable closed footwear. Our team can guide you regarding appropriate riding attire and safety equipment when you book your session.' },
        { id: 7, q: 'Can I visit the club before enrolling?', a: 'Yes. Prospective riders and families are welcome to visit the club to understand our facilities and training environment. We recommend contacting us in advance to arrange your visit.' },
        { id: 8, q: 'How do I know which riding program is suitable for me or my child?', a: "Our team can help you choose the appropriate program based on the rider's age, previous riding experience, confidence and goals, whether the objective is recreational riding, structured learning or competitive training." },
      ],
    },
    {
      category: 'Programs and Training',
      questions: [
        { id: 9, q: 'How long does it take to learn horse riding?', a: 'Learning time varies from rider to rider depending on factors such as consistency, confidence and individual progress. On average, a rider may require approximately 45-50 classes to develop the basic skills of walk, trot and canter. Further training is required to progress into more advanced riding and specific equestrian disciplines.' },
        { id: 10, q: 'Do you offer Guest Rides or one-time horse-riding experiences?', a: 'Yes. We offer Guest Rides / Horse Experience sessions for individuals and families who would like to experience horse riding without initially enrolling in a regular training program. Advance booking is recommended.' },
        { id: 11, q: 'Which equestrian disciplines do you offer?', a: "Our training includes Show Jumping, Dressage, general riding and horsemanship, with structured development based on the rider's level and goals." },
        { id: 12, q: 'Do you provide competitive equestrian training?', a: 'Yes. We provide structured training for riders interested in progressing towards equestrian competitions, with emphasis on riding technique, horse-rider partnership and progressive development.' },
        { id: 13, q: 'Do I need to own a horse to learn riding?', a: 'No. You do not need to own a horse to begin training. Suitable trained horses are allocated based on the rider\'s experience, ability and training requirements.' },
        { id: 14, q: 'Can experienced riders join for advanced or competitive training?', a: 'Yes. Experienced riders can join based on their current riding level and goals. Our team can assess their requirements and recommend an appropriate training program.' },
      ],
    },
    {
      category: 'Horses and Safety',
      questions: [
        { id: 15, q: 'How are horses assigned to riders?', a: "Horses are assigned considering the rider's experience, ability, confidence and training objectives. An appropriate horse-rider combination is important for both safety and effective learning." },
        { id: 16, q: 'Do you have an indoor riding arena?', a: 'Yes. We have a covered indoor riding arena, providing a comfortable and controlled environment for regular equestrian training.' },
      ],
    },
    {
      category: 'Visiting and Booking',
      questions: [
        { id: 17, q: 'How can I book a riding session?', a: 'You can contact us through the enquiry details provided on our website. Our team will assist you with available sessions, suitable programs and the booking process.' },
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

  const socials = [
    { href: 'https://www.instagram.com/nakshathglobalsports/', Icon: FaInstagram, label: 'Instagram' },
    { href: 'https://www.facebook.com/profile.php?id=61590255645938', Icon: FaFacebookF, label: 'Facebook' },
    { href: 'https://www.youtube.com/@nakshathglobalsports', Icon: FaYoutube, label: 'YouTube' },
    { href: 'https://x.com/ngses_', Icon: FaXTwitter, label: 'X' },
    { href: 'https://in.pinterest.com/ngses/', Icon: FaPinterestP, label: 'Pinterest' },
  ];

  const activeQuestions =
    faqData.find((c) => c.category === activeTab)?.questions || [];

  return (
    <div className="min-h-screen w-full bg-[#FDFCFA]">

      {/* ============================================================
         SECTION 1 — HEADER
         ============================================================ */}
      <div className="nav-dark-hero relative min-w-screen overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#C9A227]/12 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-20 top-20 h-40 w-40 rounded-full border border-[#C9A227]/25"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="pointer-events-none absolute right-20 top-20 h-40 w-40 rounded-full border border-[#C9A227]/20"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex items-center gap-3 text-[#C9A227] type-eyebrow"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block h-px w-8 origin-left bg-[#C9A227]"
            />
            Get in touch
          </motion.h4>

          <h1 className="type-page-title mb-4 leading-tight text-white">
            <CascadeText text="Come and see" delay={0.4} />
            <br />
            <CascadeText text="the place." delay={0.9} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="type-lead text-white/70"
          >
            Open Tuesday to Saturday. Closed Monday. Visits welcome by prior
            arrangement.
          </motion.p>
        </div>
      </div>

      {/* ============================================================
         SECTION 2 — CONTACT + FORM
         ============================================================ */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24 rounded-[2.5rem] border border-[#5A5A66]/15 bg-[#FDFCFA] p-8 shadow-[0_40px_80px_-40px_rgba(12,9,34,0.35)] md:p-14"
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* LEFT */}
              <div className="flex flex-col gap-2">
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 text-[#C9A227] type-eyebrow"
                >
                  Reach us
                </motion.h4>

                <ContactLink
                  label="Call"
                  href="tel:+918460846946"
                  Icon={FaWhatsapp}
                  value="8460 846 946"
                  delay={0.1}
                />
                <ContactLink
                  label="WhatsApp"
                  href="https://wa.me/918460846946"
                  Icon={FiPhone}
                  value="Message us directly"
                  external
                  delay={0.2}
                />
                <ContactLink
                  label="Email"
                  href="mailto:enquiry@ngses.in"
                  Icon={FiMail}
                  value="enquiry@ngses.in"
                  delay={0.3}
                />
                <ContactLink
                  label="Visit"
                  href={BUSINESS_MAP_URL}
                  Icon={FiMapPin}
                  value="Inside BEML Cooperative Society · S. Medahalli · Sarjapura · Bengaluru 562107"
                  external
                  delay={0.4}
                />

                <ContactLink
                  label="Hours"
                  href="#"
                  Icon={FiClock}
                  value="Tue–Sat open · Monday closed"
                  delay={0.5}
                />

                {/* Socials */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8"
                >
                  <h4 className="mb-4 text-[#C9A227] type-eyebrow">Follow</h4>
                  <div className="flex flex-wrap gap-3">
                    {socials.map(({ href, Icon, label }, i) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.7 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -3 }}
                        className="group/soc inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/30 bg-transparent text-[#C9A227] transition-colors duration-500 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0922]"
                        aria-label={label}
                        title={label}
                      >
                        <Icon className="text-base" aria-hidden="true" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* RIGHT — Form */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="type-section-title mb-10 text-[#1A1A1A]"
                >
                  Send us an enquiry.
                </motion.h2>

                <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Field label="Full Name">
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="w-full border-0 bg-transparent py-2 text-base text-[#1A1A1A] focus:outline-none"
                        />
                      </Field>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Field label="Phone Number">
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="w-full border-0 bg-transparent py-2 text-base text-[#1A1A1A] focus:outline-none"
                        />
                      </Field>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Field label="Email">
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full border-0 bg-transparent py-2 text-base text-[#1A1A1A] focus:outline-none"
                      />
                    </Field>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Field label="What is this about?">
                      <div className="relative">
                        <select
                          name="topic"
                          className="w-full cursor-pointer appearance-none border-0 bg-transparent py-2 pr-6 text-base text-[#1A1A1A] focus:outline-none"
                        >
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
                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm text-[#1A1A1A]">
                          ▾
                        </span>
                      </div>
                    </Field>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Field label="Your Message">
                      <textarea
                        name="message"
                        rows="3"
                        className="w-full resize-none border-0 bg-transparent py-2 text-base text-[#1A1A1A] focus:outline-none"
                      ></textarea>
                    </Field>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start"
                  >
                    <motion.div
                      whileHover={{ x: isSubmitting ? 0 : 4 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-auto rounded-full bg-[#C9A227] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#0C0922] transition-colors duration-300 hover:bg-[#0C0922] hover:text-[#C9A227] disabled:opacity-60"
                      >
                        {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                      </Button>
                    </motion.div>

                    <p className="mt-4 text-sm text-[#5A5A66]">
                      We reply within one working day.
                    </p>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
             SECTION 3 — GETTING HERE (NEW ANIMATIONS)
             ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24 w-full overflow-hidden rounded-3xl bg-[#0C0922]"
          >
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
              {/* Map — 3D flip-in reveal with gold rim draw */}
              <div
                className="w-full p-0 xl:p-10"
                style={{ perspective: '1400px' }}
              >
                <motion.div
                  initial={{
                    rotateY: -22,
                    scale: 0.94,
                    opacity: 0,
                    filter: 'brightness(0.6)',
                  }}
                  whileInView={{
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'brightness(1)',
                  }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative h-[400px] w-full md:h-[700px]"
                >
                  <div className="relative h-full w-full overflow-hidden xl:rounded-tl-[3rem]">
                    <iframe
                      src={BUSINESS_MAP_EMBED_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nakshath Equestrian Club Location Map"
                    ></iframe>

                    {/* Gold corner accents that draw in */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{
                        duration: 1,
                        delay: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none absolute left-0 top-0 h-[2px] w-16 origin-left bg-[#C9A227]"
                    />
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0 }}
                      transition={{
                        duration: 1,
                        delay: 1.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none absolute left-0 top-0 h-16 w-[2px] origin-top bg-[#C9A227]"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Drive Times — new row animation */}
              <div className="flex flex-col justify-center p-6 md:p-16 lg:pr-24">
                <motion.h4
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 text-[#C9A227] type-eyebrow"
                >
                  Getting Here
                </motion.h4>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="type-section-title mb-12 text-white"
                >
                  Closer than you think.
                </motion.h2>

                <div className="space-y-0">
                  {driveTimes.map((item, idx) => (
                    <DriveRow key={idx} item={item} idx={idx} />
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="mt-8 text-xs text-white/40"
                >
                  Travel times are approximate and may vary depending on traffic
                  conditions.
                </motion.p>

                <motion.a
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 5 }}
                  href={BUSINESS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map mt-6 inline-flex w-max items-center gap-2 border-b border-[#C9A227] pb-1 text-[#C9A227] transition-colors hover:border-white hover:text-white"
                >
                  Open in Maps
                  <FiArrowUpRight className="transition-transform duration-500 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
             SECTION 4 — FAQ
             ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24"
          >
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-[#C9A227] type-eyebrow"
            >
              Questions
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="type-section-title mb-12 text-[#1A1A1A]"
            >
              Before you ride.
            </motion.h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32">
                  <FaqRail
                    categories={faqData}
                    active={activeTab}
                    onChange={setActiveTab}
                  />
                </div>
              </div>

              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Accordion type="single" collapsible className="w-full">
                      {activeQuestions.map((faq, i) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <AccordionItem
                            value={`faq-${faq.id}`}
                            className="group border-b border-[#5A5A66]/20 transition-colors duration-500 data-[state=open]:border-[#C9A227]/50"
                          >
                            <AccordionTrigger className="py-5 text-left text-lg font-medium text-[#1A1A1A] hover:no-underline hover:text-[#C9A227] [&>svg]:text-[#C9A227] [&>svg]:transition-transform [&>svg]:duration-500 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-[#C9A227]">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="pb-5 text-[#5A5A66] font-normal leading-relaxed">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ============================================================
             SECTION 5 — GROUP BOOKINGS
             ============================================================ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full bg-[#0C0922] px-5 py-24 md:px-15 lg:left-1/2 lg:w-screen lg:-translate-x-1/2"
          >
            <div className="mx-auto max-w-7xl">
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 text-[#C9A227] type-eyebrow"
              >
                Not Just Lessons
              </motion.h4>

              <div className="flex flex-col items-start gap-8 lg:flex-row">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="type-section-title leading-tight text-white"
                >
                  Bring a group.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-md text-lg font-normal text-white/70 lg:pt-4"
                >
                  The arenas, the café and the grounds are open to groups as well
                  as individual riders.
                </motion.p>
              </div>

              <div className="mb-12 mt-16 flex flex-wrap gap-4">
                {[
                  'Corporate Days',
                  'School Visits',
                  'Group Sessions',
                  'Photoshoots',
                  'Guest Rides',
                ].map((item, idx) => (
                  <GroupPill
                    key={idx}
                    label={item}
                    idx={idx}
                    onClick={() => openEnquiry('Group Booking')}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  <button
                    onClick={() => openEnquiry('Group Booking')}
                    className="group/btn inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-white transition-colors hover:text-[#C9A227]"
                  >
                    Enquire about group bookings
                    <FiArrowUpRight className="transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;