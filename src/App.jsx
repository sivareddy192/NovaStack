import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import AdminRoute from './layouts/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Methodology from './pages/Methodology';
import CostEstimator from './pages/CostEstimator';
import About from './pages/About';
import Insights from './pages/Insights';
import InsightDetails from './pages/InsightDetails';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminInsights from './pages/admin/AdminInsights';
import AdminLeads from './pages/admin/AdminLeads';
import AdminPricing from './pages/admin/AdminPricing';
import AdminUsers from './pages/admin/AdminUsers';

export const App = () => {
  return (
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
  );
};

export default App;
