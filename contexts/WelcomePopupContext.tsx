"use client";
import React, { createContext, useContext, useState } from 'react';

interface WelcomePopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const WelcomePopupContext = createContext<WelcomePopupContextType | undefined>(undefined);

export function WelcomePopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => {
    sessionStorage.setItem('hasSeenWelcomePopup', 'true');
    setIsOpen(false);
  };

  return (
    <WelcomePopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </WelcomePopupContext.Provider>
  );
}

export function useWelcomePopup() {
  const context = useContext(WelcomePopupContext);
  if (context === undefined) {
    throw new Error('useWelcomePopup must be used within a WelcomePopupProvider');
  }
  return context;
}