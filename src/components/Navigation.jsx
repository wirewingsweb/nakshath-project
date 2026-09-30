import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiry } from '../context/EnquiryContext';
import { BUSINESS_MAP_URL } from '../constants/location';
import { stopScroll, startScroll } from '../lib/smoothScroll';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterCtaVisible, setIsFooterCtaVisible] = useState(false);
  const { openEnquiry } = useEnquiry();
  const location = useLocation();

  /* ============================================================
     Detect whether we've scrolled past the hero
     (drives nav solid / transparent state)
     ============================================================ */
  useEffect(() => {
    let frameId;

    const updateNavbar = () => {
      frameId = window.requestAnimationFrame(() => {
        const darkHero = document.querySelector('.nav-dark-hero');

        if (darkHero) {
          const navHeight =
            document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
          setIsPastHero(darkHero.getBoundingClientRect().bottom <= navHeight);
          return;
        }

        setIsPastHero(location.pathname !== '/');
      });
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateNavbar);
      window.removeEventListener('resize', updateNavbar);
    };
  }, [location.pathname]);

  /* ============================================================
     Hide mobile trial-ride tab when a footer CTA is visible
     ============================================================ */
  useEffect(() => {
    const exclusionZones = Array.from(
      document.querySelectorAll('#footer-trial-cta, .mobile-cta-exclusion')
    );
    if (!exclusionZones.length) return undefined;

    const visibleZones = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleZones.add(entry.target);
          else visibleZones.delete(entry.target);
        });
        setIsFooterCtaVisible(visibleZones.size > 0);
      },
      { threshold: 0.08 }
    );

    exclusionZones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, [location.pathname]);

  /* ============================================================
     Lock scroll when the menu is open
     - Body overflow: keeps non-Lenis devices (and reduced-motion) locked
     - Lenis stop/start: actually halts the Lenis RAF loop
     ============================================================ */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      stopScroll();
    } else {
      document.body.style.overflow = previousOverflow || '';
      startScroll();
    }

    return () => {
      document.body.style.overflow = previousOverflow || '';
      startScroll();
    };
  }, [isMenuOpen]);

  const menuLinks = [
    { to: '/', label: 'HOME', isActive: true },
    { to: '/about', label: 'ABOUT US' },
    { to: '/horses', label: 'HORSES' },
    { to: '/courses', label: 'COURSES' },
    { to: '/trainers', label: 'TRAINERS' },
    { to: '/facilities', label: 'FACILITIES' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <div className="relative w-full">
      {/* ====== STANDARD NAVBAR ====== */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-2 sm:px-6 md:px-10 md:py-3 transition-[background-color,box-shadow,border-color] duration-500 ease-out ${
          isPastHero
            ? 'border-b border-white/15 bg-white/25 backdrop-blur-2xl shadow-[0_2px_20px_rgba(12,9,34,0.04)] text-[#0C0922]'
            : 'border-b border-transparent bg-transparent text-white'
        }`}
      >
        {/* Gold underline — draws in when past hero */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: isPastHero ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '0% 50%' }}
          className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#C9A227]/0 via-[#C9A227]/70 to-[#C9A227]/0"
        />

        {/* ===== ANIMATED HAMBURGER ===== */}
        <motion.button
          onClick={() => setIsMenuOpen(true)}
          whileHover="hover"
          whileTap="tap"
          className="group relative flex items-center gap-3 text-lg font-sans uppercase tracking-widest hover:text-[#C9A227] transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <motion.span
            variants={{
              hover: { scale: 1.15, rotate: -3 },
              tap: { scale: 0.9 },
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-7 w-7 flex-col items-center justify-center"
          >
            <motion.span
              variants={{ hover: { x: 3, width: 24 } }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1.5 h-[2px] w-6 rounded-full bg-current"
            />
            <motion.span
              variants={{ hover: { width: 16, opacity: 0.7 } }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 h-[2px] w-6 -translate-y-1/2 rounded-full bg-current"
            />
            <motion.span
              variants={{ hover: { x: -3, width: 24 } }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-1.5 h-[2px] w-6 rounded-full bg-current"
            />
          </motion.span>

          <motion.span
            variants={{ hover: { x: 3 }, tap: { x: 0 } }}
            transition={{ duration: 0.3 }}
            className="hidden sm:block"
          >
            Menu
          </motion.span>
        </motion.button>

        {/* Navbar Logo */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src="/nakshath logo head.webp"
            alt="Nakshath Logo"
            className={`object-contain transition-all duration-500 ${
              isPastHero ? 'h-12 sm:h-14 md:h-16' : 'h-16 sm:h-20 md:h-24'
            }`}
          />
        </Link>

        {/* Book Trial Ride — Desktop */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={openEnquiry}
          className={`hidden rounded-full border px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors md:inline-flex ${
            isPastHero
              ? 'border-[#C9A227] bg-transparent text-[#0C0922] hover:bg-[#C9A227] hover:text-[#0C0922]'
              : 'border-[#C9A227] bg-transparent text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0922]'
          }`}
        >
          Book a Trial Ride
        </motion.button>
      </motion.nav>

      {/* Mobile trial-ride tab */}
      <motion.button
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: isMenuOpen || isFooterCtaVisible ? 100 : 0,
          opacity: isMenuOpen || isFooterCtaVisible ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        onClick={openEnquiry}
        aria-label="Book a Trial Ride"
        className={`fixed right-0 top-[54%] z-[45] flex min-h-24 w-10 -translate-y-1/2 items-center justify-center rounded-l-md border border-r-0 border-[#C9A227] bg-[#C9A227] px-2 py-4 text-[#0C0922] shadow-[-4px_6px_18px_rgba(12,9,34,0.24)] md:hidden ${
          isMenuOpen || isFooterCtaVisible ? 'pointer-events-none' : ''
        }`}
      >
        <span className="rotate-180 text-[0.625rem] font-bold uppercase leading-none tracking-[0.06em] [writing-mode:vertical-rl]">
          Book a Trial Ride
        </span>
      </motion.button>

      {/* ====== FULLSCREEN OVERLAY MENU ====== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="nav-overlay fixed inset-0 h-dvh bg-[#0C0922] z-[100] flex flex-col overflow-y-auto overscroll-contain"
          >
            {/* Gold sweep on open */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-[#C9A227]/10 to-transparent"
            />

            {/* CLOSE BUTTON */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute top-5 left-5 md:top-12 md:left-12 z-20"
            >
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                whileHover="hover"
                whileTap="tap"
                className="group flex items-center gap-2 text-white text-sm tracking-widest uppercase hover:text-[#C9A227] transition-colors"
                aria-label="Close menu"
              >
                <motion.span
                  variants={{
                    hover: { rotate: 90, scale: 1.15 },
                    tap: { rotate: 180, scale: 0.9 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-7 w-7 items-center justify-center"
                >
                  <FiX size={28} />
                </motion.span>
                <motion.span
                  variants={{ hover: { x: 3 }, tap: { x: 0 } }}
                  transition={{ duration: 0.3 }}
                >
                  Close
                </motion.span>
              </motion.button>
            </motion.div>

            {/* LOGO HEADER */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="relative z-10 flex w-full shrink-0 flex-col items-center justify-center pb-2 pt-14 md:pb-5 md:pt-7"
            >
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src="/nakshath logo head.webp"
                  alt="Nakshath Logo"
                  className="h-24 object-contain md:h-28"
                />
              </Link>
            </motion.div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-9 px-5 pb-8 text-white md:flex-row md:gap-24 md:px-20 md:pb-6">
              {/* LEFT - Menu Links */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.45 },
                  },
                }}
                className="flex w-full flex-col justify-center space-y-3.5 pl-0 md:w-1/2 md:space-y-5 md:pl-8"
              >
                {menuLinks.map((item) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      hidden: { opacity: 0, x: -40 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={
                        item.isActive
                          ? 'w-max border-b border-[#C9A227] pb-2 font-sans text-lg font-semibold text-[#C9A227] md:text-xl inline-block transition-transform hover:translate-x-2 duration-300'
                          : 'font-sans text-base font-medium text-white/80 transition-all duration-300 hover:text-[#C9A227] hover:translate-x-2 md:text-lg inline-block'
                      }
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="pt-2 md:pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      openEnquiry();
                    }}
                    className="w-max rounded-full border border-[#C9A227] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-[#0C0922]"
                  >
                    Book a Trial Ride
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* RIGHT - Info */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex w-full flex-col justify-center space-y-6 border-t border-white/20 pt-8 font-sans text-sm tracking-wide text-white/80 md:w-[42%] md:space-y-6 md:border-l md:border-t-0 md:pl-16 md:pt-0"
              >
                <div>
                  <h4 className="text-[#C9A227] text-xs uppercase font-bold mb-2 tracking-[0.1em]">
                    Visit Us
                  </h4>
                  <a
                    href={BUSINESS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[13px] leading-relaxed text-white/70 no-underline transition-colors hover:text-[#C9A227]"
                  >
                    Inside BEML Cooperative Society
                    <br />
                    S. Medahalli, Sarjapura
                    <br />
                    Bengaluru, Karnataka 562107
                  </a>
                </div>

                <div>
                  <h4 className="text-[#C9A227] text-xs uppercase font-bold mb-2 tracking-[0.1em]">
                    Contact
                  </h4>
                  <p className="text-white/70 text-[13px]">
                    8460 846 946
                    <br />
                    enquiry@ngses.in
                  </p>
                </div>

                <div>
                  <h4 className="text-[#C9A227] text-xs uppercase font-bold mb-2 tracking-[0.1em]">
                    Hours
                  </h4>
                  <p className="text-white/70 text-[13px]">
                    Tuesday–Saturday: Open
                    <br />
                    Monday: Closed
                  </p>
                </div>

                <div className="flex gap-6 pt-2 flex-wrap">
                  <motion.a
                    whileHover={{ scale: 1.2, color: '#C9A227', y: -3 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.instagram.com/_ngses_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, color: '#C9A227', y: -3 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.youtube.com/@nakshathglobalsports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, color: '#C9A227', y: -3 }}
                    transition={{ duration: 0.2 }}
                    href="https://in.pinterest.com/ngses/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.65 0-5.79 2.737-5.79 5.568 0 1.105.424 2.287.955 2.934.105.126.12.235.089.358-.06.246-.195.792-.222.904-.07.299-.286.364-.515.222-1.915-1.068-3.114-2.703-3.114-4.787 0-3.157 2.505-6.674 7.662-6.674 4.019 0 6.664 2.869 6.664 6.63 0 4.358-2.748 7.804-6.459 7.804-1.261 0-2.448-.655-2.855-1.426l-.778 2.961c-.281 1.084-1.068 2.452-1.59 3.281C9.535 23.879 10.742 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, color: '#C9A227', y: -3 }}
                    transition={{ duration: 0.2 }}
                    href="https://x.com/ngses_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, color: '#C9A227', y: -3 }}
                    transition={{ duration: 0.2 }}
                    href="https://www.facebook.com/profile.php?id=61590255645938"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <FaFacebookF size={22} />
                  </motion.a>
                </div>

                <div className="pt-2">
                  <motion.a
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    href="/nakshath Final Brochure.pdf"
                    download="Nakshath-Brochure.pdf"
                    className="flex items-center gap-2 text-white/60 text-xs font-medium uppercase tracking-widest hover:text-[#C9A227] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Brochure
                  </motion.a>
                </div>

                <div className="pt-6">
                  <p className="type-caption font-sans tracking-wide text-white/50">
                    Nakshath Equestrian Club
                    <br />
                    Promoted and managed by
                    <br />
                    Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Footer Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="type-caption relative z-10 border-t border-white/10 p-6 text-white/50"
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end">
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Terms &amp; Conditions
                </Link>
                <Link
                  to="/refund-and-cancellation"
                  className="hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Refund &amp; Cancellation
                </Link>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;