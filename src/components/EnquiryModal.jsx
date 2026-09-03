import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiX, FiUser, FiPhone, FiMail, FiCalendar, FiClock, FiMapPin, FiMessageSquare, FiChevronDown, FiLoader } from 'react-icons/fi';
import { useEnquiry } from '../context/EnquiryContext';

const EnquiryModal = () => {
  const { isModalOpen, closeEnquiry, selectedTopic, setSelectedTopic } = useEnquiry();
  const form = useRef();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', date: '', time: '', topic: '', source: '', message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  // Reset form when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setFormData({
        firstName: '', lastName: '', phone: '', email: '', date: '', time: '', topic: '', source: '', message: ''
      });
      setSubmitStatus(null);
      setIsSubmitting(false);
    }
  }, [isModalOpen]);

  // Sync selectedTopic with formData when modal opens
  useEffect(() => {
    if (isModalOpen && selectedTopic) {
      setFormData(prev => ({ ...prev, topic: selectedTopic }));
      setSelectedTopic(''); // Reset context after use
    }
  }, [isModalOpen, selectedTopic, setSelectedTopic]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeEnquiry();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeEnquiry]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      
      // Reset form values
      setFormData({
        firstName: '', lastName: '', phone: '', email: '', date: '', time: '', topic: '', source: '', message: ''
      });
      
      // Reset the actual form DOM
      e.target.reset();
      
      // Close modal after showing success message
      setTimeout(() => {
        closeEnquiry();
      }, 2500);
    })
    .catch((err) => {
      console.log('FAILED...', err);
      setSubmitStatus('error');
      setIsSubmitting(false);
    });
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Book a trial ride"
    >
      <div className="absolute inset-0 bg-black/80" onMouseDown={closeEnquiry} aria-hidden="true"></div>
      
      <div className="relative z-10 w-[90%] max-w-6xl bg-[#FDFCFA] rounded-3xl shadow-2xl flex flex-col md:flex-row max-h-[95vh] overflow-y-auto md:overflow-hidden">
        
        {/* Close Button */}
        <button type="button" onClick={closeEnquiry} aria-label="Close enquiry form" className="absolute top-4 right-4 text-white hover:text-[#C9A227] z-20 bg-black/40 rounded-full p-2">
          <FiX size={24} />
        </button>

        {/* LEFT SIDE: Background Image & Logo */}
        <div className="w-full md:w-[45%] relative flex flex-col items-center justify-center text-center px-8 py-12 md:py-0 bg-[#0C0922]">
          {/* REPLACE THIS IMAGE SOURCE WITH YOUR OWN BACKGROUND IMAGE */}
          <img 
            src="/enquiry-bg.png" 
            alt="Trial Ride Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 z-0" 
          />
          <div className="relative z-10">
            <img src="/nakshath logo head.png" alt="Nakshath Logo" className="h-24 md:h-32 mx-auto mb-6 object-contain" />
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-serif text-white mb-4">Book a<br/>Trial Ride</h2>
            <div className="w-16 h-1 bg-[#C9A227] mx-auto mb-6"></div>
            <p className="text-white/80 text-lg">Experience Nakshath Equestrian Club.<br/>One ride can change everything.</p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="w-full md:w-[55%] p-8 md:p-12 bg-[#FDFCFA] md:overflow-y-auto">
          
          <div className="mb-8">
            <h3 className="text-[#C9A227] type-eyebrow mb-3">Enquire Now</h3>
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-3">We'll get in touch with you</h2>
            <p className="text-[#5A5A66] text-sm">Fill in your details and our team will connect with you to schedule your trial ride.</p>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-[#C9A227]" />
                <input type="text" name="firstName" placeholder="First Name *" required className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227]" />
              </div>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-[#C9A227]" />
                <input type="text" name="lastName" placeholder="Last Name *" required className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227]" />
              </div>
            </div>

            <div className="relative">
              <FiPhone className="absolute left-3 top-3 text-[#C9A227]" />
              <input type="tel" name="phone" placeholder="Phone Number *" required className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227]" />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-[#C9A227]" />
              <input type="email" name="email" placeholder="Email Address *" required className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227]" />
            </div>

            <div className="relative">
              <FiCalendar className="absolute left-3 top-3 text-[#C9A227]" />
              <input type="date" name="date" className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227]" />
            </div>

            <div className="relative">
              <FiClock className="absolute left-3 top-3 text-[#C9A227]" />
              <input type="time" name="time" className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227]" />
            </div>

            {/* "What is this about?" Dropdown */}
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3 text-[#C9A227]" />
              <select 
                name="topic" 
                value={formData.topic}
                onChange={handleChange}
                required
                className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base appearance-none bg-transparent focus:outline-none focus:border-[#C9A227]"
              >
                <option value="">What is this about?</option>
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
              <FiChevronDown className="absolute right-3 top-4 text-[#C9A227] pointer-events-none" />
            </div>

            <div className="relative">
              <FiMapPin className="absolute left-3 top-3 text-[#C9A227]" />
              <select name="source" className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base appearance-none bg-transparent focus:outline-none focus:border-[#C9A227]">
                <option value="">How did you hear about us?</option>
                <option value="Instagram">Instagram</option>
                <option value="Google">Google</option>
                <option value="Friend">Friend or Family</option>
                <option value="Other">Other</option>
              </select>
              <FiChevronDown className="absolute right-3 top-4 text-[#C9A227] pointer-events-none" />
            </div>

            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3 text-[#C9A227]" />
              <textarea name="message" rows="3" placeholder="Additional Message (Optional)" className="w-full border border-[#5A5A66]/25 rounded-lg p-3 pl-10 text-base placeholder:text-[#5A5A66] focus:outline-none focus:border-[#C9A227] resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#C9A227] text-[#0C0922] font-bold py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" /> Sending...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
            
            {submitStatus === 'success' && (
              <p className="text-center text-green-600 text-sm font-medium">Thank you! Your enquiry has been sent successfully.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-red-600 text-sm font-medium">Failed to send. Please try again or contact us directly.</p>
            )}
            
            <p className="text-center text-xs text-[#5A5A66] mt-2 flex items-center justify-center gap-1">
              <FiUser className="w-3 h-3" /> Your information is secure and never shared.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default EnquiryModal;
