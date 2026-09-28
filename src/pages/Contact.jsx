// src/pages/Contact.jsx
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FiMapPin, FiPhone, FiMail, FiClock, FiPlus, FiMinus, FiLoader } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaPinterestP, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useEnquiry } from '../context/EnquiryContext';
import { BUSINESS_MAP_EMBED_URL, BUSINESS_MAP_URL } from '../constants/location';
import SectionDots from '../components/SectionDots';
import ShinyText from '../components/ShinyText';
import {
  Reveal,
  FadeUp,
  ImageReveal,
  Stagger,
  StaggerItem,
  SplitText,
  InteractiveCard,
} from '../components/motion';

const CHAPTERS = [
  { id: 'chapter-contact-intro', label: 'Contact' },
  { id: 'chapter-enquiry-form',  label: 'Enquiry' },
  { id: 'chapter-getting-here',  label: 'Getting Here' },
  { id: 'chapter-faq',           label: 'FAQ' },
  { id: 'chapter-groups',        label: 'Groups' },
];

const Contact = () => {
  const { openEnquiry } = useEnquiry();
  const form = useRef();
  const [activeTab, setActiveTab] = useState('Getting Started');
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
        { id: 1, q: 'What is the minimum age to start horse riding?', a: 'Children can begin riding with us from 5 years of age and above. Training is planned according to the rider’s age, confidence and ability.' },
        { id: 2, q: 'Is there an upper age limit for adults?', a: 'No. We do not have a fixed upper age limit for adult riders. Adults can take up horse riding based on their comfort and suitability for the activity.' },
        { id: 3, q: 'Is there a weight limit for horse riding?', a: 'Yes. For the safety and well-being of both the rider and the horse, our current rider weight limit is below 75 kg.' },
        { id: 4, q: 'Do I need previous horse-riding experience to join?', a: 'Not at all. We welcome complete beginners as well as experienced riders. Our training is structured according to each rider’s current ability, confidence and riding goals.' },
        { id: 5, q: 'Can children try horse riding before joining regular classes?', a: 'Yes. Children aged 5 years and above can begin with a Guest Ride or introductory riding experience before deciding on regular training.' },
        { id: 6, q: 'What should I wear for my first riding session?', a: 'We recommend comfortable, fitted clothing and suitable closed footwear. Our team can guide you regarding appropriate riding attire and safety equipment when you book your session.' },
        { id: 7, q: 'Can I visit the club before enrolling?', a: 'Yes. Prospective riders and families are welcome to visit the club to understand our facilities and training environment. We recommend contacting us in advance to arrange your visit.' },
        { id: 8, q: 'How do I know which riding program is suitable for me or my child?', a: 'Our team can help you choose the appropriate program based on the rider’s age, previous riding experience, confidence and goals.' },
      ],
    },
    {
      category: 'Programs and Training',
      questions: [
        { id: 9, q: 'How long does it take to learn horse riding?', a: 'Learning time varies. On average, a rider may require approximately 45-50 classes to develop the basic skills of walk, trot and canter.' },
        { id: 10, q: 'Do you offer Guest Rides or one-time horse-riding experiences?', a: 'Yes. We offer Guest Rides / Horse Experience sessions for individuals and families. Advance booking is recommended.' },
        { id: 11, q: 'Which equestrian disciplines do you offer?', a: 'Our training includes Show Jumping, Dressage, general riding and horsemanship.' },
        { id: 12, q: 'Do you provide competitive equestrian training?', a: 'Yes. We provide structured training for riders interested in progressing towards equestrian competitions.' },
        { id: 13, q: 'Do I need to own a horse to learn riding?', a: 'No. You do not need to own a horse to begin training.' },
        { id: 14, q: 'Can experienced riders join for advanced or competitive training?', a: 'Yes. Experienced riders can join based on their current riding level and goals.' },
      ],
    },
    {
      category: 'Horses and Safety',
      questions: [
        { id: 15, q: 'How are horses assigned to riders?', a: 'Horses are assigned considering the rider’s experience, ability, confidence and training objectives.' },
        { id: 16, q: 'Do you have an indoor riding arena?', a: 'Yes. We have a covered indoor riding arena.' },
      ],
    },
    {
      category: 'Visiting and Booking',
      questions: [
        { id: 17, q: 'How can I book a riding session?', a: 'You can contact us through the enquiry details provided on our website.' },
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
      <SectionDots chapters={CHAPTERS} />

      {/* CHAPTER: Contact Intro */}
      <div id="chapter-contact-intro" className="nav-dark-hero min-w-screen bg-[#0C0922] pb-24 pt-32 md:pb-28 md:pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal as="div" y={8} duration={0.5}>
            <h4 className="type-eyebrow mb-4">
              <ShinyText
                text="Get in touch"
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h4>
          </Reveal>

          <Reveal as="div" y={30} duration={0.7} delay={0.15} amount={0.3}>
            <h1 className="type-page-title text-white leading-tight mb-4">
              Come and see <ShinyText
                text="the place."
                color="#C9A227"
                shineColor="#F5F1E8"
                speed={2.5}
                spread={120}
              />
            </h1>
          </Reveal>

          <FadeUp as="p" size="text" delay={0.35} className="type-lead text-white/70">
            Open Tuesday to Saturday. Closed Monday. Visits welcome by prior arrangement.
          </FadeUp>
        </div>
      </div>

      {/* Contact content wrapper */}
      <div className="relative z-10 -mt-12 w-full rounded-t-[3rem] bg-[#FDFCFA] py-15">
        <div className="max-w-7xl mx-auto px-6">

          {/* CHAPTER: Enquiry Form */}
          <div id="chapter-enquiry-form" className="bg-[#FDFCFA] rounded-[2.5rem] p-10 md:p-16 mb-24 shadow-xl border border-[#5A5A66]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Left: Details */}
              <Stagger gap={0.1} amount={0.15} className="flex flex-col gap-8">
                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">Call</h4>
                  <a href="tel:+918460846946" className="flex w-max items-center gap-3 text-lg font-medium text-[#1A1A1A] no-underline transition-colors hover:text-[#C9A227]">
                    <FaWhatsapp className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>8460 846 946</span>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">WhatsApp</h4>
                  <a href="https://wa.me/918460846946" target="_blank" rel="noopener noreferrer" className="flex w-max items-center gap-3 text-lg font-medium text-[#1A1A1A] no-underline transition-colors hover:text-[#C9A227]">
                    <FiPhone className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>Message us directly</span>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">Email</h4>
                  <a href="mailto:enquiry@ngses.in" className="flex w-max items-center gap-3 text-lg font-medium text-[#1A1A1A] no-underline transition-colors hover:text-[#C9A227]">
                    <FiMail className="shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>enquiry@ngses.in</span>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">Visit</h4>
                  <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-lg font-medium leading-relaxed text-[#1A1A1A] no-underline transition-colors hover:text-[#C9A227]">
                    <FiMapPin className="mt-1.5 shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <span>Inside BEML Cooperative Society<br/>S. Medahalli, Sarjapura<br/>Bengaluru, Karnataka 562107</span>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-2">Hours</h4>
                  <div className="flex items-start gap-3 text-lg font-medium text-[#1A1A1A]">
                    <FiClock className="mt-1.5 shrink-0 text-[#C9A227]" aria-hidden="true" />
                    <p>Tuesday–Saturday: Open<br/>Monday: Closed</p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-4">Follow</h4>
                  <div className="flex flex-wrap gap-x-5 gap-y-3">
                    <a href="https://www.instagram.com/nakshathglobalsports/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"><FaInstagram className="shrink-0 text-[#C9A227]" aria-hidden="true" /><span>Instagram</span></a>
                    <a href="https://www.facebook.com/profile.php?id=61590255645938" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"><FaFacebookF className="shrink-0 text-[#C9A227]" aria-hidden="true" /><span>Facebook</span></a>
                    <a href="https://www.youtube.com/@nakshathglobalsports" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"><FaYoutube className="shrink-0 text-[#C9A227]" aria-hidden="true" /><span>YouTube</span></a>
                    <a href="https://x.com/ngses_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"><FaXTwitter className="shrink-0 text-[#C9A227]" aria-hidden="true" /><span>X</span></a>
                    <a href="https://in.pinterest.com/ngses/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A227]"><FaPinterestP className="shrink-0 text-[#C9A227]" aria-hidden="true" /><span>Pinterest</span></a>
                  </div>
                </StaggerItem>
              </Stagger>

              {/* Right: Form */}
              <Reveal as="div" y={20} duration={0.8} amount={0.15} className="flex flex-col">
                <FadeUp size="text" className="mb-10">
                  <h2 className="type-section-title text-[#1A1A1A]">Send us an enquiry.</h2>
                </FadeUp>

                <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[#C9A227] type-eyebrow mb-2">Full Name</label>
                      <input type="text" name="firstName" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors" required />
                    </div>
                    <div>
                      <label className="block text-[#C9A227] type-eyebrow mb-2">Phone Number</label>
                      <input type="tel" name="phone" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#C9A227] type-eyebrow mb-2">Email</label>
                    <input type="email" name="email" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors" required />
                  </div>

                  <div>
                    <label className="block text-[#C9A227] type-eyebrow mb-2">What is this about?</label>
                    <div className="relative">
                      <select name="topic" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors appearance-none cursor-pointer">
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
                      <span className="absolute right-0 top-3 text-[#1A1A1A] pointer-events-none text-sm">&#9662;</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#C9A227] type-eyebrow mb-2">Your Message</label>
                    <textarea name="message" rows="3" className="w-full border-b border-[#1A1A1A] py-2 bg-transparent focus:outline-none focus:border-[#C9A227] transition-colors resize-none"></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#C9A227] text-[#0C0922] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin" /> Sending...
                        </>
                      ) : (
                        'Send Enquiry'
                      )}
                    </button>
                    {submitStatus === 'success' && (
                      <p className="mt-4 text-green-600 text-sm font-medium">Thank you! Your enquiry has been sent successfully.</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="mt-4 text-red-600 text-sm font-medium">Failed to send. Please try again or contact us directly.</p>
                    )}
                    <p className="mt-4 text-[#5A5A66] text-sm">We reply within one working day.</p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>

          {/* CHAPTER: Getting Here */}
          <div id="chapter-getting-here" className="mb-24 w-full overflow-hidden rounded-3xl bg-[#0C0922]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <Reveal as="div" y={20} duration={0.8} amount={0.15} className="w-full p-0 xl:p-10">
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
              </Reveal>

              <Stagger gap={0.08} amount={0.15} className="flex flex-col justify-center p-6 md:p-16 lg:pr-24">
                <StaggerItem>
                  <h4 className="text-[#C9A227] type-eyebrow mb-4">Getting Here</h4>
                </StaggerItem>

                <StaggerItem>
                  <SplitText
                    as="h2"
                    className="type-section-title text-white mb-12"
                    wordDelay={0.04}
                    startDelay={0}
                    amount={0.4}
                  >
                    Closer than you think.
                  </SplitText>
                </StaggerItem>

                <StaggerItem>
                  <div className="mb-4 flex items-center justify-between border-b border-[#C9A227]/35 pb-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#C9A227]">
                    <span>Starting point</span>
                    <span className="pl-4 text-right">Approx. drive time</span>
                  </div>
                </StaggerItem>

                {driveTimes.map((item, idx) => (
                  <StaggerItem key={idx}>
                    <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4 transition-colors duration-300 hover:border-[#C9A227]/40">
                      <div className="min-w-0">
                        <h3 className="text-white font-medium text-lg">{item.location}</h3>
                        <p className="text-white/50 text-sm font-normal">{item.route}</p>
                      </div>
                      <span className="shrink-0 text-right text-base font-semibold text-white md:text-lg">{item.time}</span>
                    </div>
                  </StaggerItem>
                ))}

                <StaggerItem>
                  <p className="text-white/40 text-xs mt-8">
                    Travel times are approximate and may vary depending on traffic conditions.
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="text-[#C9A227] border-b border-[#C9A227] pb-1 mt-4 w-max hover:text-white hover:border-white transition-colors">
                    Open in Maps
                  </a>
                </StaggerItem>
              </Stagger>
            </div>
          </div>

          {/* CHAPTER: FAQ */}
          <div id="chapter-faq" className="mb-24">
            <FadeUp size="text" className="mb-4">
              <h4 className="type-eyebrow text-[#C9A227]">Questions</h4>
            </FadeUp>

            <SplitText
              as="h2"
              className="type-section-title text-[#1A1A1A] mb-12"
              wordDelay={0.04}
              startDelay={0.1}
              amount={0.3}
            >
              Before you ride.
            </SplitText>

            <Reveal as="div" y={15} duration={0.6} amount={0.15}>
              <div className="faq-tabs-scrollbar mb-10 flex flex-nowrap gap-4 overflow-x-auto border-b border-[#5A5A66]/20 pb-4 md:justify-between md:gap-5 md:overflow-visible">
                {faqData.map((category, catIdx) => (
                  <button
                    key={catIdx}
                    onClick={() => setActiveTab(category.category)}
                    className={`shrink-0 whitespace-nowrap pb-1 text-[clamp(0.65rem,1.4vw,0.875rem)] font-bold uppercase tracking-[0.08em] transition-colors md:tracking-[0.12em] ${
                      activeTab === category.category
                        ? 'text-[#C9A227] border-b-2 border-[#C9A227]'
                        : 'text-[#5A5A66]/70 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </Reveal>

            <Stagger gap={0.05} amount={0.1} className="space-y-6">
              {faqData
                .filter((cat) => cat.category === activeTab)
                .flatMap((category) =>
                  category.questions.map((faq) => (
                    <StaggerItem key={faq.id}>
                      <div className="border-b border-[#5A5A66]/20">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between py-5 text-left hover:text-[#C9A227] transition-colors"
                        >
                          <span className="text-lg font-medium text-[#1A1A1A]">{faq.q}</span>
                          <span className="text-[#C9A227] text-xl flex-shrink-0">
                            {openFaq === faq.id ? <FiMinus /> : <FiPlus />}
                          </span>
                        </button>
                        {openFaq === faq.id && (
                          <div className="pb-5 text-[#5A5A66] font-normal leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    </StaggerItem>
                  ))
                )}
            </Stagger>
          </div>

          {/* CHAPTER: Groups */}
          <div id="chapter-groups" className="relative mx-auto w-full bg-[#0C0922] px-5 py-24 md:px-15 lg:left-1/2 lg:w-screen lg:-translate-x-1/2">
            <div className="mx-auto max-w-7xl">
              <FadeUp size="text" className="mb-4">
                <h4 className="type-eyebrow">
                  <ShinyText
                    text="Not Just Lessons"
                    color="#C9A227"
                    shineColor="#F5F1E8"
                    speed={2.5}
                    spread={120}
                  />
                </h4>
              </FadeUp>

              <div className="flex flex-col items-start gap-8 lg:flex-row">
                <SplitText
                  as="h2"
                  className="type-section-title text-white leading-tight"
                  wordDelay={0.04}
                  startDelay={0.1}
                  amount={0.3}
                >
                  Bring a group.
                </SplitText>

                <FadeUp as="p" size="text" delay={0.25} className="max-w-md text-lg font-normal text-white/70 lg:pt-4">
                  The arenas, the café and the grounds are open to groups as well as individual riders.
                </FadeUp>
              </div>

              <Stagger gap={0.08} amount={0.15} className="mt-16 mb-12 flex flex-wrap gap-x-10 gap-y-6">
                {['Corporate Days', 'School Visits', 'Group Sessions', 'Photoshoots', 'Guest Rides'].map((item, idx) => (
                  <StaggerItem key={idx}>
                    <button
                      onClick={() => openEnquiry('Group Booking')}
                      className="text-white font-serif text-xl md:text-2xl hover:text-[#C9A227] transition-colors"
                    >
                      {item}
                    </button>
                  </StaggerItem>
                ))}
              </Stagger>

              <FadeUp size="text" delay={0.3}>
                <button
                  onClick={() => openEnquiry('Group Booking')}
                  className="inline-block text-white border-b-2 border-[#C9A227] pb-1 text-sm font-medium hover:text-[#C9A227] transition-colors"
                >
                  Enquire about group bookings
                </button>
              </FadeUp>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;