import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Calculator,
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import Container from './Container';
import { NAV_LINKS } from '../../constants/navigation';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-1.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/50 py-2 sm:py-2.5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
            aria-label="NovaStack - Building the Future"
          >
            <img
              src="/logo.png"
              alt="NovaStack Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-bold tracking-tight text-slate-900 text-sm sm:text-lg font-display">
                Nova<span className="text-indigo-600">Stack</span>
              </span>
              <span className="text-[8px] sm:text-[10px] font-medium text-slate-500 tracking-normal">
                Building the Future
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
            {NAV_LINKS.map((link) => {
              const toUrl = link.path || link.href;
              const isActive = location.pathname === toUrl;
              return (
                <Link
                  key={link.name}
                  to={toUrl}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 font-semibold border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Cost Estimator Button */}
            <Link
              to="/cost-estimator"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-indigo-600" />
              <span>Cost Estimator</span>
            </Link>

            {/* Profile Dropdown / Login Button */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                {/* Clickable Profile Pill (Works on Desktop & Mobile) */}
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer focus:outline-none"
                  aria-label="User profile menu"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold uppercase shadow-sm shrink-0">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[80px] sm:max-w-[120px] truncate hidden xs:inline-block">
                    {user?.name ? user.name.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {/* Profile Popup Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold uppercase shrink-0">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 text-sm truncate">
                            {user?.name || 'NovaStack User'}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <ShieldCheck className="w-3 h-3 text-indigo-600" />
                        <span>
                          {user?.role === 'superadmin'
                            ? 'Superadmin'
                            : user?.role === 'admin'
                            ? 'Administrator'
                            : 'Client User'}
                        </span>
                      </div>
                    </div>

                    {/* Menu Links */}
                    <div className="p-1 space-y-0.5 text-xs font-medium text-slate-700">
                      <Link
                        to={isAdmin ? '/admin' : '/dashboard'}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        <span>{isAdmin ? 'Admin Portal' : 'My Dashboard'}</span>
                      </Link>

                      <Link
                        to="/cost-estimator"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <Calculator className="w-4 h-4 text-slate-400" />
                        <span>Cost Estimator</span>
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-400" />
                        <span>Contact Support</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-1 border-t border-slate-100 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Mobile Authenticated User Card Header */}
          {isAuthenticated && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 text-sm truncate">
                  {user?.name || 'NovaStack User'}
                </div>
                <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-100/80 text-indigo-700">
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                    {user?.role === 'superadmin' ? 'Superadmin' : user?.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const toUrl = link.path || link.href;
              const isActive = location.pathname === toUrl;
              return (
                <Link
                  key={link.name}
                  to={toUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <Link
              to="/cost-estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
            >
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Project Cost Estimator</span>
            </Link>

            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{isAdmin ? 'Open Admin Portal' : 'Open My Dashboard'}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                <span>Sign In to Account</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
