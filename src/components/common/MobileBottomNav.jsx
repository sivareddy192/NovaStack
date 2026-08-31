import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Calendar, Briefcase, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated, user } = useAuth();

  const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');
  const accountLink = isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/login';

  const isHome = pathname === '/';
  const isServices = pathname.startsWith('/services');
  const isBook = pathname.startsWith('/contact') || pathname.startsWith('/cost-estimator');
  const isWork = pathname.startsWith('/projects');
  const isAccount =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin');

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-end justify-around max-w-lg mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-2xl transition-all duration-200 ${
            isHome
              ? 'bg-indigo-50/90 text-indigo-600 font-bold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={isHome ? 2.4 : 2} />
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Home</span>
        </Link>

        <Link
          to="/services"
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-2xl transition-all duration-200 ${
            isServices
              ? 'bg-indigo-50/90 text-indigo-600 font-bold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-5 h-5" strokeWidth={isServices ? 2.4 : 2} />
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Services</span>
        </Link>

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center -mt-5 relative group min-w-[60px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/35 border-[3.5px] border-white group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
            <Calendar className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <span
            className={`text-[11px] font-bold tracking-tight mt-1 transition-colors ${
              isBook ? 'text-indigo-600' : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            Book
          </span>
        </Link>

        <Link
          to="/projects"
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-2xl transition-all duration-200 ${
            isWork
              ? 'bg-indigo-50/90 text-indigo-600 font-bold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-5 h-5" strokeWidth={isWork ? 2.4 : 2} />
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Work</span>
        </Link>

        <Link
          to={accountLink}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-2xl transition-all duration-200 ${
            isAccount
              ? 'bg-indigo-50/90 text-indigo-600 font-bold shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5" strokeWidth={isAccount ? 2.4 : 2} />
          <span className="text-[11px] font-medium tracking-tight mt-0.5">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
