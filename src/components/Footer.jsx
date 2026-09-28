// src/components/Footer.jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF } from 'react-icons/fa';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { BUSINESS_MAP_URL } from '../constants/location';
import { useEnquiry } from '../context/EnquiryContext';
import { FadeUp, ImageReveal } from './motion';
import { EASE_PRIMARY, DURATION, VIEWPORT } from '../utils/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../hooks/useInViewOnce';
import ShinyText from './ShinyText';

// ─── Per-element animation props (no variants, no inheritance) ───
//
// Why not variants: the columns grid parent previously used
// `columnsContainerVariants` with `hidden: {}`. Framer Motion writes no
// inline style for an empty variant, which means the parent never enters
// a variant-managed state — so children relying on inherited variant
// labels never received `"hidden"`. Result: columns rendered with no
// animation at all (confirmed via diagnostic: parent inline style = null).
//
// Fix: drop variant inheritance. Each column reads `columnsInView`
// directly and applies its own explicit initial/animate. Stagger is
// achieved with a per-child `delay` instead of `staggerChildren`.

const columnMotion = (inView, prefersReduced, delay = 0) => {
  const hidden = { opacity: 0, y: prefersReduced ? 0 : 15 };
  const visible = { opacity: 1, y: 0 };
  return {
    initial: prefersReduced ? false : hidden,
    animate: inView ? visible : hidden,
    transition: {
      duration: prefersReduced ? 0 : DURATION.normal,
      ease: EASE_PRIMARY,
      delay: prefersReduced ? 0 : delay,
    },
  };
};

const bottomRowMotion = (inView, prefersReduced) => {
  const hidden = { opacity: 0, y: prefersReduced ? 0 : 8 };
  const visible = { opacity: 1, y: 0 };
  return {
    initial: prefersReduced ? false : hidden,
    animate: inView ? visible : hidden,
    transition: {
      duration: prefersReduced ? 0 : DURATION.small,
      ease: EASE_PRIMARY,
      delay: prefersReduced ? 0 : 0.15,
    },
  };
};

// ─── Component ───────────────────────────────────────────────

const Footer = () => {
  const { openEnquiry } = useEnquiry();
  const prefersReduced = usePrefersReducedMotion();
  const location = useLocation();

  // Trigger columns stagger when they enter view
  const [columnsRef, columnsInView] = useInViewOnce({ amount: 0.15 });

  // Trigger bottom row separately with a slight delay
  const [bottomRef, bottomInView] = useInViewOnce({ amount: 0.3 });

  return (
    <footer className="bg-[#0C0922] font-sans text-[#F5F1E8]">

      {/* ═══════════════════════════════════════════════════════
          ZONE 1 — Cinematic closing CTA
          ═══════════════════════════════════════════════════════ */}
      <section
        id="footer-trial-cta"
        className="relative min-h-[32rem] w-full overflow-hidden md:aspect-video md:min-h-0"
      >
        <ImageReveal
          cinematic
          amount={0.15}
          once
          className="absolute inset-0"
        >
          <img
            src="/come and ride.png"
            alt="A rider beginning a trial lesson"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[68%_center] md:object-center"
          />
        </ImageReveal>

        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/58 to-[#0C0922]/10" />

        <div className="absolute inset-0 z-10 flex items-center px-6 py-14 md:px-[6.2vw] md:py-0">
          <div className="w-full max-w-[32rem] md:max-w-[44vw]">
            <FadeUp
  as="h2"
  size="heading"
  delay={0.15}
  duration={0.75}
  amount={0.15}
  className="font-serif text-[1.75rem] leading-[1.12] md:text-[2.75rem]"
>
  <ShinyText
    text="Come and sit"
    speed={3}
    color="#C9A227"
    shineColor="#FFF8DC"
    spread={100}
  />
  <br />
  <ShinyText
    text="on a horse."
    speed={3}
    color="#C9A227"
    shineColor="#FFF8DC"
    spread={100}
  />
</FadeUp>

            <FadeUp
              as="p"
              size="subtitle"
              delay={0.35}
              duration={0.5}
              amount={0.15}
              className="mt-5 max-w-[18rem] text-[0.95rem] font-normal leading-relaxed text-[#F5F1E8] md:mt-[2.2vw] md:max-w-none md:text-lg"
            >
              Ten minutes, no charge, no obligation.
            </FadeUp>

            <FadeUp
              size="cta"
              delay={0.5}
              duration={0.55}
              amount={0.15}
              className="mt-7 w-full sm:w-auto md:mt-[3.8vw]"
            >
              <motion.button
                onClick={() => openEnquiry('Trial Ride')}
                whileHover={prefersReduced ? undefined : { y: -1 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="type-button w-full whitespace-nowrap rounded-full bg-[#C9A227] px-7 py-3.5 text-[#0C0922] shadow-lg transition-colors hover:bg-white hover:shadow-xl sm:w-auto md:px-[3.6vw] md:py-[1.35vw]"
              >
                Book Your Trial Ride
              </motion.button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ZONE 2 — Footer body
          ═══════════════════════════════════════════════════════ */}
      <div className="px-6 pb-10 pt-16 md:px-10 md:pb-14 md:pt-20 xl:min-h-[43.7vw] xl:px-[5.9vw] xl:pb-[4.8vw] xl:pt-[7.2vw]">

        {/* Columns — plain div wrapper; each column animates itself */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14 xl:grid-cols-[28%_18%_25%_29%] xl:gap-0"
        >
          {/* Column 1 — Logo + tagline */}
          <motion.div {...columnMotion(columnsInView, prefersReduced, 0)}>
            <Link to="/" className="inline-block">
              <img
                src="/footer-logo-matched.png"
                alt="Nakshath Global Sports"
                loading="lazy"
                decoding="async"
                className="w-64 object-contain md:w-56 xl:w-[17vw]"
              />
            </Link>
            <p className="mt-6 w-full text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:mt-[1.8vw]">
              Promoted and managed by Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd
            </p>
          </motion.div>

          {/* Column 2 — Explore */}
          <motion.nav
            aria-label="Explore"
            {...columnMotion(columnsInView, prefersReduced, 0.08)}
          >
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Explore
            </h3>
            <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/horses">Horses</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/trainers">Trainers</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.nav>

          {/* Column 3 — Programmes */}
          <motion.nav
            aria-label="Programmes"
            {...columnMotion(columnsInView, prefersReduced, 0.16)}
          >
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Programmes
            </h3>
            <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
              <li><Link to="/courses">Beginner</Link></li>
              <li><Link to="/courses">Intermediate</Link></li>
              <li><Link to="/courses">Kids Special</Link></li>
              <li><Link to="/courses">Professional Competition</Link></li>
              <li><Link to="/courses">International Clinics</Link></li>
            </ul>
          </motion.nav>

          {/* Column 4 — Visit + Contact + Socials */}
          <motion.div {...columnMotion(columnsInView, prefersReduced, 0.24)}>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">
              Visit
            </h3>
            <div className="space-y-5 text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:space-y-[1.6vw]">
              <a
                href={BUSINESS_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]"
              >
                <FiMapPin className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <span>
                  Inside BEML Cooperative Society
                  <br />
                  S. Medahalli, Sarjapura
                  <br />
                  Bengaluru, Karnataka 562107
                </span>
              </a>
              <div className="space-y-2.5">
                <a
                  href="tel:+918460846946"
                  className="flex items-center gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]"
                >
                  <FiPhone className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>8460 846 946</span>
                </a>
                <a
                  href="mailto:enquiry@ngses.in"
                  className="flex items-center gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]"
                >
                  <FiMail className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>enquiry@ngses.in</span>
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <p>
                  Tuesday–Saturday: Open
                  <br />
                  Monday: Closed
                </p>
              </div>
              <div className="flex gap-7 pt-1 text-[#F5F1E8]">
                <a
                  href="https://www.instagram.com/_ngses_/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="transition-colors hover:text-[#C9A227]"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@nakshathglobalsports"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="transition-colors hover:text-[#C9A227]"
                >
                  <svg width="30" height="28" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="1" y="3" width="26" height="18" rx="5" />
                    <path d="m11 8 7 4-7 4Z" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://x.com/ngses_"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="transition-colors hover:text-[#C9A227]"
                >
                  <svg width="26" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M4 3 20 21M20 3 4 21" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590255645938"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-7 w-7 items-center justify-center transition-colors hover:text-[#C9A227]"
                >
                  <FaFacebookF size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row — copyright + legal links */}
        <motion.div
          ref={bottomRef}
          className="mt-14 flex flex-col gap-5 border-t border-white/20 pt-7 text-xs leading-relaxed text-[#F5F1E8] md:mt-[5vw] md:flex-row md:items-center md:justify-between md:pt-[2.5vw]"
          {...bottomRowMotion(bottomInView, prefersReduced)}
        >
          <p>© 2026 Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd</p>
          <div className="flex flex-wrap gap-6 md:gap-[3vw]">
            <Link to="/privacy-policy" className="transition-colors hover:text-[#C9A227]">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-[#C9A227]">
              Terms &amp; Conditions
            </Link>
            <Link to="/refund-and-cancellation" className="transition-colors hover:text-[#C9A227]">
              Refund &amp; Cancellation
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;