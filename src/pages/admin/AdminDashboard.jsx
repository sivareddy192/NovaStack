import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Users,
  BookOpen,
  Calculator,
  UserCheck,
  ArrowUpRight,
  Shield,
  Info,
} from 'lucide-react';
import { getAdminDashboardStats } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const stats = await getAdminDashboardStats();
        setData(stats);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = data?.stats || {
    totalProjects: 6,
    totalInsights: 5,
    totalContacts: 0,
    newContacts: 0,
    totalEstimatorLeads: 0,
    newEstimatorLeads: 0,
    totalLeads: 0,
    totalUsers: 1,
  };

  const isStandardUser = user?.role === 'user';

  return (
    <>
      <SEO title="Admin Dashboard" />

      <div>
        {/* User Role Banner if Standard User */}
        {isStandardUser && (
          <div className="mb-8 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start sm:items-center gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <span className="font-bold">Standard User Account: </span>
              Your account is registered as a <span className="font-semibold underline">User</span>. An Administrator can grant you Admin privileges under{' '}
              <Link to="/admin/users" className="font-bold text-indigo-600 hover:underline">
                Users & Access Control
              </Link>.
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Executive Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Overview of NovaStack platform metrics, project portfolio, and registered accounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/projects"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all"
            >
              + New Project
            </Link>
            <Link
              to="/admin/insights"
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-all"
            >
              + New Article
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Projects
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.totalProjects}
            </div>
            <div className="mt-2 text-xs text-indigo-600 flex items-center gap-1">
              <Link to="/admin/projects" className="hover:underline flex items-center gap-1">
                <span>Manage</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Inquiries
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.totalContacts}
            </div>
            <div className="mt-2 text-xs text-emerald-600 font-medium">
              {stats.newContacts} new
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Quotes
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <Calculator className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.totalEstimatorLeads}
            </div>
            <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
              <Link to="/admin/leads" className="hover:underline flex items-center gap-1">
                <span>View</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Articles
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.totalInsights}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Published
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Users & Roles
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-display">
              {stats.totalUsers || 1}
            </div>
            <div className="mt-2 text-xs text-indigo-600 flex items-center gap-1">
              <Link to="/admin/users" className="hover:underline flex items-center gap-1">
                <span>Access Control</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Inquiries and Estimator Leads Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contact Inquiries */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Recent Contact Inquiries</span>
              </h3>
              <Link to="/admin/leads" className="text-xs text-indigo-600 hover:underline">
                View All
              </Link>
            </div>

            {data?.recentContacts && data.recentContacts.length > 0 ? (
              <div className="space-y-3">
                {data.recentContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{contact.name}</div>
                      <div className="text-xs text-slate-500">{contact.email} • {contact.service}</div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {contact.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No inquiries recorded yet. Inbound client inquiries will appear here.
              </div>
            )}
          </div>

          {/* Recent Estimator Leads */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-purple-600" />
                <span>Recent Project Quotes</span>
              </h3>
              <Link to="/admin/leads" className="text-xs text-indigo-600 hover:underline">
                View All
              </Link>
            </div>

            {data?.recentEstimatorLeads && data.recentEstimatorLeads.length > 0 ? (
              <div className="space-y-3">
                {data.recentEstimatorLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {lead.contact?.name || 'Lead'} • {lead.projectType}
                      </div>
                      <div className="text-xs text-indigo-600 font-medium">
                        ₹{lead.estimatedMinPrice?.toLocaleString()} – ₹{lead.estimatedMaxPrice?.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No estimator leads recorded yet. Submissions from Cost Estimator will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
