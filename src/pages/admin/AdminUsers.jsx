import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Trash2,
  Mail,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react';
import { getAdminUsers, updateUserRole, deleteAdminUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';
import SEO from '../../components/common/SEO';

export const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAdminUsers();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to load users', err);
      if (err.response?.status === 403) {
        setNotification({
          type: 'error',
          message: 'Access Denied: Only administrators have permission to view and manage user roles.',
        });
      } else if (err.response?.status === 429) {
        setNotification({
          type: 'error',
          message: 'Rate limit exceeded. Please wait a few seconds before refreshing.',
        });
      } else {
        setNotification({
          type: 'error',
          message: err.response?.data?.message || 'Failed to load users from database.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole, userName) => {
    setActionLoading(userId);
    try {
      await updateUserRole(userId, newRole);
      setUsers(
        users.map((u) =>
          u._id === userId || u.id === userId ? { ...u, role: newRole } : u
        )
      );
      setNotification({
        type: 'success',
        message: `Updated ${userName}'s access level to ${newRole.toUpperCase()}`,
      });
      setTimeout(() => setNotification(null), 3500);
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update user role',
      });
      setTimeout(() => setNotification(null), 3500);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to remove account for "${userName}"?`)) {
      setActionLoading(userId);
      try {
        await deleteAdminUser(userId);
        setUsers(users.filter((u) => u._id !== userId && u.id !== userId));
        setNotification({
          type: 'success',
          message: `User account "${userName}" removed`,
        });
        setTimeout(() => setNotification(null), 3500);
      } catch (err) {
        setNotification({
          type: 'error',
          message: err.response?.data?.message || 'Failed to delete user',
        });
        setTimeout(() => setNotification(null), 3500);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = filterRole === 'all' || u.role === filterRole;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case 'superadmin':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Superadmin
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            Admin
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <UserCheck className="w-3.5 h-3.5 text-slate-500" />
            User
          </span>
        );
    }
  };

  return (
    <>
      <SEO title="User & Role Management — Admin" />

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Users & Access Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage registered users in MongoDB. Elevate users to Admin or modify permissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user or email..."
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 w-48 sm:w-64"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-600"
            >
              <option value="all">All Roles ({users.length})</option>
              <option value="user">Users ({users.filter((u) => u.role === 'user').length})</option>
              <option value="admin">Admins ({users.filter((u) => u.role === 'admin').length})</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
        </div>

        {/* Notification Toast Banner */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2.5 transition-all ${
              notification.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Users Table */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <p className="mt-3 text-xs">Loading registered users from MongoDB...</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Current Role</th>
                    <th className="px-6 py-4">Registered Date</th>
                    <th className="px-6 py-4 text-right">Role Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => {
                      const isMe =
                        currentUser?.id === (u._id || u.id) ||
                        currentUser?.email === u.email;
                      const isSuperadmin = u.role === 'superadmin';

                      return (
                        <tr
                          key={u._id || u.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                                {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 flex items-center gap-2">
                                  <span>{u.name}</span>
                                  {isMe && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>{u.email}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">{getRoleBadge(u.role)}</td>

                          <td className="px-6 py-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {u.createdAt ? formatDate(u.createdAt) : 'Initial'}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              {/* Role Selector */}
                              {isSuperadmin ? (
                                <span className="text-xs text-slate-400 italic pr-2">
                                  Protected
                                </span>
                              ) : (
                                <select
                                  value={u.role || 'user'}
                                  disabled={actionLoading === (u._id || u.id)}
                                  onChange={(e) =>
                                    handleRoleChange(
                                      u._id || u.id,
                                      e.target.value,
                                      u.name
                                    )
                                  }
                                  className="text-xs font-semibold rounded-xl px-3 py-1.5 bg-white border border-slate-300 text-slate-700 focus:outline-none focus:border-indigo-600 disabled:opacity-50 cursor-pointer"
                                >
                                  <option value="user">Role: User</option>
                                  <option value="admin">Role: Admin</option>
                                </select>
                              )}

                              {!isMe && !isSuperadmin && (
                                <button
                                  onClick={() =>
                                    handleDeleteUser(u._id || u.id, u.name)
                                  }
                                  disabled={actionLoading === (u._id || u.id)}
                                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors disabled:opacity-50"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-xs text-slate-400">
                        No user accounts match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUsers;
