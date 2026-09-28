import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { EnquiryProvider } from '../context/EnquiryContext';
import EnquiryModal from './EnquiryModal';

// Sticky Button Component - WhatsApp only
const StickyButtons = () => {
  const waLink = "https://wa.me/918460846946?text=Hi%20Nakshath%20Equestrian%20Club!%20I'd%20like%20to%20book%20a%20test%20ride.";

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center justify-center transition-transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)]"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="-2.5 -2.5 29 29" className="w-9 h-9 md:w-10 md:h-10" aria-hidden="true">
        {/* Green circle with white stroke outline */}
        <path
          fill="#25D366"
          stroke="#FFF"
          strokeWidth="2.2"
          strokeLinejoin="round"
          d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"
        />
        {/* White phone handset inside */}
        <path
          fill="#FFF"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        />
      </svg>
    </motion.a>
  );
};

const Layout = () => {
  return (
    <EnquiryProvider>
      <div className="min-h-screen bg-[#FDFCFA] overflow-x-hidden font-sans">
        <Navigation />
        <Outlet />
        <Footer />
        <EnquiryModal />
        <StickyButtons />
      </div>
    </EnquiryProvider>
  );
};

export default Layout;