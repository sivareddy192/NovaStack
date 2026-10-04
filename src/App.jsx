import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import AdminRoute from './layouts/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Methodology = lazy(() => import('./pages/Methodology'));
const CostEstimator = lazy(() => import('./pages/CostEstimator'));
const About = lazy(() => import('./pages/About'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetails = lazy(() => import('./pages/InsightDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminRegister = lazy(() => import('./pages/admin/AdminRegister'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminInsights = lazy(() => import('./pages/admin/AdminInsights'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads'));
const AdminPricing = lazy(() => import('./pages/admin/AdminPricing'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));

const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-500">
    Loading page...
  </div>
);

export const App = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public Pages with Standard Header & Footer */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/cost-estimator" element={<CostEstimator />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Protected Admin Console Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="insights" element={<AdminInsights />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
