import { useEffect } from 'react';
import { useEnquiry } from '../context/EnquiryContext';

const Enquiry = () => {
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    openEnquiry();
  }, [openEnquiry]);

  return (
    <div className="pt-32 pb-16 bg-[#FDFCFA] min-h-screen text-center">
      <h1 className="type-page-title text-[#1A1A1A] mb-6">Enquire Now</h1>
      <p className="text-[#5A5A66] text-lg">Loading enquiry form...</p>
    </div>
  );
};

export default Enquiry;


