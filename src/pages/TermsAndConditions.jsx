import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { viewportOnce } from '../utils/animations';

// ============================================================
// SECTION DATA
// ============================================================
const sections = [
  { title: '1. Safety Requirements', body: 'Riders must wear appropriate safety gear while riding and comply with all safety requirements communicated by the facility.' },
  { title: '2. Instructor Instructions', body: 'Riders must follow the instructions of the riding instructor, trainer or authorised staff member at all times.' },
  { title: '3. Medical Disclosure', body: 'Riders must disclose any medical condition, allergy, injury, medication or other concern that may affect their ability to participate safely. For minors, this responsibility rests with the parent or lawful guardian.' },
  { title: '4. Responsible Conduct', body: 'Riders must act responsibly and avoid conduct that may endanger themselves, other persons, horses or property.' },
  { title: '5. Horse Welfare', body: 'Horses must be treated with care and respect. Riders must follow all instructions regarding horse handling, mounting, dismounting and stable conduct.' },
  { title: '6. Prohibited Substances', body: 'Any person under the influence of alcohol, illegal drugs or any substance that may impair safe participation will not be permitted to ride.' },
  { title: '7. Inherent Risks', body: 'Horse riding and equestrian activities involve inherent risks. Participants acknowledge these risks and agree to follow all safety instructions and facility rules.' },
  { title: '8. Limitation of Liability', body: 'NGSES / Nakshat Equestrian Club will not be liable for injury, damage or loss arising from the inherent risks of equestrian activities, except to the extent liability arises from negligence or other liability that cannot lawfully be excluded.' },
  { title: '9. Indemnification', body: "To the extent permitted by applicable law, riders/parents or guardians agree to indemnify the facility against claims, liabilities, damages or expenses arising from a participant's breach of these terms, misconduct or failure to follow safety instructions." },
  { title: '10. Refusal of Service', body: 'The facility may refuse, suspend or terminate participation where a rider breaches these terms, behaves unsafely, mistreats a horse or creates a risk to themselves, others, horses or property.' },
  { title: '11. Changes to Sessions', body: 'Session timings, horse allocation, instructor allocation and riding activities may be changed where reasonably necessary for horse welfare, rider safety, operational requirements or weather conditions.' },
  { title: '12. Modifications to Terms', body: 'The facility may modify these Terms & Conditions from time to time. The latest version will be made available on the website or otherwise communicated as appropriate.' },
];

const TermsAndConditions = () => {
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
          Terms & Conditions
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
              These Terms & Conditions apply to riders, parents/guardians, guests and customers participating in horseriding and related equestrian activities offered by Nakshat Global Sports & Equestrian Solutions Pvt. Ltd. (NGSES) / Nakshat Equestrian Club.
            </motion.p>

            {/* Sections with stagger */}
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h2 className="mb-4 mt-8 font-serif text-xl md:text-2xl">
                  {section.title}
                </h2>
                <p>{section.body}</p>
              </motion.div>
            ))}

            {/* Closing */}
            <motion.div
              className="mt-8 border-t border-[#5A5A66]/20 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7 }}
            >
              <p className="font-medium">
                By booking, paying for or participating in an equestrian activity, the rider and, where applicable, the parent/guardian acknowledges that they have read, understood and agreed to these Terms & Conditions.
              </p>
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

export default TermsAndConditions;