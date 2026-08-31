import React, { useState, useEffect } from 'react';
import {
  Users,
  Calculator,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle2,
  Trash2,
  Filter,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import {
  getContacts,
  updateContactStatus,
  deleteContact,
  getEstimatorLeads,
  updateEstimatorLeadStatus,
} from '../../services/api';
import { formatDate } from '../../utils/formatters';
import SEO from '../../components/common/SEO';

export const AdminLeads = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [estimatorLeads, setEstimatorLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [contactList, estimatorList] = await Promise.all([
        getContacts(),
        getEstimatorLeads(),
      ]);
      setContacts(contactList);
      setEstimatorLeads(estimatorList);
    } catch (err) {
      console.error('Failed to load leads', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleContactStatusChange = async (id, newStatus) => {
    try {
      await updateContactStatus(id, { status: newStatus });
      setContacts(
        contacts.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleEstimatorStatusChange = async (id, newStatus) => {
    try {
      await updateEstimatorLeadStatus(id, { status: newStatus });
      setEstimatorLeads(
        estimatorLeads.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Delete this inquiry record?')) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter((c) => c._id !== id));
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  const filteredContacts = contacts.filter((c) =>
    statusFilter === 'all' ? true : c.status === statusFilter
  );

  const filteredEstimator = estimatorLeads.filter((l) =>
    statusFilter === 'all' ? true : l.status === statusFilter
  );

  const statusColors = {
    new: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200',
    qualified: 'bg-purple-50 text-purple-700 border-purple-200',
    closed: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <>
      <SEO title="Lead Management — Admin" />

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Inquiries & Leads
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track and qualify customer inquiries and estimator quote requests.
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-300 text-xs text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-600"
            >
              <option value="all">All Statuses</option>
              <option value="new">New / Unread</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed / Converted</option>
            </select>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'contacts'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Contact Inquiries ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('estimator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'estimator'
                ? 'bg-purple-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Cost Estimator Quotes ({estimatorLeads.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <p className="mt-3 text-xs">Loading leads...</p>
          </div>
        ) : activeTab === 'contacts' ? (
          /* Contact Submissions */
          <div className="space-y-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((lead) => (
                <div
                  key={lead._id}
                  className="rounded-2xl bg-white border border-slate-200 p-6 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>{lead.name}</span>
                        {lead.company && (
                          <span className="text-xs font-normal text-slate-500">
                            ({lead.company})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-indigo-600" />
                          {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {lead.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleContactStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1 border uppercase tracking-wider focus:outline-none ${
                          statusColors[lead.status] || statusColors.new
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteContact(lead._id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Message & Meta */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Service Requested
                      </span>
                      <span className="text-indigo-600 font-semibold">{lead.service}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Target Budget
                      </span>
                      <span className="text-slate-800 font-semibold">{lead.budget}</span>
                    </div>

                    <div className="sm:col-span-3">
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Message / Project Brief
                      </span>
                      <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed font-normal">
                        {lead.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-xs text-slate-400">
                No contact submissions found for the selected filter.
              </div>
            )}
          </div>
        ) : (
          /* Estimator Leads */
          <div className="space-y-4">
            {filteredEstimator.length > 0 ? (
              filteredEstimator.map((lead) => (
                <div
                  key={lead._id}
                  className="rounded-2xl bg-white border border-slate-200 p-6 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>{lead.contact?.name || 'Quote Lead'}</span>
                        {lead.contact?.company && (
                          <span className="text-xs font-normal text-slate-500">
                            ({lead.contact.company})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-purple-600" />
                          {lead.contact?.email}
                        </span>
                        {lead.contact?.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {lead.contact.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(lead.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleEstimatorStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1 border uppercase tracking-wider focus:outline-none ${
                          statusColors[lead.status] || statusColors.new
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Estimation Specs */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Product Type
                      </span>
                      <span className="text-slate-900 font-semibold">{lead.projectType}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Complexity & Design
                      </span>
                      <span className="text-slate-700 font-medium">
                        {lead.complexity} • {lead.designLevel}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Estimated Range
                      </span>
                      <span className="text-indigo-600 font-bold">
                        ₹{lead.estimatedMinPrice?.toLocaleString()} – ₹{lead.estimatedMaxPrice?.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">
                        Target Timeline
                      </span>
                      <span className="text-slate-700 font-medium">{lead.timeline}</span>
                    </div>

                    {lead.features && lead.features.length > 0 && (
                      <div className="sm:col-span-4">
                        <span className="text-slate-400 uppercase font-semibold block mb-1.5">
                          Selected Features:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lead.features.map((f, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded text-[11px] bg-slate-100 text-slate-700 font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-xs text-slate-400">
                No estimator leads found.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminLeads;
