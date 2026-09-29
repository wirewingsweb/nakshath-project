import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { useEnquiry } from '../context/EnquiryContext';
import { BUSINESS_MAP_URL } from '../constants/location';

// ============================================================
// SIMPLE BUTTON — Clean hover fill
// ============================================================
const SimpleButton = ({ text, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="hidden rounded-full border border-[#C9A227] px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A227] transition-colors duration-300 hover:bg-[#C9A227] hover:text-[#0C0922] md:inline-flex"
    >
      {text}
    </motion.button>
  );
};

// ============================================================
// MAIN NAVIGATION
// ============================================================
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterCtaVisible, setIsFooterCtaVisible] = useState(false);
  const { openEnquiry } = useEnquiry();
  const location = useLocation();

  useEffect(() => {
    let frameId;

    const updateNavbar = () => {
      frameId = window.requestAnimationFrame(() => {
        const darkHero = document.querySelector('.nav-dark-hero');

        if (darkHero) {
          const navHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
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

  useEffect(() => {
    const exclusionZones = Array.from(document.querySelectorAll('#footer-trial-cta, .mobile-cta-exclusion'));
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
      { threshold: 0.08 },
    );

    exclusionZones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <div className="relative w-full">

      {/* ====== Standard Navbar ====== */}
      <nav className={`fixed left-0 top-0 z-50 flex min-h-[4.375rem] w-full items-center justify-between px-6 py-2 transition-[background-color,box-shadow,color] duration-300 sm:min-h-[5.375rem] md:min-h-[6.375rem] md:px-12 md:py-3 ${
        isPastHero ? 'bg-white text-[#0C0922] shadow-[0_1px_18px_rgba(11,12,26,0.10)]' : 'bg-transparent text-white'
      }`}>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-2 text-lg font-sans uppercase tracking-widest hover:text-[#C9A227] transition-colors cursor-pointer"
        >
          <FiMenu size={28} />
          <span className="hidden sm:block">Menu</span>
        </button>

        {/* Navbar Logo */}
        <Link to="/" className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <img src="/nakshath-logo-head.webp" alt="Nakshath Logo" className="h-16 object-contain sm:h-20 md:h-24" />
        </Link>

        {/* Simple Button */}
        <SimpleButton onClick={openEnquiry} text="Book a Trial Ride" />
      </nav>

      {/* Mobile trial-ride tab */}
      <button
        onClick={openEnquiry}
        aria-label="Book a Trial Ride"
        className={`fixed right-0 top-[54%] z-[45] flex min-h-24 w-10 -translate-y-1/2 items-center justify-center rounded-l-md border border-r-0 border-[#C9A227] bg-[#C9A227] px-2 py-4 text-[#0C0922] shadow-[-4px_6px_18px_rgba(12,9,34,0.24)] transition-[transform,opacity,background-color] duration-300 hover:bg-[#F5F1E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 md:hidden ${
          isMenuOpen || isFooterCtaVisible ? 'pointer-events-none translate-x-full opacity-0' : 'opacity-100'
        }`}
      >
        <span className="rotate-180 text-[0.625rem] font-bold uppercase leading-none tracking-[0.06em] [writing-mode:vertical-rl]">
          Book a Trial Ride
        </span>
      </button>


      {/* ====== FULLSCREEN OVERLAY MENU ====== */}
      <div
        className={`nav-overlay fixed inset-0 h-dvh bg-[#0C0922] z-[100] flex flex-col transition-transform duration-500 ease-in-out overflow-y-auto overscroll-contain ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* CLOSE BUTTON */}
        <div className="absolute top-5 left-5 md:top-12 md:left-12 z-20">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-1 text-white text-sm tracking-widest uppercase hover:text-[#C9A227] transition-colors"
          >
            <FiX size={28} />
            Close
          </button>
        </div>

        {/* LOGO HEADER */}
        <div className="relative z-10 flex w-full shrink-0 flex-col items-center justify-center pb-2 pt-14 md:pb-5 md:pt-7">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src="/nakshath-logo-head.webp" alt="Nakshath Logo" className="h-24 object-contain md:h-28" />
          </Link>
        </div>

        {/* ====== MAIN 2-COLUMN CONTENT ====== */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-9 px-5 pb-8 text-white md:flex-row md:gap-24 md:px-20 md:pb-6">

          {/* ====== LEFT DIV (Menu Links) ====== */}
          <div className="flex w-full flex-col justify-center space-y-3.5 pl-0 md:w-1/2 md:space-y-5 md:pl-8">

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="w-max border-b border-[#C9A227] pb-2 font-sans text-lg font-semibold text-[#C9A227] md:text-xl">HOME</Link>

            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 transition-colors hover:text-[#C9A227] md:text-lg">ABOUT US</Link>
            <Link to="/horses" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 transition-colors hover:text-[#C9A227] md:text-lg">HORSES</Link>
            <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 transition-colors hover:text-[#C9A227] md:text-lg">COURSES</Link>
            <Link to="/trainers" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 transition-colors hover:text-[#C9A227] md:text-lg">TRAINERS</Link>
            <Link to="/facilities" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 transition-colors hover:text-[#C9A227] md:text-lg">FACILITIES</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-sans text-base font-medium text-white/80 transition-colors hover:text-[#C9A227] md:text-lg">CONTACT</Link>

            {/* Menu Overlay Button - Opens Modal */}
            <div className="pt-2 md:pt-4">
              <button
                onClick={() => { setIsMenuOpen(false); openEnquiry(); }}
                className="w-max rounded-full border border-[#C9A227] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-[#0C0922]"
              >
                Book a Trial Ride
              </button>
            </div>
          </div>

          {/* ====== RIGHT DIV (Info, Socials) ====== */}
          <div className="flex w-full flex-col justify-center space-y-6 border-t border-white/20 pt-8 font-sans text-sm tracking-wide text-white/80 md:w-[42%] md:space-y-6 md:border-l md:border-t-0 md:pl-16 md:pt-0">

             {/* Visit Us */}
             <div>
               <h4 className="text-[#C9A227] text-xs uppercase font-bold mb-2 tracking-[0.1em]">Visit Us</h4>
               <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="block text-[13px] leading-relaxed text-white/70 no-underline transition-colors hover:text-[#C9A227]">Inside BEML Cooperative Society<br />S. Medahalli, Sarjapura<br />Bengaluru, Karnataka 562107</a>
             </div>

             {/* Contact */}
             <div>
               <h4 className="text-[#C9A227] text-xs uppercase font-bold mb-2 tracking-[0.1em]">Contact</h4>
               <p className="text-white/70 text-[13px]">8460 846 946<br />enquiry@ngses.in</p>
             </div>

             {/* Hours */}
             <div>
               <h4 className="text-[#C9A227] text-xs uppercase font-bold mb-2 tracking-[0.1em]">Hours</h4>
               <p className="text-white/70 text-[13px]">Tuesday–Saturday: Open<br />Monday: Closed</p>
             </div>

             {/* Social Media Icons */}
             <div className="flex gap-6 pt-2 flex-wrap">
               <a href="https://www.instagram.com/_ngses_/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A227] transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               <a href="https://www.youtube.com/@nakshathglobalsports" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A227] transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
               </a>
               <a href="https://in.pinterest.com/ngses/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A227] transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.65 0-5.79 2.737-5.79 5.568 0 1.105.424 2.287.955 2.934.105.126.12.235.089.358-.06.246-.195.792-.222.904-.07.299-.286.364-.515.222-1.915-1.068-3.114-2.703-3.114-4.787 0-3.157 2.505-6.674 7.662-6.674 4.019 0 6.664 2.869 6.664 6.63 0 4.358-2.748 7.804-6.459 7.804-1.261 0-2.448-.655-2.855-1.426l-.778 2.961c-.281 1.084-1.068 2.452-1.59 3.281C9.535 23.879 10.742 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
               </a>
               <a href="https://x.com/ngses_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A227] transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
               <a href="https://www.facebook.com/profile.php?id=61590255645938" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A227] transition-colors">
                 <FaFacebookF size={22} />
               </a>
             </div>

             {/* Download Brochure */}
             <div className="pt-2">
               <a
                 href="/nakshath Final Brochure.pdf"
                 download="Nakshath-Brochure.pdf"
                 className="flex items-center gap-2 text-white/60 text-xs font-medium uppercase tracking-widest hover:text-[#C9A227] transition-colors"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 Download Brochure
               </a>
             </div>

             {/* Promoted text */}
             <div className="pt-6">
               <p className="type-caption font-sans tracking-wide text-white/50">
                 Nakshath Equestrian Club<br />
                 Promoted and managed by<br />
                 Nakshath Global Sports & Equestrian Solutions Pvt Ltd
               </p>
             </div>

          </div>
        </div>

        {/* Bottom Footer Text */}
        <div className="type-caption relative z-10 border-t border-white/10 p-6 text-white/50">
           <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end">
             <Link to="/terms-and-conditions" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Terms & Conditions</Link>
             <Link to="/refund-and-cancellation" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Refund & Cancellation</Link>
             <Link to="/privacy-policy" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Navigation;