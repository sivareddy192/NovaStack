import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Users,
  UserCheck,
  DollarSign,
  LogOut,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({ onClose }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { name: 'Insights / Blog', href: '/admin/insights', icon: BookOpen },
    { name: 'Inquiries & Leads', href: '/admin/leads', icon: Users },
    { name: 'Pricing Engine', href: '/admin/pricing', icon: DollarSign },
    { name: 'Users & Access', href: '/admin/users', icon: UserCheck },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="NovaStack Admin"
              className="h-7 w-7 object-contain shrink-0"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-slate-900 text-sm">Nova<span className="text-indigo-600">Admin</span></span>
              <span className="text-[8px] font-medium text-slate-400">ADMIN CONSOLE</span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="truncate">
            <div className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-slate-400 truncate">{user?.email || ''}</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>

        <Link
          to="/"
          className="w-full flex items-center justify-center gap-1 py-1.5 text-[11px] font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <span>View Public Website</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
