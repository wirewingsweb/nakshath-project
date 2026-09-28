import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { BUSINESS_MAP_URL } from '../constants/location';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   LINK — with drawing underline on hover
   ============================================================ */
const FLink = ({ to, children, external, href, onClick }) => {
  const inner = (
    <span className="relative inline-block">
      <span className="transition-colors duration-500 group-hover/flink:text-[#C9A227]">
        {children}
      </span>
      {/* Underline — draws from left on hover */}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A227] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flink:scale-x-100" />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/flink inline-flex items-center gap-3 text-inherit no-underline"
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group/flink inline-block text-inherit no-underline"
    >
      {inner}
    </Link>
  );
};

/* ============================================================
   COLUMN — quiet staggered entrance
   ============================================================ */
const Column = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = () => {
  const navigate = useNavigate();
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.05 });

  return (
    <footer className="bg-[#0C0922] font-sans text-[#F5F1E8]">

      {/* ==================================================
          TRIAL CTA SECTION
          ================================================== */}
      <section
        ref={ctaRef}
        id="footer-trial-cta"
        className="relative w-full min-h-[32rem] overflow-hidden md:aspect-video md:min-h-0"
      >
        {/* Image — quiet scale settle, no brightness tricks */}
        <motion.img
          src="/come and ride.webp"
          alt="A rider beginning a trial lesson"
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.08 }}
          animate={ctaInView ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/58 to-[#0C0922]/10" />

        <div className="absolute inset-0 z-10 flex items-center px-6 py-14 md:px-[6.2vw] md:py-0">
          <div className="w-full max-w-[32rem] md:max-w-[44vw]">
            {/* Title — quiet fade + rise */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className="font-serif text-[1.75rem] leading-[1.12] text-white md:text-[2.75rem]"
            >
              Come and sit<br />on a horse.
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.45, ease: EASE }}
              className="mt-5 max-w-[18rem] text-[0.95rem] font-normal leading-relaxed text-[#F5F1E8] md:mt-[2.2vw] md:max-w-none md:text-lg"
            >
              Ten minutes, no charge, no obligation.
            </motion.p>

            {/* CTA Button — with hover glow pulse on the shadow */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.65, ease: EASE }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/enquiry')}
              className="type-button mt-7 w-full whitespace-nowrap rounded-full bg-[#C9A227] px-7 py-3.5 text-[#0C0922] shadow-lg transition-shadow duration-500 hover:bg-white hover:shadow-[0_15px_40px_-10px_rgba(201,162,39,0.6)] sm:w-auto md:mt-[3.8vw] md:px-[3.6vw] md:py-[1.35vw]"
            >
              Book Your Trial Ride
            </motion.button>
          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN FOOTER CONTENT
          ================================================== */}
      <div
        ref={footerRef}
        className="px-6 pb-10 pt-16 md:px-10 md:pb-14 md:pt-20 xl:min-h-[43.7vw] xl:px-[5.9vw] xl:pb-[4.8vw] xl:pt-[7.2vw]"
      >
        {/* Top gold rule — draws across as footer enters */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={footerInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          className="mb-14 h-px w-full origin-left bg-gradient-to-r from-[#C9A227]/40 via-[#C9A227]/20 to-transparent md:mb-[5vw]"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14 xl:grid-cols-[28%_18%_25%_29%] xl:gap-0">

          {/* ==================================================
              Column 1 — Logo + Tagline
              ================================================== */}
          <Column delay={0.3}>
            <Link to="/" className="inline-block">
              <img
                src="/footer-logo-matched.webp"
                alt="Nakshath Global Sports"
                loading="lazy"
                decoding="async"
                className="w-64 object-contain md:w-56 xl:w-[17vw]"
              />
            </Link>
            <p className="mt-6 w-full text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:mt-[1.8vw]">
              Promoted and managed by Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd
            </p>
          </Column>

          {/* ==================================================
              Column 2 — Explore
              ================================================== */}
          <Column delay={0.45}>
            <nav aria-label="Explore">
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
                ].map(({ to, label }) => (
                  <li key={to}>
                    <FLink to={to}>{label}</FLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>

          {/* ==================================================
              Column 3 — Programmes
              ================================================== */}
          <Column delay={0.6}>
            <nav aria-label="Programmes">
              <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
                Programmes
              </h3>
              <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
                {[
                  'Beginner',
                  'Intermediate',
                  'Kids Special',
                  'Professional Competition',
                  'International Clinics',
                ].map((label) => (
                  <li key={label}>
                    <FLink to="/courses">{label}</FLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>

          {/* ==================================================
              Column 4 — Visit
              ================================================== */}
          <Column delay={0.75}>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Visit
            </h3>
            <div className="space-y-5 text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:space-y-[1.6vw]">

              {/* Address */}
              <FLink external href={BUSINESS_MAP_URL}>
                <span className="flex items-start gap-3">
                  <FiMapPin className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>
                    Inside BEML Cooperative Society<br />
                    S. Medahalli, Sarjapura<br />
                    Bengaluru, Karnataka 562107
                  </span>
                </span>
              </FLink>

              {/* Phone + Email */}
              <div className="space-y-2.5">
                <FLink external href="tel:+918460846946">
                  <span className="flex items-center gap-3">
                    <FiPhone className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>8460 846 946</span>
                  </span>
                </FLink>
                <FLink external href="mailto:enquiry@ngses.in">
                  <span className="flex items-center gap-3">
                    <FiMail className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>enquiry@ngses.in</span>
                  </span>
                </FLink>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <p>
                  Tuesday–Saturday: Open<br />
                  Monday: Closed
                </p>
              </div>

              {/* Social icons — subtle scale + color on hover, no bob */}
              <div className="flex gap-7 pt-1 text-[#F5F1E8]">
                <motion.a
                  whileHover={{ scale: 1.12, color: '#C9A227' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  href="https://www.instagram.com/_ngses_/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12, color: '#C9A227' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  href="https://www.youtube.com/@nakshathglobalsports"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <svg width="30" height="28" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="1" y="3" width="26" height="18" rx="5" />
                    <path d="m11 8 7 4-7 4Z" fill="currentColor" stroke="none" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12, color: '#C9A227' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  href="https://x.com/ngses_"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                >
                  <svg width="26" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M4 3 20 21M20 3 4 21" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.12, color: '#C9A227' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  href="https://www.facebook.com/profile.php?id=61590255645938"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-7 w-7 items-center justify-center"
                >
                  <FaFacebookF size={24} />
                </motion.a>
              </div>
            </div>
          </Column>
        </div>

        {/* ==================================================
            BOTTOM BAR
            ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
          className="mt-14 flex flex-col gap-5 border-t border-white/20 pt-7 text-xs leading-relaxed text-[#F5F1E8] md:mt-[5vw] md:flex-row md:items-center md:justify-between md:pt-[2.5vw]"
        >
          <p>© 2026 Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd</p>
          <div className="flex flex-wrap gap-6 md:gap-[3vw]">
            <FLink to="/privacy-policy">Privacy Policy</FLink>
            <FLink to="/terms-and-conditions">Terms &amp; Conditions</FLink>
            <FLink to="/refund-and-cancellation">Refund &amp; Cancellation</FLink>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;