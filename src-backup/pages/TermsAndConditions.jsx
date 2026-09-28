// src/pages/TermsAndConditions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, FadeUp } from '../components/motion';
import ShinyText from '../components/ShinyText';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#0C0922] pb-16 pt-32 md:pt-44">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp as="div" size="text" duration={0.5}>
          <h4 className="text-[#C9A227] type-eyebrow mb-4">Legal</h4>
        </FadeUp>

                <FadeUp as="div" size="heading" duration={0.6} delay={0.1}>
          <h1 className="type-page-title text-white mb-12">
            Terms &amp;{' '}
            <ShinyText
              text="Conditions"
              color="#C9A227"
              shineColor="#F5F1E8"
              speed={2.5}
              spread={120}
            />
          </h1>
        </FadeUp>

        <Reveal as="div" y={15} duration={0.7} delay={0.15} amount={0.05}>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="prose prose-lg max-w-none text-[#1A1A1A] font-normal leading-relaxed">
              <p>These Terms & Conditions apply to riders, parents/guardians, guests and customers participating in horseriding and related equestrian activities offered by Nakshat Global Sports & Equestrian Solutions Pvt. Ltd. (NGSES) / Nakshat Equestrian Club.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">1. Safety Requirements</h2>
              <p>Riders must wear appropriate safety gear while riding and comply with all safety requirements communicated by the facility.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">2. Instructor Instructions</h2>
              <p>Riders must follow the instructions of the riding instructor, trainer or authorised staff member at all times.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">3. Medical Disclosure</h2>
              <p>Riders must disclose any medical condition, allergy, injury, medication or other concern that may affect their ability to participate safely. For minors, this responsibility rests with the parent or lawful guardian.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">4. Responsible Conduct</h2>
              <p>Riders must act responsibly and avoid conduct that may endanger themselves, other persons, horses or property.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">5. Horse Welfare</h2>
              <p>Horses must be treated with care and respect. Riders must follow all instructions regarding horse handling, mounting, dismounting and stable conduct.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">6. Prohibited Substances</h2>
              <p>Any person under the influence of alcohol, illegal drugs or any substance that may impair safe participation will not be permitted to ride.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">7. Inherent Risks</h2>
              <p>Horse riding and equestrian activities involve inherent risks. Participants acknowledge these risks and agree to follow all safety instructions and facility rules.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">8. Limitation of Liability</h2>
              <p>NGSES / Nakshat Equestrian Club will not be liable for injury, damage or loss arising from the inherent risks of equestrian activities, except to the extent liability arises from negligence or other liability that cannot lawfully be excluded.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">9. Indemnification</h2>
              <p>To the extent permitted by applicable law, riders/parents or guardians agree to indemnify the facility against claims, liabilities, damages or expenses arising from a participant's breach of these terms, misconduct or failure to follow safety instructions.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">10. Refusal of Service</h2>
              <p>The facility may refuse, suspend or terminate participation where a rider breaches these terms, behaves unsafely, mistreats a horse or creates a risk to themselves, others, horses or property.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">11. Changes to Sessions</h2>
              <p>Session timings, horse allocation, instructor allocation and riding activities may be changed where reasonably necessary for horse welfare, rider safety, operational requirements or weather conditions.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">12. Modifications to Terms</h2>
              <p>The facility may modify these Terms & Conditions from time to time. The latest version will be made available on the website or otherwise communicated as appropriate.</p>

              <div className="border-t border-[#5A5A66]/20 mt-8 pt-6">
                <p className="font-medium">By booking, paying for or participating in an equestrian activity, the rider and, where applicable, the parent/guardian acknowledges that they have read, understood and agreed to these Terms & Conditions.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <FadeUp as="div" y={10} duration={0.5} delay={0.3}>
          <div className="mt-8 flex justify-between">
            <Link to="/" className="text-[#C9A227] hover:text-white transition-colors">← Back to Home</Link>
            <Link to="/contact" className="text-[#C9A227] hover:text-white transition-colors">Contact Us →</Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};

export default TermsAndConditions;