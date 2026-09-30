import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';
import { stopScroll, startScroll } from '../lib/smoothScroll';

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const openEnquiry = useCallback((topic = '') => {
    if (topic) setSelectedTopic(topic);
    setIsModalOpen(true);
    // Freeze the page behind the modal — Lenis owns the scroll,
    // so body overflow alone doesn't stop it.
    stopScroll();
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsModalOpen(false);
    // Resume page scroll.
    startScroll();
  }, []);

  return (
    <EnquiryContext.Provider
      value={{
        isModalOpen,
        openEnquiry,
        closeEnquiry,
        selectedTopic,
        setSelectedTopic,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within EnquiryProvider');
  }
  return context;
};