import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportOnce } from '../utils/animations';

// ============================================================
// SECTIONS DATA
// ============================================================
const sections = [
  {
    title: '3.1 Information We May Collect',
    items: [
      'Name, age or date of birth where required, mobile number and email address.',
      'Parent/guardian details for minors.',
      'Booking, riding-session and service information.',
      'Emergency contact information.',
      'Medical or safety-related information voluntarily disclosed where relevant to safe participation in equestrian activities.',
      'Payment and transaction information.',
      'Enquiries and communications made through our website, telephone, WhatsApp, email or other approved channels.',
      'Feedback, testimonials and reviews.',
      'Website usage information such as device/browser information, IP address and cookies, where applicable.',
    ],
  },
  {
    title: '3.2 How We Use Information',
    items: [
      'Processing riding-session, training and guest-ride bookings.',
      'Managing registrations, rider records and customer accounts.',
      'Communicating booking confirmations, cancellations, reminders and schedule changes.',
      'Providing riding and other equestrian services.',
      'Supporting rider and horse safety and responding to emergencies.',
      'Contacting parents/guardians or emergency contacts where necessary.',
      'Processing payments and maintaining transaction records.',
      'Responding to enquiries and customer-support requests.',
      'Improving our website, facilities, programmes and services.',
      'Sending promotional or marketing communications where appropriate and permitted.',
      'Complying with applicable legal, regulatory, accounting, contractual and safety requirements.',
    ],
  },
  {
    title: '3.3 Information Relating to Children',
    items: [
      'NGSES provides riding services to children aged 5 years and above.',
      "Where personal information relating to a minor is required, it should be provided by, or with the appropriate involvement and consent of, the child's parent or lawful guardian.",
      'NGSES will seek to collect only information reasonably necessary for registration, booking, communication, safety and participation in equestrian activities.',
      'Parental/guardian consent and other safeguards will be implemented where required under applicable data-protection law.',
    ],
  },
  {
    title: '3.4 Medical and Safety Information',
    items: [
      'Horse riding is a physical activity. Riders may be requested to disclose information relevant to safe participation.',
      'Medical or safety-related information voluntarily provided to NGSES will be used primarily for rider safety, emergency response and administration of equestrian activities.',
      'Riders and parents/guardians are responsible for providing accurate and current information relevant to safe participation.',
    ],
  },
  {
    title: '3.5 Payments',
    items: [
      'Payments made through the website may be processed through third-party payment gateways or financial service providers.',
      'NGSES does not intend to directly store complete debit-card or credit-card details where payments are processed by a third-party provider.',
      'Payment information may also be governed by the privacy policy and terms of the relevant payment provider.',
    ],
  },
  {
    title: '3.6 Sharing of Personal Information',
    items: [
      'NGSES does not sell personal information.',
      'Information may be shared where reasonably necessary with website/technology providers, booking providers, payment processors, communication providers, professional advisers, and government, regulatory or law-enforcement authorities where legally required.',
      'Where third-party service providers process information for NGSES, appropriate safeguards should be maintained as applicable.',
    ],
  },
  {
    title: '3.7 Photographs and Videos',
    items: [
      'Photographs or videos may occasionally be taken at the facility for training, event documentation, promotional or social-media purposes.',
      'Where appropriate, NGSES will obtain relevant consent before using identifiable photographs or videos for promotional purposes, particularly in relation to minors.',
      'Customers with concerns regarding photography or promotional use should contact NGSES.',
    ],
  },
  {
    title: '3.8 Cookies and Website Technologies',
    items: [
      'The website may use cookies and similar technologies to operate the website, understand usage, remember preferences and improve visitor experience.',
      'Third-party services such as analytics, maps, social-media tools or payment services may also use cookies or similar technologies according to their respective policies.',
      'Where required by applicable law, users will be provided appropriate choices regarding non-essential cookies.',
    ],
  },
  {
    title: '3.9 Marketing Communications',
    items: [
      'Where permitted, NGSES may send information about riding programmes, events, offers, competitions or other services.',
      'Recipients may request to stop receiving promotional communications through an unsubscribe option, where available, or by contacting NGSES.',
      'Operational communications relating to existing bookings or services may still be sent where necessary.',
    ],
  },
  {
    title: '3.10 Data Security',
    items: [
      'NGSES takes reasonable administrative, organisational and technical measures to protect personal information against unauthorised access, misuse, loss, alteration or disclosure.',
      'No internet-based transmission or electronic storage system can be guaranteed to be completely secure.',
    ],
  },
  {
    title: '3.11 Data Retention',
    body: 'Personal information will be retained only for as long as reasonably necessary for the purpose for which it was collected or as required under applicable legal, regulatory, accounting, contractual or safety obligations. When information is no longer required, NGSES may securely delete, anonymise or otherwise dispose of it as appropriate.',
  },
  {
    title: '3.12 Your Choices and Rights',
    items: [
      'Subject to applicable law, individuals may contact NGSES regarding access to, correction or updating of their personal information.',
      'Where applicable, individuals may request withdrawal of consent or deletion/erasure of personal information.',
      'Individuals may raise a concern or grievance regarding the handling of their personal information.',
      'NGSES may need to verify the identity of the person making a request before acting upon it.',
    ],
  },
  {
    title: '3.13 Third-Party Websites',
    items: [
      'The website may contain links to third-party websites, social-media platforms, maps, payment gateways or other services.',
      'NGSES is not responsible for the privacy practices or content of independent third-party services. Users should review their respective privacy policies before providing information.',
    ],
  },
  {
    title: '3.14 Changes to This Privacy Policy',
    items: [
      'NGSES may update this Privacy Policy periodically to reflect changes in services, technology, operational requirements or applicable law.',
      'The latest version will be published on the website together with the updated effective or revision date.',
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0C0922] pb-16 pt-32 md:pt-44">
      <div className="mx-auto max-w-4xl px-6">

        {/* Header */}
        <motion.div
          className="mb-12 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-px w-12 bg-[#C9A227]" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#C9A227]">
            Legal
          </span>
        </motion.div>

        <motion.h1
          className="type-page-title mb-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Privacy Policy
        </motion.h1>

        {/* Content Card */}
        <motion.div
          className="rounded-2xl bg-white p-8 shadow-xl md:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="prose prose-lg max-w-none font-normal leading-relaxed text-[#1A1A1A]">

            <motion.p
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Nakshath Global Sports & Equestrian Solutions Pvt. Ltd. ("NGSES", "Nakshath Equestrian Club", "we", "us" or "our") respects the privacy of riders, parents/guardians, visitors, customers and website users. This Privacy Policy explains how personal information provided through our website, booking system, enquiry forms and related interactions may be collected, used, stored and protected.
            </motion.p>

            {/* Sections */}
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: idx * 0.04,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h2 className="mb-4 mt-8 font-serif text-xl md:text-2xl">
                  {section.title}
                </h2>

                {section.body && <p>{section.body}</p>}

                {section.items && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Contact Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7 }}
            >
              <h2 className="mb-4 mt-8 font-serif text-xl md:text-2xl">
                3.15 Contact & Privacy Grievances
              </h2>
              <p>For privacy-related questions, requests or complaints, please contact:</p>

              <div className="mt-4 space-y-2 rounded-xl bg-[#FDFCFA] p-6">
                <p>
                  <strong>Company:</strong> Nakshath Global Sports & Equestrian Solutions Pvt. Ltd.
                </p>
                <p>
                  <strong>Brand / Facility:</strong> Nakshath Equestrian Club
                </p>
                <p>
                  <strong>Email:</strong> info@ngses.in
                </p>
                <p>
                  <strong>Phone:</strong> 8460846946
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-8 flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-[#C9A227] transition-colors hover:text-white"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.3 }}
            >
              ←
            </motion.span>
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-[#C9A227] transition-colors hover:text-white"
          >
            Contact Us
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;