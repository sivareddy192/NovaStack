import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import GlowBackground from '../components/common/GlowBackground';
import MobileBottomNav from '../components/common/MobileBottomNav';

export const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-slate-800 relative selection:bg-indigo-600 selection:text-white pb-20 md:pb-0">
      <GlowBackground />
      <Navbar />
      <main className="flex-1 z-10">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default RootLayout;
