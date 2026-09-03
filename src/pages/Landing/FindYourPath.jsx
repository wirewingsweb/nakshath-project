import React from 'react';

const FindYourPath = () => {
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
    <div className="bg-[#F2F0EB] py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="text-[#C9A227] text-xs font-medium uppercase tracking-[0.3em] mb-4">Our Programs</h4>
          
          {/* "Find Your Path" - Mixed Color Serif */}
          <h2 className="font-serif text-[1.75rem] md:text-[2.5rem] leading-tight mb-6">
            <span className="text-[#1A1A1A]">Find</span> <span className="text-[#C9A227]">Your Path</span>
          </h2>
          
          <p className="text-[#1A1A1A]/70 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Programs designed for every rider. From the very first step in the saddle
            to competitive excellence, we guide you every step of the way.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, idx) => (
            <div key={idx} className="flex flex-col">
              
              {/* Program Number + Title - Number on Left, Title on Right */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-[#C9A227] font-serif text-[1.75rem] md:text-[2.75rem] leading-none shrink-0">{program.num}</span>
                <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wide leading-snug mt-3">{program.title}</h3>
              </div>

              {/* Image */}
              <div className="mb-4">
                <img 
                  src={program.img} 
                  alt={program.title} 
                  className="w-full aspect-[4/3] object-cover" 
                />
              </div>

              {/* Description */}
              <p className="text-[#1A1A1A]/70 text-sm font-normal mb-4">
                {program.subtitle}
              </p>

              {/* Divider Line */}
              <div className="h-[1px] bg-[#C9A227]/20 mb-4"></div>

              {/* Features List */}
              <ul className="space-y-2 text-xs text-[#1A1A1A]/70">
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
        <div className="text-center mt-16">
          <button className="border border-[#C9A227] text-[#C9A227] font-medium px-10 py-4 text-xs font-medium uppercase tracking-widest hover:bg-[#C9A227] hover:text-white transition-colors">
            Explore All Courses →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindYourPath;


