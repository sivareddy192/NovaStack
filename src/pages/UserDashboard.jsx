import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Calculator,
  MessageSquare,
  Sparkles,
  ArrowRight,
  LogOut,
  FolderGit2,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Zap,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';

export const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

  return (
    <>
      <SEO title="My Client Dashboard — NovaStack" />
      <div className="py-6 sm:py-10 md:py-14 bg-slate-50/50 min-h-[85vh]">
        <Container>
          {/* Welcome Header Banner */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-5 sm:p-8 md:p-10 mb-6 sm:mb-10 shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
              {/* User Avatar + Identity */}
              <div className="flex items-center gap-3.5 sm:gap-5">
                <div className="w-13 h-13 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-extrabold shadow-inner shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/15 text-indigo-200 border border-white/10">
                      {isAdmin ? 'Administrator' : 'Client Account'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-300 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-display truncate">
                    Welcome, {user?.name ? user.name.split(' ')[0] : 'Client'}!
                  </h1>

                  <p className="text-xs sm:text-sm text-indigo-100/80 mt-0.5 flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-indigo-300" />
                    <span className="truncate">{user?.email}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-semibold text-xs bg-white text-slate-900 hover:bg-indigo-50 active:scale-[0.98] transition-all shadow-sm"
                  >
                    <span>Admin Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-4 sm:py-3 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/15 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar on Mobile & Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-400 font-medium truncate">Account Role</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate uppercase">
                  {user?.role || 'USER'}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-400 font-medium truncate">Security Status</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-600 truncate">
                  Verified
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-400 font-medium truncate">Pricing Engine</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  Active Real-Time
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-slate-400 font-medium truncate">Support SLA</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  &lt; 24h Response
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tools Grid */}
          <div className="mb-6 sm:mb-10">
            <div className="flex items-center justify-between mb-3.5 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Project & Architecture Tools
              </h2>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                Instant self-service tools
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {/* Cost Estimator */}
              <Link
                to="/cost-estimator"
                className="group rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 hover:border-indigo-600 hover:shadow-md active:scale-[0.99] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Project Cost Estimator</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Calculate dynamic budget estimates and timelines for custom MERN applications.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Calculate Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Start Project Inquiry */}
              <Link
                to="/contact"
                className="group rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 hover:border-indigo-600 hover:shadow-md active:scale-[0.99] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Start Project Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Submit scope, requirements, and tech stack preferences to our lead engineers.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-600 group-hover:translate-x-1 transition-transform">
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Case Studies */}
              <Link
                to="/projects"
                className="group rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 hover:border-indigo-600 hover:shadow-md active:scale-[0.99] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Explore Portfolio</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Review case studies in E-Commerce, Food Delivery, and enterprise SaaS platforms.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>View Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Engineering Insights */}
              <Link
                to="/insights"
                className="group rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 hover:border-indigo-600 hover:shadow-md active:scale-[0.99] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Engineering Insights</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Read architecture deep dives on MERN scaling, MongoDB indexing, and React 19.
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
                  <span>Read Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Account Profile Details & Direct Consultation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Account Profile Card */}
            <div className="lg:col-span-2 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 md:p-8 shadow-sm">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Account Profile & Credentials</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Full Name</span>
                  <div className="font-bold text-slate-900 text-sm sm:text-base truncate">
                    {user?.name || 'NovaStack Client'}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Email Address</span>
                  <div className="font-bold text-slate-900 text-sm sm:text-base truncate">
                    {user?.email}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Account Role</span>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      {user?.role?.toUpperCase() || 'USER'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Database Verification</span>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Active & Synced
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Direct Consultation Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-indigo-100 p-5 sm:p-7 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Need Direct Consultation?
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Our principal MERN stack architects review all verified customer inquiries with priority response.
                </p>
              </div>

              <Link
                to="/contact"
                className="mt-5 w-full py-3 rounded-xl text-center text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all block shadow-sm"
              >
                Contact Engineering Team
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserDashboard;
