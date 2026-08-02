import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ background: '#050714', color: '#E2E8F0', userSelect: 'text' }}>
      <Navbar />
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-3 sm:px-5 lg:px-8 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};
