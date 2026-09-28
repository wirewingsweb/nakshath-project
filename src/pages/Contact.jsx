import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiPlus, FiMinus, FiLoader } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useEnquiry } from '../context/EnquiryContext';
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../constants/location';
import { viewportOnce } from '../utils/animations';

// ============================================================
// TEXT REVEAL
// ============================================================
const TextReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + letterIndex) * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// ============================================================
// FLOATING PARTICLES
// ============================================================
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 6,
  size: 1 + Math.random() * 2,
}));

// ============================================================
// MAIN COMPONENT
// ============================================================
const Contact = () => {
  const { openEnquiry } = useEnquiry();
  const form = useRef();
  const heroRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Getting Started');
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        { id: 1, q: 'What is the minimum age to start horse riding?', a: "Children can begin riding with us from 5 years of age and above. Training is planned according to the rider's age, confidence and ability." },
        { id: 2, q: 'Is there an upper age limit for adults?', a: 'No. We do not have a fixed upper age limit for adult riders. Adults can take up horse riding based on their comfort and suitability for the activity.' },
        { id: 3, q: 'Is there a weight limit for horse riding?', a: 'Yes. For the safety and well-being of both the rider and the horse, our current rider weight limit is below 75 kg.' },
        { id: 4, q: 'Do I need previous horse-riding experience to join?', a: "Not at all. We welcome complete beginners as well as experienced riders. Our training is structured according to each rider's current ability, confidence and riding goals." },
        { id: 5, q: 'Can children try horse riding before joining regular classes?', a: 'Yes. Children aged 5 years and above can begin with a Guest Ride or introductory riding experience before deciding on regular training.' },
        { id: 6, q: 'What should I wear for my first riding session?', a: 'We recommend comfortable, fitted clothing and suitable closed footwear. Our team can guide you regarding appropriate riding attire and safety equipment when you book your session.' },
        { id: 7, q: 'Can I visit the club before enrolling?', a: 'Yes. Prospective riders and families are welcome to visit the club to understand our facilities and training environment. We recommend contacting us in advance to arrange your visit.' },
        { id: 8, q: 'How do I know which riding program is suitable for me or my child?', a: "Our team can help you choose the appropriate program based on the rider's age, previous riding experience, confidence and goals." },
      ],
    },
    {
      category: 'Programs and Training',
      questions: [
        { id: 9, q: 'How long does it take to learn horse riding?', a: 'Learning time varies from rider to rider depending on factors such as consistency, confidence and individual progress. On average, a rider may require approximately 45-50 classes to develop the basic skills of walk, trot and canter.' },
        { id: 10, q: 'Do you offer Guest Rides or one-time horse-riding experiences?', a: 'Yes. We offer Guest Rides / Horse Experience sessions for individuals and families who would like to experience horse riding without initially enrolling in a regular training program. Advance booking is recommended.' },
        { id: 11, q: 'Which equestrian disciplines do you offer?', a: "Our training includes Show Jumping, Dressage, general riding and horsemanship, with structured development based on the rider's level and goals." },
        { id: 12, q: 'Do you provide competitive equestrian training?', a: 'Yes. We provide structured training for riders interested in progressing towards equestrian competitions, with emphasis on riding technique, horse-rider partnership and progressive development.' },
        { id: 13, q: 'Do I need to own a horse to learn riding?', a: "No. You do not need to own a horse to begin training. Suitable trained horses are allocated based on the rider's experience, ability and training requirements." },
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

  return (
    <div className="min-h-screen w-full bg-[#FDFCFA]">

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <div
        ref={heroRef}
        className="nav-dark-hero relative overflow-hidden bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44"
      >
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.10),transparent_60%)]" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[#C9A227]"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px` }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-5 flex items-center gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="h-px w-12 bg-[#C9A227]" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-[#C9A227]">
              Get in touch
            </span>
          </motion.div>

          <h1 className="type-page-title leading-tight text-white mb-6">
            <TextReveal text="Come and see the place." delay={0.3} />
          </h1>

          <motion.p
            className="type-lead max-w-2xl text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            Open Tuesday to Saturday. Closed Monday. Visits welcome by prior arrangement.
          </motion.p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CONTACT INFO + FORM */}
      {/* ============================================================ */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">

          <motion.div
            className="mb-24 rounded-[2.5rem] border border-[#5A5A66]/20 bg-[#FDFCFA] p-10 shadow-xl md:p-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

              {/* Left: Details */}
              <motion.div
                className="flex flex-col gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                }}
              >
                {[
                  { label: 'Call', href: 'tel:+918460846946', icon: <FaWhatsapp className="shrink-0 text-[#C9A227]" />, text: '8460 846 946' },
                  { label: 'WhatsApp', href: 'https://wa.me/918460846946', icon: <FiPhone className="shrink-0 text-[#C9A227]" />, text: 'Message us directly', external: true },
                  { label: 'Email', href: 'mailto:enquiry@ngses.in', icon: <FiMail className="shrink-0 text-[#C9A227]" />, text: 'enquiry@ngses.in' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <h4 className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                      {item.label}
                    </h4>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="group flex w-max items-center gap-3 text-lg font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"
                    >
                      <motion.span
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span>{item.text}</span>
                    </a>
                  </motion.div>
                ))}

                {/* Visit */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <h4 className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                    Visit
                  </h4>
                  <a
                    href={BUSINESS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-lg font-medium leading-relaxed text-[#1A1A1A] no-underline transition-colors hover:text-[#C9A227]"
                  >
                    <FiMapPin className="mt-1.5 shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>
                      Inside BEML Cooperative Society
                      <br />
                      S. Medahalli, Sarjapura
                      <br />
                      Bengaluru, Karnataka 562107
                    </span>
                  </a>
                </motion.div>

                {/* Hours */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <h4 className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                    Hours
                  </h4>
                  <div className="flex items-start gap-3 text-lg font-medium text-[#1A1A1A]">
                    <FiClock className="mt-1.5 shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <p>
                      Tuesday–Saturday: Open
                      <br />
                      Monday: Closed
                    </p>
                  </div>
                </motion.div>

                {/* Follow */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <h4 className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                    Follow
                  </h4>
                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    {[
                      { href: 'https://www.instagram.com/nakshathglobalsports/', icon: FaInstagram, label: 'Instagram' },
                      { href: 'https://www.facebook.com/profile.php?id=61590255645938', icon: FaFacebookF, label: 'Facebook' },
                      { href: 'https://www.youtube.com/@nakshathglobalsports', icon: FaYoutube, label: 'YouTube' },
                      { href: 'https://x.com/ngses_', icon: FaXTwitter, label: 'X' },
                      { href: 'https://in.pinterest.com/ngses/', icon: FaPinterestP, label: 'Pinterest' },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"
                        whileHover={{ y: -3 }}
                      >
                        <social.icon className="shrink-0 text-[#C9A227]" />
                        <span>{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="type-section-title mb-10 text-[#1A1A1A]">
                  <TextReveal text="Send us an enquiry." delay={0.4} />
                </h2>

                <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {[
                      { label: 'Full Name', name: 'firstName', type: 'text' },
                      { label: 'Phone Number', name: 'phone', type: 'tel' },
                    ].map((field, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }}
                      >
                        <label className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          className="w-full border-b border-[#1A1A1A] bg-transparent py-2 transition-colors focus:border-[#C9A227] focus:outline-none"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.7, duration: 0.7 }}
                  >
                    <label className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border-b border-[#1A1A1A] bg-transparent py-2 transition-colors focus:border-[#C9A227] focus:outline-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.8, duration: 0.7 }}
                  >
                    <label className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                      What is this about?
                    </label>
                    <div className="relative">
                      <select
                        name="topic"
                        className="w-full cursor-pointer appearance-none border-b border-[#1A1A1A] bg-transparent py-2 transition-colors focus:border-[#C9A227] focus:outline-none"
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
                      <span className="pointer-events-none absolute right-0 top-3 text-sm text-[#1A1A1A]">
                        ▾
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.9, duration: 0.7 }}
                  >
                    <label className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      className="w-full resize-none border-b border-[#1A1A1A] bg-transparent py-2 transition-colors focus:border-[#C9A227] focus:outline-none"
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 1, duration: 0.7 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 rounded-full bg-[#C9A227] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#0C0922] transition-colors hover:bg-white disabled:opacity-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin" /> Sending...
                        </>
                      ) : (
                        'Send Enquiry'
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.p
                          className="mt-4 text-sm font-medium text-green-600"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          Thank you! Your enquiry has been sent successfully.
                        </motion.p>
                      )}
                      {submitStatus === 'error' && (
                        <motion.p
                          className="mt-4 text-sm font-medium text-red-600"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          Failed to send. Please try again or contact us directly.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <p className="mt-4 text-sm text-[#5A5A66]">We reply within one working day.</p>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* GETTING HERE */}
          {/* ============================================================ */}
          <motion.div
            className="mb-24 w-full overflow-hidden rounded-3xl bg-[#0C0922]"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">

              {/* Map */}
              <motion.div
                className="w-full p-0 xl:p-10"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="h-[400px] w-full overflow-hidden md:h-[700px] xl:rounded-tl-[3rem]">
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
                </div>
              </motion.div>

              {/* Drive Times */}
              <motion.div
                className="flex flex-col justify-center p-6 md:p-16 lg:pr-24"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="mb-4 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  <span className="h-px w-8 bg-[#C9A227]" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                    Getting Here
                  </span>
                </motion.div>

                <h2 className="type-section-title mb-12 text-white">
                  <TextReveal text="Closer than you think." delay={0.5} />
                </h2>

                <div className="mb-4 flex items-center justify-between border-b border-[#C9A227]/35 pb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#C9A227]">
                  <span>Starting point</span>
                  <span className="pl-4 text-right">Approx. drive time</span>
                </div>

                <div className="space-y-5">
                  {driveTimes.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="group flex items-center justify-between gap-5 border-b border-white/10 pb-4 transition-colors hover:border-[#C9A227]/40"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 0.6 }}
                    >
                      <div className="min-w-0">
                        <h3 className="text-lg font-medium text-white transition-colors group-hover:text-[#C9A227]">
                          {item.location}
                        </h3>
                        <p className="text-sm font-normal text-white/50">{item.route}</p>
                      </div>
                      <span className="shrink-0 text-right text-base font-semibold text-white transition-colors group-hover:text-[#C9A227] md:text-lg">
                        {item.time}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="mt-8 text-xs text-white/40"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.4, duration: 0.7 }}
                >
                  Travel times are approximate and may vary depending on traffic conditions.
                </motion.p>

                <motion.a
                  href={BUSINESS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex w-max items-center gap-2 border-b border-[#C9A227] pb-1 text-sm font-medium text-[#C9A227] transition-colors hover:border-white hover:text-white"
                  whileHover={{ x: 4 }}
                >
                  Open in Maps
                  <motion.svg
                    width="14"
                    height="9"
                    viewBox="0 0 18 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* FAQ */}
          {/* ============================================================ */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
            >
              <span className="h-px w-8 bg-[#C9A227]" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                Questions
              </span>
            </motion.div>

            <h2 className="type-section-title mb-12 text-[#1A1A1A]">
              <TextReveal text="Before you ride." delay={0.2} />
            </h2>

            {/* Tabs */}
            <div className="faq-tabs-scrollbar mb-10 flex flex-nowrap gap-4 overflow-x-auto border-b border-[#5A5A66]/20 pb-4 md:justify-between md:gap-5 md:overflow-visible">
              {faqData.map((category, catIdx) => (
                <motion.button
                  key={catIdx}
                  onClick={() => setActiveTab(category.category)}
                  className={`shrink-0 whitespace-nowrap pb-1 text-[clamp(0.65rem,1.4vw,0.875rem)] font-bold uppercase tracking-[0.08em] transition-colors md:tracking-[0.12em] ${
                    activeTab === category.category
                      ? 'border-b-2 border-[#C9A227] text-[#C9A227]'
                      : 'text-[#5A5A66]/70 hover:text-[#1A1A1A]'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>

            {/* FAQ Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {faqData
                  .filter((cat) => cat.category === activeTab)
                  .map((category) => (
                    <div key={category.category}>
                      {category.questions.map((faq, idx) => (
                        <motion.div
                          key={faq.id}
                          className="border-b border-[#5A5A66]/20"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.06, duration: 0.5 }}
                        >
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[#C9A227]"
                          >
                            <span className="text-lg font-medium text-[#1A1A1A]">{faq.q}</span>
                            <span className="flex-shrink-0 text-xl text-[#C9A227]">
                              {openFaq === faq.id ? <FiMinus /> : <FiPlus />}
                            </span>
                          </button>
                          <AnimatePresence>
                            {openFaq === faq.id && (
                              <motion.div
                                className="overflow-hidden pb-5 text-[#5A5A66] font-normal leading-relaxed"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              >
                                {faq.a}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ============================================================ */}
          {/* NOT JUST LESSONS */}
          {/* ============================================================ */}
          <motion.div
            className="relative mx-auto w-full bg-[#0C0922] px-5 py-24 md:px-15 lg:left-1/2 lg:w-screen lg:-translate-x-1/2"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-7xl">
              <motion.div
                className="mb-4 flex items-center gap-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8 }}
              >
                <span className="h-px w-8 bg-[#C9A227]" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
                  Not Just Lessons
                </span>
              </motion.div>

              <div className="flex flex-col items-start gap-8 lg:flex-row">
                <h2 className="type-section-title leading-tight text-white">
                  <TextReveal text="Bring a group." delay={0.3} />
                </h2>
                <motion.p
                  className="max-w-md text-lg font-normal text-white/70 lg:pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  The arenas, the café and the grounds are open to groups as well as individual riders.
                </motion.p>
              </div>

              <div className="mb-12 mt-16 flex flex-wrap gap-x-10 gap-y-6">
                {['Corporate Days', 'School Visits', 'Group Sessions', 'Photoshoots', 'Guest Rides'].map((item, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => openEnquiry('Group Booking')}
                    className="font-serif text-xl text-white transition-colors hover:text-[#C9A227] md:text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: idx * 0.08, duration: 0.6 }}
                    whileHover={{ x: 6 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => openEnquiry('Group Booking')}
                className="group inline-flex items-center gap-2 border-b-2 border-[#C9A227] pb-1 text-sm font-medium text-white transition-colors hover:text-[#C9A227]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.6, duration: 0.7 }}
                whileHover={{ x: 4 }}
              >
                Enquire about group bookings
                <motion.svg
                  width="14"
                  height="9"
                  viewBox="0 0 18 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M0 5H16M16 5L12 1M16 5L12 9" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;