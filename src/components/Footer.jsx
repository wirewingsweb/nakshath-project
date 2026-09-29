import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF } from 'react-icons/fa';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { BUSINESS_MAP_URL } from '../constants/location';
import { useEnquiry } from '../context/EnquiryContext';
import { viewportOnce } from '../utils/animations';

const Footer = () => {
  const navigate = useNavigate();
  const { openEnquiry } = useEnquiry();

  // Stagger variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const socials = [
    { href: 'https://www.instagram.com/_ngses_/', label: 'Instagram', icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    )},
    { href: 'https://www.youtube.com/@nakshathglobalsports', label: 'YouTube', icon: (
      <svg width="30" height="28" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="1" y="3" width="26" height="18" rx="5"/>
        <path d="m11 8 7 4-7 4Z" fill="currentColor" stroke="none"/>
      </svg>
    )},
    { href: 'https://x.com/ngses_', label: 'X', icon: (
      <svg width="26" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 3 20 21M20 3 4 21"/>
      </svg>
    )},
    { href: 'https://www.facebook.com/profile.php?id=61590255645938', label: 'Facebook', icon: <FaFacebookF size={24} /> },
  ];

  return (
    <footer className="bg-[#0C0922] text-[#F5F1E8] font-sans">

      {/* ============================================================ */}
      {/* Trial CTA Section */}
      {/* ============================================================ */}
      <motion.section
        id="footer-trial-cta"
        className="relative w-full min-h-[32rem] overflow-hidden md:min-h-0 md:aspect-video"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/come-and-ride.webp"
          alt="A rider beginning a trial lesson"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/58 to-[#0C0922]/10" />

        {/* Golden light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.15) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['-150% 0%', '250% 0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute inset-0 z-10 flex items-center px-6 py-14 md:px-[6.2vw] md:py-0">
          <motion.div
            className="w-full max-w-[32rem] md:max-w-[44vw]"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={container}
          >
            <motion.h2
              className="font-serif text-[1.75rem] leading-[1.12] text-white md:text-[2.75rem]"
              variants={item}
            >
              Come and sit<br />on a horse.
            </motion.h2>

            <motion.p
              className="mt-5 max-w-[18rem] text-[0.95rem] leading-relaxed font-normal text-[#F5F1E8] md:mt-[2.2vw] md:max-w-none md:text-lg"
              variants={item}
            >
              Ten minutes, no charge, no obligation.
            </motion.p>

            <motion.button
              onClick={() => openEnquiry('Trial Ride')}
              className="type-button relative mt-7 w-full whitespace-nowrap rounded-full bg-[#C9A227] px-7 py-3.5 text-[#0C0922] shadow-lg transition-colors hover:bg-white sm:w-auto md:mt-[3.8vw] md:px-[3.6vw] md:py-[1.35vw]"
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Your Trial Ride

              {/* Luxury Golden Glow Pulse */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(201,162,39,0)',
                    '0 0 22px 3px rgba(201,162,39,0.6)',
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
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* Main Footer Content */}
      {/* ============================================================ */}
      <motion.div
        className="px-6 pb-10 pt-16 md:px-10 md:pb-14 md:pt-20 xl:min-h-[43.7vw] xl:px-[5.9vw] xl:pb-[4.8vw] xl:pt-[7.2vw]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={container}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14 xl:grid-cols-[28%_18%_25%_29%] xl:gap-0">

          {/* Logo Column */}
          <motion.div variants={item}>
            <Link to="/" className="inline-block">
              <motion.img
                src="/footer-logo-matched.webp"
                alt="Nakshath Global Sports"
                loading="lazy"
                decoding="async"
                className="w-64 object-contain md:w-56 xl:w-[17vw]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <p className="mt-6 w-full text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:mt-[1.8vw]">
              Promoted and managed by Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd
            </p>
          </motion.div>

          {/* Explore */}
          <motion.nav aria-label="Explore" variants={item}>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Explore
            </h3>
            <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/horses', label: 'Horses' },
                { to: '/courses', label: 'Courses' },
                { to: '/trainers', label: 'Trainers' },
                { to: '/facilities', label: 'Facilities' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-[#C9A227]"
                  >
                    <span className="h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Programmes */}
          <motion.nav aria-label="Programmes" variants={item}>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Programmes
            </h3>
            <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
              {[
                { to: '/courses', label: 'Beginner' },
                { to: '/courses', label: 'Intermediate' },
                { to: '/courses', label: 'Kids Special' },
                { to: '/courses', label: 'Professional Competition' },
                { to: '/courses', label: 'International Clinics' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-[#C9A227]"
                  >
                    <span className="h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Visit */}
          <motion.div variants={item}>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Visit
            </h3>
            <div className="space-y-5 text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:space-y-[1.6vw]">

              {/* Address */}
              <motion.a
                href={BUSINESS_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <FiMapPin className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <span>
                  Inside BEML Cooperative Society<br />
                  S. Medahalli, Sarjapura<br />
                  Bengaluru, Karnataka 562107
                </span>
              </motion.a>

              {/* Phone + Email */}
              <div className="space-y-2.5">
                <motion.a
                  href="tel:+918460846946"
                  className="flex items-center gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiPhone className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>8460 846 946</span>
                </motion.a>

                <motion.a
                  href="mailto:enquiry@ngses.in"
                  className="flex items-center gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiMail className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>enquiry@ngses.in</span>
                </motion.a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <p>Tuesday–Saturday: Open<br />Monday: Closed</p>
              </div>

              {/* Socials */}
              <div className="flex gap-7 pt-1 text-[#F5F1E8]">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="transition-colors hover:text-[#C9A227]"
                    whileHover={{ y: -4, scale: 1.15 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* Bottom Bar */}
        {/* ============================================================ */}
        <motion.div
          className="mt-14 flex flex-col gap-5 border-t border-white/20 pt-7 text-xs leading-relaxed text-[#F5F1E8] md:mt-[5vw] md:flex-row md:items-center md:justify-between md:pt-[2.5vw]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p>© 2026 Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd</p>
          <div className="flex flex-wrap gap-6 md:gap-[3vw]">
            {[
              { to: '/privacy-policy', label: 'Privacy Policy' },
              { to: '/terms-and-conditions', label: 'Terms & Conditions' },
              { to: '/refund-and-cancellation', label: 'Refund & Cancellation' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative transition-colors hover:text-[#C9A227]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;