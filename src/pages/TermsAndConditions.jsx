import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#0C0922] pb-16 pt-32 md:pt-44">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#C9A227] type-eyebrow mb-4"
        >
          Legal
        </motion.h4>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="type-page-title text-white mb-12"
        >
          Terms & Conditions
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="prose prose-lg max-w-none text-[#1A1A1A] font-normal leading-relaxed"
          >
            <motion.p variants={fadeInUp}>
              These Terms & Conditions apply to riders, parents/guardians, guests and customers participating in horseriding and related equestrian activities offered by Nakshat Global Sports & Equestrian Solutions Pvt. Ltd. (NGSES) / Nakshat Equestrian Club.
            </motion.p>

            {[
              { title: '1. Safety Requirements', text: 'Riders must wear appropriate safety gear while riding and comply with all safety requirements communicated by the facility.' },
              { title: '2. Instructor Instructions', text: 'Riders must follow the instructions of the riding instructor, trainer or authorised staff member at all times.' },
              { title: '3. Medical Disclosure', text: 'Riders must disclose any medical condition, allergy, injury, medication or other concern that may affect their ability to participate safely. For minors, this responsibility rests with the parent or lawful guardian.' },
              { title: '4. Responsible Conduct', text: 'Riders must act responsibly and avoid conduct that may endanger themselves, other persons, horses or property.' },
              { title: '5. Horse Welfare', text: 'Horses must be treated with care and respect. Riders must follow all instructions regarding horse handling, mounting, dismounting and stable conduct.' },
              { title: '6. Prohibited Substances', text: 'Any person under the influence of alcohol, illegal drugs or any substance that may impair safe participation will not be permitted to ride.' },
              { title: '7. Inherent Risks', text: 'Horse riding and equestrian activities involve inherent risks. Participants acknowledge these risks and agree to follow all safety instructions and facility rules.' },
              { title: '8. Limitation of Liability', text: 'NGSES / Nakshat Equestrian Club will not be liable for injury, damage or loss arising from the inherent risks of equestrian activities, except to the extent liability arises from negligence or other liability that cannot lawfully be excluded.' },
              { title: '9. Indemnification', text: "To the extent permitted by applicable law, riders/parents or guardians agree to indemnify the facility against claims, liabilities, damages or expenses arising from a participant's breach of these terms, misconduct or failure to follow safety instructions." },
              { title: '10. Refusal of Service', text: 'The facility may refuse, suspend or terminate participation where a rider breaches these terms, behaves unsafely, mistreats a horse or creates a risk to themselves, others, horses or property.' },
              { title: '11. Changes to Sessions', text: 'Session timings, horse allocation, instructor allocation and riding activities may be changed where reasonably necessary for horse welfare, rider safety, operational requirements or weather conditions.' },
              { title: '12. Modifications to Terms', text: 'The facility may modify these Terms & Conditions from time to time. The latest version will be made available on the website or otherwise communicated as appropriate.' },
            ].map((section, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">{section.title}</h2>
                <p>{section.text}</p>
              </motion.div>
            ))}

            <motion.div
              variants={fadeInUp}
              className="border-t border-[#5A5A66]/20 mt-8 pt-6"
            >
              <p className="font-medium">
                By booking, paying for or participating in an equestrian activity, the rider and, where applicable, the parent/guardian acknowledges that they have read, understood and agreed to these Terms & Conditions.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-between"
        >
          <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
            <Link to="/" className="text-[#C9A227] hover:text-white transition-colors">← Back to Home</Link>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link to="/contact" className="text-[#C9A227] hover:text-white transition-colors">Contact Us →</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;