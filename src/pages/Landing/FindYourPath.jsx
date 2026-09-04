import React from 'react';
import { useEnquiry } from '../../context/EnquiryContext';

const FindYourPath = () => {
  const { openEnquiry } = useEnquiry();
  const programs = [
    {
      num: '01',
      title: 'KIDS SPECIAL RIDING PROGRAM',
      subtitle: 'A fun-filled learning experience for children.',
      img: '/kid path.png',
      features: ['Pony riding', 'Confidence building', 'Physical coordination', 'Interactive horse sessions']
    },
    {
      num: '02',
      title: 'BEGINNER PROGRAM',
      subtitle: 'Perfect for first-time riders.',
      img: '/begin path.png',
      features: ['Introduction to horses', 'Riding basics', 'Balance & posture', 'Safety training', 'Horse handling']
    },
    {
      num: '03',
      title: 'INTERMEDIATE TRAINING',
      subtitle: 'For riders seeking skill advancement.',
      img: '/inter path.png',
      features: ['Riding techniques', 'Trotting & Cantering', 'Horse Communication & Handling']
    },
    {
      num: '04',
      title: 'PROFESSIONAL COMPETITION TRAINING',
      subtitle: 'Designed for competitive riders.',
      img: '/advance path.png',
      features: ['Show Jumping preparation', 'Techniques', 'Performance assessment', 'Advanced Training']
    }
  ];

  return (
    <div className="bg-[#F2F0EB] py-14 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Header Section */}
        <div className="text-left md:text-center mb-10 sm:mb-16">
          <h4 className="type-eyebrow text-[#C9A227] mb-4">Our Programs</h4>
          
          {/* "Find Your Path" - Mixed Color Serif */}
          <h2 className="type-page-title mb-6">
            <span className="text-[#1A1A1A]">Find</span> <span className="text-[#C9A227]">Your Path</span>
          </h2>
          
          <p className="type-lead text-[#1A1A1A]/85 max-w-2xl mx-0 md:mx-auto">
            Programs designed for every rider. From the very first step in the saddle
            to competitive excellence, we guide you every step of the way.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#C9A227]/15 bg-white/55 p-4 shadow-[0_14px_40px_rgba(12,9,34,0.06)] sm:p-5"
            >
              
              {/* Program Number + Title - Number on Left, Title on Right */}
              <div className="flex items-start gap-3 mb-4">
                <span className="type-page-title text-[#C9A227] leading-none shrink-0">{program.num}</span>
                <h3 className="min-w-0 break-words font-bold text-[#1A1A1A] text-sm uppercase tracking-wide leading-snug mt-2 sm:mt-3">{program.title}</h3>
              </div>

              {/* Image */}
              <div className="mb-4 overflow-hidden rounded-xl">
                <img 
                  src={program.img} 
                  alt={program.title} 
                  className="w-full aspect-[4/3] object-cover" 
                />
              </div>

              {/* Description */}
              <p className="type-small text-[#1A1A1A]/80 mb-4">
                {program.subtitle}
              </p>

              {/* Divider Line */}
              <div className="h-[1px] bg-[#C9A227]/20 mb-4"></div>

              {/* Features List */}
              <ul className="type-caption space-y-2 text-[#1A1A1A]/80">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#C9A227] flex-shrink-0"></span>
                    <span className="font-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Explore All Courses Button */}
        <div className="text-left md:text-center mt-10 sm:mt-16">
          <button
            type="button"
            onClick={() => openEnquiry('Riding Classes')}
            className="type-button max-w-full border border-[#C9A227] text-[#C9A227] px-6 sm:px-10 py-4 hover:bg-[#C9A227] hover:text-white transition-colors"
          >
            Explore All Courses →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindYourPath;


