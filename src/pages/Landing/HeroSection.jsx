import React, { useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';

const HeroSection = () => {
  const [selectedTrial, setSelectedTrial] = useState('free');
  const { openEnquiry } = useEnquiry();

  return (
    <div className="relative w-full min-h-screen bg-[#0C0922] overflow-hidden">
      
      {/* Keep the wide photograph focused on the rider in the mobile opening view. */}
      <div className="absolute inset-x-0 top-0 h-[100svh] min-h-[680px] lg:inset-0 lg:h-auto lg:min-h-0">
        <img 
          src="/landingHero.png" 
          alt="Equestrian Hero" 
          className="w-full h-full object-cover object-[18%_center] brightness-[1.08] contrast-[1.08] saturate-[1.12] lg:object-center lg:brightness-100"
        />
        {/* Mobile fade preserves detail at the top and blends into the longer form below. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0922]/28 via-[#0C0922]/44 to-[#0C0922] lg:bg-gradient-to-r lg:from-[#0C0922]/18 lg:via-[#0C0922]/35 lg:to-[#0C0922]/62"></div>
        
        {/* Kids • Beginners • Professionals - In Background Image Div */}
        <div className="absolute bottom-10 left-0 right-0 hidden lg:block lg:left-[14%] lg:right-auto z-10">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <svg className="w-16 h-4 text-[#C9A227]/40" viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 8 H56"/>
            </svg>
            <p className="type-card-title text-[#C9A227] tracking-wider">
              Kids <span className="mx-3">•</span> Beginners <span className="mx-3">•</span> Professionals
            </p>
            <svg className="w-16 h-4 text-[#C9A227]/40" viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M8 8 H64"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LEFT SIDE: LOGO, HEADING, TEXT, FEATURES */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-10 sm:pt-20 pb-12 min-h-screen flex flex-col justify-center">
        
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-10 lg:gap-8">
          
          {/* Left Column */}
          <div className="flex-1 text-left lg:text-center flex flex-col items-start lg:items-center [text-shadow:0_2px_16px_rgba(0,0,0,.72)]">
            
            {/* Logo */}
            <div className="mb-7 flex w-full justify-center lg:mb-2">
              <img
                src="/nakshath logo head.png"
                alt="Nakshath Equestrian Club"
                className="h-auto w-[min(72vw,290px)] object-contain lg:h-30 lg:w-auto"
              />
            </div>

            {/* Heading - Directly Below Logo */}
            <h1 className="type-page-title text-white leading-tight mb-4 text-left lg:text-center">
              Begin Your<br/>
              Equestrian Journey
            </h1>

            {/* Decorative SVG Divider */}
            <svg className="w-48 h-8 text-[#C9A227] mb-6" viewBox="0 0 200 32" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 16 H80" strokeOpacity="0.5"/>
              <path d="M120 16 H200" strokeOpacity="0.5"/>
              <path d="M100 8 L104 12 L108 16 L104 20 L100 24 L96 20 L92 16 L96 12 Z" fill="currentColor" stroke="none"/>
              <circle cx="85" cy="16" r="2" fill="currentColor" stroke="none"/>
              <circle cx="115" cy="16" r="2" fill="currentColor" stroke="none"/>
              <circle cx="78" cy="16" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="122" cy="16" r="1.5" fill="currentColor" stroke="none"/>
            </svg>

            {/* Subtitle - Centered */}
            <p className="type-lead text-white/95 max-w-md mx-0 lg:mx-auto mb-10 lg:mb-16 text-left lg:text-center">
              Step into the world of equestrian sport at Nakshath.
              Equestrian Club — where passion meets prestige.
            </p>

            {/* Bottom Features */}
            <div className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:justify-start lg:justify-center gap-5 sm:gap-10">
              {/* Premium Horse Riding Experience */}
              <div className="flex items-center gap-4 text-left sm:flex-col sm:text-center">
                <div className="w-14 h-14 bg-[#C9A227]/20 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div><p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">Premium Horse</p>
                  <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">Riding Experience</p>
                </div>
              </div>

              {/* Professional Coaching */}
              <div className="flex items-center gap-4 text-left sm:flex-col sm:text-center">
                <div className="w-14 h-14 bg-[#C9A227]/20 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div><p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">Professional</p>
                <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">Coaching</p>
                </div>
              </div>

              {/* Well-Trained Horses */}
              <div className="flex items-center gap-4 text-left sm:flex-col sm:text-center">
                <div className="w-14 h-14 bg-[#C9A227]/20 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div><p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">Well-Trained</p>
                <p className="text-[#C9A227] font-sans font-medium text-sm uppercase tracking-wider">Horses</p>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: BOOKING FORM */}
          {/* ============================================================ */}
          <div className="w-full max-w-md lg:max-w-md bg-[#0C0922]/90 backdrop-blur-md border border-[#C9A227]/30 rounded-2xl p-5 sm:p-8 shadow-2xl">
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="type-section-title text-[#C9A227] mb-2">Book your trial ride</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-12 bg-[#C9A227]/40"></div>
                <svg className="w-4 h-4 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                <div className="h-[1px] w-12 bg-[#C9A227]/40"></div>
              </div>
            </div>

            {/* Trial Options - SWITCHABLE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* 10 Minutes Free Trial */}
              <button
                onClick={() => setSelectedTrial('free')}
                className={`bg-[#0C0922] border rounded-2xl p-4 text-center transition-colors ${
                  selectedTrial === 'free' ? 'border-[#C9A227]' : 'border-[#C9A227]/30'
                }`}
              >
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p className="text-white font-bold text-xs mb-1 uppercase">10 Minutes</p>
                <p className="type-card-title text-white mb-2">Free trial ride</p>
                <p className="type-card-title text-[#C9A227]">Free</p>
                <div className="mt-3 flex justify-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedTrial === 'free' ? 'border-[#C9A227]' : 'border-white/30'
                  }`}>
                    {selectedTrial === 'free' && <div className="w-2 h-2 rounded-full bg-[#C9A227]"></div>}
                  </div>
                </div>
              </button>

              {/* 45 Minutes Trial Ride */}
              <button
                onClick={() => setSelectedTrial('premium')}
                className={`bg-[#0C0922] border rounded-2xl p-4 text-center transition-colors ${
                  selectedTrial === 'premium' ? 'border-[#C9A227]' : 'border-[#C9A227]/30'
                }`}
              >
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p className="text-white font-bold text-xs mb-1 uppercase">45 Minutes</p>
                <p className="type-card-title text-white mb-2">Trial ride</p>
                <p className="type-card-title text-[#C9A227]">₹1,999</p>
                <div className="mt-3 flex justify-center">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedTrial === 'premium' ? 'border-[#C9A227]' : 'border-white/30'
                  }`}>
                    {selectedTrial === 'premium' && <div className="w-2 h-2 rounded-full bg-[#C9A227]"></div>}
                  </div>
                </div>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Select Date */}
              <div>
                <label className="block text-[#C9A227] type-eyebrow mb-2">Select Date</label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]" placeholder="Choose a date" />
                </div>
              </div>

              {/* Select Time */}
              <div>
                <label className="block text-[#C9A227] type-eyebrow mb-2">Select Time</label>
                <div className="relative">
                  <select className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] appearance-none">
                    <option value="" className="bg-[#0C0922]">Choose a time slot</option>
                    <option value="morning" className="bg-[#0C0922]">Morning (6 AM - 10 AM)</option>
                    <option value="afternoon" className="bg-[#0C0922]">Afternoon (10 AM - 4 PM)</option>
                    <option value="evening" className="bg-[#0C0922]">Evening (4 PM - 7 PM)</option>
                  </select>
                  <span className="absolute right-4 top-3 text-[#C9A227] pointer-events-none text-sm">▼</span>
                </div>
              </div>

              {/* Your Details */}
              <div>
                <label className="block text-[#C9A227] type-eyebrow mb-2">Your Details</label>
                <div className="space-y-3">
                  <div className="relative">
                    <input type="text" className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]" placeholder="Full Name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input type="text" className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]" placeholder="Age" />
                    </div>
                    <div className="relative">
                      <input type="tel" className="w-full bg-[#0C0922] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]" placeholder="Phone / WhatsApp" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => openEnquiry('Trial Ride')}
                className="type-button w-full bg-[#C9A227] text-[#0C0922] py-4 rounded-lg hover:bg-white transition-colors"
              >
                BOOK YOUR TRIAL RIDE
              </button>
              
              <div className="text-center">
                <p className="text-white/60 text-xs flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  Booking confirmation via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


