// src/pages/RefundAndCancellation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, FadeUp } from '../components/motion';
import ShinyText from '../components/ShinyText';

const RefundAndCancellation = () => {
  return (
    <div className="min-h-screen bg-[#0C0922] pb-16 pt-32 md:pt-44">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp as="div" size="text" duration={0.5}>
          <h4 className="text-[#C9A227] type-eyebrow mb-4">Legal</h4>
        </FadeUp>

                <FadeUp as="div" size="heading" duration={0.6} delay={0.1}>
          <h1 className="type-page-title text-white mb-12">
            Refund &amp; Cancellation{' '}
            <ShinyText
              text="Policy"
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
              <h2 className="text-xl md:text-2xl font-serif mb-4">2.1 Booking and Cancellation</h2>
              <p>Once a booking payment has been made, the amount is non-refundable, except where otherwise required by applicable law or expressly stated by NGSES.</p>

              <h2 className="text-xl md:text-2xl font-serif mt-8 mb-4">2.2 Weather and Safety Cancellations</h2>
              <p>In the event of heavy rain, thunderstorms, unsafe arena conditions or other circumstances that may pose a risk to riders or horses, NGSES / Nakshat Equestrian Club reserves the right to cancel or postpone a session.</p>

              <div className="border-t border-[#5A5A66]/20 mt-8 pt-6">
                <h3 className="text-xl font-serif mb-2">Contact for Questions</h3>
                <p>For any questions regarding refunds or cancellations, please contact us at:</p>
                <div className="mt-4 space-y-2">
                  <p><strong>Email:</strong> info@ngses.in</p>
                  <p><strong>Phone:</strong> 8460846946</p>
                </div>
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

export default RefundAndCancellation;