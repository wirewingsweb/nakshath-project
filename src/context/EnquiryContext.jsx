import React, { createContext, useState, useContext, useCallback } from 'react';

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const openEnquiry = useCallback((topic = '') => {
    if (topic) setSelectedTopic(topic);
    setIsModalOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setIsModalOpen(false), []);

  return (
    <EnquiryContext.Provider value={{ isModalOpen, openEnquiry, closeEnquiry, selectedTopic, setSelectedTopic }}>
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
