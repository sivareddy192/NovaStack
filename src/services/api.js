import axios from 'axios';
import {
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  FALLBACK_INSIGHTS,
  DEFAULT_PRICING_CONFIG,
} from '../constants/fallbackData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('novastack_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for graceful error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      // Clear token if expired
      localStorage.removeItem('novastack_admin_token');
      localStorage.removeItem('novastack_admin_user');
    }
    return Promise.reject(error);
  }
);

// ==================== PROJECTS ====================
export const getProjects = async (params = {}) => {
  try {
    const response = await api.get('/projects', { params });
    return response.data?.data || FALLBACK_PROJECTS;
  } catch (error) {
    console.warn('[API fallback] getProjects:', error.message);
    let list = [...FALLBACK_PROJECTS];
    if (params.category && params.category !== 'All') {
      list = list.filter((p) => p.category === params.category);
    }
    if (params.featured) {
      list = list.filter((p) => p.featured);
    }
    return list;
  }
};

export const getProjectBySlug = async (slug) => {
  try {
    const response = await api.get(`/projects/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.warn('[API fallback] getProjectBySlug:', error.message);
    const found = FALLBACK_PROJECTS.find((p) => p.slug === slug);
    if (found) return found;
    throw error;
  }
};

export const createProject = async (data) => {
  const response = await api.post('/projects', data);
  return response.data?.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data?.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// ==================== SERVICES ====================
export const getServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data?.data || FALLBACK_SERVICES;
  } catch (error) {
    console.warn('[API fallback] getServices:', error.message);
    return FALLBACK_SERVICES;
  }
};

export const getServiceBySlug = async (slug) => {
  try {
    const response = await api.get(`/services/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.warn('[API fallback] getServiceBySlug:', error.message);
    const found = FALLBACK_SERVICES.find((s) => s.slug === slug);
    if (found) return found;
    throw error;
  }
};

// ==================== INSIGHTS ====================
export const getInsights = async (params = {}) => {
  try {
    const response = await api.get('/insights', { params });
    return response.data?.data || FALLBACK_INSIGHTS;
  } catch (error) {
    console.warn('[API fallback] getInsights:', error.message);
    let list = [...FALLBACK_INSIGHTS];
    if (params.category && params.category !== 'All') {
      list = list.filter((i) => i.category === params.category);
    }
    return list;
  }
};

export const getInsightBySlug = async (slug) => {
  try {
    const response = await api.get(`/insights/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.warn('[API fallback] getInsightBySlug:', error.message);
    const found = FALLBACK_INSIGHTS.find((i) => i.slug === slug);
    if (found) return found;
    throw error;
  }
};

export const createInsight = async (data) => {
  const response = await api.post('/insights', data);
  return response.data?.data;
};

export const updateInsight = async (id, data) => {
  const response = await api.put(`/insights/${id}`, data);
  return response.data?.data;
};

export const deleteInsight = async (id) => {
  const response = await api.delete(`/insights/${id}`);
  return response.data;
};

// ==================== CONTACT ====================
export const sendContactInquiry = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export const getContacts = async (params = {}) => {
  const response = await api.get('/contact', { params });
  return response.data?.data || [];
};

export const updateContactStatus = async (id, data) => {
  const response = await api.put(`/contact/${id}`, data);
  return response.data?.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

// ==================== COST ESTIMATOR ====================
export const getEstimatorConfig = async () => {
  try {
    const response = await api.get('/estimator/config');
    return response.data?.data || DEFAULT_PRICING_CONFIG;
  } catch (error) {
    console.warn('[API fallback] getEstimatorConfig:', error.message);
    return DEFAULT_PRICING_CONFIG;
  }
};

export const calculateEstimate = async (params) => {
  try {
    const response = await api.post('/estimator/calculate', params);
    return response.data?.data;
  } catch (error) {
    console.warn('[API calculation fallback]', error.message);
    // Client-side fallback calculation
    const base = 25000;
    const featCost = (params.features?.length || 0) * 8000;
    const mult = params.complexity === 'Enterprise' ? 2.5 : params.complexity === 'Advanced' ? 1.8 : 1.2;
    const sub = (base + featCost) * mult;
    const minP = Math.round((sub * 0.9) / 500) * 500;
    const maxP = Math.round((sub * 1.2) / 500) * 500;
    return {
      projectType: params.projectType,
      complexity: params.complexity,
      features: params.features || [],
      designLevel: params.designLevel,
      timeline: params.timeline || '2–4 weeks',
      currency: 'INR',
      currencySymbol: '₹',
      estimatedMinPrice: minP,
      estimatedMaxPrice: maxP,
      formattedRange: `₹${minP.toLocaleString('en-IN')} – ₹${maxP.toLocaleString('en-IN')}`,
      estimatedWeeks: params.timeline || '2–4 weeks',
    };
  }
};

export const submitEstimatorLead = async (leadData) => {
  const response = await api.post('/estimator/lead', leadData);
  return response.data;
};

export const getEstimatorLeads = async (params = {}) => {
  const response = await api.get('/estimator/leads', { params });
  return response.data?.data || [];
};

export const updateEstimatorLeadStatus = async (id, data) => {
  const response = await api.put(`/estimator/leads/${id}`, data);
  return response.data?.data;
};

// ==================== AUTH & ADMIN ====================
export const loginAdmin = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerAdmin = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const getAdminDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data?.data;
};

export const updatePricingConfig = async (configData) => {
  const response = await api.put('/admin/pricing-config', configData);
  return response.data?.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data?.data || [];
};

export const updateUserRole = async (userId, role) => {
  const response = await api.put(`/admin/users/${userId}/role`, { role });
  return response.data;
};

export const deleteAdminUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export default api;
