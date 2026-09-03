import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { BUSINESS_MAP_URL } from '../constants/location';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0C0922] text-[#F5F1E8] font-sans">
      <section id="footer-trial-cta" className="relative w-full min-h-[32rem] overflow-hidden md:min-h-0 md:aspect-video">
        <img src="/come and ride.png" alt="A rider beginning a trial lesson" className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0922]/95 via-[#0C0922]/58 to-[#0C0922]/10" />

        <div className="absolute inset-0 z-10 flex items-center px-6 py-14 md:px-[6.2vw] md:py-0">
          <div className="w-full max-w-[32rem] md:max-w-[44vw]">
            <h2 className="font-serif text-[1.75rem] leading-[1.12] text-white md:text-[2.75rem]">Come and sit<br />on a horse.</h2>
            <p className="mt-5 max-w-[18rem] text-[0.95rem] leading-relaxed font-normal text-[#F5F1E8] md:mt-[2.2vw] md:max-w-none md:text-lg">Ten minutes, no charge, no obligation.</p>
            <button onClick={() => navigate('/enquiry')} className="type-button mt-7 w-full whitespace-nowrap rounded-full bg-[#C9A227] px-7 py-3.5 text-[#0C0922] shadow-lg transition-colors hover:bg-white sm:w-auto md:mt-[3.8vw] md:px-[3.6vw] md:py-[1.35vw]">
              Book Your Trial Ride
            </button>
          </div>
        </div>
      </section>

      <div className="px-6 pb-10 pt-16 md:px-10 md:pb-14 md:pt-20 xl:min-h-[43.7vw] xl:px-[5.9vw] xl:pb-[4.8vw] xl:pt-[7.2vw]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14 xl:grid-cols-[28%_18%_25%_29%] xl:gap-0">
          <div>
            <Link to="/" className="inline-block"><img src="/footer-logo-matched.png" alt="Nakshath Global Sports" className="w-64 object-contain md:w-56 xl:w-[17vw]" /></Link>
            <p className="mt-6 w-full text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:mt-[1.8vw]">Promoted and managed by Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd</p>
          </div>

          <nav aria-label="Explore">
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">Explore</h3>
            <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
              <li><Link to="/about">About Us</Link></li><li><Link to="/horses">Horses</Link></li><li><Link to="/courses">Courses</Link></li><li><Link to="/trainers">Trainers</Link></li><li><Link to="/facilities">Facilities</Link></li><li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Programmes">
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">Programmes</h3>
            <ul className="space-y-4 text-sm text-[#F5F1E8] md:text-base xl:space-y-[1.55vw]">
              <li><Link to="/courses">Beginner</Link></li><li><Link to="/courses">Intermediate</Link></li><li><Link to="/courses">Kids Special</Link></li><li><Link to="/courses">Professional Competition</Link></li><li><Link to="/courses">International Clinics</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] xl:mb-[2.2vw]">Visit</h3>
            <div className="space-y-5 text-sm leading-[1.65] text-[#F5F1E8] md:text-base xl:space-y-[1.6vw]">
              <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]">
                <FiMapPin className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <span>Inside BEML Cooperative Society<br />S. Medahalli, Sarjapura<br />Bengaluru, Karnataka 562107</span>
              </a>
              <div className="space-y-2.5">
                <a href="tel:+918460846946" className="flex items-center gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]">
                  <FiPhone className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>8460 846 946</span>
                </a>
                <a href="mailto:enquiry@ngses.in" className="flex items-center gap-3 text-inherit no-underline transition-colors hover:text-[#C9A227]">
                  <FiMail className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                  <span>enquiry@ngses.in</span>
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 shrink-0 text-[#C9A227]" aria-hidden="true" />
                <p>Tuesday–Saturday: Open<br />Monday: Closed</p>
              </div>
              <div className="flex gap-7 pt-1 text-[#F5F1E8]">
                <a href="https://www.instagram.com/_ngses_/" target="_blank" rel="noreferrer" aria-label="Instagram"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
                <a href="https://www.youtube.com/@nakshathglobalsports" target="_blank" rel="noreferrer" aria-label="YouTube"><svg width="30" height="28" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="1" y="3" width="26" height="18" rx="5"/><path d="m11 8 7 4-7 4Z" fill="currentColor" stroke="none"/></svg></a>
                <a href="https://x.com/ngses_" target="_blank" rel="noreferrer" aria-label="X"><svg width="26" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 3 20 21M20 3 4 21"/></svg></a>
                <a href="https://www.facebook.com/profile.php?id=61590255645938" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-7 w-7 items-center justify-center"><FaFacebookF size={24} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/20 pt-7 text-xs leading-relaxed text-[#F5F1E8] md:mt-[5vw] md:flex-row md:items-center md:justify-between md:pt-[2.5vw]">
          <p>© 2026 Nakshath Global Sports &amp; Equestrian Solutions Pvt Ltd</p>
          <div className="flex flex-wrap gap-6 md:gap-[3vw]"><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-and-conditions">Terms &amp; Conditions</Link><Link to="/refund-and-cancellation">Refund &amp; Cancellation</Link></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
